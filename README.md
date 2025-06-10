# 🚀 Code Lingo：不再为变量名抓头发！

还在为起一个合适的英文类名、变量名、函数名而反复打开翻译器？<br>
还在苦苦思索 “大红按钮” 英文到底该叫啥？<br>
你不是一个人——我也是，所以我写了这个插件。<br>

Code Lingo 是一个轻量、贴心的 VSCode 插件，帮你一键翻译选中的中文文本，并自动转换成你想要的编程命名风格！告别切来切去、复制粘贴的烦恼。
<br>
<br>

## ✨ 插件能干啥？

- 🖱 选中文本，一键翻译并替换原内容
- 🧠 支持自动生成
- 🧩 类名（kebab-case）
- 🐫 变量、函数名（camelCase / PascalCase / 你选的都行）
- 🌍 支持多语言目标翻译（默认是英文）
- ⚙️ 所有转换规则都能在设置里改
  <br>
  <br>

## 🕹 快捷键用法

- 翻译类名: `Ctrl + Alt + C` / `Cmd + Alt + C`
- 翻译变量/函数名: `Ctrl + Alt + F` / `Cmd + Alt + F`
- 选中 → 快捷键 → 自动翻译 + 命名风格转换，一气呵成！
  <br>
  <br>

## 🔧 可配置选项（在设置里找 code-lingo）

