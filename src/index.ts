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

  const relativePath = workspace.asRelativePath(uri.fsPath);
  
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
    const parsedPath = path.parse(originalFilePath);
    const iaFilePath = path.join(
      parsedPath.dir,
      `${parsedPath.name}${parsedPath.ext}.ia`
    );

    // Utiliser l'API correcte de workspace pour créer le fichier
    await workspace.createFile(iaFilePath, { ignoreIfExists: true });
    window.showInformationMessage(`Fichier IA créé: ${iaFilePath}`);
  } catch (error) {
    window.showErrorMessage(`Erreur lors de la création du fichier IA: ${error}`);
  }
}

export async function activate(context: ExtensionContext): Promise<void> {
  try {
    // Utiliser le bon format pour workspace.findFiles
    const files = await workspace.findFiles('**/*', '{**/.git/**,**/node_modules/**}');
    
    // Utiliser window.showInformationMessage au lieu de console.info
    window.showInformationMessage('Scan du workspace...');
    
    files
      .filter(file => !shouldIgnoreFile(file))
      .forEach(file => {
        window.showInformationMessage(`Fichier trouvé: ${workspace.asRelativePath(file.fsPath)}`);
      });

    // Ajouter l'écouteur d'événements pour la création des fichiers .ia
    context.subscriptions.push(
      workspace.onDidOpenTextDocument(document => {
        if (!document || !document.uri) return;
        
        const filePath = document.uri.fsPath;
        if (!filePath.endsWith('.ia')) {
          createIAFile(filePath).catch(error => {
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
