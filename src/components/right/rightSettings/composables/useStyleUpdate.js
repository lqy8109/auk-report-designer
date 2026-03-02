/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-04 10:25:22
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-05 10:41:55
 * @description: 
 */
import { generateStyleClass } from '../utils/styleGenerator'

export const useStyleUpdate = () => {
  const updateStyle = (oldStyle, newStyle) => {
    const mergedStyle = { ...oldStyle, ...newStyle }
    // 生成对应的样式类名（可选：如将样式对象转成唯一的类名）
    mergedStyle.className = generateStyleClass(mergedStyle)
    return mergedStyle
  }
  return { updateStyle }
}