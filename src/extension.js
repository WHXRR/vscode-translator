const vscode = require("vscode");
const { translate } = require("./volcTranslate");
const TranslatorViewProvider = require("./TranslatorViewProvider");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const translateCommand = vscode.commands.registerCommand(
    "vscode-translator.translate",
    async function () {
      vscode.window.showInformationMessage(
        "Hello World from vscode-translator!"
      );

      // 获取当前编辑器
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("没有打开的编辑器");
        return;
      }

      // 获取选中的文本
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      if (!text) {
        vscode.window.showInformationMessage("请先选择要翻译的文本");
        return;
      }

      // 显示状态栏消息
      vscode.window.setStatusBarMessage("正在翻译...", 2000);

      // 获取目标语言设置
      const config = vscode.workspace.getConfiguration("vscode-translator");
      const targetLanguage = config.get("targetLanguage", "en");

      // 调用翻译API
      const translatedText = await translate(text, targetLanguage);

      if (translatedText) {
        // 替换选中的文本
        await editor.edit((editBuilder) => {
          editBuilder.replace(selection, translatedText);
        });
        vscode.window.setStatusBarMessage("翻译完成", 2000);
      } else {
        vscode.window.showErrorMessage("翻译失败");
      }
    }
  );

  // 注册侧边栏视图提供者
  const translatorViewProvider = new TranslatorViewProvider(context);
  const translatorView = vscode.window.registerWebviewViewProvider(
    "vscode-translator.translatorView",
    translatorViewProvider
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("vscode-translator.targetLanguage")) {
        // 如果WebView已经创建，发送更新的语言设置
        if (translatorViewProvider._view) {
          const config = vscode.workspace.getConfiguration("vscode-translator");
          const targetLanguage = config.get("targetLanguage", "en");
          translatorViewProvider._view.webview.postMessage({
            type: "setDefaultLang",
            lang: targetLanguage,
          });
        }
      }
    })
  );

  context.subscriptions.push(translateCommand, translatorView);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
