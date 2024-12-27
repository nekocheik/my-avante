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
    const relativePath = coc_nvim_1.workspace.asRelativePath(uri);
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
        const cleanPath = originalFilePath.replace(/^file:\/\//, '');
        const workspaceRoot = coc_nvim_1.workspace.root;
        const relativePath = path.relative(workspaceRoot, cleanPath);
        const iaFilePath = path.join(workspaceRoot, path.dirname(relativePath), `${path.basename(relativePath)}.ia`);
        await coc_nvim_1.workspace.createFile(iaFilePath, {
            overwrite: false,
            ignoreIfExists: true
        });
        coc_nvim_1.window.showInformationMessage(`Fichier IA créé: ${coc_nvim_1.workspace.asRelativePath(iaFilePath)}`);
    }
    catch (error) {
        coc_nvim_1.window.showErrorMessage(`Erreur lors de la création du fichier IA: ${error}`);
    }
}
async function activate(context) {
    try {
        const files = await coc_nvim_1.workspace.findFiles('**/*', '{**/.git/**,**/node_modules/**}');
        coc_nvim_1.window.showInformationMessage('Scan du workspace...');
        files
            .filter(file => !shouldIgnoreFile(file))
            .forEach(file => {
            coc_nvim_1.window.showInformationMessage(`Fichier trouvé: ${coc_nvim_1.workspace.asRelativePath(file)}`);
        });
        context.subscriptions.push(coc_nvim_1.workspace.onDidOpenTextDocument(document => {
            if (!document)
                return;
            const uri = document.uri;
            if (typeof uri === 'string' && !uri.endsWith('.ia')) {
                createIAFile(uri).catch(error => {
                    coc_nvim_1.window.showErrorMessage(`Erreur: ${error}`);
                });
            }
        }));
    }
    catch (error) {
        coc_nvim_1.window.showErrorMessage(`Erreur lors du scan: ${error}`);
    }
}
function deactivate() { }
//# sourceMappingURL=index.js.map