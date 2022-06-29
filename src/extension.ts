import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    const provider = new Provider(context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider("tiddlyWikiView", provider, { webviewOptions: { retainContextWhenHidden: true } }));
}

class Provider implements vscode.WebviewViewProvider {

    view: vscode.WebviewView | null = null;

    constructor(private context: vscode.ExtensionContext) { }

    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        this.view = webviewView;
        this.view.webview.options = {
            enableScripts: true
        };
        const rootPath = vscode.workspace.rootPath;
        if (rootPath) {
            const config = vscode.workspace.getConfiguration("tiddlywiki-integration");
            let wikiPath: string | undefined = config.get("path");
            if (wikiPath) {
                wikiPath = path.join(rootPath, wikiPath);
                if (!fs.existsSync(wikiPath as string)) {
                    const emptyPath = path.join(this.context.extensionPath, "resources", "empty.html");
                    fs.copyFileSync(emptyPath, wikiPath);
                }
                this.view.webview.html = fs.readFileSync(wikiPath).toString();
                this.view.webview.onDidReceiveMessage(message => {
                    switch (message.command) {
                        case "save":
                            try {
                                if (wikiPath) {
                                    fs.writeFileSync(wikiPath, message.text);
                                }
                            } catch (err) {
                                vscode.window.showErrorMessage(`Failed to save: ${err}`);
                            }
                            return;
                    }
                });
            } else {
                vscode.window.showErrorMessage("Please configure a wiki path relative to the workspace root.");
            }
        } else {
            vscode.window.showErrorMessage("Please open a workspace to use this extension.");
        }
    }
}