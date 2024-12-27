import { ExtensionContext, Uri, window, workspace } from "coc.nvim";
import * as path from 'path';

function shouldIgnoreFile(uri: Uri): boolean {
  // Patterns à ignorer
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

    // Créer le fichier .ia vide
    await workspace.createFile(iaFilePath, { ignoreIfExists: true });
    console.info(`Fichier IA créé: ${iaFilePath}`);
  } catch (error) {
    console.error('Erreur lors de la création du fichier IA:', error);
  }
}

export async function activate(context: ExtensionContext): Promise<void> {
  try {
    // Simplification du pattern pour workspace.findFiles
    const files = await workspace.findFiles('**/*', '{**/.git/**,**/node_modules/**}');
    
    console.info('Files in workspace:');
    files
      .filter(file => !shouldIgnoreFile(file))
      .forEach(file => {
        console.info(`- ${workspace.asRelativePath(file.fsPath)}`);
      });

    window.showMessage(`Scan du workspace terminé`);
  } catch (error) {
    console.error('Erreur lors de la recherche des fichiers:', error);
  }

  // Ajouter l'écouteur d'événements pour la création des fichiers .ia
  context.subscriptions.push(
    workspace.onDidOpenTextDocument(async document => {
      const filePath = document.uri;
      if (!filePath.endsWith('.ia')) {  // Éviter la récursion
        await createIAFile(filePath);
      }
    })
  );
}

export function deactivate(): void {}
