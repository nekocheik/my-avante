"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const coc_nvim_1 = require("coc.nvim");
async function activate(context) {
    // Récupérer tous les fichiers du workspace
    const pattern = '**/*';
    try {
        const files = await coc_nvim_1.workspace.findFiles(pattern);
        // Logger la liste des fichiers
        console.info('Files in workspace:');
        files.forEach(file => {
            console.info(`- ${file.fsPath}`);
        });
        // Optionnel : Afficher un message de confirmation
        coc_nvim_1.window.showMessage(`Trouvé ${files.length} fichiers dans le workspace`);
    }
    catch (error) {
        console.error('Erreur lors de la recherche des fichiers:', error);
    }
}
function deactivate() { }
//# sourceMappingURL=index.js.map