"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const coc_nvim_1 = require("coc.nvim");
const path = __importStar(require("path"));
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
async function createIAFile(originalFilePath) {
    try {
        const parsedPath = path.parse(originalFilePath);
        const iaFilePath = path.join(parsedPath.dir, `${parsedPath.name}${parsedPath.ext}.ia`);
        // Créer le fichier .ia vide
        await coc_nvim_1.workspace.createFile(iaFilePath, { ignoreIfExists: true });
        console.info(`Fichier IA créé: ${iaFilePath}`);
    }
    catch (error) {
        console.error('Erreur lors de la création du fichier IA:', error);
    }
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
    // Ajouter l'écouteur d'événements pour la création des fichiers .ia
    context.subscriptions.push(coc_nvim_1.workspace.onDidOpenTextDocument(async (document) => {
        const filePath = document.uri;
        if (!filePath.endsWith('.ia')) { // Éviter la récursion
            await createIAFile(filePath);
        }
    }));
}
function deactivate() { }
//# sourceMappingURL=index.js.map