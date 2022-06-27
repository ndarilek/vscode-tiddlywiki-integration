import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand("tiddlywiki-integration.focusWiki", () => {
        vscode.window.showInformationMessage("Focusing wiki");
    }));
}