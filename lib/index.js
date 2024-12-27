"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const coc_nvim_1 = require("coc.nvim");
function shouldIgnoreFile(uri) {
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
    const relativePath = coc_nvim_1.workspace.asRelativePath(uri.fsPath);
    return ignorePatterns.some(pattern => {
        const regexPattern = pattern
            .replace(/\*/g, '.*')
            .replace(/\./g, '\\.')
            .replace(/\*\*/g, '.*');
        return new RegExp(`^${regexPattern}$`).test(relativePath);
    });
}
async function activate(context) {
    try {
        // Simplification du pattern pour workspace.findFiles
        const files = await coc_nvim_1.workspace.findFiles('**/*', '{**/.git/**,**/node_modules/**}');
        console.info('Files in workspace:');
        files
            .filter(file => !shouldIgnoreFile(file))
            .forEach(file => {
            console.info(`- ${coc_nvim_1.workspace.asRelativePath(file.fsPath)}`);
        });
        coc_nvim_1.window.showMessage(`Scan du workspace terminé`);
    }
    catch (error) {
        console.error('Erreur lors de la recherche des fichiers:', error);
    }
}
function deactivate() { }
//# sourceMappingURL=index.js.map