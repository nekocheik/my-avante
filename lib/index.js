"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const coc_nvim_1 = require("coc.nvim");
async function activate(context) {
    coc_nvim_1.window.showMessage("Hello World from coc-hello-log!"); // Affiche dans la barre de commande
    console.info("Hello World from coc-hello-log! (log)"); // Affiche dans le fichier de log
}
function deactivate() { }
//# sourceMappingURL=index.js.map