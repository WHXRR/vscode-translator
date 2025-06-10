const vscode = require("vscode");
const { translate } = require("./volcTranslate");
const html = require("./html");

class TranslatorViewProvider {
  constructor(context) {
    this._view = undefined;
    this._context = context;
  }

  resolveWebviewView(webviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._context.extensionUri, "media"),
        vscode.Uri.joinPath(this._context.extensionUri, "resources"),
      ],
    };
    webviewView.webview.html = this._getHtmlForWebview();

    // 处理来自WebView的消息
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "translate":
          try {
            const translatedText = await translate(
              data.text,
              data.targetLang,
              "normal"
            );
            webviewView.webview.postMessage({
              type: "translationResult",
              translation: translatedText,
            });
          } catch (error) {
            vscode.window.showErrorMessage(`翻译失败: ${error.message}`);
          }
          break;
        case "updateConfig":
          try {
            const { lang, replaceString, replaceVariableString } = data.data;
            await vscode.workspace
              .getConfiguration()
              .update(
                "code-lingo.targetLanguage",
                lang,
                vscode.ConfigurationTarget.Global
              );
            await vscode.workspace
              .getConfiguration()
              .update(
                "code-lingo.targetReplaceString",
                replaceString,
                vscode.ConfigurationTarget.Global
              );
            await vscode.workspace
              .getConfiguration()
              .update(
                "code-lingo.targetReplaceVariable",
                replaceVariableString,
                vscode.ConfigurationTarget.Global
              );
            vscode.window.setStatusBarMessage("配置已更新", 2000);
          } catch (error) {
            vscode.window.showErrorMessage(`更新配置失败: ${error.message}`);
          }
          break;
        case "webviewReady":
          setDefaultConfig();
          break;
      }
    });
    const setDefaultConfig = () => {
      const config = vscode.workspace.getConfiguration("code-lingo");
      // 设置初始语言
      const targetLanguage = config.get("targetLanguage", "en");
      webviewView.webview.postMessage({
        type: "setDefaultLang",
        lang: targetLanguage,
      });
      // 设置初始字符串替换设置
      const targetReplaceString = config.get("targetReplaceString", "-");
      webviewView.webview.postMessage({
        type: "setReplaceString",
        replaceString: targetReplaceString,
      });
      // 设置初始字符串格式设置
      const targetReplaceVariable = config.get(
        "targetReplaceVariable",
        "camelCase"
      );
      webviewView.webview.postMessage({
        type: "setReplaceVariable",
        replaceVariable: targetReplaceVariable,
      });
    };
  }

  _getHtmlForWebview() {
    return html;
  }
}

module.exports = TranslatorViewProvider;
