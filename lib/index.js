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
const coc_nvim_1 = require("coc.nvim");
const dotenv_1 = __importDefault(require("dotenv"));
const https_1 = __importDefault(require("https"));
const path = __importStar(require("path"));
dotenv_1.default.config();
// Configuration OpenAI
const OPENAI_CONFIG = {
    baseURL: 'https://api.openai.com/v1/chat/completions',
    defaultParams: {
        max_tokens: 3000,
        temperature: 0.3,
    },
    model: 'gpt-4',
    timeout: 30000,
    httpsAgent: new https_1.default.Agent({ keepAlive: true })
};
class OpenAIService {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async makeRequest(data) {
        return new Promise((resolve, reject) => {
            const requestData = JSON.stringify(data);
            const options = {
                hostname: 'api.openai.com',
                path: '/v1/chat/completions',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Length': Buffer.byteLength(requestData)
                },
                timeout: OPENAI_CONFIG.timeout,
                agent: OPENAI_CONFIG.httpsAgent
            };
            const req = https_1.default.request(options, (res) => {
                let responseData = '';
                res.on('data', (chunk) => {
                    responseData += chunk;
                });
                res.on('end', () => {
                    var _a, _b, _c;
                    try {
                        const parsedData = JSON.parse(responseData);
                        if (!((_c = (_b = (_a = parsedData.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content)) {
                            reject(new Error('Format de réponse OpenAI invalide'));
                            return;
                        }
                        resolve(parsedData.choices[0].message.content.trim());
                    }
                    catch (error) {
                        reject(new Error(`Erreur de parsing: ${error}`));
                    }
                });
            });
            req.on('error', (error) => {
                reject(new Error(`Erreur API OpenAI: ${error.message}`));
            });
            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Délai d\'attente dépassé'));
            });
            req.write(requestData);
            req.end();
        });
    }
    async analyzeCode(fileContent, fileName) {
        try {
            coc_nvim_1.window.showInformationMessage('Début de l\'analyse du code...');
            const prompt = `Tu es un assistant IA expert en analyse de code. Ta tâche est de générer un fichier d'identité au format JSON pour le fichier suivant :

${fileContent}

Le fichier d'identité doit contenir :
- nom_fichier
- description
- interfaces
- types
- exports
- fonctions (avec nom, description détaillée, paramètres, retour)`;
            coc_nvim_1.window.showInformationMessage('Envoi de la requête à OpenAI...');
            const requestData = {
                model: OPENAI_CONFIG.model,
                messages: [
                    { role: "system", content: "Tu es un expert en analyse de code." },
                    { role: "user", content: prompt }
                ],
                max_tokens: OPENAI_CONFIG.defaultParams.max_tokens,
                temperature: OPENAI_CONFIG.defaultParams.temperature
            };
            const response = await this.makeRequest(requestData);
            coc_nvim_1.window.showInformationMessage('Réponse reçue d\'OpenAI');
            return response;
        }
        catch (error) {
            coc_nvim_1.window.showErrorMessage(`Erreur lors de l'analyse du code: ${error}`);
            throw error;
        }
    }
}
async function createIAFile(originalFilePath) {
    try {
        if (originalFilePath.endsWith('.ai')) {
            console.log('Tentative de création d\'un fichier .ai pour un fichier .ai ignorée');
            return;
        }
        console.log(`Début de la création du fichier IA pour: ${originalFilePath}`);
        const cleanPath = originalFilePath.replace(/^file:\/\//, '');
        const workspaceRoot = coc_nvim_1.workspace.root;
        const relativePath = path.relative(workspaceRoot, cleanPath);
        console.log('Lecture du fichier source...');
        const fileContent = await coc_nvim_1.workspace.readFile(originalFilePath);
        console.log('Initialisation du service OpenAI...');
        const openAI = new OpenAIService(process.env.OPENAI_API_KEY || '');
        console.log('Analyse du code en cours...');
        const analysis = await openAI.analyzeCode(fileContent.toString(), path.basename(relativePath));
        const aiFilePath = path.join(workspaceRoot, path.dirname(relativePath), `${path.basename(relativePath)}.ai`);
        // Vérification de l'existence du fichier en essayant de le lire
        try {
            await coc_nvim_1.workspace.readFile(aiFilePath);
            console.log(`Le fichier ${aiFilePath} existe déjà, mise à jour...`);
        }
        catch (e) {
            console.log(`Création d'un nouveau fichier: ${aiFilePath}`);
        }
        coc_nvim_1.window.showInformationMessage('Création du fichier IA...');
        await coc_nvim_1.workspace.createFile(aiFilePath, {
            overwrite: true,
            ignoreIfExists: false
        });
        coc_nvim_1.window.showInformationMessage('Application des modifications...');
        const workspaceEdit = {
            changes: {
                [aiFilePath]: [
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
        await coc_nvim_1.workspace.applyEdit(workspaceEdit);
        coc_nvim_1.window.showInformationMessage(`Fichier IA créé avec succès: ${coc_nvim_1.workspace.asRelativePath(aiFilePath)}`);
    }
    catch (error) {
        coc_nvim_1.window.showErrorMessage(`Erreur lors de la création du fichier IA: ${error}`);
        if (error instanceof Error) {
            coc_nvim_1.window.showErrorMessage(`Stack trace: ${error.stack}`);
        }
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
        '*.lock',
        '*.ai'
    ];
    const relativePath = coc_nvim_1.workspace.asRelativePath(uri);
    console.log(`Vérification du fichier: ${relativePath}`);
    const shouldIgnore = ignorePatterns.some(pattern => {
        const regexPattern = pattern
            .replace(/\*/g, '.*')
            .replace(/\./g, '\\.')
            .replace(/\*\*/g, '.*');
        return new RegExp(`^${regexPattern}$`).test(relativePath);
    });
    if (shouldIgnore) {
        console.log(`Fichier ignoré: ${relativePath}`);
    }
    return shouldIgnore;
}
async function activate(context) {
    try {
        console.log('Activation de l\'extension...');
        const files = await coc_nvim_1.workspace.findFiles('**/*', '{**/.git/**,**/node_modules/**,**/*.ai}');
        console.log('Scan du workspace...');
        files
            .filter(file => !shouldIgnoreFile(file))
            .forEach(file => {
            console.log(`Fichier éligible trouvé: ${coc_nvim_1.workspace.asRelativePath(file)}`);
        });
        context.subscriptions.push(coc_nvim_1.workspace.onDidOpenTextDocument(document => {
            if (!document)
                return;
            const uri = document.uri;
            if (typeof uri === 'string' && !uri.endsWith('.ai')) {
                console.log(`Document ouvert détecté: ${uri}`);
                createIAFile(uri).catch(error => {
                    console.error(`Erreur lors de la création du fichier AI: ${error}`);
                    coc_nvim_1.window.showErrorMessage(`Erreur: ${error}`);
                });
            }
            else {
                console.log('Document .ai ignoré');
            }
        }));
    }
    catch (error) {
        console.error(`Erreur lors du scan: ${error}`);
        coc_nvim_1.window.showErrorMessage(`Erreur lors du scan: ${error}`);
    }
}
function deactivate() { }
