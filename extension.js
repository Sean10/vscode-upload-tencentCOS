// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path')
const COSUpload = require('./lib/upload')

const upload = (config, fsPath) => {
    if (!fsPath) return
    console.log(fsPath)

    const editor = vscode.window.activeTextEditor
    const mdFilePath = editor.document.fileName
    const mdFileName = path.win32.basename(mdFilePath, path.extname(mdFilePath))

    return COSUpload(config, fsPath, mdFileName).then(({ name, url}) => {
        console.log('Upload success')

        const img = `![${name}](${url})`

        editor.edit(textEditorEdit => {
            textEditorEdit.insert(editor.selection.active, img)
        })
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
            vscode.window.showErrorMessage("没有打开编辑窗口")
            return 
        }

        vscode.window.showInputBox({
            placeHolder: '请输入一个图片地址'
        })
        .then(fsPath => upload(config, fsPath), error)
    })

    let selectUpload = vscode.commands.registerCommand('extension.tencentCOS.select', () => {
        vscode.window.showOpenDialog({
            filters: {'Images': ['png', 'jpg', 'gif', 'bmp']}
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