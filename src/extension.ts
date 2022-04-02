// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Notices } from './notices';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "noticebord" is now active!');

	// noticebord.helloWorld
	const helloWorldCommand = vscode.commands.registerCommand('noticebord.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Noticebord!');
	});

	const showOverviewCommand = vscode.commands.registerCommand('noticebord.showOverview', () => {
		vscode.window.showInformationMessage('Showing overview from Noticebord!');
	});

	const showProfileCommand = vscode.commands.registerCommand('noticebord.showProfile', () => {
		vscode.window.showInformationMessage('Showing profile from Noticebord!');
	});

	const createNoticeCommand = vscode.commands.registerCommand('noticebord.createNotice', () => {
		vscode.window.showInformationMessage('Creating notice from Noticebord!');
	});

	const createTeamNoticeCommand = vscode.commands.registerCommand('noticebord.createTeamNotice', () => {
		vscode.window.showInformationMessage('Creating team notice from Noticebord!');
	});

	new Notices(context);

	context.subscriptions.push(helloWorldCommand, showOverviewCommand, showProfileCommand, createNoticeCommand, createTeamNoticeCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
