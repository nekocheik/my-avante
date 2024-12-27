import { ExtensionContext, Uri, window, workspace, WorkspaceEdit } from "coc.nvim";
import dotenv from 'dotenv';
import https from 'https';
import * as path from 'path';
dotenv.config();

// Configuration OpenAI
const OPENAI_CONFIG = {
  baseURL: 'https://api.openai.com/v1/chat/completions',
  defaultParams: {
    max_tokens: 3000,
    temperature: 0.3,
  },
  model: 'gpt-4',
  timeout: 30000,
  httpsAgent: new https.Agent({ keepAlive: true })
};

class OpenAIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const requestData = JSON.stringify(data);
      
      const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Length': Buffer.byteLength(requestData)
        },
        timeout: OPENAI_CONFIG.timeout,
        agent: OPENAI_CONFIG.httpsAgent
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(responseData);
            if (!parsedData.choices?.[0]?.message?.content) {
              reject(new Error('Format de réponse OpenAI invalide'));
              return;
            }
            resolve(parsedData.choices[0].message.content.trim());
          } catch (error) {
            reject(new Error(`Erreur de parsing: ${error}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Erreur API OpenAI: ${error.message}`));
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Délai d\'attente dépassé'));
      });

      req.write(requestData);
      req.end();
    });
  }

  async analyzeCode(fileContent: string, fileName: string): Promise<string> {
    try {
      window.showInformationMessage('Début de l\'analyse du code...');
      
      const prompt = `Tu es un assistant IA expert en analyse de code. Ta tâche est de générer un fichier d'identité au format JSON pour le fichier suivant :

${fileContent}

Le fichier d'identité doit contenir :
- nom_fichier
- description
- interfaces
- types
- exports
- fonctions (avec nom, description détaillée, paramètres, retour)`;

      window.showInformationMessage('Envoi de la requête à OpenAI...');
      
      const requestData = {
        model: OPENAI_CONFIG.model,
        messages: [
          { role: "system", content: "Tu es un expert en analyse de code." },
          { role: "user", content: prompt }
        ],
        max_tokens: OPENAI_CONFIG.defaultParams.max_tokens,
        temperature: OPENAI_CONFIG.defaultParams.temperature
      };

      const response = await this.makeRequest(requestData);
      window.showInformationMessage('Réponse reçue d\'OpenAI');
      
      return response;
    } catch (error) {
      window.showErrorMessage(`Erreur lors de l'analyse du code: ${error}`);
      throw error;
    }
  }
}

async function createIAFile(originalFilePath: string): Promise<void> {
  try {
    if (originalFilePath.endsWith('.ai')) {
      console.log('Tentative de création d\'un fichier .ai pour un fichier .ai ignorée');
      return;
    }

    console.log(`Début de la création du fichier IA pour: ${originalFilePath}`);
    
    const cleanPath = originalFilePath.replace(/^file:\/\//, '');
    const workspaceRoot = workspace.root;
    const relativePath = path.relative(workspaceRoot, cleanPath);
    
    console.log('Lecture du fichier source...');
    const fileContent = await workspace.readFile(originalFilePath);
    
    console.log('Initialisation du service OpenAI...');
    const openAI = new OpenAIService(process.env.OPENAI_API_KEY || '');
    
    console.log('Analyse du code en cours...');
    const analysis = await openAI.analyzeCode(fileContent.toString(), path.basename(relativePath));

    const aiFilePath = path.join(
      workspaceRoot,
      path.dirname(relativePath),
      `${path.basename(relativePath)}.ai`
    );

    // Vérification de l'existence du fichier en essayant de le lire
    try {
      await workspace.readFile(aiFilePath);
      console.log(`Le fichier ${aiFilePath} existe déjà, mise à jour...`);
    } catch (e) {
      console.log(`Création d'un nouveau fichier: ${aiFilePath}`);
    }

    window.showInformationMessage('Création du fichier IA...');
    await workspace.createFile(aiFilePath, { 
      overwrite: true, 
      ignoreIfExists: false 
    });

    window.showInformationMessage('Application des modifications...');
    const workspaceEdit: WorkspaceEdit = {
      changes: {
        [aiFilePath]: [
          {
            range: {
              start: { line: 0, character: 0 },
              end: { line: 0, character: 0 }
            },
            newText: analysis
          }
        ]
      }
    };

    await workspace.applyEdit(workspaceEdit);
    
    window.showInformationMessage(`Fichier IA créé avec succès: ${workspace.asRelativePath(aiFilePath)}`);
  } catch (error) {
    window.showErrorMessage(`Erreur lors de la création du fichier IA: ${error}`);
    if (error instanceof Error) {
      window.showErrorMessage(`Stack trace: ${error.stack}`);
    }
  }
}

function shouldIgnoreFile(uri: Uri): boolean {
  const ignorePatterns = [
    'node_modules/**',
    '.env*',
    '*.log',
    'dist/**',
    'build/**',
    '.git/**',
    '*.map',
    'coverage/**',
    'tmp/**',
    '.DS_Store',
    '*.lock',
    '*.ai'
  ];

  const relativePath = workspace.asRelativePath(uri);
  console.log(`Vérification du fichier: ${relativePath}`);
  
  const shouldIgnore = ignorePatterns.some(pattern => {
    const regexPattern = pattern
      .replace(/\*/g, '.*')
      .replace(/\./g, '\\.')
      .replace(/\*\*/g, '.*');
    return new RegExp(`^${regexPattern}$`).test(relativePath);
  });

  if (shouldIgnore) {
    console.log(`Fichier ignoré: ${relativePath}`);
  }
  return shouldIgnore;
}

export async function activate(context: ExtensionContext): Promise<void> {
  try {
    console.log('Activation de l\'extension...');
    const files = await workspace.findFiles('**/*', '{**/.git/**,**/node_modules/**,**/*.ai}');
    
    console.log('Scan du workspace...');
    
    files
      .filter(file => !shouldIgnoreFile(file))
      .forEach(file => {
        console.log(`Fichier éligible trouvé: ${workspace.asRelativePath(file)}`);
      });

    context.subscriptions.push(
      workspace.onDidOpenTextDocument(document => {
        if (!document) return;
        
        const uri = document.uri;
        if (typeof uri === 'string' && !uri.endsWith('.ai')) {
          console.log(`Document ouvert détecté: ${uri}`);
          createIAFile(uri).catch(error => {
            console.error(`Erreur lors de la création du fichier AI: ${error}`);
            window.showErrorMessage(`Erreur: ${error}`);
          });
        } else {
          console.log('Document .ai ignoré');
        }
      })
    );

  } catch (error) {
    console.error(`Erreur lors du scan: ${error}`);
    window.showErrorMessage(`Erreur lors du scan: ${error}`);
  }
}

export function deactivate(): void {}
