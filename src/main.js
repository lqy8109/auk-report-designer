/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2025-12-18 11:07:22
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-29 12:15:44
 * @description: 
 */
import './assets/main.css'
import './styles/index.scss';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import DraggableResizableVue from 'draggable-resizable-vue3'
import setupContextMenu from '@/directives/contextMenu';
import GlobalSelectBox from '@/components/globalSelect/GlobalSelectBox.vue';
import { useSelectFieldStore } from './stores/selectField';




import App from './App.vue'
import router from './router'




const app = createApp(App)
setupContextMenu(app)

// 全局关闭菜单方法
app.config.globalProperties.$closeAllContextMenu = () => {
  const state = app._context.provides.contextMenuState
  if (state) state.closeMenu()
}

app.component('GlobalSelectBox', GlobalSelectBox);

// 挂载全局方法 $showSelectBox
app.config.globalProperties.$showSelectBox = function (options) {
  const selectBoxStore = useSelectFieldStore();
  selectBoxStore.show(options);
};

app.config.globalProperties.$hideSelectBox = function () {
  const selectBoxStore = useSelectFieldStore();
  selectBoxStore.hide();
};



app.use(createPinia())
app.use(router)
app.use(DraggableResizableVue)
window.$app = app;

// 使用 Element Plus 组件库并设置全局配置
app.use(ElementPlus, {
  locale: zhCn, // 语言设置为中文
})

app.mount('#app')
