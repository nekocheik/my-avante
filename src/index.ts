import { ExtensionContext, Uri, window, workspace } from "coc.nvim";

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

export async function activate(context: ExtensionContext): Promise<void> {
  try {
    // Utiliser les exclusions natives de coc.nvim
    const pattern = {
      '**/*': true,
      '**/node_modules/**': false,
      '**/.git/**': false
    } as any;

    const files = await workspace.findFiles(pattern);
    
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
}

export function deactivate(): void {}
