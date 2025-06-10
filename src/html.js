const html = `
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
      button,
      select {
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
      .result,
      select {
        margin-bottom: 5px;
      }
      button {
        margin-bottom: 20px;
      }
    </style>
  </head>
  <body>
    <h3>配置</h3>
    <label for="replaceString">翻译HTML类名时的命名规则:</label>
    <select id="replaceString">
      <option value="-" selected>短横线</option>
      <option value="_">下划线</option>
      <option value=" ">空格</option>
    </select>

    <label for="replaceVariableString">翻译变量、函数时的命名规则:</label>
    <select id="replaceVariableString">
      <option value="camelCase" selected>小驼峰</option>
      <option value="pascalCase">大驼峰</option>
      <option value="kebabCase">短横线</option>
      <option value="snakeCase">下划线</option>
      <option value="screamingSnakeCase">全大写下划线</option>
    </select>

    <label for="targetLang">目标语言:</label>
    <input id="targetLang" placeholder="请输入..." />
    <button id="updateBtn">更新</button>

    <h3>翻译</h3>
    <label for="sourceText">普通翻译:</label>
    <textarea id="sourceText" placeholder="请输入..."></textarea>
    <button id="translateBtn">翻译</button>

    <label for="resultText">翻译结果:</label>
    <div id="resultText" class="result"></div>
    <button id="copyBtn">复制</button>

    <script>
      const vscode = acquireVsCodeApi();
      const replaceStringSelect = document.getElementById("replaceString");
      const replaceVariableStringSelect = document.getElementById(
        "replaceVariableString"
      );
      const targetLangInput = document.getElementById("targetLang");
      const updateBtn = document.getElementById("updateBtn");

      const sourceTextArea = document.getElementById("sourceText");
      const translateBtn = document.getElementById("translateBtn");
      const resultDiv = document.getElementById("resultText");
      const copyBtn = document.getElementById("copyBtn");

      // 获取VSCode设置中的默认目标语言
      window.addEventListener("message", (event) => {
        const message = event.data;
        switch (message.type) {
          case "translationResult":
            resultDiv.textContent = message.translation;
            break;
          case "setDefaultLang":
            targetLangInput.value = message.lang;
            break;
          case "setReplaceString":
            replaceStringSelect.value = message.replaceString;
            break;
          case "setReplaceVariable":
            replaceVariableStringSelect.value = message.replaceVariable;
            break;
        }
      });
      window.addEventListener("DOMContentLoaded", () => {
        vscode.postMessage({ type: "webviewReady" });
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

      copyBtn.addEventListener("click", () => {
        const text = resultDiv.textContent;
        if (!text) {
          return;
        }
        navigator.clipboard.writeText(text);
      });

      updateBtn.addEventListener("click", () => {
        const lang = targetLangInput.value;
        const replaceString = replaceStringSelect.value;
        const replaceVariableString = replaceVariableStringSelect.value;
        if (!lang) return;

        vscode.postMessage({
          type: "updateConfig",
          data: {
            lang,
            replaceString,
            replaceVariableString,
          },
        });
      });
    </script>
  </body>
</html>

`;

module.exports = html;
