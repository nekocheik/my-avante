import axios from 'axios';
import { ExtensionContext, Uri, window, workspace, WorkspaceEdit } from "coc.nvim";
import dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

// Configuration OpenAI
const OPENAI_CONFIG = {
  baseURL: 'https://api.openai.com/v1/chat/completions',
  defaultParams: {
    max_tokens: 3000,
    temperature: 0.3,
  },
  model: 'gpt-4-turbo-preview',
  timeout: 30000
};

class OpenAIService {
  private client;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: OPENAI_CONFIG.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      timeout: OPENAI_CONFIG.timeout
    });
  }

  async analyzeCode(fileContent: string, fileName: string): Promise<string> {
    const prompt = `Tu es un assistant IA expert en analyse de code. Ta tâche est de générer un fichier d'identité au format JSON pour le fichier suivant :

${fileContent}

Le fichier d'identité doit contenir :
- nom_fichier
- description
- fonctions (avec nom, description détaillée, paramètres, retour)
- droits
- proprietaire`;

    const response = await this.client.post('', {
      model: OPENAI_CONFIG.model,
      messages: [
        { role: "system", content: "Tu es un expert en analyse de code." },
        { role: "user", content: prompt }
      ],
      ...OPENAI_CONFIG.defaultParams
    });

    return response.data.choices[0].message.content.trim();
  }
}

async function createIAFile(originalFilePath: string): Promise<void> {
  try {
    const cleanPath = originalFilePath.replace(/^file:\/\//, '');
    const workspaceRoot = workspace.root;
    const relativePath = path.relative(workspaceRoot, cleanPath);
    
    // Lire le contenu du fichier source
    const fileContent = await workspace.readFile(originalFilePath);
    
    // Analyser le code avec OpenAI
    const openAI = new OpenAIService(process.env.OPENAI_API_KEY || '');
    const analysis = await openAI.analyzeCode(fileContent.toString(), path.basename(relativePath));

    // Créer le chemin pour le fichier .ia
    const iaFilePath = path.join(
      workspaceRoot,
      path.dirname(relativePath),
      `${path.basename(relativePath)}.ia`
    );

    // Créer le fichier
    await workspace.createFile(iaFilePath, { 
      overwrite: true, 
      ignoreIfExists: false 
    });

    // Créer un WorkspaceEdit pour modifier le contenu du fichier
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

    // Appliquer les modifications
    await workspace.applyEdit(workspaceEdit);
    
    window.showInformationMessage(`Fichier IA créé: ${workspace.asRelativePath(iaFilePath)}`);
  } catch (error) {
    window.showErrorMessage(`Erreur lors de la création du fichier IA: ${error}`);
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
