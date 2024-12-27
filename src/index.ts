import { ExtensionContext, window, workspace } from "coc.nvim";

export async function activate(context: ExtensionContext): Promise<void> {
  // Récupérer tous les fichiers du workspace
  const pattern = '**/*';
  try {
    const files = await workspace.findFiles(pattern);
    
    // Logger la liste des fichiers
    console.info('Files in workspace:');
    files.forEach(file => {
      console.info(`- ${file.fsPath}`);
    });

    // Optionnel : Afficher un message de confirmation
    window.showMessage(`Trouvé ${files.length} fichiers dans le workspace`);
  } catch (error) {
    console.error('Erreur lors de la recherche des fichiers:', error);
  }
}

export function deactivate(): void {}
