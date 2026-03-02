/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2025-12-18 11:07:22
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-09 16:30:15
 * @description: 
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    selected: null,
    selectedParentPath: null,
    // 新增：更新标记（用于通知组件）
    updateFlag: {
      type: '', // 新增：更新类型（font、layout等）
      value: '', // 新增：更新值（具体的样式属性或布局参数）
      updateType: 'style', // 新增：更新类型（base、style等）
      timestamp: 0 // 时间戳（确保每次更新都能触发监听）
    },
    isPage: true,
    updatePage: {
      type: '',
      value: '',
      timestamp: 0
    }
  }),
  actions: {
    setSelected(item) {
      this.selected = item;
    },
    setSelectedParentPath(path) {
      this.selectedParentPath = path;
    },
    sendUpdateMsg(type, value, updateType) {
      this.updateFlag = {
        type, // 新增：更新类型（font、layout等）
        value, // 新增：更新值（具体的样式属性或布局参数）
        updateType, // 目标组件/单元格Key
        timestamp: Date.now()
      }
    },
    setIsPage(isPage) {
      this.isPage = isPage;
    },
    sendUpdatePageMsg(type, value) {
      this.updatePage = {
        type,
        value,
        timestamp: Date.now()
      }
    }

  }
})




