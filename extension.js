const vscode = require('vscode');
const path = require('path')
const COSUpload = require('./lib/upload')


const upload = (config, fsPath) => {
    if (!fsPath) return
    console.log(fsPath)

    const editor = vscode.window.activeTextEditor
    const mdFilePath = editor.document.uri.fsPath

    return COSUpload(config, fsPath, mdFilePath).then(({name, url}) => {
        console.log('Succeed to upload image.')

        const img = `![${name}](${url})`

        editor.edit(textEditorEdit => {
            textEditorEdit.insert(editor.selection.active, img)
        })
    }).catch(error => {
        // console.log(error)
        vscode.window.showErrorMessage("Failed to upload image. Error:" + error)
    })
}

const error = err => vscode.window.showErrorMessage(err)

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('vscode-upload-tencentcos is now active!');

    const config = vscode.workspace.getConfiguration('tencentCOS')
    console.log(config)
    // if (!config.enable) return

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let inputUpload = vscode.commands.registerCommand('extension.tencentCOS.upload', () => {
        
        if (!vscode.window.activeTextEditor) {
            vscode.window.showErrorMessage("No editable window is open.")
            return 
        }

        vscode.window.showInputBox({
            placeHolder: 'Please input the image path'
        })
        .then(fsPath => upload(config, fsPath), error)
    })

    let selectUpload = vscode.commands.registerCommand('extension.tencentCOS.select', () => {
        vscode.window.showOpenDialog({
            filters: {'Images': ['png', 'jpg', 'gif', 'bmp', 'jpeg', 'svg', 'webp']}
        }).then(result => {
            console.log(result)
            if (result) {
                const {fsPath} = result[0]
                return upload(config, fsPath)
            }
        }, error)
    })

    context.subscriptions.push(inputUpload);
    context.subscriptions.push(selectUpload);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