- 在 VSCode 设置中可以配置以下选项：
- targetLanguage：目标语言（默认是 'en' 英文）
- targetReplaceString：类名中空格替换成对应字符（可选 -、\_、空格）
- targetReplaceVariable：变量名、函数名的命名风格（如小驼峰、大驼峰等）
- 语言支持：
  zh	中文(简体)	Chinese (simplified)	
  zh-Hant	中文(繁体)	Chinese (traditional)	
  zh-Hant-hk	中文(香港繁体)	Chinese (Hongkong traditional)	
  zh-Hant-tw	中文(台湾繁体)	Chinese (Taiwan traditional)	
  tn	札那语	Tswana	
  vi	越南语	Vietnamese	
  iu	伊努克提图特语	Inuktitut	
  it	意大利语	Italian	
  id	印尼语	Indonesian	
  hi	印地语	Hindi	
  en	英语	English	
  ho	希里莫图语	Hiri	
  he	希伯来语	Hebrew	
  es	西班牙语	Spanish	
  el	现代希腊语	Modern	
  uk	乌克兰语	Ukrainian	
  ur	乌尔都语	Urdu	
  tk	土库曼语	Turkmen	
  tr	土耳其语	Turkish	
  ti	提格里尼亚语	Tigrinya	
  ty	塔希提语	Tahitian	
  tl	他加禄语	Tagalog	
  to	汤加语	Tongan	
  th	泰语	Thai	
  ta	泰米尔语	Tamil	
  te	泰卢固语	Telugu	
  sl	斯洛文尼亚语	Slovenian	
  sk	斯洛伐克语	Slovak	只支持 其它语种 翻 斯洛伐克语
  ss	史瓦帝语	Swati	
  eo	世界语	Esperanto	
  sm	萨摩亚语	Samoan	
  sg	桑戈语	Sango	
  st	塞索托语	Southern	
  sv	瑞典语	Swedish	
  ja	日语	Japanese	
  tw	契维语	Twi	
  qu	奇楚瓦语	Quechua	
  pt	葡萄牙语	Portuguese	
  pa	旁遮普语	Punjabi	
  no	挪威语	Norwegian	
  nb	挪威布克莫尔语	Norwegian	
  nr	南恩德贝勒语	
  my	缅甸语	Burmese	
  bn	孟加拉语	Bengali	
  mn	蒙古语	Mongolian	
  mh	马绍尔语	Marshallese	
  mk	马其顿语	Macedonian	
  ml	马拉亚拉姆语	Malayalam	
  mr	马拉提语	Marathi	
  ms	马来语	Malay	
  lu	卢巴卡丹加语	Luba-Katanga	
  ro	罗马尼亚语	Romanian	
  lt	立陶宛语	Lithuanian	
  lv	拉脱维亚语	Latvian	
  lo	老挝语	Lao	
  kj	宽亚玛语	Kwanyama	
  hr	克罗地亚语	Croatian	
  kn	坎纳达语	Kannada	
  ki	基库尤语	Kikuyu	
  cs	捷克语	Czech	
  ca	加泰隆语	Catalan	
  nl	荷兰语	Dutch	
  ko	韩语	Korean	
  ht	海地克里奥尔语	Haitian	
  gu	古吉拉特语	Gujarati	
  ka	格鲁吉亚语	Georgian	
  kl	格陵兰语	Greenlandic	
  km	高棉语	Khmer	
  lg	干达语	Ganda	
  kg	刚果语	Kongo	
  fi	芬兰语	Finnish	
  fj	斐济语	Fijian	
  fr	法语	French	
  ru	俄语	Russian	
  ng	恩敦加语	Ndonga	
  de	德语	German	
  tt	鞑靼语	Tatar	
  da	丹麦语	Danish	
  ts	聪加语	Tsonga	
  cv	楚瓦什语	Chuvash	
  fa	波斯语	Persian	
  bs	波斯尼亚语	Bosnian	
  pl	波兰语	Polish	
  bi	比斯拉玛语	Bislama	
  nd	北恩德贝勒语	North Ndebele	
  ba	巴什基尔语	Bashkir	
  bg	保加利亚语	Bulgarian	
  az	阿塞拜疆语	Azerbaijani	
  ar	阿拉伯语	Arabic	
  af	阿非利堪斯语	Afrikaans	
  sq	阿尔巴尼亚语	Albanian	
  ab	阿布哈兹语	Abkhazian	
  os	奥塞梯语	Ossetian	
  ee	埃维语	Ewe	
  et	爱沙尼亚语	Estonian	
  ay	艾马拉语	Aymara	
  lzh	中文（文言文）	Chinese (classical)	
  am	阿姆哈拉语	Amharic	
  ckb	中库尔德语	Central Kurdish	
  cy	威尔士语	Welsh	
  gl	加利西亚语	Galician	
  ha	豪萨语	Hausa	
  hy	亚美尼亚语	Armenian	
  ig	伊博语	Igbo	
  kmr	北库尔德语	Northern Kurdish	
  ln	林加拉语	Lingala	
  nso	北索托语	Northern Sotho	
  ny	齐切瓦语	Chewa	
  om	奥洛莫语	Oromo	
  sn	绍纳语	Shona	
  so	索马里语	Somali	
  sr	塞尔维亚语	Serbian	
  sw	斯瓦希里语	Swahili	
  xh	科萨语	Xhosa	
  yo	约鲁巴语	Yoruba	
  zu	祖鲁语	Zulu	
  bo	藏语	Tibetan	只支持 藏语 翻 中文
  nan	闽南语	Hokkien	只支持 闽南语 翻 中文
  wuu	吴语	Wuyue Chinese	只支持 吴语 翻 中文
  yue	粤语	Cantonese	只支持 粤语 翻 中文
  cmn	西南官话	Southwestern Mandarin	只支持 西南官话 翻 中文
  ug	维吾尔语	Uighur	只支持 维吾尔语 翻 中文
  fuv	尼日利亚富拉语	Nigerian Fulfulde	
  hu	匈牙利语	Hungarian	
  kam	坎巴语	Kamba	
  luo	肯尼亚语	Dholuo	
  rw	基尼阿万达语	Kinyarwanda	
  umb	卢欧语	Umbundu	
  wo	沃洛夫语	Wolof
  <br>
  <br>

## 🌐 注意事项

- 本插件调用了火山引擎的翻译 API（每月免费 200w 字符）
  <br>
  <br>

## 📄 许可证

MIT
