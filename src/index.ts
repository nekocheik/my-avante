import { ExtensionContext, window } from "coc.nvim";

export async function activate(context: ExtensionContext): Promise<void> {
  window.showMessage("Hello World from coc-hello-log!"); // Affiche dans la barre de commande
  console.info("Hello World from coc-hello-log! (log)"); // Affiche dans le fichier de log
}

export function deactivate(): void {}
