/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-04 10:25:16
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-05 10:42:35
 * @description: 
 */
import { ref } from 'vue'

export const useStyleForm = (defaultForm) => {
  const form = ref({ ...defaultForm })
  const validate = (type) => {
    // 不同样式类型的校验逻辑（如字号必须是合法的px值）
    if (type === 'fontSize' && !form.value.fontSize?.endsWith('px')) {
      return false
    }
    return true
  }
  const reset = () => {
    form.value = { ...defaultForm }
  }
  return { form, validate, reset }
}