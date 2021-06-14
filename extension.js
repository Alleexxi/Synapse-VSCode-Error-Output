// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const WebSocket = require("ws");

let server;
let Synapse = vscode.window.createOutputChannel("Synapse");


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    server = new WebSocket.Server({ port: 34523 });
    server.on("connection", (ws) => {
        console.log("sadasdsad")
        console.log("Player connected...")
        ws.on("message", data => {
           console.log(`Error/Output: ${data}`) 
           Synapse.appendLine(`Error/Output: ${data}`);
        });
        Synapse.show(true);
    });

    let disposable = vscode.commands.registerCommand('synapseoutput.helloWorld', () => {
        console.log("Test")
        Synapse.appendLine("Test");
    });
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
