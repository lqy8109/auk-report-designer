import { ref } from 'vue'
import ContextMenu from '@/components/contextMenu/index.vue'

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const menuList = ref([])
const isHotMenu = ref(false) // 新增：标记是否为Hot菜单

const closeMenu = () => {
  visible.value = false
  isHotMenu.value = false
}

export default function setupContextMenu(app) {
  app.component('ContextMenu', ContextMenu)

  app.directive('context-menu', {
    mounted(el, binding) {
      // 排除Handsontable区域（让Hot自带菜单生效）
      if (el.closest('.hot-container')) return

      el.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        e.stopPropagation()

        menuList.value = []
        const menuData = typeof binding.value === 'function'
          ? binding.value(el, e)
          : binding.value || []

        top.value = e.clientY
        left.value = e.clientX
        menuList.value = menuData
        visible.value = true
      })
    },
    unmounted(el) {
      el.removeEventListener('contextmenu', () => {})
    }
  })

  app.provide('contextMenuState', {
    visible,
    top,
    left,
    menuList,
    isHotMenu,
    closeMenu
  })
}