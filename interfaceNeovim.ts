declare module "coc.nvim" {
  import cp from "child_process";
  import { URL } from "url";

  export type DocumentUri = string;
  export namespace DocumentUri {
    function is(value: any): value is DocumentUri;
  }

  export type integer = number;
  export namespace integer {
    const MIN_VALUE = -2147483648;
    const MAX_VALUE = 2147483647;
    function is(value: any): value is integer;
  }
  
  export type uinteger = number;
  export namespace uinteger {
    const MIN_VALUE = 0;
    const MAX_VALUE = 2147483647;
    function is(value: any): value is uinteger;
  }
  
  export type decimal = number;
  
  export type LSPAny = any;
  export type LSPObject = object;
  export type LSPArray = any[];
  
  export interface Position {
    
    line: uinteger;
    
    character: uinteger;
  }
  
  export namespace Position {
    
    function create(line: uinteger, character: uinteger): Position;
    
    function is(value: any): value is Position;
  }
  
  export interface Range {
    
    start: Position;
    
    end: Position;
  }
  
  export namespace Range {
    
    function create(start: Position, end: Position): Range;
    
    function create(
      startLine: uinteger,
      startCharacter: uinteger,
      endLine: uinteger,
      endCharacter: uinteger
    ): Range;
    
    function is(value: any): value is Range;
  }
  
  export interface Location {
    uri: DocumentUri;
    range: Range;
  }
  
  export namespace Location {
    
    function create(uri: DocumentUri, range: Range): Location;
    
    function is(value: any): value is Location;
  }
  
  export interface LocationLink {
    
    originSelectionRange?: Range;
    
    targetUri: DocumentUri;
    
    targetRange: Range;
    
    targetSelectionRange: Range;
  }
  
  export namespace LocationLink {
    
    function create(
      targetUri: DocumentUri,
      targetRange: Range,
      targetSelectionRange: Range,
      originSelectionRange?: Range
    ): LocationLink;
    
    function is(value: any): value is LocationLink;
  }
  
  export interface Color {
    
    readonly red: decimal;
    
    readonly green: decimal;
    
    readonly blue: decimal;
    
    readonly alpha: decimal;
  }
  
  export namespace Color {
    
    function create(
      red: decimal,
      green: decimal,
      blue: decimal,
      alpha: decimal
    ): Color;
    
    function is(value: any): value is Color;
  }
  
  export interface ColorInformation {
    
    range: Range;
    
    color: Color;
  }
  
  export namespace ColorInformation {
    
    function create(range: Range, color: Color): ColorInformation;
    
    function is(value: any): value is ColorInformation;
  }
  export interface ColorPresentation {
    
    label: string;
    
    textEdit?: TextEdit;
    
    additionalTextEdits?: TextEdit[];
  }
  
  export namespace ColorPresentation {
    
    function create(
      label: string,
      textEdit?: TextEdit,
      additionalTextEdits?: TextEdit[]
    ): ColorPresentation;
    
    function is(value: any): value is ColorPresentation;
  }
  
  export namespace FoldingRangeKind {
    
    const Comment = "comment";
    
    const Imports = "imports";
    
    const Region = "region";
  }
  
  export type FoldingRangeKind = string;
  
  export interface FoldingRange {
    
    startLine: uinteger;
    
    startCharacter?: uinteger;
    
    endLine: uinteger;
    
    endCharacter?: uinteger;
    
    kind?: FoldingRangeKind;
    
    collapsedText?: string;
  }
  
  export namespace FoldingRange {
    
    function create(
      startLine: uinteger,
      endLine: uinteger,
      startCharacter?: uinteger,
      endCharacter?: uinteger,
      kind?: FoldingRangeKind,
      collapsedText?: string
    ): FoldingRange;
    
    function is(value: any): value is FoldingRange;
  }
  
  export interface DiagnosticRelatedInformation {
    
    location: Location;
    
    message: string;
  }
  
  export namespace DiagnosticRelatedInformation {
    
    function create(
      location: Location,
      message: string
    ): DiagnosticRelatedInformation;
    
    function is(value: any): value is DiagnosticRelatedInformation;
  }
  
  export namespace DiagnosticSeverity {
    
    const Error: 1;
    
    const Warning: 2;
    
    const Information: 3;
    
    const Hint: 4;
  }
  export type DiagnosticSeverity = 1 | 2 | 3 | 4;
  
  export namespace DiagnosticTag {
    
    const Unnecessary: 1;
    
    const Deprecated: 2;
  }
  export type DiagnosticTag = 1 | 2;
  
  export interface CodeDescription {
    
    href: string;
  }
  
  export namespace CodeDescription {
    function is(value: any): value is CodeDescription;
  }
  
  export interface Diagnostic {
    
    range: Range;
    
    severity?: DiagnosticSeverity;
    
    code?: integer | string;
    
    codeDescription?: CodeDescription;
    
    source?: string;
    
    message: string;
    
    tags?: DiagnosticTag[];
    
    relatedInformation?: DiagnosticRelatedInformation[];
    
    data?: LSPAny;
  }
  
  export namespace Diagnostic {
    
    function create(
      range: Range,
      message: string,
      severity?: DiagnosticSeverity,
      code?: integer | string,
      source?: string,
      relatedInformation?: DiagnosticRelatedInformation[]
    ): Diagnostic;
    
    function is(value: any): value is Diagnostic;
  }
  
  export interface Command {
    
    title: string;
    
    command: string;
    
    arguments?: LSPAny[];
  }
  
  export namespace Command {
    
    function create(title: string, command: string, ...args: any[]): Command;
    
    function is(value: any): value is Command;
  }
  
  export interface TextEdit {
    
    range: Range;
    
    newText: string;
  }
  
  export namespace TextEdit {
    
    function replace(range: Range, newText: string): TextEdit;
    
    function insert(position: Position, newText: string): TextEdit;
    
    function del(range: Range): TextEdit;
    function is(value: any): value is TextEdit;
  }
  
  export interface ChangeAnnotation {
    
    label: string;
    
    needsConfirmation?: boolean;
    
    description?: string;
  }
  export namespace ChangeAnnotation {
    function create(
      label: string,
      needsConfirmation?: boolean,
      description?: string
    ): ChangeAnnotation;
    function is(value: any): value is ChangeAnnotation;
  }
  export namespace ChangeAnnotationIdentifier {
    function is(value: any): value is ChangeAnnotationIdentifier;
  }
  
  export type ChangeAnnotationIdentifier = string;
  
  export interface AnnotatedTextEdit extends TextEdit {
    
    annotationId: ChangeAnnotationIdentifier;
  }
  export namespace AnnotatedTextEdit {
    
    function replace(
      range: Range,
      newText: string,
      annotation: ChangeAnnotationIdentifier
    ): AnnotatedTextEdit;
    
    function insert(
      position: Position,
      newText: string,
      annotation: ChangeAnnotationIdentifier
    ): AnnotatedTextEdit;
    
    function del(
      range: Range,
      annotation: ChangeAnnotationIdentifier
    ): AnnotatedTextEdit;
    function is(value: any): value is AnnotatedTextEdit;
  }
  
  export interface TextDocumentEdit {
    
    textDocument: OptionalVersionedTextDocumentIdentifier;
    
    edits: (TextEdit | AnnotatedTextEdit)[];
  }
  
  export namespace TextDocumentEdit {
    
    function create(
      textDocument: OptionalVersionedTextDocumentIdentifier,
      edits: (TextEdit | AnnotatedTextEdit)[]
    ): TextDocumentEdit;
    function is(value: any): value is TextDocumentEdit;
  }
  
  interface ResourceOperation {
    
    kind: string;
    
    annotationId?: ChangeAnnotationIdentifier;
  }
  
  export interface CreateFileOptions {
    
    overwrite?: boolean;
    
    ignoreIfExists?: boolean;
  }
  
  export interface CreateFile extends ResourceOperation {
    
    kind: "create";
    
    uri: DocumentUri;
    
    options?: CreateFileOptions;
  }
  export namespace CreateFile {
    function create(
      uri: DocumentUri,
      options?: CreateFileOptions,
      annotation?: ChangeAnnotationIdentifier
    ): CreateFile;
    function is(value: any): value is CreateFile;
  }
  
  export interface RenameFileOptions {
    
    overwrite?: boolean;
    
    ignoreIfExists?: boolean;
  }
  
  export interface RenameFile extends ResourceOperation {
    
    kind: "rename";
    
    oldUri: DocumentUri;
    
    newUri: DocumentUri;
    
    options?: RenameFileOptions;
  }
  export namespace RenameFile {
    function create(
      oldUri: DocumentUri,
      newUri: DocumentUri,
      options?: RenameFileOptions,
      annotation?: ChangeAnnotationIdentifier
    ): RenameFile;
    function is(value: any): value is RenameFile;
  }
  
  export interface DeleteFileOptions {
    
    recursive?: boolean;
    
    ignoreIfNotExists?: boolean;
  }
  
  export interface DeleteFile extends ResourceOperation {
    
    kind: "delete";
    
    uri: DocumentUri;
    
    options?: DeleteFileOptions;
  }
  export namespace DeleteFile {
    function create(
      uri: DocumentUri,
      options?: DeleteFileOptions,
      annotation?: ChangeAnnotationIdentifier
    ): DeleteFile;
    function is(value: any): value is DeleteFile;
  }
  
  export interface WorkspaceEdit {
    
    changes?: {
      [uri: DocumentUri]: TextEdit[];
    };
    
    documentChanges?: (
      | TextDocumentEdit
      | CreateFile
      | RenameFile
      | DeleteFile
    )[];
    
    changeAnnotations?: {
      [id: ChangeAnnotationIdentifier]: ChangeAnnotation;
    };
  }
  export namespace WorkspaceEdit {
    function is(value: any): value is WorkspaceEdit;
  }
  
  export interface TextEditChange {
    
    all(): (TextEdit | AnnotatedTextEdit)[];
    
    clear(): void;
    
    add(edit: TextEdit | AnnotatedTextEdit): void;
    
    insert(position: Position, newText: string): void;
    insert(
      position: Position,
      newText: string,
      annotation: ChangeAnnotation | ChangeAnnotationIdentifier
    ): ChangeAnnotationIdentifier;
    
    replace(range: Range, newText: string): void;
    replace(
      range: Range,
      newText: string,
      annotation?: ChangeAnnotation | ChangeAnnotationIdentifier
    ): ChangeAnnotationIdentifier;
    
    delete(range: Range): void;
    delete(
      range: Range,
      annotation?: ChangeAnnotation | ChangeAnnotationIdentifier
    ): ChangeAnnotationIdentifier;
  }
  
  export class WorkspaceChange {
    private _workspaceEdit;
    private _textEditChanges;
    private _changeAnnotations;
    constructor(workspaceEdit?: WorkspaceEdit);
    
    get edit(): WorkspaceEdit;
    
    getTextEditChange(
      textDocument: OptionalVersionedTextDocumentIdentifier
    ): TextEditChange;
    getTextEditChange(uri: DocumentUri): TextEditChange;
    private initDocumentChanges;
    private initChanges;
    createFile(uri: DocumentUri, options?: CreateFileOptions): void;
    createFile(
      uri: DocumentUri,
      annotation: ChangeAnnotation | ChangeAnnotationIdentifier,
      options?: CreateFileOptions
    ): ChangeAnnotationIdentifier;
    renameFile(
      oldUri: DocumentUri,
      newUri: DocumentUri,
      options?: RenameFileOptions
    ): void;
    renameFile(
      oldUri: DocumentUri,
      newUri: DocumentUri,
      annotation?: ChangeAnnotation | ChangeAnnotationIdentifier,
      options?: RenameFileOptions
    ): ChangeAnnotationIdentifier;
    deleteFile(uri: DocumentUri, options?: DeleteFileOptions): void;
    deleteFile(
      uri: DocumentUri,
      annotation: ChangeAnnotation | ChangeAnnotationIdentifier,
      options?: DeleteFileOptions
    ): ChangeAnnotationIdentifier;
  }
  
  export interface TextDocumentIdentifier {
    
    uri: DocumentUri;
  }
  
  export namespace TextDocumentIdentifier {
    
    function create(uri: DocumentUri): TextDocumentIdentifier;
    
    function is(value: any): value is TextDocumentIdentifier;
  }
  
  export interface VersionedTextDocumentIdentifier
    extends TextDocumentIdentifier {
    
    version: integer;
  }
  
  export namespace VersionedTextDocumentIdentifier {
    
    function create(
      uri: DocumentUri,
      version: integer
    ): VersionedTextDocumentIdentifier;
    
    function is(value: any): value is VersionedTextDocumentIdentifier;
  }
  
  export interface OptionalVersionedTextDocumentIdentifier
    extends TextDocumentIdentifier {
    
    version: integer | null;
  }
  
  export namespace OptionalVersionedTextDocumentIdentifier {
    
    function create(
      uri: DocumentUri,
      version: integer | null
    ): OptionalVersionedTextDocumentIdentifier;
    
    function is(value: any): value is OptionalVersionedTextDocumentIdentifier;
  }
  
  export interface TextDocumentItem {
    
    uri: DocumentUri;
    
    languageId: string;
    
    version: integer;
    
    text: string;
  }
  
  export namespace TextDocumentItem {
    
    function create(
      uri: DocumentUri,
      languageId: string,
      version: integer,
      text: string
    ): TextDocumentItem;
    
    function is(value: any): value is TextDocumentItem;
  }
  
  export namespace MarkupKind {
    
    const PlainText: "plaintext";
    
    const Markdown: "markdown";
    
    function is(value: any): value is MarkupKind;
  }
  export type MarkupKind = "plaintext" | "markdown";
  
  export interface MarkupContent {
    
    kind: MarkupKind;
    
    value: string;
  }
  export namespace MarkupContent {
    
    function is(value: any): value is MarkupContent;
  }
  
  export namespace CompletionItemKind {
    const Text: 1;
    const Method: 2;
    const Function: 3;
    const Constructor: 4;
    const Field: 5;
    const Variable: 6;
    const Class: 7;
    const Interface: 8;
    const Module: 9;
    const Property: 10;
    const Unit: 11;
    const Value: 12;
    const Enum: 13;
    const Keyword: 14;
    const Snippet: 15;
    const Color: 16;
    const File: 17;
    const Reference: 18;
    const Folder: 19;
    const EnumMember: 20;
    const Constant: 21;
    const Struct: 22;
    const Event: 23;
    const Operator: 24;
    const TypeParameter: 25;
  }
  export type CompletionItemKind =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25;
  
  export namespace InsertTextFormat {
    
    const PlainText: 1;
    
    const Snippet: 2;
  }
  export type InsertTextFormat = 1 | 2;
  
  export namespace CompletionItemTag {
    
    const Deprecated = 1;
  }
  export type CompletionItemTag = 1;
  
  export interface InsertReplaceEdit {
    
    newText: string;
    
    insert: Range;
    
    replace: Range;
  }
  
  export namespace InsertReplaceEdit {
    
    function create(
      newText: string,
      insert: Range,
      replace: Range
    ): InsertReplaceEdit;
    
    function is(
      value: TextEdit | InsertReplaceEdit
    ): value is InsertReplaceEdit;
  }
  
  export namespace InsertTextMode {
    
    const asIs: 1;
    
    const adjustIndentation: 2;
  }
  export type InsertTextMode = 1 | 2;
  
  export interface CompletionItemLabelDetails {
    
    detail?: string;
    
    description?: string;
  }
  export namespace CompletionItemLabelDetails {
    function is(value: any): value is CompletionItemLabelDetails;
  }
  
  export interface CompletionItem {
    
    label: string;
    
    labelDetails?: CompletionItemLabelDetails;
    
    kind?: CompletionItemKind;
    
    tags?: CompletionItemTag[];
    
    detail?: string;
    
    documentation?: string | MarkupContent;
    
    deprecated?: boolean;
    
    preselect?: boolean;
    
    sortText?: string;
    
    filterText?: string;
    
    insertText?: string;
    
    insertTextFormat?: InsertTextFormat;
    
    insertTextMode?: InsertTextMode;
    
    textEdit?: TextEdit | InsertReplaceEdit;
    
    textEditText?: string;
    
    additionalTextEdits?: TextEdit[];
    
    commitCharacters?: string[];
    
    command?: Command;
    
    data?: LSPAny;
  }
  
  export namespace CompletionItem {
    
    function create(label: string): CompletionItem;
  }
  
  export interface CompletionList {
    
    isIncomplete: boolean;
    
    itemDefaults?: {
      
      commitCharacters?: string[];
      
      editRange?:
        | Range
        | {
            insert: Range;
            replace: Range;
          };
      
      insertTextFormat?: InsertTextFormat;
      
      insertTextMode?: InsertTextMode;
      
      data?: LSPAny;
    };
    
    items: CompletionItem[];
  }
  
  export namespace CompletionList {
    
    function create(
      items?: CompletionItem[],
      isIncomplete?: boolean
    ): CompletionList;
  }
  
  export type MarkedString =
    | string
    | {
        language: string;
        value: string;
      };
  export namespace MarkedString {
    
    function fromPlainText(plainText: string): string;
    
    function is(value: any): value is MarkedString;
  }
  
  export interface Hover {
    
    contents: MarkupContent | MarkedString | MarkedString[];
    
    range?: Range;
  }
  export namespace Hover {
    
    function is(value: any): value is Hover;
  }
  
  export interface ParameterInformation {
    
    label: string | [uinteger, uinteger];
    
    documentation?: string | MarkupContent;
  }
  
  export namespace ParameterInformation {
    
    function create(
      label: string | [uinteger, uinteger],
      documentation?: string
    ): ParameterInformation;
  }
  
  export interface SignatureInformation {
    
    label: string;
    
    documentation?: string | MarkupContent;
    
    parameters?: ParameterInformation[];
    
    activeParameter?: uinteger;
  }
  
  export namespace SignatureInformation {
    function create(
      label: string,
      documentation?: string,
      ...parameters: ParameterInformation[]
    ): SignatureInformation;
  }
  
  export interface SignatureHelp {
    
    signatures: SignatureInformation[];
    
    activeSignature?: uinteger;
    
    activeParameter?: uinteger;
  }
  
  export type Definition = Location | Location[];
  
  export type DefinitionLink = LocationLink;
  
  export type Declaration = Location | Location[];
  
  export type DeclarationLink = LocationLink;
  
  export interface ReferenceContext {
    
    includeDeclaration: boolean;
  }
  
  export namespace DocumentHighlightKind {
    
    const Text: 1;
    
    const Read: 2;
    
    const Write: 3;
  }
  export type DocumentHighlightKind = 1 | 2 | 3;
  
  export interface DocumentHighlight {
    
    range: Range;
    
    kind?: DocumentHighlightKind;
  }
  
  export namespace DocumentHighlight {
    
    function create(
      range: Range,
      kind?: DocumentHighlightKind
    ): DocumentHighlight;
  }
  
  export namespace SymbolKind {
    const File: 1;
    const Module: 2;
    const Namespace: 3;
    const Package: 4;
    const Class: 5;
    const Method: 6;
    const Property: 7;
    const Field: 8;
    const Constructor: 9;
    const Enum: 10;
    const Interface: 11;
    const Function: 12;
    const Variable: 13;
    const Constant: 14;
    const String: 15;
    const Number: 16;
    const Boolean: 17;
    const Array: 18;
    const Object: 19;
    const Key: 20;
    const Null: 21;
    const EnumMember: 22;
    const Struct: 23;
    const Event: 24;
    const Operator: 25;
    const TypeParameter: 26;
  }
  export type SymbolKind =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26;
  
  export namespace SymbolTag {
    
    const Deprecated: 1;
  }
  export type SymbolTag = 1;
  
  export interface BaseSymbolInformation {
    
    name: string;
    
    kind: SymbolKind;
    
    tags?: SymbolTag[];
    
    containerName?: string;
  }
  
  export interface SymbolInformation extends BaseSymbolInformation {
    
    deprecated?: boolean;
    
    location: Location;
  }
  export namespace SymbolInformation {
    
    function create(
      name: string,
      kind: SymbolKind,
      range: Range,
      uri: DocumentUri,
      containerName?: string
    ): SymbolInformation;
  }
  
  export interface WorkspaceSymbol extends BaseSymbolInformation {
    
    location:
      | Location
      | {
          uri: DocumentUri;
        };
    
    data?: LSPAny;
  }
  export namespace WorkspaceSymbol {
    
    function create(
      name: string,
      kind: SymbolKind,
      uri: DocumentUri,
      range?: Range
    ): WorkspaceSymbol;
  }
  
  export interface DocumentSymbol {
    
    name: string;
    
    detail?: string;
    
    kind: SymbolKind;
    
    tags?: SymbolTag[];
    
    deprecated?: boolean;
    
    range: Range;
    
    selectionRange: Range;
    
    children?: DocumentSymbol[];
  }
  export namespace DocumentSymbol {
    
    function create(
      name: string,
      detail: string | undefined,
      kind: SymbolKind,
      range: Range,
      selectionRange: Range,
      children?: DocumentSymbol[]
    ): DocumentSymbol;
    
    function is(value: any): value is DocumentSymbol;
  }
  
  export type CodeActionKind = string;
  
  export namespace CodeActionKind {
    
    const Empty: "";
    
    const QuickFix: "quickfix";
    
    const Refactor: "refactor";
    
    const RefactorExtract: "refactor.extract";
    
    const RefactorInline: "refactor.inline";
    
    const RefactorRewrite: "refactor.rewrite";
    
    const Source: "source";
    
    const SourceOrganizeImports: "source.organizeImports";
    
    const SourceFixAll: "source.fixAll";
  }
  
  export namespace CodeActionTriggerKind {
    
    const Invoked: 1;
    
    const Automatic: 2;
  }
  export type CodeActionTriggerKind = 1 | 2;
  
  export interface CodeActionContext {
    
    diagnostics: Diagnostic[];
    
    only?: CodeActionKind[];
    
    triggerKind?: CodeActionTriggerKind;
  }
  
  export namespace CodeActionContext {
    
    function create(
      diagnostics: Diagnostic[],
      only?: CodeActionKind[],
      triggerKind?: CodeActionTriggerKind
    ): CodeActionContext;
    
    function is(value: any): value is CodeActionContext;
  }
  
  export interface CodeAction {
    
    title: string;
    
    kind?: CodeActionKind;
    
    diagnostics?: Diagnostic[];
    
    isPreferred?: boolean;
    
    disabled?: {
      
      reason: string;
    };
    
    edit?: WorkspaceEdit;
    
    command?: Command;
    
    data?: LSPAny;
  }
  export namespace CodeAction {
    
    function create(title: string, kind?: CodeActionKind): CodeAction;
    
    function create(
      title: string,
      command: Command,
      kind?: CodeActionKind
    ): CodeAction;
    
    function create(
      title: string,
      edit: WorkspaceEdit,
      kind?: CodeActionKind
    ): CodeAction;
    function is(value: any): value is CodeAction;
  }
  
  export interface CodeLens {
    
    range: Range;
    
    command?: Command;
    
    data?: LSPAny;
  }
  
  export namespace CodeLens {
    
    function create(range: Range, data?: LSPAny): CodeLens;
    
    function is(value: any): value is CodeLens;
  }
  
  export interface FormattingOptions {
    
    tabSize: uinteger;
    
    insertSpaces: boolean;
    
    trimTrailingWhitespace?: boolean;
    
    insertFinalNewline?: boolean;
    
    trimFinalNewlines?: boolean;
    
    [key: string]: boolean | integer | string | undefined;
  }
  
  export namespace FormattingOptions {
    
    function create(
      tabSize: uinteger,
      insertSpaces: boolean
    ): FormattingOptions;
    
    function is(value: any): value is FormattingOptions;
  }
  
  export interface DocumentLink {
    
    range: Range;
    
    target?: string;
    
    tooltip?: string;
    
    data?: LSPAny;
  }
  
  export namespace DocumentLink {
    
    function create(range: Range, target?: string, data?: LSPAny): DocumentLink;
    
    function is(value: any): value is DocumentLink;
  }
  
  export interface SelectionRange {
    
    range: Range;
    
    parent?: SelectionRange;
  }
  
  export namespace SelectionRange {
    
    function create(range: Range, parent?: SelectionRange): SelectionRange;
    function is(value: any): value is SelectionRange;
  }
  
  export interface CallHierarchyItem {
    
    name: string;
    
    kind: SymbolKind;
    
    tags?: SymbolTag[];
    
    detail?: string;
    
    uri: DocumentUri;
    
    range: Range;
    
    selectionRange: Range;
    
    data?: LSPAny;
  }
  
  export interface CallHierarchyIncomingCall {
    
    from: CallHierarchyItem;
    
    fromRanges: Range[];
  }
  
  export interface CallHierarchyOutgoingCall {
    
    to: CallHierarchyItem;
    
    fromRanges: Range[];
  }
  
  export enum SemanticTokenTypes {
    namespace = "namespace",
    
    type = "type",
    class = "class",
    enum = "enum",
    interface = "interface",
    struct = "struct",
    typeParameter = "typeParameter",
    parameter = "parameter",
    variable = "variable",
    property = "property",
    enumMember = "enumMember",
    event = "event",
    function = "function",
    method = "method",
    macro = "macro",
    keyword = "keyword",
    modifier = "modifier",
    comment = "comment",
    string = "string",
    number = "number",
    regexp = "regexp",
    operator = "operator",
    
    decorator = "decorator",
  }
  
  export enum SemanticTokenModifiers {
    declaration = "declaration",
    definition = "definition",
    readonly = "readonly",
    static = "static",
    deprecated = "deprecated",
    abstract = "abstract",
    async = "async",
    modification = "modification",
    documentation = "documentation",
    defaultLibrary = "defaultLibrary",
  }
  
  export interface SemanticTokensLegend {
    
    tokenTypes: string[];
    
    tokenModifiers: string[];
  }
  
  export interface SemanticTokens {
    
    resultId?: string;
    
    data: uinteger[];
  }
  
  export namespace SemanticTokens {
    function is(value: any): value is SemanticTokens;
  }
  
  export interface SemanticTokensEdit {
    
    start: uinteger;
    
    deleteCount: uinteger;
    
    data?: uinteger[];
  }
  
  export interface SemanticTokensDelta {
    readonly resultId?: string;
    
    edits: SemanticTokensEdit[];
  }
  
  export type TypeHierarchyItem = {
    
    name: string;
    
    kind: SymbolKind;
    
    tags?: SymbolTag[];
    
    detail?: string;
    
    uri: DocumentUri;
    
    range: Range;
    
    selectionRange: Range;
    
    data?: LSPAny;
  };

  export type InlineValueText = {
    
    range: Range;
    
    text: string;
  };
  
  export namespace InlineValueText {
    
    function create(range: Range, text: string): InlineValueText;
    function is(
      value: InlineValue | undefined | null
    ): value is InlineValueText;
  }
  
  export type InlineValueVariableLookup = {
    
    range: Range;
    
    variableName?: string;
    
    caseSensitiveLookup: boolean;
  };
  
  export namespace InlineValueVariableLookup {
    
    function create(
      range: Range,
      variableName: string | undefined,
      caseSensitiveLookup: boolean
    ): InlineValueVariableLookup;
    function is(
      value: InlineValue | undefined | null
    ): value is InlineValueVariableLookup;
  }
  
  export type InlineValueEvaluatableExpression = {
    
    range: Range;
    
    expression?: string;
  };
  
  export namespace InlineValueEvaluatableExpression {
    
    function create(
      range: Range,
      expression: string | undefined
    ): InlineValueEvaluatableExpression;
    function is(
      value: InlineValue | undefined | null
    ): value is InlineValueEvaluatableExpression;
  }
  
  export type InlineValue =
    | InlineValueText
    | InlineValueVariableLookup
    | InlineValueEvaluatableExpression;
  
  export type InlineValueContext = {
    
    frameId: integer;
    
    stoppedLocation: Range;
  };
  
  export namespace InlineValueContext {
    
    function create(
      frameId: integer,
      stoppedLocation: Range
    ): InlineValueContext;
    
    function is(value: any): value is InlineValueContext;
  }
  
  export namespace InlayHintKind {
    
    const Type = 1;
    
    const Parameter = 2;
    function is(value: number): value is InlayHintKind;
  }
  export type InlayHintKind = 1 | 2;
  
  export type InlayHintLabelPart = {
    
    value: string;
    
    tooltip?: string | MarkupContent;
    
    location?: Location;
    
    command?: Command;
  };
  export namespace InlayHintLabelPart {
    function create(value: string): InlayHintLabelPart;
    function is(value: any): value is InlayHintLabelPart;
  }
  
  export type InlayHint = {
    
    position: Position;
    
    label: string | InlayHintLabelPart[];
    
    kind?: InlayHintKind;
    
    textEdits?: TextEdit[];
    
    tooltip?: string | MarkupContent;
    
    paddingLeft?: boolean;
    
    paddingRight?: boolean;
    
    data?: LSPAny;
  };
  export namespace InlayHint {
    function create(
      position: Position,
      label: string | InlayHintLabelPart[],
      kind?: InlayHintKind
    ): InlayHint;
    function is(value: any): value is InlayHint;
  }
  
  export interface WorkspaceFolder {
    
    uri: string;
    
    name: string;
  }
  export namespace WorkspaceFolder {
    function is(value: any): value is WorkspaceFolder;
  }
  export const EOL: string[];
  
  export interface TextDocument {
    
    readonly uri: DocumentUri;
    
    readonly languageId: string;
    
    readonly version: integer;
    
    getText(range?: Range): string;
    
    positionAt(offset: uinteger): Position;
    
    offsetAt(position: Position): uinteger;
    
    readonly lineCount: uinteger;
  }

  export interface Thenable<T> {
    then<TResult>(
      onfulfilled?: (value: T) => TResult | Thenable<TResult>,
      onrejected?: (reason: any) => TResult | Thenable<TResult>
    ): Thenable<TResult>;
    
    then<TResult>(
      onfulfilled?: (value: T) => TResult | Thenable<TResult>,
      onrejected?: (reason: any) => void
    ): Thenable<TResult>;
  }

  export interface Disposable {
    
    dispose(): void;
  }

  export namespace Disposable {
    function create(func: () => void): Disposable;
  }

  export interface TextDocumentPositionParams {
    
    textDocument: TextDocumentIdentifier;
    
    position: Position;
  }

  export interface TextDocumentContentChange {
    
    range: Range;
    
    text: string;
  }

  export interface WorkspaceFoldersChangeEvent {
    
    added: WorkspaceFolder[];
    
    removed: WorkspaceFolder[];
  }

  export interface TextDocumentWillSaveEvent {
    
    document: LinesTextDocument;

    reason: 1 | 2 | 3;
  }

  export type DocumentFilter =
    | {
        
        language: string;
        
        scheme?: string;
        
        pattern?: string;
      }
    | {
        
        language?: string;
        
        scheme: string;
        
        pattern?: string;
      }
    | {
        
        language?: string;
        
        scheme?: string;
        
        pattern: string;
      };

  export type DocumentSelector = (string | DocumentFilter)[];

  export namespace SignatureHelpTriggerKind {
    
    const Invoked: 1;
    
    const TriggerCharacter: 2;
    
    const ContentChange: 3;
  }

  export type SignatureHelpTriggerKind = 1 | 2 | 3;

  export interface SignatureHelpContext {
    
    triggerKind: SignatureHelpTriggerKind;
    
    triggerCharacter?: string;
    
    isRetrigger: boolean;
    
    activeSignatureHelp?: SignatureHelp;
  }

  export namespace CompletionTriggerKind {
    
    const Invoked: 1;
    
    const TriggerCharacter: 2;
    
    const TriggerForIncompleteCompletions: 3;
  }

  export type CompletionTriggerKind = 1 | 2 | 3;

  export interface CompletionContext {
    
    triggerKind: CompletionTriggerKind;
    
    triggerCharacter?: string;

    option: CompleteOption;
  }

  export interface Event<T> {
    
    (
      listener: (e: T) => any,
      thisArgs?: any,
      disposables?: Disposable[]
    ): Disposable;
  }

  export namespace Event {
    const None: Event<any>;
  }

  export interface EmitterOptions {
    onFirstListenerAdd?: Function;
    onLastListenerRemove?: Function;
  }

  export class Emitter<T> {
    constructor(_options?: EmitterOptions | undefined);
    
    get event(): Event<T>;
    
    fire(event: T): any;
    dispose(): void;
  }

  export interface CancellationToken {
    
    readonly isCancellationRequested: boolean;
    
    readonly onCancellationRequested: Event<any>;
  }

  export namespace CancellationToken {
    const None: CancellationToken;
    const Cancelled: CancellationToken;
    function is(value: any): value is CancellationToken;
  }

  export class CancellationTokenSource {
    get token(): CancellationToken;
    cancel(): void;
    dispose(): void;
  }

  export interface TextLine {
    
    readonly lineNumber: number;

    readonly text: string;

    readonly range: Range;

    readonly rangeIncludingLineBreak: Range;

    readonly firstNonWhitespaceCharacterIndex: number;

    readonly isEmptyOrWhitespace: boolean;
  }

  export interface LinesTextDocument extends TextDocument {
    
    readonly length: number;
    
    readonly end: Position;
    
    readonly eol: boolean;
    
    readonly lines: ReadonlyArray<string>;
    
    lineAt(lineOrPos: number | Position): TextLine;
  }

  export interface LinkedEditingRanges {
    
    ranges: Range[];
    
    wordPattern?: string;
  }

  export namespace UniquenessLevel {
    
    export const document = "document";

    export const project = "project";

    export const group = "group";

    export const scheme = "scheme";

    export const global = "global";
  }

  export type UniquenessLevel =
    | "document"
    | "project"
    | "group"
    | "scheme"
    | "global";

  export enum MonikerKind {
    
    import = "import",

    export = "export",

    local = "local",
  }

  export interface Moniker {
    
    scheme: string;

    identifier: string;

    unique: UniquenessLevel;

    kind?: MonikerKind;
  }

  export type PreviousResultId = {
    
    uri: string;
    
    value: string;
  };

  export type DocumentDiagnosticReportKind = "full" | "unchanged";

  export namespace DocumentDiagnosticReportKind {
    
    const Full = "full";
    
    const Unchanged = "unchanged";
  }
  
  export type FullDocumentDiagnosticReport = {
    
    kind: typeof DocumentDiagnosticReportKind.Full;
    
    resultId?: string;
    
    items: Diagnostic[];
  };

  export type UnchangedDocumentDiagnosticReport = {
    
    kind: typeof DocumentDiagnosticReportKind.Unchanged;
    
    resultId: string;
  };

  export type RelatedUnchangedDocumentDiagnosticReport =
    UnchangedDocumentDiagnosticReport & {
      
      relatedDocuments?: {
        [uri: string]:
          | FullDocumentDiagnosticReport
          | UnchangedDocumentDiagnosticReport;
      };
    };

  export type RelatedFullDocumentDiagnosticReport =
    FullDocumentDiagnosticReport & {
      
      relatedDocuments?: {
        [uri: string]:
          | FullDocumentDiagnosticReport
          | UnchangedDocumentDiagnosticReport;
      };
    };
  export type DocumentDiagnosticReport =
    | RelatedFullDocumentDiagnosticReport
    | RelatedUnchangedDocumentDiagnosticReport;

  /*
   * A workspace diagnostic report.
   *
   * @since 3.17.0
   */
  export type WorkspaceDiagnosticReport = {
    items: WorkspaceDocumentDiagnosticReport[];
  };
  
  export type WorkspaceDiagnosticReportPartialResult = {
    items: WorkspaceDocumentDiagnosticReport[];
  };

  export type WorkspaceFullDocumentDiagnosticReport =
    FullDocumentDiagnosticReport & {
      
      uri: string;
      
      version: number | null;
    };

  export type WorkspaceUnchangedDocumentDiagnosticReport =
    UnchangedDocumentDiagnosticReport & {
      
      uri: string;
      
      version: number | null;
    };

  export type WorkspaceDocumentDiagnosticReport =
    | WorkspaceFullDocumentDiagnosticReport
    | WorkspaceUnchangedDocumentDiagnosticReport;

  export interface ResultReporter {
    (chunk: WorkspaceDiagnosticReportPartialResult | null): void;
  }

  export type ErrorCodes = number;

  export namespace ErrorCodes {
    const ParseError: -32700;
    const InvalidRequest: -32600;
    const MethodNotFound: -32601;
    const InvalidParams: -32602;
    const InternalError: -32603;
    
    const jsonrpcReservedErrorRangeStart: -32099;
    
    const serverErrorStart: -32099;
    
    const MessageWriteError: -32099;
    
    const MessageReadError: -32098;
    
    const PendingResponseRejected: -32097;
    
    const ConnectionInactive: -32096;
    
    const ServerNotInitialized: -32002;
    const UnknownErrorCode: -32001;
    
    const jsonrpcReservedErrorRangeEnd: -32000;
    
    const serverErrorEnd: -32000;
  }

  export interface ResponseErrorLiteral<D = void> {
    
    code: number;
    
    message: string;
    
    data?: D;
  }

  export class ResponseError<D = void> extends Error {
    readonly code: number;
    readonly data: D | undefined;
    constructor(code: number, message: string, data?: D);
    toJson(): ResponseErrorLiteral<D>;
  }

  export interface Message {
    jsonrpc: string;
  }

  export interface AbstractCancellationTokenSource extends Disposable {
    token: CancellationToken;
    cancel(): void;
  }

  export interface ResponseMessage extends Message {
    
    id: number | string | null;
    
    result?: string | number | boolean | object | any[] | null;
    
    error?: ResponseErrorLiteral<any>;
  }

  type VimValue = number | boolean | string | number[] | { [key: string]: any };

  export interface VimClientInfo {
    name: string;
    version: {
      major?: number;
      minor?: number;
      patch?: number;
      prerelease?: string;
      commit?: string;
    };
    type: "remote" | "embedder" | "host";
    methods?: {
      [index: string]: any;
    };
    attributes?: {
      [index: string]: any;
    };
  }

  export interface UiAttachOptions {
    rgb?: boolean;
    ext_popupmenu?: boolean;
    ext_tabline?: boolean;
    ext_wildmenu?: boolean;
    ext_cmdline?: boolean;
    ext_linegrid?: boolean;
    ext_hlstate?: boolean;
  }

  export interface ChanInfo {
    id: number;
    stream: "stdio" | "stderr" | "socket" | "job";
    mode: "bytes" | "terminal" | "rpc";
    pty?: number;
    buffer?: number;
    client?: VimClientInfo;
  }

  export interface VimCommandDescription {
    name: string;
    bang: boolean;
    bar: boolean;
    register: boolean;
    definition: string;
    count?: number | null;
    script_id: number;
    complete?: string;
    nargs?: string;
    range?: string;
    complete_arg?: string;
  }

  export interface NvimFloatOptions {
    standalone?: boolean;
    focusable?: boolean;
    relative?: "editor" | "cursor" | "win" | "mouse";
    anchor?: "NW" | "NE" | "SW" | "SE";
    border?:
      | "none"
      | "single"
      | "double"
      | "rounded"
      | "solid"
      | "shadow"
      | string[];
    style?: "minimal";
    title?: string;
    title_pos?: "left" | "center" | "right";
    footer?: string | [string, string][];
    footer_pos?: "left" | "center" | "right";
    noautocmd?: boolean;
    fixed?: boolean;
    hide?: boolean;
    height: number;
    width: number;
    row: number;
    col: number;
  }

  export interface ExtmarkOptions {
    id?: number;
    
    end_line?: number;
    
    end_col?: number;
    
    hl_group?: string;
    hl_mode?: "replace" | "combine" | "blend";
    hl_eol?: boolean;
    
    virt_text?: [string, string | string[]][];
    virt_text_pos?: "eol" | "overlay" | "right_align" | "inline";
    virt_text_win_col?: number;
    virt_text_hide?: boolean;
    virt_lines?: [string, string | string[]][][];
    virt_lines_above?: boolean;
    virt_lines_leftcol?: boolean;
    right_gravity?: boolean;
    end_right_gravity?: boolean;
    priority?: number;
  }

  export interface ExtmarkDetails {
    end_col: number;
    end_row: number;
    priority: number;
    hl_group?: string;
    virt_text?: [string, string][];
    virt_lines?: [string, string | string][][];
  }

  export interface NvimProc {
    ppid: number;
    name: string;
    pid: number;
  }

  export interface SignPlaceOption {
    id?: number;
    group?: string;
    name: string;
    lnum: number;
    priority?: number;
  }

  export interface SignUnplaceOption {
    group?: string;
    id?: number;
  }

  export interface SignPlacedOption {
    
    group?: string;
    id?: number;
    lnum?: number;
  }

  export interface SignItem {
    group: string;
    id: number;
    lnum: number;
    name: string;
    priority: number;
  }

  export interface HighlightItem {
    hlGroup: string;
    
    lnum: number;
    
    colStart: number;
    
    colEnd: number;
  }

  export interface ExtendedHighlightItem extends HighlightItem {
    combine?: boolean;
    start_incl?: boolean;
    end_incl?: boolean;
  }

  export interface HighlightOption {
    
    start?: number;
    
    end?: number;
    
    priority?: number;
    
    changedtick?: number;
  }

  export interface BufferKeymapOption {
    desc?: string;
    noremap?: boolean;
    nowait?: boolean;
    silent?: boolean;
    script?: boolean;
    expr?: boolean;
    unique?: boolean;
  }

  export interface BufferHighlight {
    
    hlGroup?: string;
    
    srcId?: number;
    
    line?: number;
    
    colStart?: number;
    
    colEnd?: number;
  }

  export interface BufferClearHighlight {
    srcId?: number;
    lineStart?: number;
    lineEnd?: number;
  }

  export interface VirtualTextOption {
    
    col?: number;
    
    hl_mode?: "combine" | "replace" | "blend";
    
    virt_text_win_col?: number;
    
    text_align?: "after" | "right" | "below";
    
    text_wrap?: "wrap" | "truncate";
  }

  interface BaseApi<T> {
    
    id: number;

    equals(other: T): boolean;

    request(name: string, args?: VimValue[]): Promise<any>;

    notify(name: string, args?: VimValue[]): void;

    getVar(name: string): Promise<VimValue | null>;

    setVar(name: string, value: VimValue): Promise<void>;

    setVar(name: string, value: VimValue, isNotify: true): void;

    deleteVar(name: string): void;

    getOption(name: string): Promise<VimValue>;

    setOption(name: string, value: VimValue): Promise<void>;

    setOption(name: string, value: VimValue, isNotify: true): void;
  }

  export const nvim: Neovim;

  export interface Neovim extends BaseApi<Neovim> {
    
    echoError(msg: unknown): void;

    hasFunction(name: string): boolean;

    channelId: Promise<number>;

    createBuffer(id: number): Buffer;

    createWindow(id: number): Window;

    createTabpage(id: number): Tabpage;

    pauseNotification(): void;

    resumeNotification(
      redrawVim?: boolean
    ): Promise<[VimValue[], [string, number, string] | null]>;

    resumeNotification(redrawVim: boolean, notify: true): void;

    redrawVim(): void;

    buffers: Promise<Buffer[]>;

    buffer: Promise<Buffer>;

    setBuffer(buffer: Buffer): Promise<void>;

    tabpages: Promise<Tabpage[]>;

    tabpage: Promise<Tabpage>;

    setTabpage(tabpage: Tabpage): Promise<void>;

    windows: Promise<Window[]>;

    window: Promise<Window>;

    setWindow(window: Window): Promise<void>;

    chans: Promise<ChanInfo[]>;

    getChanInfo(id: number): Promise<ChanInfo>;

    createNamespace(name?: string): Promise<number>;

    namespaces: Promise<{ [name: string]: number }>;

    getCommands(opt?: {
      builtin: boolean;
    }): Promise<{ [name: string]: VimCommandDescription }>;

    runtimePaths: Promise<string[]>;

    setDirectory(dir: string): Promise<void>;

    line: Promise<string>;

    createNewBuffer(listed?: boolean, scratch?: boolean): Promise<Buffer>;

    openFloatWindow(
      buffer: Buffer,
      enter: boolean,
      options: NvimFloatOptions
    ): Promise<Window>;

    setLine(line: string): Promise<void>;

    getKeymap(mode: string): Promise<object[]>;

    mode: Promise<{ mode: string; blocking: boolean }>;

    colorMap(): Promise<{ [name: string]: number }>;

    getColorByName(name: string): Promise<number>;

    getHighlight(nameOrId: string | number, isRgb?: boolean): Promise<object>;

    getHighlightByName(name: string, isRgb?: boolean): Promise<object>;

    getHighlightById(id: number, isRgb?: boolean): Promise<object>;

    deleteCurrentLine(): Promise<void>;

    eval(expr: string): Promise<VimValue>;

    lua(code: string, args?: VimValue[]): Promise<object>;

    callDictFunction(
      dict: object | string,
      fname: string,
      args: VimValue | VimValue[]
    ): Promise<object>;

    call(fname: string, args?: VimValue | VimValue[]): Promise<any>;

    call(fname: string, args: VimValue | VimValue[], isNotify: true): void;

    callTimer(fname: string, args?: VimValue | VimValue[]): Promise<void>;

    callTimer(fname: string, args: VimValue | VimValue[], isNotify: true): void;

    callAsync(fname: string, args?: VimValue | VimValue[]): Promise<unknown>;

    callAtomic(calls: [string, VimValue[]][]): Promise<[any[], any[] | null]>;

    command(arg: string): Promise<void>;

    command(arg: string, isNotify: true): void;

    commandOutput(arg: string): Promise<string>;

    exec(src: string, output?: boolean): Promise<string>;

    getVvar(name: string): Promise<VimValue>;

    feedKeys(keys: string, mode: string, escapeCsi: boolean): Promise<void>;

    setKeymap(
      mode: string,
      lhs: string,
      rhs: string,
      opts?: BufferKeymapOption
    ): void;

    deleteKeymap(mode: string, lhs: string): void;

    input(keys: string): Promise<number>;

    parseExpression(
      expr: string,
      flags: string,
      highlight: boolean
    ): Promise<object>;

    getProc(pid: number): Promise<NvimProc>;

    getProcChildren(pid: number): Promise<NvimProc[]>;

    replaceTermcodes(
      str: string,
      fromPart: boolean,
      doIt: boolean,
      special: boolean
    ): Promise<string>;

    strWidth(str: string): Promise<number>;

    uis: Promise<any[]>;

    subscribe(event: string): Promise<void>;

    unsubscribe(event: string): Promise<void>;

    quit(): Promise<void>;
  }

  export interface Buffer extends BaseApi<Buffer> {
    id: number;

    length: Promise<number>;

    lines: Promise<string[]>;

    changedtick: Promise<number>;

    setKeymap(
      mode: string,
      lhs: string,
      rhs: string,
      opts?: BufferKeymapOption
    ): void;

    deleteKeymap(mode: string, lhs: string): void;

    deleteExtMark(ns_id: number, id: number): void;

    getExtMarkById(
      ns_id: number,
      id: number,
      opts?: {
        details?: boolean;
      }
    ): Promise<[] | [number, number] | [number, number, ExtmarkDetails]>;

    getExtMarks(
      ns_id: number,
      start: [number, number] | number,
      end: [number, number] | number,
      opts?: {
        details?: boolean;
        limit?: number;
      }
    ): Promise<[number, number, number, ExtmarkDetails?][]>;

    setExtMark(
      ns_id: number,
      line: number,
      col: number,
      opts?: ExtmarkOptions
    ): void;

    placeSign(sign: SignPlaceOption): void;

    unplaceSign(opts: SignUnplaceOption): void;

    getSigns(opts: SignPlacedOption): Promise<SignItem[]>;

    getHighlights(
      ns: string,
      start?: number,
      end?: number
    ): Promise<HighlightItem[]>;

    updateHighlights(
      ns: string,
      highlights: ExtendedHighlightItem[],
      opts?: HighlightOption
    ): void;

    getCommands(options?: {}): Promise<Object>;

    getLines(opts?: {
      start: number;
      end: number;
      strictIndexing?: boolean;
    }): Promise<string[]>;

    setLines(
      lines: string[],
      opts?: { start: number; end: number; strictIndexing?: boolean }
    ): Promise<void>;

    setLines(
      lines: string[],
      opts: { start: number; end: number; strictIndexing?: boolean },
      isNotify: true
    ): void;

    setVirtualText(
      src_id: number,
      line: number,
      chunks: [string, string][],
      opts?: VirtualTextOption
    ): void;

    append(lines: string[] | string): Promise<void>;

    name: Promise<string>;

    setName(name: string): Promise<void>;

    valid: Promise<boolean>;

    mark(name: string): Promise<[number, number]>;

    getKeymap(mode: string): Promise<object[]>;

    loaded: Promise<boolean>;

    getOffset(index: number): Promise<number>;

    addHighlight(opts: BufferHighlight): Promise<number | null>;

    clearHighlight(args?: BufferClearHighlight);

    highlightRanges(
      srcId: string | number,
      hlGroup: string,
      ranges: Range[]
    ): void;

    clearNamespace(key: number | string, lineStart?: number, lineEnd?: number);
  }

  export interface Window extends BaseApi<Window> {
    
    id: number;

    buffer: Promise<Buffer>;

    tabpage: Promise<Tabpage>;

    cursor: Promise<[number, number]>;

    height: Promise<number>;

    width: Promise<number>;

    setCursor(pos: [number, number]): Promise<void>;

    setCursor(pos: [number, number], isNotify: true): void;

    setHeight(height: number): Promise<void>;

    setHeight(height: number, isNotify: true): void;

    setWidth(width: number): Promise<void>;

    setWidth(width: number, isNotify: true): void;

    position: Promise<[number, number]>;

    row: Promise<number>;

    col: Promise<number>;

    valid: Promise<boolean>;

    number: Promise<number>;

    setConfig(options: NvimFloatOptions): Promise<void>;

    setConfig(options: NvimFloatOptions, isNotify: true): void;

    getConfig(): Promise<NvimFloatOptions>;

    close(force: boolean): Promise<void>;

    close(force: boolean, isNotify: true): void;

    highlightRanges(
      hlGroup: string,
      ranges: Range[],
      priority?: number
    ): Promise<number[]>;

    highlightRanges(
      hlGroup: string,
      ranges: Range[],
      priority: number,
      isNotify: true
    ): void;

    clearMatchGroup(hlGroup: string): void;

    clearMatches(ids: number[]): void;
  }

  export interface Tabpage extends BaseApi<Tabpage> {
    
    number: Promise<number>;

    valid: Promise<boolean>;

    windows: Promise<Window[]>;

    window: Promise<Window>;
  }

  export interface UriComponents {
    scheme: string;
    authority: string;
    path: string;
    query: string;
    fragment: string;
  }
  
  export class Uri implements UriComponents {
    static isUri(thing: any): thing is Uri;
    
    readonly scheme: string;
    
    readonly authority: string;
    
    readonly path: string;
    
    readonly query: string;
    
    readonly fragment: string;
    
    protected constructor(
      scheme: string,
      authority?: string,
      path?: string,
      query?: string,
      fragment?: string,
      _strict?: boolean
    );
    
    protected constructor(components: UriComponents);
    
    readonly fsPath: string;
    with(change: {
      scheme?: string;
      authority?: string | null;
      path?: string | null;
      query?: string | null;
      fragment?: string | null;
    }): Uri;
    
    static parse(value: string, _strict?: boolean): Uri;
    
    static file(path: string): Uri;
    static from(components: {
      scheme: string;
      authority?: string;
      path?: string;
      query?: string;
      fragment?: string;
    }): Uri;
    
    toString(skipEncoding?: boolean): string;
    toJSON(): UriComponents;
  }

  export interface VimCompleteItem {
    word: string;
    abbr?: string;
    menu?: string;
    
    info?: string;
    kind?: string;
    icase?: number;
    equal?: number;
    dup?: number;
    empty?: number;
    user_data?: string;
    
    deprecated?: boolean;
    
    labelDetails?: CompletionItemLabelDetails;
    
    sortText?: string;
    
    filterText?: string;
    
    insertText?: string;
    
    isSnippet?: boolean;
    
    documentation?: Documentation[];
  }

  export interface CompleteDoneItem {
    readonly word: string;
    readonly abbr?: string;
    readonly source: string;
    readonly isSnippet: boolean;
    readonly kind?: string;
    readonly menu?: string;
    readonly user_data?: string;
  }

  export interface LocationListItem {
    bufnr: number;
    lnum: number;
    end_lnum: number;
    col: number;
    end_col: number;
    text: string;
    type: string;
  }

  export interface QuickfixItem {
    uri?: string;
    module?: string;
    range?: Range;
    text?: string;
    type?: string;
    filename?: string;
    bufnr?: number;
    lnum?: number;
    end_lnum?: number;
    col?: number;
    end_col?: number;
    valid?: boolean;
    nr?: number;
  }

  export type ProviderResult<T> =
    | T
    | undefined
    | null
    | Thenable<T | undefined | null>;

  export enum ProviderName {
    FormatOnType = "formatOnType",
    Rename = "rename",
    OnTypeEdit = "onTypeEdit",
    DocumentLink = "documentLink",
    DocumentColor = "documentColor",
    FoldingRange = "foldingRange",
    Format = "format",
    CodeAction = "codeAction",
    FormatRange = "formatRange",
    Hover = "hover",
    Signature = "signature",
    WorkspaceSymbols = "workspaceSymbols",
    DocumentSymbol = "documentSymbol",
    DocumentHighlight = "documentHighlight",
    Definition = "definition",
    Declaration = "declaration",
    TypeDefinition = "typeDefinition",
    Reference = "reference",
    Implementation = "implementation",
    CodeLens = "codeLens",
    SelectionRange = "selectionRange",
    CallHierarchy = "callHierarchy",
    SemanticTokens = "semanticTokens",
    SemanticTokensRange = "semanticTokensRange",
    LinkedEditing = "linkedEditing",
    InlayHint = "inlayHint",
    InlineValue = "inlineValue",
    TypeHierarchy = "typeHierarchy",
  }

  export interface CompletionItemProvider {
    
    provideCompletionItems(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      context?: CompletionContext
    ): ProviderResult<CompletionItem[] | CompletionList>;

    resolveCompletionItem?(
      item: CompletionItem,
      token: CancellationToken
    ): ProviderResult<CompletionItem>;
  }

  export interface HoverProvider {
    
    provideHover(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Hover>;
  }

  export interface DefinitionProvider {
    
    provideDefinition(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Definition | DefinitionLink[]>;
  }

  export interface DeclarationProvider {
    
    provideDeclaration(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Definition | DefinitionLink[]>;
  }

  export interface SignatureHelpProvider {
    
    provideSignatureHelp(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      context: SignatureHelpContext
    ): ProviderResult<SignatureHelp>;
  }

  export interface TypeDefinitionProvider {
    
    provideTypeDefinition(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Definition | DefinitionLink[]>;
  }

  export interface ReferenceProvider {
    
    provideReferences(
      document: LinesTextDocument,
      position: Position,
      context: ReferenceContext,
      token: CancellationToken
    ): ProviderResult<Location[]>;
  }

  export interface FoldingContext {}

  export interface FoldingRangeProvider {
    
    provideFoldingRanges(
      document: LinesTextDocument,
      context: FoldingContext,
      token: CancellationToken
    ): ProviderResult<FoldingRange[]>;
  }

  export interface DocumentSymbolProvider {
    
    provideDocumentSymbols(
      document: LinesTextDocument,
      token: CancellationToken
    ): ProviderResult<SymbolInformation[] | DocumentSymbol[]>;
  }

  export interface ImplementationProvider {
    
    provideImplementation(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Definition | DefinitionLink[]>;
  }

  export interface WorkspaceSymbolProvider {
    
    provideWorkspaceSymbols(
      query: string,
      token: CancellationToken
    ): ProviderResult<WorkspaceSymbol[]>;

    resolveWorkspaceSymbol?(
      symbol: WorkspaceSymbol,
      token: CancellationToken
    ): ProviderResult<WorkspaceSymbol>;
  }

  export interface RenameProvider {
    
    provideRenameEdits(
      document: LinesTextDocument,
      position: Position,
      newName: string,
      token: CancellationToken
    ): ProviderResult<WorkspaceEdit>;

    prepareRename?(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Range | { range: Range; placeholder: string }>;
  }

  export interface DocumentFormattingEditProvider {
    
    provideDocumentFormattingEdits(
      document: LinesTextDocument,
      options: FormattingOptions,
      token: CancellationToken
    ): ProviderResult<TextEdit[]>;
  }

  export interface DocumentRangeFormattingEditProvider {
    
    provideDocumentRangeFormattingEdits(
      document: LinesTextDocument,
      range: Range,
      options: FormattingOptions,
      token: CancellationToken
    ): ProviderResult<TextEdit[]>;
  }

  export interface CodeActionProvider<T extends CodeAction = CodeAction> {
    
    provideCodeActions(
      document: LinesTextDocument,
      range: Range,
      context: CodeActionContext,
      token: CancellationToken
    ): ProviderResult<(Command | CodeAction)[]>;

    resolveCodeAction?(
      codeAction: T,
      token: CancellationToken
    ): ProviderResult<T>;
  }

  export interface CodeActionProviderMetadata {
    
    readonly providedCodeActionKinds?: ReadonlyArray<string>;
  }

  export interface DocumentHighlightProvider {
    
    provideDocumentHighlights(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<DocumentHighlight[]>;
  }

  export interface DocumentLinkProvider {
    
    provideDocumentLinks(
      document: LinesTextDocument,
      token: CancellationToken
    ): ProviderResult<DocumentLink[]>;

    resolveDocumentLink?(
      link: DocumentLink,
      token: CancellationToken
    ): ProviderResult<DocumentLink>;
  }

  export interface CodeLensProvider {
    
    provideCodeLenses(
      document: LinesTextDocument,
      token: CancellationToken
    ): ProviderResult<CodeLens[]>;

    resolveCodeLens?(
      codeLens: CodeLens,
      token: CancellationToken
    ): ProviderResult<CodeLens>;
  }

  export interface OnTypeFormattingEditProvider {
    
    provideOnTypeFormattingEdits(
      document: LinesTextDocument,
      position: Position,
      ch: string,
      options: FormattingOptions,
      token: CancellationToken
    ): ProviderResult<TextEdit[]>;
  }

  export interface DocumentColorProvider {
    
    provideDocumentColors(
      document: LinesTextDocument,
      token: CancellationToken
    ): ProviderResult<ColorInformation[]>;

    provideColorPresentations(
      color: Color,
      context: { document: LinesTextDocument; range: Range },
      token: CancellationToken
    ): ProviderResult<ColorPresentation[]>;
  }

  export interface TextDocumentContentProvider {
    
    onDidChange?: Event<Uri>;

    provideTextDocumentContent(
      uri: Uri,
      token: CancellationToken
    ): ProviderResult<string>;
  }

  export interface SelectionRangeProvider {
    
    provideSelectionRanges(
      document: LinesTextDocument,
      positions: Position[],
      token: CancellationToken
    ): ProviderResult<SelectionRange[]>;
  }

  export interface CallHierarchyProvider {
    
    prepareCallHierarchy(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<CallHierarchyItem | CallHierarchyItem[]>;

    provideCallHierarchyIncomingCalls(
      item: CallHierarchyItem,
      token: CancellationToken
    ): ProviderResult<CallHierarchyIncomingCall[]>;

    provideCallHierarchyOutgoingCalls(
      item: CallHierarchyItem,
      token: CancellationToken
    ): ProviderResult<CallHierarchyOutgoingCall[]>;
  }

  export interface DocumentSemanticTokensProvider {
    
    onDidChangeSemanticTokens?: Event<void>;

    provideDocumentSemanticTokens(
      document: LinesTextDocument,
      token: CancellationToken
    ): ProviderResult<SemanticTokens>;

    provideDocumentSemanticTokensEdits?(
      document: LinesTextDocument,
      previousResultId: string,
      token: CancellationToken
    ): ProviderResult<SemanticTokens | SemanticTokensDelta>;
  }

  export interface DocumentRangeSemanticTokensProvider {
    
    provideDocumentRangeSemanticTokens(
      document: LinesTextDocument,
      range: Range,
      token: CancellationToken
    ): ProviderResult<SemanticTokens>;
  }

  export interface LinkedEditingRangeProvider {
    
    provideLinkedEditingRanges(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<LinkedEditingRanges>;
  }

  export interface InlayHintsProvider<T extends InlayHint = InlayHint> {
    
    onDidChangeInlayHints?: Event<void>;

    provideInlayHints(
      document: LinesTextDocument,
      range: Range,
      token: CancellationToken
    ): ProviderResult<T[]>;

    resolveInlayHint?(hint: T, token: CancellationToken): ProviderResult<T>;
  }

  export interface TypeHierarchyProvider {
    
    prepareTypeHierarchy(
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<TypeHierarchyItem[]>;

    provideTypeHierarchySupertypes(
      item: TypeHierarchyItem,
      token: CancellationToken
    ): ProviderResult<TypeHierarchyItem[]>;

    provideTypeHierarchySubtypes(
      item: TypeHierarchyItem,
      token: CancellationToken
    ): ProviderResult<TypeHierarchyItem[]>;
  }

  export class CancellationError extends Error {
    
    constructor();
  }

  export class SemanticTokensBuilder {
    constructor(legend?: SemanticTokensLegend);

    push(
      line: number,
      char: number,
      length: number,
      tokenType: number,
      tokenModifiers?: number
    ): void;
    
    push(range: Range, tokenType: string, tokenModifiers?: string[]): void;

    build(resultId?: string): SemanticTokens;
  }

  export interface Document {
    readonly buffer: Buffer;
    
    readonly attached: boolean;
    
    readonly isCommandLine: boolean;
    
    readonly buftype: string;
    
    readonly textDocument: LinesTextDocument;
    
    readonly onDocumentChange: Event<DidChangeTextDocumentParams>;
    
    readonly changedtick: number;
    
    readonly schema: string;
    
    readonly lineCount: number;
    
    readonly winid: number;
    
    readonly previewwindow: boolean;
    
    readonly dirty: boolean;
    
    readonly bufnr: number;
    
    readonly content: string;
    
    readonly filetype: string;
    
    readonly languageId: string;
    readonly uri: string;
    readonly version: number;
    
    applyEdits(
      edits: TextEdit[],
      joinUndo?: boolean,
      move?: boolean | Position
    ): Promise<void>;

    changeLines(lines: [number, string][]): Promise<void>;

    getOffset(lnum: number, col: number): number;

    isWord(word: string): boolean;

    getWordRangeAtPosition(
      position: Position,
      extraChars?: string,
      current?: boolean
    ): Range | null;

    getSymbolRanges(word: string): Range[];

    getline(line: number, current?: boolean): string;

    getLines(start?: number, end?: number): string[];

    getVar<T>(key: string, defaultValue?: T): T;

    getPosition(lnum: number, col: number): Position;

    fixStartcol(position: Position, valids: string[]): number;

    getDocumentContent(): string;
  }

  export interface TextEditorOptions {
    
    tabSize: number;
    
    insertSpaces: boolean;
  }

  export interface TextEditor {
    
    readonly tabpageid: number;
    
    readonly winid: number;
    
    readonly winnr: number;
    
    readonly document: Document;
    
    readonly visibleRanges: readonly Range[];
    
    readonly options: TextEditorOptions;
  }

  export interface Documentation {
    
    filetype: string;
    
    content: string;
    
    active?: [number, number];
    highlights?: HighlightItem[];
  }

  export type GlobPattern = string | RelativePattern;

  export class RelativePattern {
    
    baseUri: Uri;

    pattern: string;

    constructor(base: WorkspaceFolder | Uri | string, pattern: string);
  }

  export class Highlighter {
    constructor(srcId?: number);
    
    addLine(line: string, hlGroup?: string): void;
    
    addLines(lines: string[]): void;
    
    addText(text: string, hlGroup?: string): void;
    
    get length(): number;
    
    render(buffer: Buffer, start?: number, end?: number): void;
  }

  export interface ListConfiguration {
    get<T>(key: string, defaultValue?: T): T;
    previousKey(): string;
    nextKey(): string;
    dispose(): void;
  }

  export interface ListActionOptions {
    
    persist?: boolean;
    
    reload?: boolean;
    
    parallel?: boolean;
    
    tabPersist?: boolean;
  }

  export interface CommandTaskOption {
    
    cmd: string;
    
    args: string[];
    
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    
    onLine: (line: string) => ListItem | undefined;
  }

  export abstract class BasicList implements IList {
    
    name: string;
    
    defaultAction: string;
    
    readonly actions: ListAction[];
    
    options: ListArgument[];
    protected nvim: Neovim;
    protected disposables: Disposable[];
    protected config: ListConfiguration;
    constructor();
    
    get alignColumns(): boolean;
    get hlGroup(): string;
    get previewHeight(): string;
    get splitRight(): boolean;
    
    protected parseArguments(args: string[]): {
      [key: string]: string | boolean;
    };
    
    protected getConfig(): WorkspaceConfiguration;
    
    protected addAction(
      name: string,
      fn: (item: ListItem, context: ListContext) => ProviderResult<void>,
      options?: ListActionOptions
    ): void;
    
    protected addMultipleAction(
      name: string,
      fn: (item: ListItem[], context: ListContext) => ProviderResult<void>,
      options?: ListActionOptions
    ): void;
    
    protected createCommandTask(opt: CommandTaskOption): ListTask;
    
    protected addLocationActions(): void;
    protected convertLocation(
      location: Location | LocationWithLine | string
    ): Promise<Location>;
    
    protected jumpTo(
      location: Location | LocationWithLine | string,
      command?: string
    ): Promise<void>;
    
    protected previewLocation(
      location: Location,
      context: ListContext
    ): Promise<void>;
    
    protected preview(
      options: PreviewOptions,
      context: ListContext
    ): Promise<void>;
    
    doHighlight(): void;
    
    abstract loadItems(
      context: ListContext,
      token?: CancellationToken
    ): Promise<ListItem[] | ListTask | null | undefined>;
  }

  export class Mutex {
    
    get busy(): boolean;
    
    acquire(): Promise<() => void>;
    
    use<T>(f: () => Promise<T>): Promise<T>;
  }

  export interface AnsiItem {
    foreground?: string;
    background?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    text: string;
  }

  export interface ParsedUrlQueryInput {
    [key: string]: unknown;
  }

  export interface FetchOptions {
    
    method?: string;
    
    timeout?: number;
    
    buffer?: boolean;
    
    data?: string | { [key: string]: any } | Buffer;
    
    query?: ParsedUrlQueryInput;
    headers?: any;
    
    user?: string;
    
    password?: string;
  }

  export interface DownloadOptions extends Omit<FetchOptions, "buffer"> {
    
    dest: string;
    
    strip?: number;
    
    etagAlgorithm?: string;
    
    extract?: boolean | "untar" | "unzip";
    onProgress?: (percent: string) => void;
  }

  export type ResponseResult =
    | string
    | Buffer
    | {
        [name: string]: any;
      };

  export function ansiparse(str: string): AnsiItem[];

  export function fetch(
    url: string | URL,
    options?: FetchOptions,
    token?: CancellationToken
  ): Promise<ResponseResult>;

  export function download(
    url: string | URL,
    options: DownloadOptions,
    token?: CancellationToken
  ): Promise<string>;

  interface ExecOptions {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    shell?: string;
    timeout?: number;
    maxBuffer?: number;
    killSignal?: string;
    uid?: number;
    gid?: number;
    windowsHide?: boolean;
    encoding?: string;
  }

  export function disposeAll(disposables: Disposable[]): void;

  export function concurrent<T>(
    arr: T[],
    fn: (val: T) => Promise<void>,
    limit?: number
  ): Promise<void>;

  export function wait(ms: number): Promise<any>;

  export function runCommand(
    cmd: string,
    opts?: ExecOptions,
    timeout?: number | CancellationToken
  ): Promise<string>;

  export function isRunning(pid: number): boolean;

  export function executable(command: string): boolean;

  export function watchFile(filepath: string, onChange: () => void): Disposable;

  export interface CommandItem {
    id: string;
    internal?: boolean;
    execute(...args: any[]): any;
  }
  
  export namespace commands {
    
    export const commandList: CommandItem[];

    export function execute(command: { name: string; arguments?: any[] }): void;

    export function has(id: string): boolean;

    export function registerCommand(
      id: string,
      impl: (...args: any[]) => void,
      thisArg?: any,
      internal?: boolean
    ): Disposable;

    export function executeCommand<T>(
      command: string,
      ...rest: any[]
    ): Promise<T>;

    export function executeCommand(
      command: "vscode.open",
      uri: string | Uri
    ): Promise<void>;

    export function executeCommand(
      command: "workbench.action.reloadWindow"
    ): Promise<void>;

    export function executeCommand(
      command: "editor.action.insertSnippet",
      edit: TextEdit,
      ultisnip?: UltiSnippetOption
    ): Promise<boolean>;

    export function executeCommand(
      command: "editor.action.doCodeAction",
      action: CodeAction
    ): Promise<void>;

    export function executeCommand(
      command: "editor.action.triggerSuggest",
      source?: string
    ): Promise<void>;

    export function executeCommand(
      command: "editor.action.triggerParameterHints"
    ): Promise<void>;

    export function executeCommand(
      command: "editor.action.addRanges",
      ranges: Range[]
    ): Promise<void>;

    export function executeCommand(
      command: "editor.action.restart"
    ): Promise<void>;

    export function executeCommand(
      command: "editor.action.showReferences",
      uri: string | Uri,
      position: Position | undefined,
      locations: Location[]
    ): Promise<void>;

    export function executeCommand(
      command: "editor.action.rename",
      uri: string | Uri,
      position: Position,
      newName?: string
    ): Promise<void>;

    export function executeCommand(
      command: "editor.action.format"
    ): Promise<void>;
  }

  type EventResult = void | Promise<void>;
  type MoveEvents =
    | "CursorMoved"
    | "CursorMovedI"
    | "CursorHold"
    | "CursorHoldI";
  type BufEvents =
    | "BufHidden"
    | "BufEnter"
    | "BufWritePost"
    | "InsertLeave"
    | "TermOpen"
    | "InsertEnter"
    | "BufCreate"
    | "BufUnload"
    | "BufWritePre"
    | "Enter";
  type EmptyEvents = "FocusGained" | "FocusLost" | "InsertSnippet";
  type InsertChangeEvents = "TextChangedP" | "TextChangedI";
  type TaskEvents = "TaskExit" | "TaskStderr" | "TaskStdout";
  type WindowEvents = "WinLeave" | "WinEnter";
  type AllEvents =
    | BufEvents
    | EmptyEvents
    | MoveEvents
    | TaskEvents
    | WindowEvents
    | InsertChangeEvents
    | "CompleteDone"
    | "TextChanged"
    | "MenuPopupChanged"
    | "InsertCharPre"
    | "FileType"
    | "BufWinEnter"
    | "BufWinLeave"
    | "VimResized"
    | "DirChanged"
    | "OptionSet"
    | "Command"
    | "BufReadCmd"
    | "GlobalChange"
    | "InputChar"
    | "WinLeave"
    | "MenuInput"
    | "PromptInsert"
    | "FloatBtnClick"
    | "InsertSnippet"
    | "PromptKeyPress";
  type OptionValue = string | number | boolean;
  type PromptWidowKeys = "C-j" | "C-k" | "C-n" | "C-p" | "up" | "down";

  export interface CursorPosition {
    readonly bufnr: number;
    readonly lnum: number;
    readonly col: number;
    readonly insert: boolean;
  }

  export interface InsertChange {
    
    readonly lnum: number;
    
    readonly col: number;
    
    readonly pre: string;
    
    readonly insertChar: string | undefined;
    readonly changedtick: number;
  }

  export interface PopupChangeEvent {
    
    readonly index: number;
    
    readonly word: string;
    
    readonly height: number;
    
    readonly width: number;
    
    readonly row: number;
    
    readonly col: number;
    
    readonly size: number;
    
    readonly scrollbar: boolean;
    
    readonly inserted: boolean;
    
    readonly move: boolean;
  }

  export namespace events {
    
    export const cursor: Readonly<CursorPosition>;
    
    export const pumAlignTop: boolean;
    
    export const insertMode: boolean;

    export const pumvisible: boolean;

    export function race(
      events: AllEvents[],
      timeoutOrToken?: number | CancellationToken
    ): Promise<{ name: AllEvents; args: unknown[] } | undefined>;

    export function on(
      event: BufEvents,
      handler: (bufnr: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    
    export function on(
      event: MoveEvents,
      handler: (bufnr: number, cursor: [number, number]) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    
    export function on(
      event: InsertChangeEvents,
      handler: (bufnr: number, info: InsertChange) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    
    export function on(
      event: WindowEvents,
      handler: (winid: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    
    export function on(
      event: "FloatBtnClick",
      handler: (bufnr: number, index: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    
    export function on(
      event: "PromptKeyPress",
      handler: (bufnr: number, key: PromptWidowKeys) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    
    export function on(
      event: "TextChanged",
      handler: (bufnr: number, changedtick: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "TaskExit",
      handler: (id: string, code: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "TaskStderr" | "TaskStdout",
      handler: (id: string, lines: string[]) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    
    export function on(
      event: "BufReadCmd",
      handler: (scheme: string, fullpath: string) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    
    export function on(
      event: "VimResized",
      handler: (columns: number, lines: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "MenuPopupChanged",
      handler: (event: PopupChangeEvent, cursorline: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "CompleteDone",
      handler: (item: CompleteDoneItem | {}) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "InsertCharPre",
      handler: (character: string) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "FileType",
      handler: (filetype: string, bufnr: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "BufWinEnter" | "BufWinLeave",
      handler: (bufnr: number, winid: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "DirChanged",
      handler: (cwd: string) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "OptionSet" | "GlobalChange",
      handler: (
        option: string,
        oldVal: OptionValue,
        newVal: OptionValue
      ) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "InputChar",
      handler: (
        session: string,
        character: string,
        mode: number
      ) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "PromptInsert",
      handler: (value: string, bufnr: number) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
    export function on(
      event: "Command",
      handler: (name: string) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;

    export function on(
      event: "TextInsert",
      handler: (
        bufnr: number,
        info: InsertChange,
        character: string
      ) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;

    export function on(
      event: EmptyEvents,
      handler: () => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;

    export function on(
      event: AllEvents[],
      handler: (...args: unknown[]) => EventResult,
      thisArg?: any,
      disposables?: Disposable[]
    ): Disposable;
  }

  export interface FileCreateEvent {
    
    readonly files: ReadonlyArray<Uri>;
  }

  export interface FileWillCreateEvent {
    
    readonly token: CancellationToken;

    readonly files: ReadonlyArray<Uri>;

    waitUntil(thenable: Thenable<WorkspaceEdit | any>): void;
  }

  export interface FileWillDeleteEvent {
    
    readonly files: ReadonlyArray<Uri>;

    waitUntil(thenable: Thenable<WorkspaceEdit | any>): void;
  }

  export interface FileDeleteEvent {
    
    readonly files: ReadonlyArray<Uri>;
  }

  export interface FileRenameEvent {
    
    readonly files: ReadonlyArray<{ oldUri: Uri; newUri: Uri }>;
  }

  export interface FileWillRenameEvent {
    
    readonly files: ReadonlyArray<{ oldUri: Uri; newUri: Uri }>;

    waitUntil(thenable: Thenable<WorkspaceEdit | any>): void;
  }

  export interface DocumentSymbolProviderMetadata {
    
    label?: string;
  }

  export namespace languages {
    
    export function hasProvider(
      id: ProviderName,
      document: TextDocumentMatch
    ): boolean;
    
    export function createDiagnosticCollection(
      name?: string
    ): DiagnosticCollection;

    export function registerOnTypeFormattingEditProvider(
      selector: DocumentSelector,
      provider: OnTypeFormattingEditProvider,
      triggerCharacters: string[]
    ): Disposable;

    export function registerCompletionItemProvider(
      name: string,
      shortcut: string,
      selector: DocumentSelector | null,
      provider: CompletionItemProvider,
      triggerCharacters?: string[],
      priority?: number,
      allCommitCharacters?: string[]
    ): Disposable;

    export function registerCodeActionProvider(
      selector: DocumentSelector,
      provider: CodeActionProvider,
      clientId: string | undefined,
      codeActionKinds?: ReadonlyArray<string>
    ): Disposable;

    export function registerHoverProvider(
      selector: DocumentSelector,
      provider: HoverProvider
    ): Disposable;

    export function registerSelectionRangeProvider(
      selector: DocumentSelector,
      provider: SelectionRangeProvider
    ): Disposable;

    export function registerSignatureHelpProvider(
      selector: DocumentSelector,
      provider: SignatureHelpProvider,
      triggerCharacters?: string[]
    ): Disposable;

    export function registerDocumentSymbolProvider(
      selector: DocumentSelector,
      provider: DocumentSymbolProvider,
      metadata?: DocumentSymbolProviderMetadata
    ): Disposable;

    export function registerFoldingRangeProvider(
      selector: DocumentSelector,
      provider: FoldingRangeProvider
    ): Disposable;

    export function registerDocumentHighlightProvider(
      selector: DocumentSelector,
      provider: DocumentHighlightProvider
    ): Disposable;

    export function registerCodeLensProvider(
      selector: DocumentSelector,
      provider: CodeLensProvider
    ): Disposable;

    export function registerDocumentLinkProvider(
      selector: DocumentSelector,
      provider: DocumentLinkProvider
    ): Disposable;

    export function registerDocumentColorProvider(
      selector: DocumentSelector,
      provider: DocumentColorProvider
    ): Disposable;

    export function registerDefinitionProvider(
      selector: DocumentSelector,
      provider: DefinitionProvider
    ): Disposable;

    export function registerDeclarationProvider(
      selector: DocumentSelector,
      provider: DeclarationProvider
    ): Disposable;

    export function registerTypeDefinitionProvider(
      selector: DocumentSelector,
      provider: TypeDefinitionProvider
    ): Disposable;

    export function registerImplementationProvider(
      selector: DocumentSelector,
      provider: ImplementationProvider
    ): Disposable;

    export function registerReferencesProvider(
      selector: DocumentSelector,
      provider: ReferenceProvider
    ): Disposable;

    export function registerRenameProvider(
      selector: DocumentSelector,
      provider: RenameProvider
    ): Disposable;

    export function registerWorkspaceSymbolProvider(
      provider: WorkspaceSymbolProvider
    ): Disposable;

    export function registerDocumentFormatProvider(
      selector: DocumentSelector,
      provider: DocumentFormattingEditProvider,
      priority?: number
    ): Disposable;

    export function registerDocumentRangeFormatProvider(
      selector: DocumentSelector,
      provider: DocumentRangeFormattingEditProvider,
      priority?: number
    ): Disposable;

    export function registerCallHierarchyProvider(
      selector: DocumentSelector,
      provider: CallHierarchyProvider
    ): Disposable;

    export function registerDocumentSemanticTokensProvider(
      selector: DocumentSelector,
      provider: DocumentSemanticTokensProvider,
      legend: SemanticTokensLegend
    ): Disposable;

    export function registerDocumentRangeSemanticTokensProvider(
      selector: DocumentSelector,
      provider: DocumentRangeSemanticTokensProvider,
      legend: SemanticTokensLegend
    ): Disposable;

    export function registerLinkedEditingRangeProvider(
      selector: DocumentSelector,
      provider: LinkedEditingRangeProvider
    ): Disposable;

    export function registerInlayHintsProvider(
      selector: DocumentSelector,
      provider: InlayHintsProvider
    ): Disposable;

    export function registerTypeHierarchyProvider(
      selector: DocumentSelector,
      provider: TypeHierarchyProvider
    ): Disposable;
  }

  export enum ServiceStat {
    Initial,
    Starting,
    StartFailed,
    Running,
    Stopping,
    Stopped,
  }

  export interface IServiceProvider {
    
    id: string;
    name: string;
    client?: LanguageClient;
    selector: DocumentSelector;
    
    state: ServiceStat;
    start(): Promise<void>;
    dispose(): void;
    stop(): Promise<void> | void;
    restart(): Promise<void> | void;
    onServiceReady: Event<void>;
  }

  export namespace services {
    
    export function registerLanguageClient(client: LanguageClient): Disposable;
    
    export function registLanguageClient(client: LanguageClient): Disposable;
    
    export function register(service: IServiceProvider): Disposable;
    
    export function regist(service: IServiceProvider): Disposable;
    
    export function getService(id: string): IServiceProvider;
    
    export function stop(id: string): Promise<void>;
    
    export function toggle(id: string): Promise<void>;
  }

  export interface SourceConfig {
    name: string;
    triggerOnly?: boolean;
    isSnippet?: boolean;
    sourceType?: SourceType;
    filepath?: string;
    documentSelector?: DocumentSelector;
    firstMatch?: boolean;
    refresh?(): Promise<void>;
    toggle?(): void;
    onEnter?(bufnr: number): void;
    shouldComplete?(opt: CompleteOption): ProviderResult<boolean>;
    doComplete(
      opt: CompleteOption,
      token: CancellationToken
    ): ProviderResult<CompleteResult>;
    onCompleteResolve?(
      item: VimCompleteItem,
      opt: CompleteOption,
      token: CancellationToken
    ): ProviderResult<void>;
    onCompleteDone?(
      item: VimCompleteItem,
      opt: CompleteOption,
      snippetsSupport?: boolean
    ): ProviderResult<void>;
    shouldCommit?(item: VimCompleteItem, character: string): boolean;
  }

  export interface SourceStat {
    name: string;
    priority: number;
    triggerCharacters: string[];
    type: "native" | "remote" | "service";
    shortcut: string;
    filepath: string;
    disabled: boolean;
    filetypes: string[];
  }

  export enum SourceType {
    Native,
    Remote,
    Service,
  }

  export interface CompleteResult {
    items: ReadonlyArray<VimCompleteItem>;
    isIncomplete?: boolean;
    startcol?: number;
  }

  export interface CompleteOption {
    
    readonly bufnr: number;
    
    readonly line: string;
    
    readonly col: number;
    
    readonly input: string;
    readonly filetype: string;
    readonly filepath: string;
    
    readonly word: string;
    
    readonly triggerCharacter?: string;
    
    readonly colnr: number;
    readonly linenr: number;
    
    readonly position: Position;
    readonly synname: string;
    
    readonly changedtick: number;
    
    readonly triggerForInComplete?: boolean;
  }

  export interface ISource {
    
    name: string;
    
    filetypes?: string[];
    
    documentSelector?: DocumentSelector;
    enable?: boolean;
    shortcut?: string;
    priority?: number;
    sourceType?: SourceType;
    
    triggerOnly?: boolean;
    triggerCharacters?: string[];
    
    triggerPatterns?: RegExp[];
    disableSyntaxes?: string[];
    filepath?: string;
    
    firstMatch?: boolean;
    refresh?(): Promise<void>;
    
    toggle?(): void;

    onEnter?(bufnr: number): void;

    shouldComplete?(opt: CompleteOption): ProviderResult<boolean>;

    doComplete(
      opt: CompleteOption,
      token: CancellationToken
    ): ProviderResult<CompleteResult>;

    onCompleteResolve?(
      item: VimCompleteItem,
      token: CancellationToken
    ): ProviderResult<void>;

    onCompleteDone?(
      item: VimCompleteItem,
      opt: CompleteOption
    ): ProviderResult<void>;

    shouldCommit?(item: VimCompleteItem, character: string): boolean;
  }

  export namespace sources {
    
    export const names: ReadonlyArray<string>;
    export const sources: ReadonlyArray<ISource>;
    
    export function has(name: string): boolean;
    
    export function getSource(name: string): ISource | null;

    export function addSource(source: ISource): Disposable;

    export function createSource(config: SourceConfig): Disposable;

    export function sourceStats(): SourceStat[];

    export function refresh(name?: string): Promise<void>;

    export function toggleSource(name: string): void;

    export function removeSource(name: string): void;
  }

  export interface TreeItemLabel {
    label: string;
    highlights?: [number, number][];
  }

  export interface TreeItemIcon {
    text: string;
    hlGroup: string;
  }

  export enum TreeItemCollapsibleState {
    
    None = 0,
    
    Collapsed = 1,
    
    Expanded = 2,
  }

  export class TreeItem {
    
    label?: string | TreeItemLabel;

    description?: string;

    icon?: TreeItemIcon;

    id?: string;

    resourceUri?: Uri;

    tooltip?: string | MarkupContent;

    command?: Command;

    collapsibleState?: TreeItemCollapsibleState;

    constructor(
      label: string | TreeItemLabel,
      collapsibleState?: TreeItemCollapsibleState
    );

    constructor(resourceUri: Uri, collapsibleState?: TreeItemCollapsibleState);
  }

  export interface TreeItemAction<T> {
    
    title: string;
    handler: (item: T) => ProviderResult<void>;
  }

  export interface TreeViewOptions<T> {
    
    bufhidden?: "hide" | "unload" | "delete" | "wipe";
    
    winfixwidth?: boolean;
    
    enableFilter?: boolean;
    
    disableLeafIndent?: boolean;
    
    treeDataProvider: TreeDataProvider<T>;
    
    canSelectMany?: boolean;
  }

  export interface TreeViewExpansionEvent<T> {
    
    readonly element: T;
  }

  export interface TreeViewSelectionChangeEvent<T> {
    
    readonly selection: T[];
  }

  export interface TreeViewVisibilityChangeEvent {
    
    readonly visible: boolean;
  }

  export interface TreeView<T> extends Disposable {
    
    readonly onDidExpandElement: Event<TreeViewExpansionEvent<T>>;

    readonly onDidCollapseElement: Event<TreeViewExpansionEvent<T>>;

    readonly selection: T[];

    readonly onDidChangeSelection: Event<TreeViewSelectionChangeEvent<T>>;

    readonly onDidChangeVisibility: Event<TreeViewVisibilityChangeEvent>;

    readonly visible: boolean;

    readonly windowId: number | undefined;

    message?: string;

    title?: string;

    description?: string;

    reveal(
      element: T,
      options?: { select?: boolean; focus?: boolean; expand?: boolean | number }
    ): Thenable<void>;

    show(splitCommand?: string): Promise<boolean>;
  }

  export interface TreeDataProvider<T> {
    
    onDidChangeTreeData?: Event<T | undefined | null | void>;

    getTreeItem(element: T): TreeItem | Thenable<TreeItem>;

    getChildren(element?: T): ProviderResult<T[]>;

    getParent?(element: T): ProviderResult<T>;

    resolveTreeItem?(
      item: TreeItem,
      element: T,
      token: CancellationToken
    ): ProviderResult<TreeItem>;

    resolveActions?(
      item: TreeItem,
      element: T
    ): ProviderResult<TreeItemAction<T>[]>;
  }

  export interface ConfigurationChangeEvent {
    
    affectsConfiguration(section: string, scope?: ConfigurationScope): boolean;
  }

  export interface WillSaveEvent extends TextDocumentWillSaveEvent {
    
    waitUntil(thenable: Thenable<TextEdit[] | any>): void;
  }

  export interface KeymapOption {
    
    sync?: boolean;
    
    cancel?: boolean;
    
    silent?: boolean;
    
    repeat?: boolean;
  }

  export interface DidChangeTextDocumentParams {
    
    readonly textDocument: {
      version: number;
      uri: string;
    };
    
    readonly contentChanges: ReadonlyArray<TextDocumentContentChange>;
    
    readonly bufnr: number;
    
    readonly original: string;
    
    readonly originalLines: ReadonlyArray<string>;
  }

  export interface EditerState {
    document: LinesTextDocument;
    position: Position;
  }

  export type MapMode = "n" | "i" | "v" | "x" | "s" | "o" | "!";

  export interface Autocmd {
    
    event: string | string[];
    
    callback: Function;
    
    pattern?: string;
    
    arglist?: string[];
    
    request?: boolean;
    
    thisArg?: any;
  }

  export interface Env {
    
    readonly runtimepath: string;
    
    readonly virtualText: boolean;
    
    readonly guicursor: string;
    
    readonly floating: boolean;
    
    readonly sign: boolean;
    
    readonly extensionRoot: string;
    
    readonly pid: number;
    
    readonly columns: number;
    
    readonly lines: number;
    
    readonly pumevent: boolean;
    
    readonly cmdheight: number;
    
    readonly filetypeMap: { [index: string]: string };
    
    readonly isVim: boolean;
    
    readonly isCygwin: boolean;
    
    readonly isMacvim: boolean;
    
    readonly isiTerm: boolean;
    
    readonly version: string;
    
    readonly progpath: string;
    
    readonly dialog: boolean;
    
    readonly textprop: boolean;
  }

  export interface Mru {

    load(): Promise<string[]>;
    
    add(item: string): Promise<void>;

    remove(item: string): Promise<void>;

    clean(): Promise<void>;
  }

  export interface TaskOptions {
    
    cmd: string;
    
    args?: string[];
    
    cwd?: string;
    
    env?: { [key: string]: string };
    
    pty?: boolean;
    
    detach?: boolean;
  }

  export interface Task extends Disposable {
    
    onExit: Event<number>;
    
    onStdout: Event<string[]>;
    
    onStderr: Event<string[]>;
    
    start(opts: TaskOptions): Promise<boolean>;
    
    stop(): Promise<void>;
    
    running: Promise<boolean>;
  }

  export interface JsonDB {
    filepath: string;
    
    fetch(key: string): any;
    
    exists(key: string): boolean;
    
    delete(key: string): void;
    
    push(
      key: string,
      data: number | null | boolean | string | { [index: string]: any }
    ): void;
    
    clear(): void;
    
    destroy(): void;
  }

  export interface RenameEvent {
    oldUri: Uri;
    newUri: Uri;
  }

  export interface FileSystemWatcher {
    readonly ignoreCreateEvents: boolean;
    readonly ignoreChangeEvents: boolean;
    readonly ignoreDeleteEvents: boolean;
    readonly onDidCreate: Event<Uri>;
    readonly onDidChange: Event<Uri>;
    readonly onDidDelete: Event<Uri>;
    readonly onDidRename: Event<RenameEvent>;
    dispose(): void;
  }

  export type ConfigurationScope =
    | string
    | null
    | Uri
    | TextDocument
    | WorkspaceFolder
    | { uri?: string; languageId?: string };

  export interface ConfigurationInspect<T> {
    key: string;
    defaultValue?: T;
    globalValue?: T;
    workspaceValue?: T;
    workspaceFolderValue?: T;
  }

  export enum ConfigurationTarget {
    Global = 1,
    
    Workspace = 2,
    WorkspaceFolder = 3,
  }

  export interface WorkspaceConfiguration {
    
    get<T>(section: string): T | undefined;

    get<T>(section: string, defaultValue: T): T;

    has(section: string): boolean;

    inspect<T>(section: string): ConfigurationInspect<T> | undefined;
    
    update(
      section: string,
      value: any,
      updateTarget?: ConfigurationTarget | boolean
    ): Thenable<void>;

    readonly [key: string]: any;
  }

  export interface BufferSyncItem {
    
    dispose: () => void;
    
    onChange?(e: DidChangeTextDocumentParams): void;
    
    onTextChange?(): void;
  }

  export interface BufferSync<T extends BufferSyncItem> {
    
    readonly items: Iterable<T>;
    
    getItem(uri: string): T | undefined;
    
    getItem(bufnr: number): T | undefined;
    dispose: () => void;
  }

  export interface FuzzyMatchResult {
    score: number;
    positions: Uint32Array;
  }

  export interface FuzzyMatchHighlights {
    score: number;
    highlights: AnsiHighlight[];
  }

  export type FuzzyScore = [
    score: number,
    wordStart: number,
    ...matches: number[]
  ];

  export interface FuzzyScoreOptions {
    readonly boostFullMatch: boolean;
    
    readonly firstMatchCanBeWeak: boolean;
  }

  export type FuzzyKind = "normal" | "aggressive" | "any";

  export type ScoreFunction = (
    word: string,
    wordPos?: number
  ) => FuzzyScore | undefined;

  export interface FuzzyMatch {
    
    matchScoreSpans(
      text: string,
      score: FuzzyScore
    ): Iterable<[number, number]>;

    createScoreFunction(
      pattern: string,
      patternPos: number,
      options?: FuzzyScoreOptions,
      kind?: FuzzyKind
    ): ScoreFunction;

    setPattern(pattern: string, matchSeq?: boolean): void;
    
    match(text: string): FuzzyMatchResult | undefined;
    
    matchSpans(
      text: string,
      positions: ArrayLike<number>,
      max?: number
    ): Iterable<[number, number]>;
    
    matchHighlights(
      text: string,
      hlGroup: string
    ): FuzzyMatchHighlights | undefined;
  }

  export interface TextDocumentMatch {
    readonly uri: string;
    readonly languageId: string;
  }

  export namespace workspace {
    export const nvim: Neovim;
    
    export const bufnr: number;
    
    export const document: Promise<Document>;
    
    export const env: Env;
    
    export const floatSupported: boolean;
    
    export const cwd: string;
    
    export const root: string;
    
    export const rootPath: string;
    
    export const isVim: boolean;
    
    export const isNvim: boolean;
    
    export const filetypes: ReadonlySet<string>;
    
    export const languageIds: ReadonlySet<string>;
    
    export const pluginRoot: string;
    
    export const channelNames: ReadonlyArray<string>;
    
    export const documents: ReadonlyArray<Document>;
    
    export const textDocuments: ReadonlyArray<LinesTextDocument>;
    
    export const workspaceFolders: ReadonlyArray<WorkspaceFolder>;
    
    export const folderPaths: ReadonlyArray<string>;
    
    export const workspaceFolder: WorkspaceFolder | null;
    export const onDidCreateFiles: Event<FileCreateEvent>;
    export const onDidRenameFiles: Event<FileRenameEvent>;
    export const onDidDeleteFiles: Event<FileDeleteEvent>;
    export const onWillCreateFiles: Event<FileWillCreateEvent>;
    export const onWillRenameFiles: Event<FileWillRenameEvent>;
    export const onWillDeleteFiles: Event<FileWillDeleteEvent>;
    
    export const onDidChangeWorkspaceFolders: Event<WorkspaceFoldersChangeEvent>;
    
    export const onDidOpenTextDocument: Event<
      LinesTextDocument & { bufnr: number }
    >;
    
    export const onDidCloseTextDocument: Event<
      LinesTextDocument & { bufnr: number }
    >;
    
    export const onDidChangeTextDocument: Event<DidChangeTextDocumentParams>;
    
    export const onWillSaveTextDocument: Event<WillSaveEvent>;
    
    export const onDidSaveTextDocument: Event<LinesTextDocument>;

    export const onDidChangeConfiguration: Event<ConfigurationChangeEvent>;

    export const onDidRuntimePathChange: Event<ReadonlyArray<string>>;

    export function asRelativePath(
      pathOrUri: string | Uri,
      includeWorkspaceFolder?: boolean
    ): string;

    export function openTextDocument(uri: Uri): Thenable<Document>;

    export function openTextDocument(fileName: string): Thenable<Document>;

    export function getDisplayWidth(text: string, cache?: boolean): number;

    export function has(feature: string): boolean;

    export function registerAutocmd(autocmd: Autocmd): Disposable;

    export function watchOption(
      key: string,
      callback: (oldValue: any, newValue: any) => Thenable<void> | void,
      disposables?: Disposable[]
    ): void;

    export function watchGlobal(
      key: string,
      callback?: (oldValue: any, newValue: any) => Thenable<void> | void,
      disposables?: Disposable[]
    ): void;

    export function match(
      selector: DocumentSelector,
      document: TextDocumentMatch
    ): number;

    export function findUp(filename: string | string[]): Promise<string | null>;

    export function getWatchmanPath(): string | null;

    export function getConfiguration(
      section?: string,
      scope?: ConfigurationScope
    ): WorkspaceConfiguration;

    export function resolveJSONSchema(uri: string): any;
    
    export function getDocument(
      uri: number | string
    ): Document | null | undefined;

    export function applyEdit(edit: WorkspaceEdit): Promise<boolean>;

    export function getQuickfixItem(
      loc: Location | LocationLink,
      text?: string,
      type?: string,
      module?: string
    ): Promise<QuickfixItem>;

    export function getQuickfixList(
      locations: Location[]
    ): Promise<ReadonlyArray<QuickfixItem>>;

    export function showLocations(locations: Location[]): Promise<void>;

    export function getLine(uri: string, line: number): Promise<string>;

    export function getWorkspaceFolder(
      uri: string | Uri
    ): WorkspaceFolder | undefined;

    export function readFile(uri: string): Promise<string>;

    export function getCurrentState(): Promise<EditerState>;

    export function getFormatOptions(uri?: string): Promise<FormattingOptions>;

    export function jumpTo(
      uri: string | Uri,
      position?: Position | null,
      openCommand?: string
    ): Promise<void>;

    export function createFile(
      filepath: string,
      opts?: CreateFileOptions
    ): Promise<void>;

    export function loadFile(uri: string): Promise<Document>;

    export function loadFiles(uris: string[]): Promise<void>;

    export function renameFile(
      oldPath: string,
      newPath: string,
      opts?: RenameFileOptions
    ): Promise<void>;

    export function deleteFile(
      filepath: string,
      opts?: DeleteFileOptions
    ): Promise<void>;

    export function openResource(uri: string): Promise<void>;

    export function resolveModule(name: string): Promise<string>;

    export function runCommand(
      cmd: string,
      cwd?: string,
      timeout?: number
    ): Promise<string>;

    export function expand(filepath: string): string;

    export function callAsync<T>(method: string, args: any[]): Promise<T>;

    export function registerTextDocumentContentProvider(
      scheme: string,
      provider: TextDocumentContentProvider
    ): Disposable;

    export function registerKeymap(
      modes: MapMode[],
      key: string,
      fn: () => ProviderResult<any>,
      opts?: Partial<KeymapOption>
    ): Disposable;

    export function registerExprKeymap(
      mode: MapMode,
      rhs: string,
      fn: () => ProviderResult<string>,
      buffer?: number | boolean,
      cancel?: boolean
    ): Disposable;

    export function registerLocalKeymap(
      bufnr: number,
      mode: "n" | "i" | "v" | "s" | "x",
      lhs: string,
      fn: () => ProviderResult<any>,
      notify?: boolean
    ): Disposable;

    export function registerBufferSync<T extends BufferSyncItem>(
      create: (doc: Document) => T | undefined
    ): BufferSync<T>;

    export function createFuzzyMatch(): FuzzyMatch;

    export function computeWordRanges(
      uri: string | number,
      range: Range,
      token?: CancellationToken
    ): Promise<{ [word: string]: Range[] } | null>;
    
    export function createFileSystemWatcher(
      globPattern: GlobPattern,
      ignoreCreate?: boolean,
      ignoreChange?: boolean,
      ignoreDelete?: boolean
    ): FileSystemWatcher;
    
    export function findFiles(
      include: GlobPattern,
      exclude?: GlobPattern | null,
      maxResults?: number,
      token?: CancellationToken
    ): Thenable<Uri[]>;

    export function createMru(name: string): Mru;

    export function createTask(id: string): Task;

    export function createDatabase(name: string): JsonDB;
  }

  export interface TerminalExitStatus {
    
    readonly code: number | undefined;
  }

  export interface TerminalOptions {
    
    name?: string;

    shellPath?: string;

    shellArgs?: string[];

    cwd?: string;

    env?: { [key: string]: string | null };

    strictEnv?: boolean;
  }

  export interface Terminal {
    
    readonly bufnr: number;

    readonly name: string;

    readonly processId: Promise<number>;

    readonly exitStatus: TerminalExitStatus | undefined;

    sendText(text: string, addNewLine?: boolean): void;

    show(preserveFocus?: boolean): Promise<boolean>;

    hide(): void;

    dispose(): void;
  }

  export interface StatusItemOption {
    progress?: boolean;
  }

  export interface StatusBarItem {
    
    readonly priority: number;

    isProgress: boolean;

    text: string;

    show(): void;

    hide(): void;

    dispose(): void;
  }

  export interface ProgressOptions {
    
    title?: string;

    cancellable?: boolean;
  }

  export interface Progress<T> {
    
    report(value: T): void;
  }

  export interface MessageItem {
    
    title: string;

    isCloseAffordance?: boolean;
  }

  export interface DialogButton {
    
    index: number;
    text: string;
    
    disabled?: boolean;
  }

  export interface DialogConfig {
    
    content: string;
    
    title?: string;
    
    close?: boolean;
    
    highlight?: string;
    
    highlights?: ReadonlyArray<HighlightItem>;
    
    borderhighlight?: string;
    
    buttons?: DialogButton[];
    
    callback?: (index: number) => void;
  }

  export type NotificationKind = "error" | "info" | "warning" | "progress";

  export interface NotificationConfig {
    kind?: NotificationKind;

    content?: string;
    
    title?: string;
    
    buttons?: DialogButton[];
    
    callback?: (index: number) => void;
  }

  export interface QuickPickOptions {
    
    title?: string;
    
    placeholder?: string;
    
    matchOnDescription?: boolean;
    
    canPickMany?: boolean;
  }

  export interface QuickPickItem {
    
    label: string;
    
    description?: string;
    
    picked?: boolean;
  }

  export interface QuickPickConfig<T extends QuickPickItem> {
    
    title?: string;
    
    placeholder?: string;
    
    items: readonly T[];
    
    value?: string;
    
    canSelectMany?: boolean;
    
    matchOnDescription: boolean;
  }

  export interface QuickPick<T extends QuickPickItem> {
    
    value: string;
    
    title: string | undefined;
    
    placeholder: string | undefined;
    
    loading: boolean;
    
    items: readonly T[];
    
    activeItems: readonly T[];
    
    matchOnDescription: boolean;
    
    canSelectMany: boolean;
    
    maxHeight: number;
    
    width: number | undefined;
    
    readonly inputBox: InputBox | undefined;
    
    readonly currIndex: number;
    
    readonly buffer: number;
    
    readonly winid: number | undefined;
    
    readonly onDidFinish: Event<T[] | null>;
    
    readonly onDidChangeValue: Event<string>;
    
    readonly onDidChangeSelection: Event<readonly T[]>;
    
    show(): Promise<void>;
  }

  export interface ScreenPosition {
    row: number;
    col: number;
  }

  export type MsgTypes = "error" | "warning" | "more";

  export interface OpenTerminalOption {
    
    cwd?: string;
    
    autoclose?: boolean;
    
    keepfocus?: boolean;
    
    position?: "bottom" | "right";
  }

  export interface OutputChannel {
    
    readonly name: string;

    readonly content: string;
    
    append(value: string): void;

    appendLine(value: string): void;

    clear(keep?: number): void;

    show(preserveFocus?: boolean): void;

    hide(): void;

    dispose(): void;
  }

  export interface TerminalResult {
    bufnr: number;
    success: boolean;
    content?: string;
  }

  export interface Dialog {
    
    bufnr: number;
    
    winid: Promise<number | null>;
    dispose: () => void;
  }

  export type HighlightItemDef = [
    string,
    number,
    number,
    number,
    number?,
    number?,
    number?
  ];

  export interface HighlightDiff {
    remove: number[];
    removeMarkers: number[];
    add: HighlightItemDef[];
  }

  export interface MenuItem {
    text: string;
    disabled?: boolean | { reason: string };
  }

  export interface MenuOption {
    
    title?: string;
    
    content?: string;
    
    shortcuts?: boolean;
    
    position?: "center" | "cursor";
  }

  export interface InputOptions {
    
    placeholder?: string;
    
    position?: "cursor" | "center";
    
    marginTop?: number;
    
    borderhighlight?: string;
    
    list?: boolean;
  }

  export interface InputPreference extends InputOptions {
    
    border?: [0 | 1, 0 | 1, 0 | 1, 0 | 1];
    
    rounded?: boolean;
    
    minWidth?: number;
    
    maxWidth?: number;
  }

  export interface InputDimension {
    readonly width: number;
    readonly height: number;
    
    readonly row: number;
    
    readonly col: number;
  }

  export interface InputBox {
    
    value: string;
    
    title: string;
    
    loading: boolean;
    
    borderhighlight: string;
    
    readonly dimension: InputDimension;
    
    readonly bufnr: number;
    
    readonly onDidChange: Event<string>;
    
    readonly onDidFinish: Event<string | null>;
  }

  export interface FloatWinConfig {
    border?: boolean | [number, number, number, number];
    rounded?: boolean;
    highlight?: string;
    title?: string;
    borderhighlight?: string;
    close?: boolean;
    maxHeight?: number;
    maxWidth?: number;
    winblend?: number;
    focusable?: boolean;
    shadow?: boolean;
    preferTop?: boolean;
    autoHide?: boolean;
    offsetX?: number;
    cursorline?: boolean;
    modes?: string[];
    excludeImages?: boolean;
    position?: "fixed" | "auto";
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  }

  export interface FloatFactory {
    
    show: (docs: Documentation[], options?: FloatWinConfig) => Promise<void>;
    
    close: () => void;
    
    activated: () => Promise<boolean>;
    
    dispose: () => void;
  }

  export namespace window {
    
    export const activeTextEditor: TextEditor | undefined;

    export const visibleTextEditors: readonly TextEditor[];

    export const onDidChangeActiveTextEditor: Event<TextEditor | undefined>;

    export const onDidChangeVisibleTextEditors: Event<readonly TextEditor[]>;

    export const terminals: readonly Terminal[];

    export const onDidOpenTerminal: Event<Terminal>;

    export const onDidCloseTerminal: Event<Terminal>;

    export function createTerminal(opts: TerminalOptions): Promise<Terminal>;

    export function createFloatFactory(conf: FloatWinConfig): FloatFactory;

    export function showMessage(msg: string, messageType?: MsgTypes): void;

    export function runTerminalCommand(
      cmd: string,
      cwd?: string,
      keepfocus?: boolean
    ): Promise<TerminalResult>;

    export function openTerminal(
      cmd: string,
      opts?: OpenTerminalOption
    ): Promise<number>;

    export function showQuickpick(
      items: string[],
      placeholder?: string
    ): Promise<number>;

    export function showQuickPick(
      items: readonly string[] | Thenable<readonly string[]>,
      options: QuickPickOptions & { canPickMany: true },
      token?: CancellationToken
    ): Thenable<string[] | undefined>;

    export function showQuickPick(
      items: readonly string[] | Thenable<readonly string[]>,
      options?: QuickPickOptions,
      token?: CancellationToken
    ): Thenable<string | undefined>;

    export function showQuickPick<T extends QuickPickItem>(
      items: readonly T[] | Thenable<readonly T[]>,
      options: QuickPickOptions & { canPickMany: true },
      token?: CancellationToken
    ): Thenable<T[] | undefined>;

    export function showQuickPick<T extends QuickPickItem>(
      items: readonly T[] | Thenable<readonly T[]>,
      options?: QuickPickOptions,
      token?: CancellationToken
    ): Thenable<T | undefined>;

    export function showMenuPicker(
      items: string[] | MenuItem[],
      option?: MenuOption | string,
      token?: CancellationToken
    ): Promise<number>;

    export function showPrompt(title: string): Promise<boolean>;

    export function showDialog(config: DialogConfig): Promise<Dialog | null>;

    export function requestInput(
      title: string,
      defaultValue?: string,
      option?: InputOptions
    ): Promise<string>;

    export function createInputBox(
      title: string,
      defaultValue?: string,
      option?: InputPreference
    ): Promise<InputBox>;

    export function createQuickPick<T extends QuickPickItem>(
      config?: QuickPickConfig<T>
    ): Promise<QuickPick<T>>;

    export function createStatusBarItem(
      priority?: number,
      option?: StatusItemOption
    ): StatusBarItem;

    export function openLocalConfig(): Promise<void>;

    export function createOutputChannel(name: string): OutputChannel;

    export function createTreeView<T>(
      viewId: string,
      options: TreeViewOptions<T>
    ): TreeView<T>;

    export function showOutputChannel(
      name: string,
      preserveFocus: boolean
    ): void;

    export function echoLines(
      lines: string[],
      truncate?: boolean
    ): Promise<void>;

    export function getCursorPosition(): Promise<Position>;

    export function moveTo(position: Position): Promise<void>;

    export function getOffset(): Promise<number>;

    export function getCursorScreenPosition(): Promise<ScreenPosition>;

    export function showPickerDialog(
      items: string[],
      title: string,
      token?: CancellationToken
    ): Promise<string[] | undefined>;

    export function showPickerDialog<T extends QuickPickItem>(
      items: T[],
      title: string,
      token?: CancellationToken
    ): Promise<T[] | undefined>;

    export function showInformationMessage(
      message: string,
      ...items: string[]
    ): Promise<string | undefined>;
    
    export function showInformationMessage<T extends MessageItem>(
      message: string,
      ...items: T[]
    ): Promise<T | undefined>;

    export function showWarningMessage(
      message: string,
      ...items: string[]
    ): Promise<string | undefined>;
    
    export function showWarningMessage<T extends MessageItem>(
      message: string,
      ...items: T[]
    ): Promise<T | undefined>;

    export function showErrorMessage(
      message: string,
      ...items: string[]
    ): Promise<string | undefined>;
    
    export function showErrorMessage<T extends MessageItem>(
      message: string,
      ...items: T[]
    ): Promise<T | undefined>;

    export function showNotification(config: NotificationConfig): Promise<void>;

    export function withProgress<R>(
      options: ProgressOptions,
      task: (
        progress: Progress<{
          message?: string;
          increment?: number;
        }>,
        token: CancellationToken
      ) => Thenable<R>
    ): Promise<R>;

    export function getSelectedRange(visualmode: string): Promise<Range | null>;

    export function selectRange(range: Range): Promise<void>;

    export function diffHighlights(
      bufnr: number,
      ns: string,
      items: ExtendedHighlightItem[],
      region?: [number, number] | undefined,
      token?: CancellationToken
    ): Promise<HighlightDiff | null>;

    export function applyDiffHighlights(
      bufnr: number,
      ns: string,
      priority: number,
      diff: HighlightDiff,
      notify?: boolean
    ): Promise<void>;
  }

  export interface Logger {
    readonly category: string;
    log(...args: any[]): void;
    trace(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    fatal(message: any, ...args: any[]): void;
    mark(message: any, ...args: any[]): void;
  }

  export interface Memento {
    
    get<T>(key: string): T | undefined;

    get<T>(key: string, defaultValue: T): T;

    update(key: string, value: any): Promise<void>;
  }

  export type ExtensionState = "disabled" | "loaded" | "activated" | "unknown";

  export enum ExtensionType {
    Global,
    Local,
    SingleFile,
    Internal,
  }

  export interface ExtensionJson {
    name: string;
    main?: string;
    engines: {
      [key: string]: string;
    };
    version?: string;
    [key: string]: any;
  }

  export interface ExtensionInfo {
    id: string;
    version: string;
    description: string;
    root: string;
    exotic: boolean;
    uri?: string;
    state: ExtensionState;
    isLocal: boolean;
    packageJSON: Readonly<ExtensionJson>;
  }

  export interface Extension<T> {
    
    readonly id: string;

    readonly extensionPath: string;

    readonly isActive: boolean;

    readonly packageJSON: any;

    readonly exports: T;

    activate(): Promise<T>;
  }

  export interface ExtensionContext {
    
    subscriptions: Disposable[];

    extensionPath: string;

    asAbsolutePath(relativePath: string): string;

    storagePath: string;

    workspaceState: Memento;

    globalState: Memento;

    logger: Logger;
  }

  export interface PropertyScheme {
    type: string;
    default: any;
    description: string;
    enum?: string[];
    items?: any;
    [key: string]: any;
  }

  export namespace extensions {
    
    export const onDidLoadExtension: Event<Extension<any>>;

    export const onDidActiveExtension: Event<Extension<any>>;

    export const onDidUnloadExtension: Event<string>;

    export const all: ReadonlyArray<Extension<any>>;

    export function getExtensionById<T = any>(
      extensionId: string
    ): Extension<T> | undefined;

    export function getExtensionState(id: string): ExtensionState;

    export function getExtensionStates(): Promise<ExtensionInfo[]>;

    export function isActivated(id: string): boolean;
  }

  export interface LocationWithLine {
    uri: string;
    
    line: string;
    
    text?: string;
  }

  export interface AnsiHighlight {
    
    span: [number, number];
    hlGroup: string;
  }

  export interface ListItem {
    label: string;
    preselect?: boolean;
    filterText?: string;
    
    sortText?: string;
    location?: Location | LocationWithLine | string;
    data?: any;
    ansiHighlights?: AnsiHighlight[];
    resolved?: boolean;
  }

  export type ListMode = "normal" | "insert";

  export type ListMatcher = "strict" | "fuzzy" | "regex";

  export interface ListOptions {
    position: string;
    reverse: boolean;
    input: string;
    ignorecase: boolean;
    interactive: boolean;
    sort: boolean;
    mode: ListMode;
    matcher: ListMatcher;
    autoPreview: boolean;
    numberSelect: boolean;
    noQuit: boolean;
    first: boolean;
  }

  export interface ListContext {
    
    input: string;
    
    cwd: string;
    
    options: ListOptions;
    
    args: string[];
    
    window: Window;
    
    buffer: Buffer;
    listWindow: Window | null;
  }

  export interface ListAction {
    
    name: string;
    
    persist?: boolean;
    
    reload?: boolean;
    
    parallel?: boolean;
    
    multiple?: boolean;
    
    tabPersist?: boolean;
    
    execute: (
      item: ListItem | ListItem[],
      context: ListContext
    ) => ProviderResult<void>;
  }

  export interface MultipleListAction extends Omit<ListAction, "execute"> {
    multiple: true;
    execute: (item: ListItem[], context: ListContext) => ProviderResult<void>;
  }

  export interface ListTask {
    on(event: "data", callback: (item: ListItem) => void): void;
    on(event: "end", callback: () => void): void;
    on(event: "error", callback: (msg: string | Error) => void): void;
    dispose(): void;
  }

  export interface ListArgument {
    key?: string;
    hasValue?: boolean;
    name: string;
    description: string;
  }

  export interface IList {
    
    name: string;
    
    defaultAction: string;
    
    actions: ListAction[];
    
    loadItems(
      context: ListContext,
      token: CancellationToken
    ): Promise<ListItem[] | ListTask | null | undefined>;
    
    interactive?: boolean;
    
    description?: string;
    
    detail?: string;
    
    options?: ListArgument[];
    
    resolveItem?(item: ListItem): Promise<ListItem | null>;
    
    doHighlight?(): void;
    
    dispose?(): void;
  }

  export interface PreviewOptions {
    bufname?: string;
    lines: string[];
    filetype?: string;
    lnum?: number;
    range?: Range;
    
    sketch?: boolean;
  }

  export namespace listManager {
    
    export const names: ReadonlyArray<string>;
    
    export function registerList(list: IList): Disposable;
  }

  export interface SnippetSession {
    isActive: boolean;
  }

  export interface UltiSnippetOption {
    regex?: string;
    context?: string;
    noPython?: boolean;
    range?: Range;
    line?: string;
  }

  export class SnippetString {
    
    value: string;

    constructor(
      
      value?: string
    );

    appendText(string: string): SnippetString;

    appendTabstop(number?: number): SnippetString;

    appendPlaceholder(
      value: string | ((snippet: SnippetString) => any),
      number?: number
    ): SnippetString;

    appendChoice(values: string[], number?: number): SnippetString;

    appendVariable(
      name: string,
      defaultValue: string | ((snippet: SnippetString) => any)
    ): SnippetString;
  }
  
  export namespace snippetManager {
    
    export function getSession(bufnr: number): SnippetSession | undefined;
    
    export function resolveSnippet(
      body: string,
      ultisnip?: UltiSnippetOption
    ): Promise<string>;
    
    export function insertSnippet(
      snippet: string | SnippetString,
      select?: boolean,
      range?: Range,
      ultisnip?: UltiSnippetOption | boolean
    ): Promise<boolean>;

    export function nextPlaceholder(): Promise<void>;
    
    export function previousPlaceholder(): Promise<void>;
    
    export function cancel(): void;
    
    export function isActivated(bufnr: number): boolean;
  }

  export interface DiagnosticItem {
    file: string;
    lnum: number;
    col: number;
    source: string;
    code: string | number;
    message: string;
    severity: string;
    level: number;
    location: Location;
  }

  export enum DiagnosticKind {
    Syntax,
    Semantic,
    Suggestion,
  }

  export interface DiagnosticCollection {
    
    readonly name: string;

    set(uri: string, diagnostics: Diagnostic[] | null): void;
    
    set(
      entries: [string, Diagnostic[] | null][] | string,
      diagnostics?: Diagnostic[]
    ): void;

    delete(uri: string): void;

    clear(): void;

    forEach(
      callback: (
        uri: string,
        diagnostics: Diagnostic[],
        collection: DiagnosticCollection
      ) => any,
      thisArg?: any
    ): void;

    get(uri: string): Diagnostic[] | undefined;

    has(uri: string): boolean;

    dispose(): void;
  }

  export interface DiagnosticEventParams {
    bufnr: number;
    uri: string;
    diagnostics: ReadonlyArray<Diagnostic>;
  }

  export namespace diagnosticManager {
    export const onDidRefresh: Event<DiagnosticEventParams>;
    
    export function create(name: string): DiagnosticCollection;

    export function getDiagnostics(uri: string): {
      [collection: string]: Diagnostic[];
    };

    export function getDiagnosticsInRange(
      doc: TextDocumentIdentifier,
      range: Range
    ): ReadonlyArray<Diagnostic>;
    
    export function getDiagnosticList(): Promise<ReadonlyArray<DiagnosticItem>>;

    export function getCurrentDiagnostics(): Promise<ReadonlyArray<Diagnostic>>;

    export function getCollectionByName(name: string): DiagnosticCollection;
  }

  export type ProgressToken = number | string;

  export interface WorkDoneProgressBegin {
    kind: "begin";
    
    title: string;
    
    cancellable?: boolean;
    
    message?: string;
    
    percentage?: number;
  }

  export interface WorkDoneProgressReport {
    kind: "report";
    
    cancellable?: boolean;
    
    message?: string;
    
    percentage?: number;
  }

  export interface WorkDoneProgressEnd {
    kind: "end";
    
    message?: string;
  }

  export namespace FileChangeType {
    
    const Created = 1;
    
    const Changed = 2;
    
    const Deleted = 3;
  }

  export type FileChangeType = 1 | 2 | 3;

  export interface FileEvent {
    
    uri: string;
    
    type: FileChangeType;
  }
  
  export enum ErrorAction {
    
    Continue = 1,
    
    Shutdown = 2,
  }
  
  export enum CloseAction {
    
    DoNotRestart = 1,
    
    Restart = 2,
  }
  
  export interface ErrorHandler {
    
    error(
      error: Error,
      message: { jsonrpc: string },
      count: number
    ): ErrorAction;
    
    closed(): CloseAction;
  }
  export interface InitializationFailedHandler {
    (error: Error | any): boolean;
  }

  export interface SynchronizeOptions {
    
    configurationSection?: string | string[];
    fileEvents?: FileSystemWatcher | FileSystemWatcher[];
  }

  export enum RevealOutputChannelOn {
    Info = 1,
    Warn = 2,
    Error = 3,
    Never = 4,
  }
  export interface ConfigurationItem {
    
    scopeUri?: string;
    
    section?: string;
  }

  export type HandlerResult<R, E> =
    | R
    | ResponseError<E>
    | Thenable<R>
    | Thenable<ResponseError<E>>
    | Thenable<R | ResponseError<E>>;

  export interface RequestHandler<P, R, E> {
    (params: P, token: CancellationToken): HandlerResult<R, E>;
  }

  export interface RequestHandler0<R, E> {
    (token: CancellationToken): HandlerResult<R, E>;
  }
  
  export interface ConfigurationParams {
    items: ConfigurationItem[];
  }

  export interface ConfigurationWorkspaceMiddleware {
    configuration?: (
      params: ConfigurationParams,
      token: CancellationToken,
      next: RequestHandler<ConfigurationParams, any[], void>
    ) => HandlerResult<any[], void>;
  }

  export interface WorkspaceFolderWorkspaceMiddleware {
    workspaceFolders?: (
      token: CancellationToken,
      next: RequestHandler0<WorkspaceFolder[] | null, void>
    ) => HandlerResult<WorkspaceFolder[] | null, void>;
    didChangeWorkspaceFolders?: NextSignature<
      WorkspaceFoldersChangeEvent,
      Promise<void>
    >;
  }

  export interface ProvideTypeDefinitionSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Definition | DefinitionLink[]>;
  }

  export interface TypeDefinitionMiddleware {
    provideTypeDefinition?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      next: ProvideTypeDefinitionSignature
    ) => ProviderResult<Definition | DefinitionLink[]>;
  }

  export interface ProvideImplementationSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Definition | DefinitionLink[]>;
  }

  export interface ImplementationMiddleware {
    provideImplementation?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      next: ProvideImplementationSignature
    ) => ProviderResult<Definition | DefinitionLink[]>;
  }
  export type ProvideDocumentColorsSignature = (
    document: LinesTextDocument,
    token: CancellationToken
  ) => ProviderResult<ColorInformation[]>;

  export type ProvideColorPresentationSignature = (
    color: Color,
    context: { document: LinesTextDocument; range: Range },
    token: CancellationToken
  ) => ProviderResult<ColorPresentation[]>;

  export interface ColorProviderMiddleware {
    provideDocumentColors?: (
      this: void,
      document: LinesTextDocument,
      token: CancellationToken,
      next: ProvideDocumentColorsSignature
    ) => ProviderResult<ColorInformation[]>;
    provideColorPresentations?: (
      this: void,
      color: Color,
      context: { document: LinesTextDocument; range: Range },
      token: CancellationToken,
      next: ProvideColorPresentationSignature
    ) => ProviderResult<ColorPresentation[]>;
  }

  export interface ProvideDeclarationSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Declaration | DeclarationLink[]>;
  }

  export interface DeclarationMiddleware {
    provideDeclaration?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      next: ProvideDeclarationSignature
    ) => ProviderResult<Declaration | DeclarationLink[]>;
  }

  export type ProvideFoldingRangeSignature = (
    this: void,
    document: LinesTextDocument,
    context: FoldingContext,
    token: CancellationToken
  ) => ProviderResult<FoldingRange[]>;

  export interface FoldingRangeProviderMiddleware {
    provideFoldingRanges?: (
      this: void,
      document: LinesTextDocument,
      context: FoldingContext,
      token: CancellationToken,
      next: ProvideFoldingRangeSignature
    ) => ProviderResult<FoldingRange[]>;
  }

  export interface PrepareCallHierarchySignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<CallHierarchyItem | CallHierarchyItem[]>;
  }

  export interface CallHierarchyIncomingCallsSignature {
    (
      this: void,
      item: CallHierarchyItem,
      token: CancellationToken
    ): ProviderResult<CallHierarchyIncomingCall[]>;
  }

  export interface CallHierarchyOutgoingCallsSignature {
    (
      this: void,
      item: CallHierarchyItem,
      token: CancellationToken
    ): ProviderResult<CallHierarchyOutgoingCall[]>;
  }
  export interface CallHierarchyMiddleware {
    prepareCallHierarchy?: (
      this: void,
      document: LinesTextDocument,
      positions: Position,
      token: CancellationToken,
      next: PrepareCallHierarchySignature
    ) => ProviderResult<CallHierarchyItem | CallHierarchyItem[]>;
    provideCallHierarchyIncomingCalls?: (
      this: void,
      item: CallHierarchyItem,
      token: CancellationToken,
      next: CallHierarchyIncomingCallsSignature
    ) => ProviderResult<CallHierarchyIncomingCall[]>;
    provideCallHierarchyOutgoingCalls?: (
      this: void,
      item: CallHierarchyItem,
      token: CancellationToken,
      next: CallHierarchyOutgoingCallsSignature
    ) => ProviderResult<CallHierarchyOutgoingCall[]>;
  }

  export interface DocumentSemanticsTokensSignature {
    (
      this: void,
      document: LinesTextDocument,
      token: CancellationToken
    ): ProviderResult<SemanticTokens>;
  }

  export interface DocumentSemanticsTokensEditsSignature {
    (
      this: void,
      document: LinesTextDocument,
      previousResultId: string,
      token: CancellationToken
    ): ProviderResult<SemanticTokens | SemanticTokensDelta>;
  }

  export interface DocumentRangeSemanticTokensSignature {
    (
      this: void,
      document: LinesTextDocument,
      range: Range,
      token: CancellationToken
    ): ProviderResult<SemanticTokens>;
  }

  export interface SemanticTokensMiddleware {
    provideDocumentSemanticTokens?: (
      this: void,
      document: LinesTextDocument,
      token: CancellationToken,
      next: DocumentSemanticsTokensSignature
    ) => ProviderResult<SemanticTokens>;
    provideDocumentSemanticTokensEdits?: (
      this: void,
      document: LinesTextDocument,
      previousResultId: string,
      token: CancellationToken,
      next: DocumentSemanticsTokensEditsSignature
    ) => ProviderResult<SemanticTokens | SemanticTokensDelta>;
    provideDocumentRangeSemanticTokens?: (
      this: void,
      document: LinesTextDocument,
      range: Range,
      token: CancellationToken,
      next: DocumentRangeSemanticTokensSignature
    ) => ProviderResult<SemanticTokens>;
  }

  export interface FileOperationsMiddleware {
    didCreateFiles?: NextSignature<FileCreateEvent, Promise<void>>;
    willCreateFiles?: NextSignature<
      FileWillCreateEvent,
      Thenable<WorkspaceEdit | null | undefined>
    >;
    didRenameFiles?: NextSignature<FileRenameEvent, Promise<void>>;
    willRenameFiles?: NextSignature<
      FileWillRenameEvent,
      Thenable<WorkspaceEdit | null | undefined>
    >;
    didDeleteFiles?: NextSignature<FileDeleteEvent, Promise<void>>;
    willDeleteFiles?: NextSignature<
      FileWillDeleteEvent,
      Thenable<WorkspaceEdit | null | undefined>
    >;
  }

  export interface ProvideLinkedEditingRangeSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<LinkedEditingRanges>;
  }

  export interface LinkedEditingRangeMiddleware {
    provideLinkedEditingRange?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      next: ProvideLinkedEditingRangeSignature
    ) => ProviderResult<LinkedEditingRanges>;
  }

  export interface ProvideSelectionRangeSignature {
    (
      this: void,
      document: LinesTextDocument,
      positions: Position[],
      token: CancellationToken
    ): ProviderResult<SelectionRange[]>;
  }

  export interface SelectionRangeProviderMiddleware {
    provideSelectionRanges?: (
      this: void,
      document: LinesTextDocument,
      positions: Position[],
      token: CancellationToken,
      next: ProvideSelectionRangeSignature
    ) => ProviderResult<SelectionRange[]>;
  }

  export type ProvideDiagnosticSignature = (
    this: void,
    document: TextDocument,
    previousResultId: string | undefined,
    token: CancellationToken
  ) => ProviderResult<DocumentDiagnosticReport>;

  export type ProvideWorkspaceDiagnosticSignature = (
    this: void,
    resultIds: PreviousResultId[],
    token: CancellationToken,
    resultReporter: ResultReporter
  ) => ProviderResult<WorkspaceDiagnosticReport>;

  export interface DiagnosticProviderMiddleware {
    provideDiagnostics?: (
      this: void,
      document: TextDocument,
      previousResultId: string | undefined,
      token: CancellationToken,
      next: ProvideDiagnosticSignature
    ) => ProviderResult<DocumentDiagnosticReport>;
    provideWorkspaceDiagnostics?: (
      this: void,
      resultIds: PreviousResultId[],
      token: CancellationToken,
      resultReporter: ResultReporter,
      next: ProvideWorkspaceDiagnosticSignature
    ) => ProviderResult<WorkspaceDiagnosticReport>;
  }

  export interface HandleWorkDoneProgressSignature {
    (
      this: void,
      token: ProgressToken,
      params:
        | WorkDoneProgressBegin
        | WorkDoneProgressReport
        | WorkDoneProgressEnd
    ): void;
  }

  export interface HandleDiagnosticsSignature {
    (this: void, uri: string, diagnostics: Diagnostic[]): void;
  }

  export interface ProvideCompletionItemsSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      context: CompletionContext,
      token: CancellationToken
    ): ProviderResult<CompletionItem[] | CompletionList | null>;
  }

  export interface ResolveCompletionItemSignature {
    (
      this: void,
      item: CompletionItem,
      token: CancellationToken
    ): ProviderResult<CompletionItem>;
  }

  export interface ProvideHoverSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Hover>;
  }

  export interface ProvideSignatureHelpSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      context: SignatureHelpContext,
      token: CancellationToken
    ): ProviderResult<SignatureHelp>;
  }

  export interface ProvideDefinitionSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<Definition | DefinitionLink[]>;
  }

  export interface ProvideReferencesSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      options: {
        includeDeclaration: boolean;
      },
      token: CancellationToken
    ): ProviderResult<Location[]>;
  }

  export interface ProvideDocumentHighlightsSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<DocumentHighlight[]>;
  }

  export interface ProvideDocumentSymbolsSignature {
    (
      this: void,
      document: LinesTextDocument,
      token: CancellationToken
    ): ProviderResult<SymbolInformation[] | DocumentSymbol[]>;
  }

  export interface ProvideWorkspaceSymbolsSignature {
    (this: void, query: string, token: CancellationToken): ProviderResult<
      WorkspaceSymbol[]
    >;
  }

  export interface ProvideCodeActionsSignature {
    (
      this: void,
      document: LinesTextDocument,
      range: Range,
      context: CodeActionContext,
      token: CancellationToken
    ): ProviderResult<(Command | CodeAction)[]>;
  }

  export interface ResolveCodeActionSignature {
    (
      this: void,
      item: CodeAction,
      token: CancellationToken
    ): ProviderResult<CodeAction>;
  }

  export interface ProvideCodeLensesSignature {
    (
      this: void,
      document: LinesTextDocument,
      token: CancellationToken
    ): ProviderResult<CodeLens[]>;
  }

  export interface ResolveCodeLensSignature {
    (
      this: void,
      codeLens: CodeLens,
      token: CancellationToken
    ): ProviderResult<CodeLens>;
  }

  export interface ProvideDocumentFormattingEditsSignature {
    (
      this: void,
      document: LinesTextDocument,
      options: FormattingOptions,
      token: CancellationToken
    ): ProviderResult<TextEdit[]>;
  }

  export interface ProvideDocumentRangeFormattingEditsSignature {
    (
      this: void,
      document: LinesTextDocument,
      range: Range,
      options: FormattingOptions,
      token: CancellationToken
    ): ProviderResult<TextEdit[]>;
  }

  export interface ProvideOnTypeFormattingEditsSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      ch: string,
      options: FormattingOptions,
      token: CancellationToken
    ): ProviderResult<TextEdit[]>;
  }

  export interface PrepareRenameSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken
    ): ProviderResult<
      | Range
      | {
          range: Range;
          placeholder: string;
        }
    >;
  }

  export interface ProvideRenameEditsSignature {
    (
      this: void,
      document: LinesTextDocument,
      position: Position,
      newName: string,
      token: CancellationToken
    ): ProviderResult<WorkspaceEdit>;
  }

  export interface ProvideDocumentLinksSignature {
    (
      this: void,
      document: LinesTextDocument,
      token: CancellationToken
    ): ProviderResult<DocumentLink[]>;
  }

  export interface ResolveDocumentLinkSignature {
    (
      this: void,
      link: DocumentLink,
      token: CancellationToken
    ): ProviderResult<DocumentLink>;
  }

  export interface ExecuteCommandSignature {
    (this: void, command: string, args: any[]): ProviderResult<any>;
  }

  export interface NextSignature<P, R> {
    (this: void, data: P, next: (data: P) => R): R;
  }

  export interface DidChangeConfigurationSignature {
    (this: void, sections: string[] | undefined): void;
  }

  export interface DidChangeWatchedFileSignature {
    (this: void, event: FileEvent): void;
  }

  export interface _WorkspaceMiddleware {
    didChangeConfiguration?: (
      this: void,
      sections: string[] | undefined,
      next: DidChangeConfigurationSignature
    ) => Promise<void>;
    didChangeWatchedFile?: (
      this: void,
      event: FileEvent,
      next: DidChangeWatchedFileSignature
    ) => void;
  }

  export type WorkspaceMiddleware = _WorkspaceMiddleware &
    ConfigurationWorkspaceMiddleware &
    WorkspaceFolderWorkspaceMiddleware &
    FileOperationsMiddleware;

  export interface ShowDocumentParams {
    
    uri: string;
    
    external?: boolean;
    
    takeFocus?: boolean;
    
    selection?: Range;
  }
  
  export interface ShowDocumentResult {
    
    success: boolean;
  }

  export interface _WindowMiddleware {
    showDocument?: (
      this: void,
      params: ShowDocumentParams,
      next: RequestHandler<ShowDocumentParams, ShowDocumentResult, void>
    ) => Promise<ShowDocumentResult>;
  }
  export type WindowMiddleware = _WindowMiddleware;

  interface _Middleware {
    didOpen?: NextSignature<LinesTextDocument, Promise<void>>;
    didChange?: NextSignature<DidChangeTextDocumentParams, Promise<void>>;
    willSave?: NextSignature<TextDocumentWillSaveEvent, Promise<void>>;
    willSaveWaitUntil?: NextSignature<
      TextDocumentWillSaveEvent,
      Thenable<TextEdit[]>
    >;
    didSave?: NextSignature<LinesTextDocument, Promise<void>>;
    didClose?: NextSignature<LinesTextDocument, Promise<void>>;
    handleDiagnostics?: (
      this: void,
      uri: string,
      diagnostics: Diagnostic[],
      next: HandleDiagnosticsSignature
    ) => void;
    provideCompletionItem?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      context: CompletionContext,
      token: CancellationToken,
      next: ProvideCompletionItemsSignature
    ) => ProviderResult<CompletionItem[] | CompletionList | null>;
    resolveCompletionItem?: (
      this: void,
      item: CompletionItem,
      token: CancellationToken,
      next: ResolveCompletionItemSignature
    ) => ProviderResult<CompletionItem>;
    provideHover?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      next: ProvideHoverSignature
    ) => ProviderResult<Hover>;
    provideSignatureHelp?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      context: SignatureHelpContext,
      token: CancellationToken,
      next: ProvideSignatureHelpSignature
    ) => ProviderResult<SignatureHelp>;
    provideDefinition?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      next: ProvideDefinitionSignature
    ) => ProviderResult<Definition | DefinitionLink[]>;
    provideReferences?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      options: {
        includeDeclaration: boolean;
      },
      token: CancellationToken,
      next: ProvideReferencesSignature
    ) => ProviderResult<Location[]>;
    provideDocumentHighlights?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      next: ProvideDocumentHighlightsSignature
    ) => ProviderResult<DocumentHighlight[]>;
    provideDocumentSymbols?: (
      this: void,
      document: LinesTextDocument,
      token: CancellationToken,
      next: ProvideDocumentSymbolsSignature
    ) => ProviderResult<SymbolInformation[] | DocumentSymbol[]>;
    provideWorkspaceSymbols?: (
      this: void,
      query: string,
      token: CancellationToken,
      next: ProvideWorkspaceSymbolsSignature
    ) => ProviderResult<WorkspaceSymbol[]>;
    provideCodeActions?: (
      this: void,
      document: LinesTextDocument,
      range: Range,
      context: CodeActionContext,
      token: CancellationToken,
      next: ProvideCodeActionsSignature
    ) => ProviderResult<(Command | CodeAction)[]>;
    handleWorkDoneProgress?: (
      this: void,
      token: ProgressToken,
      params:
        | WorkDoneProgressBegin
        | WorkDoneProgressReport
        | WorkDoneProgressEnd,
      next: HandleWorkDoneProgressSignature
    ) => void;
    resolveCodeAction?: (
      this: void,
      item: CodeAction,
      token: CancellationToken,
      next: ResolveCodeActionSignature
    ) => ProviderResult<CodeAction>;
    provideCodeLenses?: (
      this: void,
      document: LinesTextDocument,
      token: CancellationToken,
      next: ProvideCodeLensesSignature
    ) => ProviderResult<CodeLens[]>;
    resolveCodeLens?: (
      this: void,
      codeLens: CodeLens,
      token: CancellationToken,
      next: ResolveCodeLensSignature
    ) => ProviderResult<CodeLens>;
    provideDocumentFormattingEdits?: (
      this: void,
      document: LinesTextDocument,
      options: FormattingOptions,
      token: CancellationToken,
      next: ProvideDocumentFormattingEditsSignature
    ) => ProviderResult<TextEdit[]>;
    provideDocumentRangeFormattingEdits?: (
      this: void,
      document: LinesTextDocument,
      range: Range,
      options: FormattingOptions,
      token: CancellationToken,
      next: ProvideDocumentRangeFormattingEditsSignature
    ) => ProviderResult<TextEdit[]>;
    provideOnTypeFormattingEdits?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      ch: string,
      options: FormattingOptions,
      token: CancellationToken,
      next: ProvideOnTypeFormattingEditsSignature
    ) => ProviderResult<TextEdit[]>;
    prepareRename?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      token: CancellationToken,
      next: PrepareRenameSignature
    ) => ProviderResult<
      | Range
      | {
          range: Range;
          placeholder: string;
        }
    >;
    provideRenameEdits?: (
      this: void,
      document: LinesTextDocument,
      position: Position,
      newName: string,
      token: CancellationToken,
      next: ProvideRenameEditsSignature
    ) => ProviderResult<WorkspaceEdit>;
    provideDocumentLinks?: (
      this: void,
      document: LinesTextDocument,
      token: CancellationToken,
      next: ProvideDocumentLinksSignature
    ) => ProviderResult<DocumentLink[]>;
    resolveDocumentLink?: (
      this: void,
      link: DocumentLink,
      token: CancellationToken,
      next: ResolveDocumentLinkSignature
    ) => ProviderResult<DocumentLink>;
    executeCommand?: (
      this: void,
      command: string,
      args: any[],
      next: ExecuteCommandSignature
    ) => ProviderResult<any>;
    workspace?: WorkspaceMiddleware;
    window?: WindowMiddleware;
  }
  export type Middleware = _Middleware &
    TypeDefinitionMiddleware &
    ImplementationMiddleware &
    ColorProviderMiddleware &
    DeclarationMiddleware &
    FoldingRangeProviderMiddleware &
    CallHierarchyMiddleware &
    SemanticTokensMiddleware &
    LinkedEditingRangeMiddleware &
    SelectionRangeProviderMiddleware &
    DiagnosticProviderMiddleware;

  export interface ConnectionOptions {
    maxRestartCount?: number;
  }

  export interface DiagnosticPullOptions {
    
    onChange?: boolean;

    onSave?: boolean;

    workspace?: boolean;
    
    ignored?: string[];

    filter?(
      document: { uri: string; languageId: string },
      mode: "onType" | "onSave"
    ): boolean;
  }

  export interface LanguageClientOptions {
    ignoredRootPaths?: string[];
    disableSnippetCompletion?: boolean;
    disableDynamicRegister?: boolean;
    disabledFeatures?: string[];
    formatterPriority?: number;
    documentSelector?: DocumentSelector | string[];
    synchronize?: SynchronizeOptions;
    diagnosticCollectionName?: string;
    outputChannelName?: string;
    outputChannel?: OutputChannel;
    revealOutputChannelOn?: RevealOutputChannelOn;
    
    stdioEncoding?: string;
    initializationOptions?: any | (() => any);
    initializationFailedHandler?: InitializationFailedHandler;
    progressOnInitialization?: boolean;
    errorHandler?: ErrorHandler;
    middleware?: Middleware;
    workspaceFolder?: WorkspaceFolder;
    connectionOptions?: ConnectionOptions;
    diagnosticPullOptions?: DiagnosticPullOptions;
    markdown?: {
      isTrusted?: boolean;
      
      supportHtml?: boolean;
    };
  }
  export enum State {
    Stopped = 1,
    Running = 2,
    Starting = 3,
  }
  export interface StateChangeEvent {
    oldState: State;
    newState: State;
  }
  export enum ClientState {
    Initial = 0,
    Starting = 1,
    StartFailed = 2,
    Running = 3,
    Stopping = 4,
    Stopped = 5,
  }
  export interface RegistrationData<T> {
    id: string;
    registerOptions: T;
  }

  export type FeatureState =
    | {
        kind: "document";

        id: string;

        registrations: boolean;

        matches: boolean;
      }
    | {
        kind: "workspace";

        id: string;

        registrations: boolean;
      }
    | {
        kind: "window";

        id: string;

        registrations: boolean;
      }
    | {
        kind: "static";
      };
  
  export interface StaticFeature {
    
    fillInitializeParams?: (params: object) => void;
    
    fillClientCapabilities(capabilities: object): void;
    
    preInitialize?: (
      capabilities: object,
      documentSelector: DocumentSelector | undefined
    ) => void;
    
    initialize(
      capabilities: object,
      documentSelector: DocumentSelector | undefined
    ): void;
    
    getState?(): FeatureState;
    
    dispose(): void;
  }

  export interface DynamicFeature<RO> {
    
    fillInitializeParams?: (params: InitializeParams) => void;
    
    fillClientCapabilities(capabilities: any): void;
    
    initialize(
      capabilities: object,
      documentSelector: DocumentSelector | undefined
    ): void;

    preInitialize?: (
      capabilities: object,
      documentSelector: DocumentSelector | undefined
    ) => void;
    
    registrationType: RegistrationType<RO>;
    
    register(data: RegistrationData<RO>): void;
    
    unregister(id: string): void;
    
    getState?(): FeatureState;
    
    dispose(): void;
  }

  class ParameterStructures {
    private readonly kind;
    
    static readonly auto: ParameterStructures;
    
    static readonly byPosition: ParameterStructures;
    
    static readonly byName: ParameterStructures;
    private constructor();
    static is(value: any): value is ParameterStructures;
    toString(): string;
  }
  
  export interface MessageSignature {
    readonly method: string;
    readonly numberOfParams: number;
    readonly parameterStructures: ParameterStructures;
  }

  abstract class AbstractMessageSignature implements MessageSignature {
    readonly method: string;
    readonly numberOfParams: number;
    constructor(method: string, numberOfParams: number);
    get parameterStructures(): ParameterStructures;
  }

  export class RequestType0<R, E> extends AbstractMessageSignature {
    
    readonly _: [R, E, _EM] | undefined;
    constructor(method: string);
  }

  export class RequestType<P, R, E> extends AbstractMessageSignature {
    private _parameterStructures;
    
    readonly _: [P, R, E, _EM] | undefined;
    constructor(method: string, _parameterStructures?: ParameterStructures);
    get parameterStructures(): ParameterStructures;
  }

  export class NotificationType<P> extends AbstractMessageSignature {
    
    readonly _: [P, _EM] | undefined;
    constructor(method: string);
  }

  export class NotificationType0 extends AbstractMessageSignature {
    
    readonly _: [_EM] | undefined;
    constructor(method: string);
  }

  export interface InitializeParams {
    
    processId: number | null;
    
    clientInfo?: {
      
      name: string;
      
      version?: string;
    };
    
    rootPath?: string | null;
    
    rootUri: string | null;
    
    capabilities: any;
    
    initializationOptions?: any;
    
    trace?: "off" | "messages" | "verbose";
    
    workDoneToken?: ProgressToken;
  }

  class RegistrationType<RO> {
    
    readonly ____: [RO, _EM] | undefined;
    readonly method: string;
    constructor(method: string);
  }
  
  export interface InitializeResult {
    
    capabilities: any;
    
    serverInfo?: {
      
      name: string;
      
      version?: string;
    };
    
    [custom: string]: any;
  }

  export interface NotificationFeature<T extends Function> {
    
    getProvider(document: { uri: string; languageId: string }): {
      send: T;
    };
  }

  export interface ExecutableOptions {
    cwd?: string;
    env?: any;
    detached?: boolean;
    shell?: boolean;
  }

  export interface Executable {
    command: string;
    args?: string[];
    options?: ExecutableOptions;
  }

  export interface ForkOptions {
    cwd?: string;
    env?: any;
    execPath?: string;
    encoding?: string;
    execArgv?: string[];
  }

  export interface StreamInfo {
    writer: NodeJS.WritableStream;
    reader: NodeJS.ReadableStream;
    detached?: boolean;
  }

  export enum TransportKind {
    stdio = 0,
    ipc = 1,
    pipe = 2,
    socket = 3,
  }

  export interface SocketTransport {
    kind: TransportKind.socket;
    port: number;
  }

  export interface NodeModule {
    module: string;
    transport?: TransportKind | SocketTransport;
    args?: string[];
    runtime?: string;
    options?: ForkOptions;
  }

  export interface ChildProcessInfo {
    process: cp.ChildProcess;
    detached: boolean;
  }

  export interface PartialMessageInfo {
    readonly messageToken: number;
    readonly waitingTime: number;
  }

  export interface MessageReader {
    readonly onError: Event<Error>;
    readonly onClose: Event<void>;
    readonly onPartialMessage: Event<PartialMessageInfo>;
    listen(callback: (data: { jsonrpc: string }) => void): void;
    dispose(): void;
  }

  export interface MessageWriter {
    readonly onError: Event<
      [Error, { jsonrpc: string } | undefined, number | undefined]
    >;
    readonly onClose: Event<void>;
    write(msg: { jsonrpc: string }): void;
    dispose(): void;
  }

  export class NullLogger {
    constructor();
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    log(message: string): void;
  }

  export interface MessageTransports {
    reader: MessageReader;
    writer: MessageWriter;
    detached?: boolean;
  }

  export namespace MessageTransports {
    
    function is(value: any): value is MessageTransports;
  }

  export type ServerOptions =
    | Executable
    | NodeModule
    | {
        run: Executable;
        debug: Executable;
      }
    | {
        run: NodeModule;
        debug: NodeModule;
      }
    | (() => Promise<
        cp.ChildProcess | StreamInfo | MessageTransports | ChildProcessInfo
      >);

  export interface _EM {
    _$endMarker$_: number;
  }

  export class ProgressType<PR> {
    
    readonly __?: [PR, _EM];
    readonly _pr?: PR;
    constructor();
  }

  export enum Trace {
    Off = 0,
    Messages = 1,
    Verbose = 2,
  }

  export class ProtocolRequestType0<R, PR, E, RO>
    extends RequestType0<R, E>
    implements ProgressType<PR>, RegistrationType<RO>
  {
    
    readonly ___: [PR, RO, _EM] | undefined;
    readonly ____: [RO, _EM] | undefined;
    readonly _pr: PR | undefined;
    constructor(method: string);
  }

  export class ProtocolRequestType<P, R, PR, E, RO>
    extends RequestType<P, R, E>
    implements ProgressType<PR>, RegistrationType<RO>
  {
    
    readonly ___: [PR, RO, _EM] | undefined;
    readonly ____: [RO, _EM] | undefined;
    readonly _pr: PR | undefined;
    constructor(method: string);
  }

  export class ProtocolNotificationType0<RO>
    extends NotificationType0
    implements RegistrationType<RO>
  {
    
    readonly ___: [RO, _EM] | undefined;
    readonly ____: [RO, _EM] | undefined;
    constructor(method: string);
  }
  export class ProtocolNotificationType<P, RO>
    extends NotificationType<P>
    implements RegistrationType<RO>
  {
    
    readonly ___: [RO, _EM] | undefined;
    readonly ____: [RO, _EM] | undefined;
    constructor(method: string);
  }

  export interface NotificationHandler0 {
    (): void;
  }

  export interface NotificationHandler<P> {
    (params: P): void;
  }

  export class LanguageClient {
    readonly id: string;
    readonly name: string;
    constructor(
      id: string,
      name: string,
      serverOptions: ServerOptions,
      clientOptions: LanguageClientOptions,
      forceDebug?: boolean
    );
    
    constructor(
      name: string,
      serverOptions: ServerOptions,
      clientOptions: LanguageClientOptions,
      forceDebug?: boolean
    );

    sendRequest<R, PR, E, RO>(
      type: ProtocolRequestType0<R, PR, E, RO>,
      token?: CancellationToken
    ): Promise<R>;
    sendRequest<P, R, PR, E, RO>(
      type: ProtocolRequestType<P, R, PR, E, RO>,
      params: P,
      token?: CancellationToken
    ): Promise<R>;
    
    sendRequest<R, E>(
      type: RequestType0<R, E>,
      token?: CancellationToken
    ): Promise<R>;
    
    sendRequest<P, R, E>(
      type: RequestType<P, R, E>,
      params: P,
      token?: CancellationToken
    ): Promise<R>;
    sendRequest<R>(method: string, token?: CancellationToken): Promise<R>;
    sendRequest<R>(
      method: string,
      param: any,
      token?: CancellationToken
    ): Promise<R>;

    onRequest<R, PR, E, RO>(
      type: ProtocolRequestType0<R, PR, E, RO>,
      handler: RequestHandler0<R, E>
    ): Disposable;
    onRequest<P, R, PR, E, RO>(
      type: ProtocolRequestType<P, R, PR, E, RO>,
      handler: RequestHandler<P, R, E>
    ): Disposable;
    onRequest<R, E>(
      type: RequestType0<R, E>,
      handler: RequestHandler0<R, E>
    ): Disposable;
    onRequest<P, R, E>(
      type: RequestType<P, R, E>,
      handler: RequestHandler<P, R, E>
    ): Disposable;
    onRequest<R, E>(
      method: string,
      handler: (...params: any[]) => HandlerResult<R, E>
    ): Disposable;

    sendNotification<RO>(type: ProtocolNotificationType0<RO>): Promise<void>;
    sendNotification<P, RO>(
      type: ProtocolNotificationType<P, RO>,
      params?: P
    ): Promise<void>;
    sendNotification(type: NotificationType0): Promise<void>;
    sendNotification<P>(type: NotificationType<P>, params?: P): Promise<void>;
    sendNotification(method: string): Promise<void>;
    sendNotification(method: string, params: any): Promise<void>;

    onNotification<RO>(
      type: ProtocolNotificationType0<RO>,
      handler: NotificationHandler0
    ): Disposable;
    onNotification<P, RO>(
      type: ProtocolNotificationType<P, RO>,
      handler: NotificationHandler<P>
    ): Disposable;
    onNotification(type: NotificationType0, handler: () => void): Disposable;
    onNotification<P>(
      type: NotificationType<P>,
      handler: (params: P) => void
    ): Disposable;
    onNotification(
      method: string,
      handler: (...params: any[]) => void
    ): Disposable;

    onProgress<P>(
      type: ProgressType<any>,
      token: string | number,
      handler: (params: P) => void
    ): Disposable;
    sendProgress<P>(
      type: ProgressType<P>,
      token: string | number,
      value: P
    ): Promise<void>;

    info(message: string, data?: any): void;
    
    warn(message: string, data?: any): void;
    
    error(message: string, data?: any): void;
    getPublicState(): State;

    readonly initializeResult: InitializeResult | undefined;
    readonly clientOptions: LanguageClientOptions;
    readonly outputChannel: OutputChannel;
    
    readonly onDidChangeState: Event<StateChangeEvent>;
    readonly diagnostics: DiagnosticCollection | undefined;
    
    readonly serviceState: ServiceStat;
    readonly started: boolean;
    
    needsStart(): boolean;
    
    needsStop(): boolean;
    onReady(): Promise<void>;
    set trace(value: Trace);

    stop(): Promise<void>;

    start(): Promise<void>;
    
    restart(): void;

    registerFeature(feature: StaticFeature | DynamicFeature<any>): void;

    handleFailedRequest<T, P extends { kind: string }>(
      type: P,
      token: CancellationToken | undefined,
      error: any,
      defaultValue: T
    );
  }

  export class SettingMonitor {
    constructor(client: LanguageClient, setting: string);
    start(): Disposable;
  }
  
}