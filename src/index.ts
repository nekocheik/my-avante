import { ExtensionContext, Uri, window, workspace } from "coc.nvim";
import * as path from 'path';

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

async function createIAFile(originalFilePath: string): Promise<void> {
  try {
    const cleanPath = originalFilePath.replace(/^file:\/\//, '');
    
    const parsedPath = path.parse(cleanPath);
    const iaFilePath = path.join(
      parsedPath.dir,
      `${parsedPath.name}${parsedPath.ext}.ia`
    );

    await workspace.createFile(iaFilePath, { 
      overwrite: false, 
      ignoreIfExists: true 
    });
    
    window.showInformationMessage(`Fichier IA créé: ${iaFilePath}`);
  } catch (error) {
    window.showErrorMessage(`Erreur lors de la création du fichier IA: ${error}`);
  }
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
