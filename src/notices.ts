import internal = require('stream');
import * as vscode from 'vscode';

export class Node {
	constructor(readonly id: number, readonly resource: vscode.Uri = vscode.Uri.parse(`noticebord://notices/${id}`), readonly label: string = `Notice ${id}`) { }

}

export class NoticesDataProvider implements vscode.TreeDataProvider<Node>, vscode.TextDocumentContentProvider {
	constructor() { }

	provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
		const parts = uri.path.split("/");
		const id = parts[parts.length - 1];

		// TODO: Insert API call here

		return `Notice content:\n\n`
		 + `Notice ID: ${id}\n`
		 + `Notice Label: Notice ${id}\n`
		 + `Internal URI: ${uri}\n`
		 + `External URI (Web): https://noticebord.io/notices/${id}\n`
		 + `External URI (API): https://noticebord.io/api/notices/${id}`;
	}

	getTreeItem(element: Node): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return {
			label: element.label,
			resourceUri: element.resource,
			collapsibleState: void 0,
			command: {
				command: 'notices.showNotice',
				arguments: [element.resource],
				title: 'Show Notice'
			}
		};
	}

	getChildren(element?: Node): vscode.ProviderResult<Node[]> {
		if (!element) {
			// TODO: Insert API call here
			return [...Array(20).keys()].map((_, i) => new Node(i + 1));
		}

		return [];
	}
}

export class Notices {
	constructor(context: vscode.ExtensionContext) {
		const treeDataProvider = new NoticesDataProvider();
		const textDocumentProvider = vscode.workspace.registerTextDocumentContentProvider('noticebord', treeDataProvider);
		context.subscriptions.push(textDocumentProvider);
		vscode.window.createTreeView('notices', { treeDataProvider });
		vscode.commands.registerCommand('notices.showNotice', this.showNotice);
	}

	private showNotice(resource: vscode.Uri) {
		vscode.window.showTextDocument(resource);
	}
}