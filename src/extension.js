const vscode = require("vscode");
const { translate } = require("./volcTranslate");
const TranslatorViewProvider = require("./TranslatorViewProvider");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const translateClassCommand = vscode.commands.registerCommand(
    "code-lingo.translate",
    function () {
      registerCommandFunction("class");
    }
  );
  const translateVariableCommand = vscode.commands.registerCommand(
    "code-lingo.translateVariable",
    function () {
      registerCommandFunction("variable");
    }
  );

  // 注册侧边栏视图提供者
  const translatorViewProvider = new TranslatorViewProvider(context);
  const translatorView = vscode.window.registerWebviewViewProvider(
    "code-lingo.translatorView",
    translatorViewProvider
  );

  context.subscriptions.push(
    translateClassCommand,
    translateVariableCommand,
    translatorView
  );
}

async function registerCommandFunction(type) {

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
    vscode.window.showErrorMessage("请先选择要翻译的文本");
    return;
  }

  // 显示状态栏消息
  vscode.window.setStatusBarMessage("正在翻译...", 2000);

  // 获取目标语言设置
  const config = vscode.workspace.getConfiguration("code-lingo");
  const targetLanguage = config.get("targetLanguage", "en");

  // 调用翻译API
  const translatedText = await translate(text, targetLanguage, type);

  if (translatedText) {
    // 替换选中的文本
    await editor.edit((editBuilder) => {
      editBuilder.replace(selection, translatedText);
    });
    vscode.window.setStatusBarMessage("翻译完成", 2000);
  }
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
