/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-04 10:25:43
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-05 10:42:20
 * @description: 
 */
// 示例：生成字体相关的类名
export const generateStyleClass = (style) => {
  const classList = []
  if (style.fontSize) classList.push(`fs-${style.fontSize.replace('px', '')}`)
  if (style.fontWeight) classList.push(`fw-${style.fontWeight}`)
  return classList.join(' ')
}