// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
"use strict";
const vscode = require('vscode');
const generator = require('./lib/generator');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// This line of code will only be executed once when your extension is activated
	// @ts-ignore
	console.log('Congratulations, your extension "akos" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.akos', function () {
		// The code you place here will be executed every time your command is executed

		// process
		// 1. Get information on the selected text
		// 2. Identification code mapping
		// 3. Replace akos basic code snippets

		const activeTextEditor = vscode.window.activeTextEditor;
		const activeDocument = activeTextEditor.document;

		// 1. Get all the selected line information
		const selection = activeTextEditor.selection;
		// sample for selection: {"start":{"line":2,"character":0},"end":{"line":2,"character":7},"active":{"line":2,"character":7},"anchor":{"line":2,"character":0}}
		const { start, end } = selection;

		// The current line of text content
		const curLineText = activeDocument.lineAt(start.line).text;

		// The current line not punished the starting position
		// const curLineStartCharacter = curLineText.search(/\S/i);

		// The current behavior blank text
		// const curBlankText = curLineText.substring(0, curLineStartCharacter);

		// The currently selected text content
		const curText = curLineText.substring(start.character, end.character);

		// get config
		// const config = vscode.workspace.getConfiguration('vscodePluginAkos');
		// const identifier = config.get('identifier');

		// 调用编辑接口
		activeTextEditor.edit((TextEditorEdit) => {
			const { operation, content } = generator.getSnippets(curText);
			if (operation) {
				TextEditorEdit.replace(new vscode.Range(start, end), content);
			}
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
