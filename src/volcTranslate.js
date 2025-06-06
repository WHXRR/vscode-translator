const vscode = require("vscode");
const axios = require("axios");
const baseUrl = "http://whxrr.com/api/translate";
async function translate(text, targetLang, translateType = "class") {
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
      let translate = res.data.translation;
      const config = vscode.workspace.getConfiguration("code-lingo");
      if (!translate) {
        vscode.window.showErrorMessage("翻译失败");
        return null;
      } else if (translateType === "class") {
        const replaceString = config.get("targetReplaceString", "-");
        translate = translate.toLowerCase().replaceAll(" ", replaceString);
      } else if (translateType === "variable") {
        const replaceVariable = config.get(
          "targetReplaceVariable",
          "camelCase"
        );
        translate = transformCase(translate, replaceVariable);
      }
      return translate;
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

function transformCase(text, format = "camelCase") {
  if (typeof text !== "string") return "";

  const words = text
    .trim()
    .replace(/[_\-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/\s+/);

  switch (format) {
    case "camelCase":
      return words[0] + words.slice(1).map(capitalize).join("");
    case "pascalCase":
      return words.map(capitalize).join("");
    case "kebabCase":
      return words.join("-");
    case "snakeCase":
      return words.join("_");
    case "screamingSnakeCase":
      return words.join("_").toUpperCase();
    default:
      throw new Error(`Unknown format: ${format}`);
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

module.exports = { translate };
