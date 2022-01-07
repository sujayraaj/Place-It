// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "placeit" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('placeit.placeIt', () => {
		const editor = vscode.window.activeTextEditor;
		let selectedText = '', selection: vscode.Selection, POJO;
		if (editor) {
			selection = editor.selection;
			selectedText = editor.document.getText(selection);
		}
		if (selectedText) {
			vscode.window.showInformationMessage(`${selectedText}`);
			try {
				POJO = Function(`return ${selectedText}`)();
				if (typeof POJO === "string") {
					POJO = JSON.parse(POJO);
				}
			} catch (e) {
				vscode.window.showErrorMessage(`Bad format Text selected`);
				return;
			}

			const { width, height, background, text, textColor, fontFamily, fontSize, fontWeight } = POJO;
			const placeholderTextEnabled = !!text;
			const e = placeholderTextEnabled
				? `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"> 
					<rect x="0" y="0" width="${width}" height="${height}" fill="${background || 'black'}"/> 
					<text x="50%" y="50%" fill="${textColor || 'white'}" 
						font-family="${fontFamily || 'sans-serif'}" 
						font-size="${fontSize || '16px'}" font-weight="${fontWeight || 'regular'}" text-anchor="middle" alignment-baseline="middle">${text}</text> </svg>`
				: `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"> 
					<rect x="0" y="0" width="${width}" height="${height}" fill="${background || 'black'}"/></svg>`;

			const image = `<img src="data:image/svg+xml;utf8,${encodeURIComponent(e)}"/>`;

			editor?.edit(builder => {
				builder.replace(selection, image);
			});
		} else {
			vscode.window.showInformationMessage(`No text selected.`);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
