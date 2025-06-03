const vscode = require("vscode");
const axios = require("axios");
const baseUrl = "http://117.72.211.122:5170/api/translate";
async function translate(text, targetLang) {
  try {
    const res = await axios.post(
      baseUrl,
      {
        text,
        targetLang,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      const config = vscode.workspace.getConfiguration("vscode-translator");
      const replaceStr = config.get("targetReplaceString", "-");
      return res.data.translation.replaceAll(' ', replaceStr)
    } else {
      vscode.window.showErrorMessage("翻译失败");
      return null;
    }
  } catch (error) {
    console.error("翻译失败:", error);
    vscode.window.showErrorMessage(`翻译失败: ${error.message}`);
    return null;
  }
}

module.exports = { translate };
