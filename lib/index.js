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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const axios_1 = __importDefault(require("axios"));
const coc_nvim_1 = require("coc.nvim");
const dotenv_1 = __importDefault(require("dotenv"));
const path = __importStar(require("path"));
dotenv_1.default.config();
// Configuration OpenAI
const OPENAI_CONFIG = {
    baseURL: 'https://api.openai.com/v1/chat/completions',
    defaultParams: {
        max_tokens: 3000,
        temperature: 0.3,
    },
    model: 'gpt-4-turbo-preview',
    timeout: 30000
};
class OpenAIService {
    constructor(apiKey) {
        this.client = axios_1.default.create({
            baseURL: OPENAI_CONFIG.baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            timeout: OPENAI_CONFIG.timeout
        });
    }
    async analyzeCode(fileContent, fileName) {
        const prompt = `Tu es un assistant IA expert en analyse de code. Ta tâche est de générer un fichier d'identité au format JSON pour le fichier suivant :

${fileContent}

Le fichier d'identité doit contenir :
- nom_fichier
- description
- fonctions (avec nom, description détaillée, paramètres, retour)
- droits
- proprietaire`;
        const response = await this.client.post('', {
            model: OPENAI_CONFIG.model,
            messages: [
                { role: "system", content: "Tu es un expert en analyse de code." },
                { role: "user", content: prompt }
            ],
            ...OPENAI_CONFIG.defaultParams
        });
        return response.data.choices[0].message.content.trim();
    }
}
async function createIAFile(originalFilePath) {
    try {
        const cleanPath = originalFilePath.replace(/^file:\/\//, '');
        const workspaceRoot = coc_nvim_1.workspace.root;
        const relativePath = path.relative(workspaceRoot, cleanPath);
        // Lire le contenu du fichier source
        const fileContent = await coc_nvim_1.workspace.readFile(originalFilePath);
        // Analyser le code avec OpenAI
        const openAI = new OpenAIService(process.env.OPENAI_API_KEY || '');
        const analysis = await openAI.analyzeCode(fileContent.toString(), path.basename(relativePath));
        // Créer le chemin pour le fichier .ia
        const iaFilePath = path.join(workspaceRoot, path.dirname(relativePath), `${path.basename(relativePath)}.ia`);
        // Créer le fichier
        await coc_nvim_1.workspace.createFile(iaFilePath, {
            overwrite: true,
            ignoreIfExists: false
        });
        // Créer un WorkspaceEdit pour modifier le contenu du fichier
        const workspaceEdit = {
            changes: {
                [iaFilePath]: [
                    {
                        range: {
                            start: { line: 0, character: 0 },
                            end: { line: 0, character: 0 }
                        },
                        newText: analysis
                    }
                ]
            }
        };
        // Appliquer les modifications
        await coc_nvim_1.workspace.applyEdit(workspaceEdit);
        coc_nvim_1.window.showInformationMessage(`Fichier IA créé: ${coc_nvim_1.workspace.asRelativePath(iaFilePath)}`);
    }
    catch (error) {
        coc_nvim_1.window.showErrorMessage(`Erreur lors de la création du fichier IA: ${error}`);
    }
}
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