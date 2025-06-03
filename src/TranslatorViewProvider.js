const vscode = require("vscode");
const { translate } = require("./volcTranslate");

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

    // 发送初始语言设置
    const config = vscode.workspace.getConfiguration("vscode-translator");
    const targetLanguage = config.get("targetLanguage", "en");
    webviewView.webview.postMessage({
      type: "setDefaultLang",
      lang: targetLanguage,
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
      }
    });
  }

  _getHtmlForWebview() {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VSCode 翻译器</title>
    <style>
      body {
        padding: 10px;
        color: var(--vscode-foreground);
        font-family: var(--vscode-font-family);
      }
      textarea,
      input,
      button {
        width: 100%;
        background-color: var(--vscode-input-background);
        color: var(--vscode-input-foreground);
        border: 1px solid var(--vscode-input-border);
        padding: 5px;
        box-sizing: border-box;
        outline: none;
      }
      textarea {
        height: 100px;
        resize: vertical;
      }
      button {
        background-color: var(--vscode-button-background);
        color: var(--vscode-button-foreground);
        border: none;
        padding: 8px;
        cursor: pointer;
      }
      button:hover {
        background-color: var(--vscode-button-hoverBackground);
      }
      .result {
        border: 1px solid var(--vscode-input-border);
        padding: 10px;
        background-color: var(--vscode-editor-background);
        min-height: 100px;
      }
      label {
        display: block;
        margin-bottom: 5px;
      }
      textarea,
      input,
      .result {
        margin-bottom: 5px;
      }
      button {
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <label for="targetLang">目标语言:</label>
    <input id="targetLang" placeholder="请输入..." />
    <button id="updateLangBtn">更新</button>

    <label for="sourceText">输入要翻译的文本:</label>
    <textarea id="sourceText" placeholder="请输入..."></textarea>
    <button id="translateBtn">翻译</button>

    <label for="resultText">翻译结果:</label>
    <div id="resultText" class="result"></div>
    <button id="copyBtn">复制</button>

    <script>
      const vscode = acquireVsCodeApi();
      const sourceTextArea = document.getElementById("sourceText");
      const targetLangInput = document.getElementById("targetLang");
      const translateBtn = document.getElementById("translateBtn");
      const updateLangBtn = document.getElementById("updateLangBtn");
      const resultDiv = document.getElementById("resultText");
      const copyBtn = document.getElementById("copyBtn");

      // 获取VSCode设置中的默认目标语言
      window.addEventListener("message", (event) => {
        const message = event.data;
        switch (message.type) {
          case "translationResult":
            resultDiv.textContent = message.translation;
            break;
          case "error":
            resultDiv.textContent = message.message;
            resultDiv.style.color = "var(--vscode-errorForeground)";
            break;
          case "setDefaultLang":
            targetLangInput.value = message.lang;
            break;
          case "configUpdated":
            if (message.success) {
              resultDiv.textContent = "目标语言已更新";
              resultDiv.style.color = "var(--vscode-foreground)";
            }
            break;
        }
      });

      translateBtn.addEventListener("click", () => {
        const text = sourceTextArea.value;
        if (!text) {
          resultDiv.textContent = "请输入要翻译的文本";
          resultDiv.style.color = "var(--vscode-errorForeground)";
          return;
        }

        resultDiv.textContent = "正在翻译...";
        resultDiv.style.color = "var(--vscode-foreground)";

        vscode.postMessage({
          type: "translate",
          text: text,
          targetLang: targetLangInput.value,
        });
      });

      updateLangBtn.addEventListener("click", () => {
        const lang = targetLangInput.value;
        if (!lang) return;

        vscode.postMessage({
          type: "updateTargetLang",
          lang: lang,
        });
      });

      copyBtn.addEventListener("click", () => {
        const text = resultDiv.textContent;
        if (!text) {
          return;
        }
        navigator.clipboard.writeText(text);
      });
    </script>
  </body>
</html>
`;
  }
}

module.exports = TranslatorViewProvider;
