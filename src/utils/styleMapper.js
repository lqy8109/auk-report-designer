/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2025-12-22 15:44:05
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-05 09:30:30
 * @description: 样式映射工具类，将JSON配置转换为CSS行内样式
 */

// -------------------------- 通用工具函数（抽离公共逻辑，避免重复）--------------------------
/**
 * 校验边框配置是否有效（color/style/width 缺一不可）
 * @param {Object} border - 单方向边框/全局边框配置
 * @returns {Boolean} 配置是否完整有效
 */
const isBorderValid = (border) => !!border?.color && !!border?.style && !!border?.width;

/**
 * 生成标准化边框样式字符串（style统一转小写，格式：width style color）
 * @param {Object} border - 有效边框配置
 * @returns {String} 拼接后的边框样式
 */
const getBorderStyleStr = (border) =>
  `${border.width} ${border.style.toLowerCase()} ${border.color}`;

/**
 * 安全处理入参，避免null/undefined导致的属性访问报错
 * @param {Object} config - 原始配置对象
 * @returns {Object} 空对象/浅拷贝后的配置对象
 */
const safeConfig = (config) => ({ ...config } || {});

// -------------------------- 对外暴露的核心方法 --------------------------
/**
 * 完整样式映射：将JSON配置转换为包含边框、字体、背景、布局的完整CSS样式
 */
export function mapJsonToStyle(config) {
  const c = safeConfig(config);
  const style = {
    width: '100%',
    height: '100%',
    // padding拼接：统一处理空值，简化写法
    padding: [c.paddingTop, c.paddingRight, c.paddingBottom, c.paddingLeft].map(v => v || '0').join(' '),
    ...c,
  };

  // 1. 处理四个方向独立边框（仅配置有效时生效）
  if (isBorderValid(c.topBorder)) style.borderTop = getBorderStyleStr(c.topBorder);
  if (isBorderValid(c.leftBorder)) style.borderLeft = getBorderStyleStr(c.leftBorder);
  if (isBorderValid(c.bottomBorder)) style.borderBottom = getBorderStyleStr(c.bottomBorder);
  if (isBorderValid(c.rightBorder)) style.borderRight = getBorderStyleStr(c.rightBorder);

  // 2. 处理全局border（原规则：配置完整 + 无上下独立边框，默认宽度1px）
  if (!!c.border?.color && !!c.border?.style && !c.topBorder && !c.bottomBorder) {
    style.border = `${c.border.width || '1px'} ${c.border.style.toLowerCase()} ${c.border.color}`;
  }

  // 3. 字体相关样式
  if (c['font-family']) style['font-family'] = c['font-family'];
  style['font-size'] = c['font-size'] ? `${c['font-size']}` : '10pt'; // 有值加px，无值默认10pt

  // 4. 背景相关样式（消除原代码重复声明background-color问题）
  if (c['background-color']) style['background-color'] = c['background-color'];
  if (c['background-image']) style['background-image'] = c['background-image'];
  if (c['background-image-name']) style['background-image-name'] = c['background-image-name'];
  if (c['background-position']) style['background-position'] = c['background-position'];
  if (c['background-size']) style['background-size'] = c['background-size'];
  // 背景重复：自定义值优先 → 有背景图默认repeat → 无则不生成该属性（减少冗余）
  if (c['background-repeat']) {
    style['background-repeat'] = c['background-repeat'];
  } else if (c['background-image']) {
    style['background-repeat'] = 'repeat';
  }

  // 5. 文本对齐（有值则转小写生效）
  if (c['text-align']) style['text-align'] = c['text-align'].toLowerCase();

  return style;
}

/**
 * 纯边框样式映射：仅提取边框相关样式，独立边框优先于全局边框
 */
export function mapJsonToBorderStyle(config) {
  const c = safeConfig(config);
  const borderStyle = {};

  // 1. 处理四个方向独立边框（仅配置有效时生效）
  if (isBorderValid(c.topBorder)) borderStyle.borderTop = getBorderStyleStr(c.topBorder);
  if (isBorderValid(c.leftBorder)) borderStyle.borderLeft = getBorderStyleStr(c.leftBorder);
  if (isBorderValid(c.bottomBorder)) borderStyle.borderBottom = getBorderStyleStr(c.bottomBorder);
  if (isBorderValid(c.rightBorder)) borderStyle.borderRight = getBorderStyleStr(c.rightBorder);

  // 2. 处理全局border（原规则：配置完整 + 无任何独立边框，固定1px宽度）
  const hasNoAnyBorder = !c.topBorder && !c.bottomBorder && !c.leftBorder && !c.rightBorder;
  if (!!c.border?.color && !!c.border?.style && hasNoAnyBorder) {
    borderStyle.border = `1px ${c.border.style.toLowerCase()} ${c.border.color}`;
  }

  return borderStyle;
}

/**
 * 行专属边框样式映射：生成仅顶部显示的边框样式（特殊业务规则）
 * 【修复原代码Bug】：原border-width赋值错误，将style赋值为width，现已修正
 */
export function mapJsonLineToBorderStyle(config) {
  const c = safeConfig(config);
  const lineBorderStyle = {

  };
  lineBorderStyle['border-width'] = c['border-width'] || '1px';
  lineBorderStyle['border-color'] = c['border-color'] || '#000';
  lineBorderStyle['border-style'] = c['border-style'] ? `${c['border-style']?.toLowerCase()} none none` : 'solid none none'; // 上/右/下：仅上显示
  // 原规则：全局border配置完整时，生成仅顶部的边框样式
  // if (!!c.border?.color && !!c.border?.style) {
  //   lineBorderStyle['border-width'] = c.border?.width || '1px'; // 修复原Bug：替换错误的c.border?.style
  //   lineBorderStyle['border-color'] = c.border.color;
  //   lineBorderStyle['border-style'] = `${c.border.style.toLowerCase()} none none`; // 上/右/下：仅上显示
  // }
  return lineBorderStyle;
}

/**
 * 边框定位样式映射：生成边框的left/top偏移量，用于边框居中/定位（特殊业务规则）
 */
export function mapJsonToBorderPosition(config) {
  const c = safeConfig(config);
  const positionStyle = {};
  const hasGlobalBorder = !!c.border?.color && !!c.border?.style;
  const hasNoAnyBorder = !c.topBorder && !c.bottomBorder && !c.leftBorder && !c.rightBorder;

  // 场景1：有有效全局border + 无任何独立边框 → 全局偏移
  if (hasGlobalBorder && hasNoAnyBorder) {
    const borderWidth = c.border?.width || 1; // 无宽度默认1px
    positionStyle.left = `-${borderWidth / 2}px`;
    positionStyle.top = `-${borderWidth / 2}px`;
  }
  // 场景2：有独立边框 → 分别处理left/top偏移（无有效配置则默认-1px）
  else {
    positionStyle.left = isBorderValid(c.leftBorder)
      ? `-${c.leftBorder.width / 2}px`
      : '-1px';
    positionStyle.top = isBorderValid(c.topBorder)
      ? `-${c.topBorder.width / 2}px`
      : '-1px';
  }

  return positionStyle;
}