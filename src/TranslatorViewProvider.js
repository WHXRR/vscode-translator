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

    const config = vscode.workspace.getConfiguration("vscode-translator");
    // 发送初始语言设置
    const targetLanguage = config.get("targetLanguage", "en");
    webviewView.webview.postMessage({
      type: "setDefaultLang",
      lang: targetLanguage,
    });
    // 发送字符串替换设置
    const targetReplaceString = config.get("targetReplaceString", "-");
    webviewView.webview.postMessage({
      type: "setReplaceString",
      replaceString: targetReplaceString,
    });

    // 处理来自WebView的消息
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "translate":
          try {
            const translatedText = await translate(data.text, data.targetLang);
            // 发送翻译结果回WebView
            webviewView.webview.postMessage({
              type: "translationResult",
              translation: translatedText,
            });
          } catch (error) {
            webviewView.webview.postMessage({
              type: "error",
              message: `翻译失败: ${error.message}`,
            });
          }
          break;
        case "updateTargetLang":
          // 更新VSCode配置
          try {
            await vscode.workspace
              .getConfiguration()
              .update(
                "vscode-translator.targetLanguage",
                data.lang,
                vscode.ConfigurationTarget.Global
              );
            webviewView.webview.postMessage({
              type: "configUpdated",
              success: true,
            });
          } catch (error) {
            webviewView.webview.postMessage({
              type: "error",
              message: `更新配置失败: ${error.message}`,
            });
          }
          break;
        case "updateReplaceString":
          // 更新VSCode配置
          try {
            await vscode.workspace
              .getConfiguration()
              .update(
                "vscode-translator.targetReplaceString",
                data.replaceString,
                vscode.ConfigurationTarget.Global
              );
            webviewView.webview.postMessage({
              type: "configUpdated",
              success: true,
            });
          } catch (error) {
            webviewView.webview.postMessage({
              type: "error",
              message: `更新配置失败: ${error.message}`,
            });
          }
          break;
      }
    });
  }

  _getHtmlForWebview() {
    return html;
  }
}

module.exports = TranslatorViewProvider;
