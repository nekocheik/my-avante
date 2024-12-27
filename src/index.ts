import { ExtensionContext, Uri, window, workspace, WorkspaceEdit } from "coc.nvim";
import dotenv from 'dotenv';
import * as https from 'https';
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
  timeout: 30000
};

class OpenAIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private makeRequest(data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.openai.com',
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`OpenAI API error: ${res.statusCode} - ${responseData}`));
            return;
          }

          try {
            const parsedData = JSON.parse(responseData);
            if (!parsedData.choices?.[0]?.message?.content) {
              reject(new Error('Format de réponse OpenAI invalide'));
              return;
            }
            resolve(parsedData.choices[0].message.content.trim());
          } catch (error) {
            reject(new Error(`Erreur de parsing JSON: ${error}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(JSON.stringify(data));
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
- fonctions (avec nom, description détaillée, paramètres, retour)
- droits
- proprietaire`;

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
    window.showInformationMessage('Début de la création du fichier IA...');
    
    const cleanPath = originalFilePath.replace(/^file:\/\//, '');
    const workspaceRoot = workspace.root;
    const relativePath = path.relative(workspaceRoot, cleanPath);
    
    window.showInformationMessage('Lecture du fichier source...');
    const fileContent = await workspace.readFile(originalFilePath);
    
    window.showInformationMessage('Initialisation du service OpenAI...');
    const openAI = new OpenAIService(process.env.OPENAI_API_KEY || '');
    
    window.showInformationMessage('Analyse du code en cours...');
    const analysis = await openAI.analyzeCode(fileContent.toString(), path.basename(relativePath));

    const iaFilePath = path.join(
      workspaceRoot,
      path.dirname(relativePath),
      `${path.basename(relativePath)}.ia`
    );

    window.showInformationMessage('Création du fichier IA...');
    await workspace.createFile(iaFilePath, { 
      overwrite: true, 
      ignoreIfExists: false 
    });

    window.showInformationMessage('Application des modifications...');
    const workspaceEdit: WorkspaceEdit = {
      changes: {
        [iaFilePath]: [
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
    
    window.showInformationMessage(`Fichier IA créé avec succès: ${workspace.asRelativePath(iaFilePath)}`);
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
    '*.lock'
  ];

  const relativePath = workspace.asRelativePath(uri);
  
  return ignorePatterns.some(pattern => {
    const regexPattern = pattern
      .replace(/\*/g, '.*')
      .replace(/\./g, '\\.')
      .replace(/\*\*/g, '.*');
    return new RegExp(`^${regexPattern}$`).test(relativePath);
  });
}

export async function activate(context: ExtensionContext): Promise<void> {
  try {
    const files = await workspace.findFiles('**/*', '{**/.git/**,**/node_modules/**}');
    
    window.showInformationMessage('Scan du workspace...');
    
    files
      .filter(file => !shouldIgnoreFile(file))
      .forEach(file => {
        window.showInformationMessage(`Fichier trouvé: ${workspace.asRelativePath(file)}`);
      });

    context.subscriptions.push(
      workspace.onDidOpenTextDocument(document => {
        if (!document) return;
        
        const uri = document.uri;
        if (typeof uri === 'string' && !uri.endsWith('.ia')) {
          createIAFile(uri).catch(error => {
            window.showErrorMessage(`Erreur: ${error}`);
          });
        }
      })
    );

  } catch (error) {
    window.showErrorMessage(`Erreur lors du scan: ${error}`);
  }
}

export function deactivate(): void {}
