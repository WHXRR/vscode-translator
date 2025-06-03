# VSCode Translator

一个简单的VSCode插件，用于翻译选中的文本并替换原文本。

## 功能

- 选中文本后通过快捷键调用翻译功能
- 自动将翻译结果替换选中的文本
- 支持配置目标语言

## 使用方法

1. 在编辑器中选中要翻译的文本
2. 按下快捷键 `Ctrl+shift+T`（Mac上为 `Cmd+shift+T`）或通过命令面板执行 `Translate Selected Text` 命令
3. 选中的文本将被翻译后的内容替换

## 配置选项

在VSCode设置中可以配置以下选项：

- `vscode-translator.targetLanguage`: 设置目标语言（默认为英语 'en'）
  - 常用语言代码：
    - 英语: `en`
    - 中文: `zh`
    - 日语: `ja`
    - 法语: `fr`
    - 德语: `de`
    - 西班牙语: `es`

## 安装

### 从VSIX文件安装

1. 下载最新的 `.vsix` 文件
2. 在VSCode中，转到扩展视图（Ctrl+Shift+X）
3. 点击视图右上角的 `...` 按钮，选择 `从VSIX安装...`
4. 选择下载的 `.vsix` 文件

## 注意事项

- 此插件使用火山引擎文本翻译API，每月免费限额200w字符

## 许可证

MIT