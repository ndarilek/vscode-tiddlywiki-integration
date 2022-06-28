import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    const provider = new Provider(context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider("tiddlyWikiView", provider));
}

class Provider implements vscode.WebviewViewProvider {

    view: vscode.WebviewView | null = null;

    constructor(private context: vscode.ExtensionContext) { }

    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken) {
        this.view = webviewView;
        this.view.webview.options = {
            enableScripts: true
        };
        const config = vscode.workspace.getConfiguration("tiddlywiki-integration");
        const rootPath = vscode.workspace.rootPath;
        if (rootPath) {
            let wikiPath: string | undefined = config.get("path");
            if (wikiPath) {
                wikiPath = path.join(rootPath, wikiPath);
                if (!fs.existsSync(wikiPath as string)) {
                    console.log("Does not exist");
                }
                this.view.webview.html = fs.readFileSync(wikiPath).toString();
            } else {
                vscode.window.showErrorMessage("Please configure a wiki path relative to the workspace root.");
            }
        } else {
            vscode.window.showErrorMessage("Please open a workspace to use this extension.");
        }
    }
}