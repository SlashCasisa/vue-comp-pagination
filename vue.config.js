module.exports = {
  css: {
    // 因为打包出来的库会将 css 单独提取到 css 文件里，设置 extract 为 false 则会强制内联。
    extract: false
  }
}