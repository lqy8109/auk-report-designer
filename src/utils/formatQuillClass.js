/**
 * 富文本格式化 - 将 Quill 编辑器的 class 转换为行内样式
 *
 * @description
 * 该函数用于将 Quill 富文本编辑器生成的 HTML 中的 class 样式类转换为行内 style 样式。
 * 主要用于移动端显示、邮件发送、PDF生成等需要独立样式的场景。
 *
 * @param {unknown} html - 原始 HTML 字符串(支持任意类型输入,非字符串会返回空字符串)
 * @returns {string} 格式化后的 HTML 字符串
 *
 * @example
 * const html = '<span class="ql-size-large ql-color-red">大号红字</span>';
 * const result = formatQuillClass(html);
 * // 输出: '<span style="font-size: 1.5em; color: #e60000;">大号红字</span>'
 */
export function formatQuillClass(html) {
  // 类型守卫:确保 html 是字符串类型
  if (!html || typeof html !== "string") return "";

  let processedHtml = html;

  // 1. 处理图片:移除原有的 style/width/height 属性,统一添加响应式样式
  processedHtml = processedHtml.replace(/<img[^>]*>/gi, function (match) {
    match = match
      .replace(/style="[^"]+"/gi, "")
      .replace(/style='[^']+'/gi, "");
    match = match
      .replace(/width="[^"]+"/gi, "")
      .replace(/width='[^']+'/gi, "");
    match = match
      .replace(/height="[^"]+"/gi, "")
      .replace(/height='[^']+'/gi, "");

    // 添加响应式图片样式
    if (!match.includes("style=")) {
      match = match.replace(
        /<img/gi,
        '<img style="max-width:100%;height:auto;display:block;margin:10px 0;"',
      );
    }
    return match;
  });

  // 2. 字体大小转换
  const sizeMap = {
    "ql-size-small": "font-size: 0.75em;",
    "ql-size-large": "font-size: 1.5em;",
    "ql-size-huge": "font-size: 2.5em;",
  };

  // 3. 文字颜色转换
  const colorMap = {
    "ql-color-white": "color: #fff;",
    "ql-color-red": "color: #e60000;",
    "ql-color-orange": "color: #f90;",
    "ql-color-yellow": "color: #ff0;",
    "ql-color-green": "color: #008a00;",
    "ql-color-blue": "color: #06c;",
    "ql-color-purple": "color: #93f;",
  };

  // 4. 背景颜色转换
  const bgColorMap = {
    "ql-bg-black": "background-color: #000;",
    "ql-bg-red": "background-color: #e60000;",
    "ql-bg-orange": "background-color: #f90;",
    "ql-bg-yellow": "background-color: #ff0;",
    "ql-bg-green": "background-color: #008a00;",
    "ql-bg-blue": "background-color: #06c;",
    "ql-bg-purple": "background-color: #93f;",
  };

  // 5. 字体家族转换
  const fontMap = {
    "ql-font-serif": "font-family: Georgia, Times New Roman, serif;",
    "ql-font-monospace": "font-family: Monaco, Courier New, monospace;",
  };

  // 6. 对齐方式转换
  const alignMap = {
    "ql-align-center": "text-align: center;",
    "ql-align-right": "text-align: right;",
    "ql-align-justify": "text-align: justify;",
  };

  // 7. 文字方向转换
  const directionMap = {
    "ql-direction-rtl": "direction: rtl; text-align: inherit;",
  };

  // 8. 缩进转换 (ql-indent-1 到 ql-indent-9)
  const indentMap= {};
  for (let i = 1; i <= 9; i++) {
    indentMap[`ql-indent-${i}`] = `padding-left: ${i * 3}em;`;
  }

  // 9. 视频对齐
  const videoAlignMap = {
    "ql-video": "display: block; max-width: 100%;",
  };

  // 合并所有样式映射
  const allClassMaps = {
    ...sizeMap,
    ...colorMap,
    ...bgColorMap,
    ...fontMap,
    ...alignMap,
    ...directionMap,
    ...indentMap,
    ...videoAlignMap,
  };

  // 10. 处理所有带 class 的标签
  processedHtml = processedHtml.replace(
    /<(\w+)([^>]*?)class="([^"]*?)"([^>]*?)>/gi,
    function (
      _match,
      tagName,
      beforeClass,
      classNames,
      afterClass,
    ) {
      const classes = classNames.split(/\s+/).filter((c) => c);
      const styles = [];
      const remainingClasses = [];

      // 提取已存在的 style 属性
      let existingStyle = "";
      let cleanBeforeClass = beforeClass;
      let cleanAfterClass = afterClass;
      
      const styleMatch = (beforeClass + afterClass).match(/style="([^"]*)"/i);
      if (styleMatch) {
        existingStyle = styleMatch[1];
        cleanBeforeClass = beforeClass.replace(/style="[^"]*"/gi, "");
        cleanAfterClass = afterClass.replace(/style="[^"]*"/gi, "");
      }

      // 转换 class 为 style
      classes.forEach((className) => {
        if (allClassMaps[className]) {
          styles.push(allClassMaps[className]);
        } else {
          remainingClasses.push(className);
        }
      });

      // 合并所有样式
      const finalStyles = [existingStyle, ...styles]
        .filter((s) => s)
        .join(" ")
        .trim();

      // 构建新标签
      let result = `<${tagName}${cleanBeforeClass}`;
      if (finalStyles) {
        result += ` style="${finalStyles}"`;
      }
      if (remainingClasses.length > 0) {
        result += ` class="${remainingClasses.join(" ")}"`;
      }
      result += `${cleanAfterClass}>`;

      return result;
    },
  );

  // 11. 移除多余的 <br> 标签
  processedHtml = processedHtml.replace(/<br[^>]*\/>/gi, "");

  // 12. 清理多余的空白字符
  processedHtml = processedHtml.replace(/\s+style=""/gi, "");
  processedHtml = processedHtml.replace(/\s+class=""/gi, "");

  return processedHtml;
}
