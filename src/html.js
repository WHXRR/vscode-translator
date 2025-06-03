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
    <label for="replaceString">替换时将空格转为其他字符:</label>
    <select id="replaceString">
      <option value="-" selected>短横线</option>
      <option value="_">下划线</option>
      <option value=" ">空格</option>
    </select>
    <button id="replaceStringBtn">更新</button>

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
      const replaceStringSelect = document.getElementById("replaceString");
      const replaceStringBtn = document.getElementById("replaceStringBtn");

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
              resultDiv.textContent = "配置已更新";
              resultDiv.style.color = "var(--vscode-foreground)";
            }
            break;
          case "setReplaceString":
            replaceStringSelect.value = message.replaceString;
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

      replaceStringBtn.addEventListener("click", () => {
        const replaceString = replaceStringSelect.value;
        vscode.postMessage({
          type: "updateReplaceString",
          replaceString: replaceString,
        });
      });
    </script>
  </body>
</html>
`;

module.exports = html;
