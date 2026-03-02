/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-04 10:25:27
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-21 16:59:21
 * @description: 
 */
// src/components/StyleEditor/composables/useStyleConfig.js
import { computed } from 'vue'
import { 
  COMMON_STYLE_CONFIGS, 
  COMPONENT_SPECIFIC_CONFIGS, 
  COMPONENT_STYLE_MAP 
} from '../constants/componentStyleConfigs'

export const useStyleConfig = (componentType) => {
  // 这里componentType是computed对象，需用.value访问
  const configKeys = computed(() => {
    const type = componentType; // 关键：取响应式值的value
    
    return COMPONENT_STYLE_MAP[type] || [];
  })

  const styleConfigs = computed(() => {
    return configKeys.value.map(key => {
      return COMPONENT_SPECIFIC_CONFIGS[key] || COMMON_STYLE_CONFIGS[key]
    })
  })

  const defaultStyles = computed(() => {
    let defaultStyle = {}
    configKeys.value.forEach(key => {
      const config = COMPONENT_SPECIFIC_CONFIGS[key] || COMMON_STYLE_CONFIGS[key]
      defaultStyle = { ...defaultStyle, ...config.default }
    })
    return defaultStyle
  })

  return { styleConfigs, defaultStyles }
}