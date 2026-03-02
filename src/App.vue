<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2025-12-18 11:07:22
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-26 10:17:11
 * @description: 
-->
<script setup>
import { ref, provide, onMounted, onUnmounted, inject, watch } from "vue";
import Header from "@/components/header.vue";
import Left from "@/components/left.vue";
import Main from "@/components/main.vue";
import Right from "@/components/right.vue";
import Footer from "@/components/footer.vue";
import data from "@/config/examples/demo3.js";
import { useSettingStore } from "@/stores/index.js";
import { convertCmToPxInObject, convertPxToCmInObject } from "@/utils/unitConversion.js";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
const { setInitData } = useLowcodeEditor();
// 注入全局右键菜单状态
const contextMenuState = inject("contextMenuState");
const { visible, top, left, menuList, closeMenu } = contextMenuState;

const settingStore = useSettingStore();
// 左侧折叠状态
const leftCollapse = ref(true);
// 右侧折叠状态
const rightCollapse = ref(false);
// 网格步长
const grid = ref([17, 18]);
// 暂存当前拖拽的元素（传递给画布组件）
const currentDragItem = ref(null);
const PPI = 96;
const CM_TO_PX = PPI / 2.54;
const dataSources = ref([]);
const dataSets = ref([]);
const parameters = ref([]);
const embeddedImages = ref([]);

const {
  canvasComps,
  pageHeaderComps,
  pageFooterComps,
  selectComp,
  pageBase,
} = useLowcodeEditor();

// 画布元素列表（核心数据，由父组件维护）
// const lowerCaseData=ref(convertKeysToLowerCase(data));
const canvasElements = ref(convertCmToPxInObject(data));

setInitData(canvasElements.value);

console.log(canvasElements.value);
dataSources.value = canvasElements.value.dataSources;
dataSets.value = canvasElements.value.dataSets;
parameters.value = canvasElements.value.reportParameters;
embeddedImages.value = canvasElements.value.embeddedImages;



onMounted(() => {
  selectComp({
    type: "page",
    ...pageBase.value,
  });
});



/**
 * 接收左侧面板的拖拽开始事件
 */
const handleDragStart = (item) => {
  currentDragItem.value = item;
};

/**
 * 接收画布面板的添加元素事件
 */
const handleAddElement = (newElement) => {
  canvasElements.value.push(newElement);
  // 可选：添加后清空当前拖拽项
  currentDragItem.value = null;
};

const handleSelect = (data) => {
  console.log(data);
};

const mainRef = ref(null);
const handleAdd = (type) => {
  mainRef.value.handleAdd(type);
};

const handleRemove = (type) => {
  mainRef.value.handleRemove(type);
};
const updateElement = (newElement) => {
  canvasElements.value = newElement;
};

const activeRight = ref("setting");
const handleTabActive = (type) => {
  activeRight.value = type;
};

provide("handleSelect", handleSelect);
</script>
<template>
  <div class="container">
    <div class="content">
      <Left
        :collapse="leftCollapse"
        @drag-start="handleDragStart"
        @toggle-collapse="leftCollapse = !leftCollapse"
      />
      <div
        class="main"
        :style="{ width: leftCollapse ? 'calc(100vh - 54px)' : 'calc(100vh - 200px)' }"
      >
        <Header
          :collapse="rightCollapse"
          @toggle-collapse="rightCollapse = !rightCollapse"
          :leftCollapse="leftCollapse"
          :elements="canvasElements"
          @handleAdd="handleAdd"
          @handleRemove="handleRemove"
          @handleTabActive="handleTabActive"
        />
        <div class="main-content">
          <Main
            ref="mainRef"
            :elements="canvasElements"
            :grid="grid"
            :current-drag-item="currentDragItem"
            :dataSources="dataSources"
            :dataSets="dataSets"
            @add-element="handleAddElement"
            @updateElement="updateElement"
          />
          <Right
            :dataSources="dataSources"
            :dataSets="dataSets"
            :embeddedImages="embeddedImages"
            :parameters="parameters"
            :activeRight="activeRight"
            :collapse="rightCollapse"
            @drag-start="handleDragStart"
            @toggle-collapse="rightCollapse = !rightCollapse"
          />
        </div>

        <!-- <Footer /> -->
      </div>
    </div>
    <!-- 全局右键菜单组件（只需引入一次） -->
    <ContextMenu
      :visible="visible"
      :top="top"
      :left="left"
      :menu-list="menuList"
      @close="closeMenu"
    />

    <!-- 全局选择框组件（只需引入一次） -->
    <GlobalSelectBox />
  </div>
</template>
<style lang="scss" scoped>
@import url("//at.alicdn.com/t/c/font_5092047_wfh1pv12rk.css");
.container {
  width: 100vw;
  height: 100vh;
  background-color: #e6e6e6;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.main-content {
  display: flex;
  flex: 1;
  height: calc(100vh - 80px);
}
</style>
