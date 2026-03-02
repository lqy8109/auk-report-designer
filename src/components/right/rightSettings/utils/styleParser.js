/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-04 10:25:38
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-05 10:42:25
 * @description: 
 */
// 示例：从类名解析字体大小（假设类名规则是 fs-14 → 14px）
export const parseFontSizeFromClass = (className) => {
  const fsMatch = className.match(/fs-(\d+)/)
  return fsMatch ? `${fsMatch[1]}px` : '14px'
}