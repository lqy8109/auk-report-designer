<template>
  <div class="main_container">
    <div class="drag-container-box">
      <div
        class="drag-container"
        id="drag-container"
        :style="{
          'min-width': cloneElement.page.pageWidth,
          'min-height': cloneElement.page.pageHeight,
          'max-width': cloneElement.page.pageWidth,
          'max-height': cloneElement.page.pageHeight,
        }"
        ref="canvasContainerRef"
        :class="{ 'canvas-highlight': isDragOver }"
        @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        @mousemove="handleMouseMove"
      >
        <div style="width: 100%; height: 100%">
          <!-- 临时占位元素（拖拽时显示） -->
          <div
            v-if="isDragOver && currentDragItem && isInTargetArea"
            class="temp-element"
            :style="{
              left: tempX + 'px',
              top: tempY + 'px',
              position: 'absolute',
              zIndex: 999,
            }"
          >
            <component
              :is="getTComponentByType(currentDragItem.type)"
              :currentDragItem="currentDragItem"
            />
          </div>

          <!-- 核心容器（页眉/主体/页脚） -->

          <div
            ref="contentContainerRef"
            :style="{
              width: `calc(100% - ${cloneElement.page.leftMargin} - ${cloneElement.page.rightMargin})`,
              height: `calc(100% - ${cloneElement.page.topMargin} - ${cloneElement.page.bottomMargin})`,
              margin: `${cloneElement.page.topMargin} ${cloneElement.page.rightMargin} ${cloneElement.page.bottomMargin} ${cloneElement.page.leftMargin}`,
              ...pageStyle,
            }"
            class="container"
          >
            <div class="wh-100 flex flex-direction container_content">
              <!-- 页眉区域 -->
              <div
                v-if="cloneElement.pageHeader"
                :style="{ height: cloneElement.pageHeader.height + 'px' }"
                class="page_header pageHeader"
              >
                <draggable-resizable-vue
                  ref="pageHeaderCompsRefs"
                  :grid="[0.5, 0.5]"
                  v-for="(item, index) in pageHeaderComps"
                  :key="item.cloneId"
                  v-model:x="item.left"
                  v-model:y="item.top"
                  v-model:z-index="item.zIndex"
                  v-model:active="item.isActive"
                  v-model:w="item.width"
                  v-model:h="item.height"
                  @activated="
                    () => onElementActivated(item, `pageHeader.reportItems[${index}]`)
                  "
                  @deactivated="
                    () => onElementDeactivated(item, `pageHeader.reportItems[${index}]`)
                  "
                  :drag-handle="item.type === 'table' ? '.handle' : ''"
                  :cancel="item.type === 'table' ? '.htCore' : ''"
                  :resizable="item.type !== 'table'"
                  :class-name="item.type === 'table' ? 'drv table-element' : 'drv'"
                  class-name-handle="no_page"
                  :onResizeStart="() => onResizeStart(index, 'pageHeader')"
                  @resizestop="
                    (left, top, width, height) =>
                      onResizeStop(left, top, width, height, 'pageHeader', index)
                  "
                  :onDragStart="() => onDragStart(index, 'pageHeader')"
                  @dragstop="(left, top) => onDragStop(left, top, 'pageHeader')"
                >
                  <component
                    ref=""
                    :is="getComponentByType(item.type)"
                    :dataItem="item"
                    :path="`pageHeader.reportItems[${index}]`"
                    :selectPath="selectPath"
                    :index="index"
                    :dataSources="dataSources"
                    :dataSets="dataSets"
                    @handleActive="handleElementActive"
                    @handleDeleteItem="handleDeleteItem"
                    pageType="pageHeader"
                    @setValueByPath="
                      (value, setKey) =>
                        setValueByPath(`pageHeader.reportItems[${index}]`, value, setKey)
                    "
                    @setWidth="(width) => setElementWidth(width, 'pageHeader', index)"
                    @setHeight="(height) => setElementHeight(height, 'pageHeader', index)"
                    @setLeftTop="
                      (data, isUndo) =>
                        setElementLeftTop(data, 'pageHeader', index, isUndo)
                    "
                  />
                </draggable-resizable-vue>
                <div class="page_header_placeholder">页眉</div>
                <!-- 页眉高度调整滑块 -->
                <div
                  class="page_header_slider"
                  @mousedown="(e) => startSliderDrag(e, 'pageHeader')"
                ></div>
              </div>

              <!-- 主体区域 -->
              <div class="page_body">
                <draggable-resizable-vue
                  ref="draggableElementRefs"
                  :grid="[0.5, 0.5]"
                  v-for="(item, index) in canvasComps"
                  :key="item.cloneId"
                  v-model:x="item.left"
                  v-model:y="item.top"
                  v-model:z="item.zIndex"
                  v-model:w="item.width"
                  v-model:h="item.height"
                  @activated="() => onElementActivated(item, `reportItems[${index}]`)"
                  @deactivated="() => onElementDeactivated(item, `reportItems[${index}]`)"
                  :drag-handle="
                    item.type === 'table' || item.type === 'tablix' ? '.handle' : ''
                  "
                  :cancel="item.type === 'table' || item.type === 'tablix' ? '.htCore' : ''"
                  :resizable="item.type !== 'table' && item.type !== 'tablix' && item.type !== 'line'"
                  :class-name="
                    item.type === 'table' || item.type === 'tablix'
                      ? 'drv table-element'
                      : item.type == 'line'
                      ? 'drv_line'
                      : 'drv'
                  "
                  class-name-handle="no_page"
                  :onResizeStart="() => onResizeStart(index)"
                  @resizestop="
                    (left, top, width, height) =>
                      onResizeStop(left, top, width, height, 'canvas', index)
                  "
                  :onDragStart="() => onDragStart(index)"
                  @dragstop="onDragStop"
                  :handles="
                    item.type == 'line'
                      ? ['mr', 'ml']
                      : ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
                  "
                >
                  <component
                    ref="canvasCompsRefs"
                    :is="getComponentByType(item.type)"
                    :dataItem="item"
                    :path="`reportItems[${index}]`"
                    :selectPath="selectPath"
                    :dataSources="dataSources"
                    :dataSets="dataSets"
                    :index="index"
                    pageType="canvas"
                    @handleActive="handleElementActive"
                    @handleDeleteItem="handleDeleteItem"
                    @setValueByPath="
                      (value, setKey) =>
                        setValueByPath(`reportItems[${index}]`, value, setKey)
                    "
                    @setWidth="(width) => setElementWidth(width, 'canvas', index)"
                    @setHeight="(height) => setElementHeight(height, 'canvas', index)"
                    @setLeftTop="
                      (data, isUndo) => setElementLeftTop(data, 'canvas', index, isUndo)
                    "
                  />
                </draggable-resizable-vue>
                <div class="page_body_placeholder">报表主体</div>
              </div>

              <!-- 页脚区域 -->
              <div
                v-if="cloneElement.pageFooter"
                :style="{ height: cloneElement.pageFooter.height + 'px' }"
                class="page_footer pageFooter"
              >
                <!-- 页脚高度调整滑块 -->
                <div
                  class="page_footer_slider"
                  @mousedown="(e) => startSliderDrag(e, 'pageFooter')"
                ></div>
                <draggable-resizable-vue
                  ref="draggableElementRefs"
                  :grid="[0.5, 0.5]"
                  v-for="(item, index) in pageFooterComps"
                  :key="item.cloneId"
                  v-model:x="item.left"
                  v-model:y="item.top"
                  v-model:z-index="item.zIndex"
                  v-model:active="item.isActive"
                  v-model:w="item.width"
                  v-model:h="item.height"
                  @activated="
                    () => onElementActivated(item, `pageFooter.reportItems[${index}]`)
                  "
                  @deactivated="
                    () => onElementDeactivated(item, `pageFooter.reportItems[${index}]`)
                  "
                  :drag-handle="item.type === 'table' ? '.handle' : ''"
                  :cancel="item.type === 'table' ? '.htCore' : ''"
                  :resizable="item.type !== 'table'"
                  :class-name="item.type === 'table' ? 'drv table-element' : 'drv'"
                  class-name-handle="no_page"
                  :onResizeStart="() => onResizeStart(index, 'pageFooter')"
                  @resizestop="
                    (left, top, width, height) =>
                      onResizeStop(left, top, width, height, 'pageFooter', index)
                  "
                  :onDragStart="() => onDragStart(index, 'pageFooter')"
                  @dragstop="(left, top) => onDragStop(left, top, 'pageFooter')"
                >
                  <component
                    ref="pageFooterCompsRefs"
                    :is="getComponentByType(item.type)"
                    :dataItem="item"
                    :path="`pageFooter.reportItems[${index}]`"
                    :selectPath="selectPath"
                    :dataSources="dataSources"
                    :dataSets="dataSets"
                    :index="index"
                    @handleActive="handleElementActive"
                    @handleDeleteItem="handleDeleteItem"
                    @setValueByPath="
                      (value, setKey) =>
                        setValueByPath(`pageFooter.reportItems[${index}]`, value, setKey)
                    "
                    @setWidth="(width) => setElementWidth(width, 'pageFooter', index)"
                    @setHeight="(height) => setElementHeight(height, 'pageFooter', index)"
                    @setLeftTop="
                      (data, isUndo) =>
                        setElementLeftTop(data, 'pageFooter', index, isUndo)
                    "
                  />
                </draggable-resizable-vue>
                <div class="page_footer_placeholder">页脚</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 文本编辑输入框 -->
        <textarea
          class="text_area no_page"
          ref="textEditRef"
          @blur="handleTextEditBlur"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  defineEmits,
  defineExpose,
  watch,
  provide,
  nextTick,
  onMounted,
  onUnmounted,
  computed,
} from "vue";

import {
  TInput,
  TTable,
  TLine,
  TGraphic,
  TQRCode,
  TImage,
  TLabel,
  TRichText,
  TCharts,
  TTablix,
} from "@/components/dragElement/index.js";

import {
  Text,
  Table,
  Line,
  ComponentJson,
  Graphic,
  Qrcode,
  Image,
  Label,
  RichText,
  Charts,
  Tablix,
} from "@/components/realElement/index.js";
import { useSettingStore } from "@/stores/index.js";
import { parsePathString1 } from "@/utils/parsePathString.js";
import { useUndoManager } from "@/utils/undoManager";
import deepClone from "@/utils/deepClone";
import { unitToPx } from "@/utils/unitConversion.js";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

const {
  pageConfig,
  canvasComps,
  pageHeaderComps,
  pageFooterComps,
  selectComp,
  selectedComp,
  pageBase,
  handleCompValueChange,
  updatePageHeaderLayout,
  updatePageFooterLayout,
  addComp,
} = useLowcodeEditor();

// ========== Props & Emits ==========
const props = defineProps({
  elements: { type: Object, default: () => ({}) },
  grid: { type: Array, default: () => [20, 20] },
  currentDragItem: { type: Object, default: null },
  dataSources: { type: Array, default: () => [] },
  dataSets: { type: Array, default: () => [] },
});

// ========== 常量定义 ==========
// 排除的点击区域类名
const EXCLUDE_CLICK_CLASSES = [
  "element-item",
  "right_container",
  "no_page",
  "toolbar_item",
  "menu-item",
  "table_cell",
];
// 滑块最小/最大高度限制
const SLIDER_MIN_HEIGHT = 20;
const SLIDER_MAX_HEIGHT_RATIO = 0.4; // 最大占可用高度的40%

// ========== 状态与引用 ==========
const settingStore = useSettingStore();
const canvasContainerRef = ref(null); // 画布容器
const contentContainerRef = ref(null); // 内容容器（页眉/主体/页脚）
const textEditRef = ref(null); // 文本编辑框
const draggableElementRefs = ref(null); // 可拖拽元素引用
const tableElementRefs = ref({}); // 表格元素引用

// 响应式状态
const cloneElement = ref(pageConfig.value); // 深克隆元素数据（避免修改原数据）
const isDragOver = ref(false); // 拖拽经过画布
const tempX = ref(0); // 临时元素X坐标
const tempY = ref(0); // 临时元素Y坐标
const isInTargetArea = ref(false); // 是否在可放置区域内
const selectPath = ref(""); // 当前选中元素路径
const selectElementName = ref(null); // 当前选中元素名称
const editPath = ref(""); // 文本编辑路径
const isSliderDragging = ref(false); // 是否正在拖拽滑块
const dragStartY = ref(0); // 滑块拖拽起始Y坐标
const dragStartHeight = ref(0); // 滑块拖拽起始高度
const dragType = ref(""); // 滑块拖拽类型（pageHeader/pageFooter）
const resizeStartData = ref({}); // 缩放起始数据
const dragStartData = ref({}); // 拖拽起始数据

const canvasCompsRefs = ref(null);
const pageHeaderCompsRefs = ref(null);
const pageFooterCompsRefs = ref(null);

const emit = defineEmits(["add-element", "updateElement"]);

const getComponentByType = (type) => {
  const componentMap = {
    text: Text,
    table: Table,
    line: Line,
    graphic: Graphic,
    qrcode: Qrcode,
    image: Image,
    label: Label,
    richText: RichText,
    charts: Charts,
    tablix: Tablix,
  };
  return componentMap[type] || null;
};

const getTComponentByType = (type) => {
  const componentMap = {
    text: TInput,
    table: TTable,
    line: TLine,
    graphic: TGraphic,
    qrcode: TQRCode,
    image: TImage,
    label: TLabel,
    richText: TRichText,
    charts: TCharts,
    tablix: TTablix,
  };
  return componentMap[type] || null;
};
// ========== 监听逻辑 ==========
// 监听页面设置更新
watch(
  () => settingStore.updatePage,
  (newVal) => {
    if (newVal?.type && cloneElement.value.page) {
      cloneElement.value.page[newVal.type] = newVal.value;
    }
  },
  { deep: true, immediate: false }
);

const pageStyle = computed(() => {
  return {
    backgroundColor: pageBase.value.style?.["background-color"] || "",
    backgroundImage: pageBase.value.style?.["background-image"]
      ? `url(${pageBase.value.style?.["background-image"]})`
      : "",
    backgroundRepeat: pageBase.value.style?.["background-repeat"] || "repeat",
  };
});

/**
 * 获取元素所在的数组（根据区域类型）
 * @param {string} areaType - 区域类型：pageHeader/pageFooter/默认主体
 * @returns {Array} 元素数组
 */
const getElementListByArea = (areaType) => {
  if (areaType === "pageHeader") {
    return pageHeaderComps.value || [];
  }
  if (areaType === "pageFooter") {
    return pageFooterComps.value || [];
  }
  return canvasComps.value || [];
};

/**
 * 缩放开始回调
 * @param {number} index - 元素索引
 * @param {string} areaType - 区域类型
 */
const onResizeStart = (index, areaType) => {
  const elementList = getElementListByArea(areaType);
  const targetElement = elementList[index];
  if (targetElement) {
    resizeStartData.value = {
      index,
      areaType,
      width: targetElement.width,
      height: targetElement.height,
    };
  }
};

/**
 * 缩放结束回调
 * @param {number} left - 左偏移
 * @param {number} top - 上偏移
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {string} areaType - 区域类型
 * @param {number} index - 元素索引
 */
const onResizeStop = (left, top, width, height, areaType, index) => {
  var refList = {
    pageHeaderCompsRefs: pageHeaderCompsRefs.value || [],
    pageFooterCompsRefs: pageFooterCompsRefs.value || [],
    canvasCompsRefs: canvasCompsRefs.value || [],
  }[`${areaType}CompsRefs`];
  // 更新子的宽高后，调用组件的handleResize方法调整内部布局（如图表的重新渲染）
  refList[index]?.handleResize();

  return;
  // const {
  //   index,
  //   areaType: startAreaType,
  //   width: oldWidth,
  //   height: oldHeight,
  // } = resizeStartData.value;
  // if (index === undefined) return;

  // const elementList = getElementListByArea(startAreaType || areaType);
  // // 注册撤销重做
  // useUndoManager().add({
  //   undo: () => {
  //     elementList[index].width = oldWidth;
  //     elementList[index].height = oldHeight;
  //   },
  //   redo: () => {
  //     elementList[index].width = width;
  //     elementList[index].height = height;
  //   },
  // });
};

/**
 * 拖拽开始回调
 * @param {number} index - 元素索引
 * @param {string} areaType - 区域类型
 */
const onDragStart = (index, areaType) => {
  const elementList = getElementListByArea(areaType);
  const targetElement = elementList[index];
  if (targetElement) {
    dragStartData.value = {
      index,
      areaType,
      left: targetElement.left,
      top: targetElement.top,
    };
  }
};

/**
 * 计算两点间的距离（像素），用于更新line的width
 * @param {object} start {x: number, y: number} 起点像素坐标
 * @param {object} end {x: number, y: number} 终点像素坐标
 * @returns {number} 两点间直线距离（像素）
 */
const calcLineDistance = (start, end) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const onDragStop = (left, top, areaType) => {
  const {
    index,
    areaType: startAreaType,
    left: oldLeft,
    top: oldTop,
  } = dragStartData.value;

  if (index === undefined) return;

  // 获取对应区域的元素列表
  const elementList = getElementListByArea(startAreaType || areaType);
  const currentElement = elementList[index];

  // 1. 保存原始属性（用于撤销操作）
  const oldProps = {
    left: oldLeft,
    top: oldTop,
    // 针对line类型，额外保存startPoint、endPoint、width
    ...(currentElement.type === "line" && {
      startPoint: { ...currentElement.startPoint }, // 深拷贝避免引用问题
      endPoint: { ...currentElement.endPoint },
      width: currentElement.width,
    }),
  };

  // 2. 计算新属性（区分普通元素和line元素）
  const newProps = { left, top };
  if (currentElement.type === "line") {
    // --- 核心：计算line元素的新坐标和宽度 ---
    // a. 获取原始起点/终点的像素坐标
    const oldStartX = currentElement.startPoint.x;
    const oldStartY = currentElement.startPoint.y;
    const oldEndX = currentElement.endPoint.x;
    const oldEndY = currentElement.endPoint.y;

    // b. 计算整体拖拽的偏移量（像素）
    const deltaX = left - oldLeft; // X轴偏移
    const deltaY = top - oldTop; // Y轴偏移

    // c. 更新起点坐标（随整体拖拽偏移）
    const newStartX = oldStartX + deltaX;
    const newStartY = oldStartY + deltaY;

    // d. 更新终点坐标（和起点保持相对位置不变）
    const newEndX = oldEndX + deltaX;
    const newEndY = oldEndY + deltaY;

    // e. 计算新的宽度（两点间实际直线距离，取整保持和示例一致）
    const newWidth = Math.round(
      calcLineDistance({ x: newStartX, y: newStartY }, { x: newEndX, y: newEndY })
    );

    // 合并line专属的新属性
    Object.assign(newProps, {
      startPoint: { x: newStartX, y: newStartY },
      endPoint: { x: newEndX, y: newEndY },
      width: newWidth,
    });
  }

  // 3. 注册撤销重做逻辑
  useUndoManager().add({
    undo: () => {
      console.log(oldProps);
      // 撤销：恢复原始属性
      elementList[index].left = oldProps.left;
      elementList[index].top = oldProps.top;
      if (currentElement.type === "line") {
        elementList[index].startPoint = oldProps.startPoint;
        elementList[index].endPoint = oldProps.endPoint;
        elementList[index].width = oldProps.width;
      }
      console.log(elementList[index]);
    },
    redo: () => {
      // 重做：应用新属性
      elementList[index].left = newProps.left;
      elementList[index].top = newProps.top;
      if (currentElement.type === "line") {
        elementList[index].startPoint = newProps.startPoint;
        elementList[index].endPoint = newProps.endPoint;
        elementList[index].width = newProps.width;
      }
    },
  });

  console.log(elementList[index]);
  // 4. 立即更新元素的属性（生效）
  Object.assign(elementList[index], newProps);
};

/**
 * 设置元素宽度
 * @param {number} width - 宽度
 * @param {number} index - 元素索引
 */
const setElementWidth = (width, areaType, index) => {
  const elementList = {
    canvas: canvasComps,
    pageHeader: pageHeaderComps,
    pageFooter: pageFooterComps,
  }[areaType];

  nextTick(() => {
    if (elementList.value[index]) {
      elementList.value[index].width = width;
    }
  });
};

const setElementHeight = (height, areaType, index) => {
  const elementList = {
    canvas: canvasComps,
    pageHeader: pageHeaderComps,
    pageFooter: pageFooterComps,
  }[areaType];
  nextTick(() => {
    if (elementList.value[index]) {
      elementList.value[index].height = height;
    }
  });
};

const setElementLeftTop = (data, areaType, index, isUndo) => {
  // nextTick(() => {
  //   if (cloneElement.value.reportItems?.[index]) {
  //     cloneElement.value.reportItems[index].left = data.left;
  //     cloneElement.value.reportItems[index].top = data.top;

  //   }
  // });

  const elementList = {
    canvas: canvasComps,
    pageHeader: pageHeaderComps,
    pageFooter: pageFooterComps,
  }[areaType];

  if (elementList.value[index]) {
    elementList.value[index].left = data.left;
    elementList.value[index].top = data.top;
  }
};

/**
 * 判断坐标是否在内容容器内
 * @param {number} clientX - 鼠标X坐标
 * @param {number} clientY - 鼠标Y坐标
 * @returns {boolean} 是否在容器内
 */
const isPointInContentContainer = (clientX, clientY) => {
  if (!contentContainerRef.value) return false;
  const rect = contentContainerRef.value.getBoundingClientRect();
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
};

/**
 * 获取拖拽放下的区域类型
 * @param {number} clientX - 鼠标X坐标
 * @param {number} clientY - 鼠标Y坐标
 * @returns {string} 区域类型：pageHeader/pageFooter/content
 */
const getDropAreaType = (clientX, clientY) => {
  if (!contentContainerRef.value) return "content";

  // 获取各区域DOM
  const headerEl = contentContainerRef.value.querySelector(".page_header");
  const footerEl = contentContainerRef.value.querySelector(".page_footer");

  // 检查页眉区域
  if (headerEl) {
    const rect = headerEl.getBoundingClientRect();
    if (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    ) {
      return "pageHeader";
    }
  }

  // 检查页脚区域
  if (footerEl) {
    const rect = footerEl.getBoundingClientRect();
    if (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    ) {
      return "pageFooter";
    }
  }

  // 默认主体区域
  return "canvas";
};

/**
 * 计算拖拽元素的相对坐标
 * @param {string} areaType - 区域类型
 * @param {number} clientX - 鼠标X坐标
 * @param {number} clientY - 鼠标Y坐标
 * @returns {Object} {x, y} 相对坐标
 */
const calculateRelativePosition = (areaType, clientX, clientY) => {
  let x = 0;
  let y = 0;
  // const gridX = props.grid[0];
  // const gridY = props.grid[1];

  if (areaType === "pageHeader" || areaType === "pageFooter") {
    // 页眉/页脚区域：相对自身区域计算
    const targetEl = contentContainerRef.value.querySelector(`.${areaType}`);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      x = Math.round(clientX - rect.left);
      y = Math.round(clientY - rect.top);
    }
  } else {
    // 主体区域：相对内容容器计算
    const rect = contentContainerRef.value.getBoundingClientRect();
    x = Math.round(clientX - rect.left);
    y = Math.round(clientY - rect.top - 10);

    // 减去页眉高度（如果有）
    const headerEl = contentContainerRef.value.querySelector(".page_header");
    if (headerEl) {
      const headerHeight = parseFloat(getComputedStyle(headerEl).height);
      y = Math.max(y - headerHeight, 0);
    }
  }

  return { x, y };
};

// ========== 事件处理 ==========
/**
 * 拖拽经过画布
 * @param {DragEvent} e - 拖拽事件
 */
const handleDragOver = (e) => {
  if (!props.currentDragItem) return;

  // 判断是否在内容容器内
  const inTargetArea = isPointInContentContainer(e.clientX, e.clientY);
  e.dataTransfer.dropEffect = inTargetArea ? "copy" : "none";

  // 更新临时元素坐标
  if (inTargetArea) {
    const canvasRect = canvasContainerRef.value.getBoundingClientRect();
    tempX.value = Math.round(e.clientX - canvasRect.left);
    tempY.value = Math.round(e.clientY - canvasRect.top);
    isInTargetArea.value = true;
  } else {
    isInTargetArea.value = false;
  }

  isDragOver.value = true;
};

/**
 * 拖拽离开画布
 * @param {DragEvent} e - 拖拽事件
 */
const handleDragLeave = (e) => {
  // 防止子元素触发误判
  if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
    isDragOver.value = false;
    isInTargetArea.value = false;
  } else if (props.currentDragItem) {
    isInTargetArea.value = isPointInContentContainer(e.clientX, e.clientY);
  }
};

/**
 * 鼠标移动（更新临时元素坐标）
 * @param {MouseEvent} e - 鼠标事件
 */
const handleMouseMove = (e) => {
  if (
    isDragOver.value &&
    props.currentDragItem &&
    isPointInContentContainer(e.clientX, e.clientY)
  ) {
    const canvasRect = canvasContainerRef.value.getBoundingClientRect();
    // 网格对齐
    tempX.value =
      Math.round((e.clientX - canvasRect.left) / props.grid[0]) * props.grid[0];
    tempY.value =
      Math.round((e.clientY - canvasRect.top) / props.grid[1]) * props.grid[1];
    isInTargetArea.value = true;
  } else {
    isInTargetArea.value = false;
  }
};

/**
 * 拖拽放下，新增元素
 * @param {DragEvent} e - 拖拽事件
 */
const handleDrop = (e) => {
  e.preventDefault();
  if (!props.currentDragItem || !isPointInContentContainer(e.clientX, e.clientY)) {
    isDragOver.value = false;
    isInTargetArea.value = false;
    return;
  }

  // 重置拖拽状态
  isDragOver.value = false;
  isInTargetArea.value = false;

  // 获取放下区域和坐标
  const dropAreaType = getDropAreaType(e.clientX, e.clientY);
  const { x, y } = calculateRelativePosition(dropAreaType, e.clientX, e.clientY);
  // 创建新元素
  const newElement = {
    ...ComponentJson[props.currentDragItem.type],
    left: x,
    top: y,
    zIndex: 1,
    isActive: false,
    cloneId: Date.now() + Math.random().toString(36).substr(2, 9),
  };
  console.log(newElement);

  if (newElement.type === "line") {
    newElement.startPoint.x = x;
    newElement.startPoint.y = y;
    newElement.endPoint.x = x + 50;
    newElement.endPoint.y = y;
  }

  addComp(dropAreaType, newElement);
};

/**
 * 开始拖拽滑块（调整页眉/页脚高度）
 * @param {MouseEvent} e - 鼠标事件
 * @param {string} type - 区域类型
 */
const startSliderDrag = (e, type) => {
  e.preventDefault();
  e.stopPropagation();

  // 初始化拖拽状态
  isSliderDragging.value = true;
  dragType.value = type;
  dragStartY.value = e.clientY;
  dragStartHeight.value = cloneElement.value[type]?.height || 40;

  // 添加全局事件监听
  document.addEventListener("mousemove", handleSliderDrag);
  document.addEventListener("mouseup", stopSliderDrag);
  document.body.style.cursor = "ns-resize";
};

/**
 * 处理滑块拖拽
 * @param {MouseEvent} e - 鼠标事件
 */
const handleSliderDrag = (e) => {
  if (!isSliderDragging.value || !dragType.value) return;

  // 计算高度变化
  const deltaY = e.clientY - dragStartY.value;
  let newHeight = dragStartHeight.value;

  // 页眉/页脚不同的计算逻辑
  if (dragType.value === "pageFooter") {
    newHeight = Math.round((dragStartHeight.value - deltaY) * 10) / 10;
  } else {
    newHeight = Math.round((dragStartHeight.value + deltaY) * 10) / 10;
  }

  // 计算最大高度限制
  const pageHeight = unitToPx(cloneElement.value.page?.pageHeight) || 800;
  const topMargin = unitToPx(cloneElement.value.page?.topMargin) || 0;
  const bottomMargin = unitToPx(cloneElement.value.page?.bottomMargin) || 0;
  const availableHeight = pageHeight - topMargin - bottomMargin;
  const maxHeight = Math.floor(availableHeight * SLIDER_MAX_HEIGHT_RATIO);

  // 应用高度限制
  newHeight = Math.max(SLIDER_MIN_HEIGHT, Math.min(newHeight, maxHeight));

  if (dragType.value === "pageFooter") {
    updatePageFooterLayout({ height: newHeight });
  } else {
    updatePageHeaderLayout({ height: newHeight });
  }

  cloneElement.value[dragType.value].height = newHeight;
};

/**
 * 停止滑块拖拽
 */
const stopSliderDrag = () => {
  if (!isSliderDragging.value || !dragType.value) return;

  // 注册撤销重做
  const finalHeight = cloneElement.value[dragType.value].height;
  const originalHeight = dragStartHeight.value;
  const currentDragType = dragType.value;

  useUndoManager().add({
    undo: () => {
      cloneElement.value[currentDragType].height = originalHeight;
    },
    redo: () => {
      cloneElement.value[currentDragType].height = finalHeight;
    },
  });

  // 重置状态
  isSliderDragging.value = false;
  dragType.value = "";
  document.removeEventListener("mousemove", handleSliderDrag);
  document.removeEventListener("mouseup", stopSliderDrag);
  document.body.style.cursor = "default";
};

/**
 * 元素激活（选中）
 * @param {Object} item - 元素数据
 * @param {string} path - 元素路径
 */
const onElementActivated = (item, path) => {
  selectElementName.value = item.name;
  selectPath.value = path;
};

/**
 * 元素取消激活
 * @param {Object} item - 元素数据
 * @param {string} path - 元素路径
 */
const onElementDeactivated = (item, path) => {
  console.log("元素取消激活:", item, path);
};

/**
 * 激活元素
 * @param {number} index - 元素索引
 */
const handleElementActive = (index) => {
  // 可扩展激活逻辑
};

/**
 * 删除元素
 * @param {number} index - 元素索引
 * @param {string} pageType - 区域类型
 */
const handleDeleteItem = (index, pageType) => {
  // tableElementRefs.value = {};

  // 2. 获取对应区域的元素列表（增加兜底逻辑，避免getElementListByArea未定义/返回空）
  const elementList =
    getElementListByArea?.(pageType) ||
    (() => {
      // 兜底：如果getElementListByArea未定义，手动获取对应区域列表
      switch (pageType) {
        case "pageHeader":
          return cloneElement.value.pageHeader?.reportItems;
        case "pageFooter":
          return cloneElement.value.pageFooter?.reportItems;
        default:
          return cloneElement.value.reportItems; // 主体区域
      }
    })();

  // 3. 边界判断：列表不存在/索引无效 → 提示并返回
  if (!Array.isArray(elementList) || index < 0 || index >= elementList.length) {
    console.warn(`删除失败：${pageType} 区域无索引为 ${index} 的元素`);
    return;
  }

  // 4. 保存删除前的状态（深拷贝，避免引用污染）
  const deletedItem = deepClone(elementList[index]); // 被删除的元素
  const preDeleteList = deepClone(elementList); // 删除前的完整列表

  // 5. 执行删除操作
  elementList.splice(index, 1);

  // 6. 添加撤销/重做逻辑（和之前的add/remove逻辑对齐）
  useUndoManager().add({
    undo: () => {
      // 撤销：恢复被删除的元素到原位置
      elementList.splice(index, 0, deletedItem);
    },
    redo: () => {
      // 重做：再次删除该位置的元素（需判断索引仍有效）
      if (elementList[index] !== undefined) {
        elementList.splice(index, 1);
      }
    },
  });

  // 7. 通知父组件数据更新
  emit("updateElement", cloneElement.value);
};

/**
 * 处理文本编辑
 * @param {string} value - 初始值
 * @param {DOMRect} rect - 元素位置
 * @param {string} path - 编辑路径
 */
const handleTextEdit = (value, rect, path) => {
  if (!textEditRef.value || !canvasContainerRef.value) return;

  editPath.value = path;
  const canvasRect = canvasContainerRef.value.getBoundingClientRect();

  // 设置编辑框位置和样式
  textEditRef.value.value = value;
  textEditRef.value.style.position = "absolute";
  textEditRef.value.style.top = `${rect.top - canvasRect.top}px`;
  textEditRef.value.style.left = `${rect.left - canvasRect.left}px`;
  textEditRef.value.style.width = `${rect.width}px`;
  textEditRef.value.style.height = `${rect.height}px`;
  textEditRef.value.focus();
};

/**
 * 文本编辑失焦
 */
const handleTextEditBlur = () => {
  if (!editPath.value || !textEditRef.value) return;

  // 设置编辑后的值
  handleCompValueChange(selectedComp.value, textEditRef.value.value);

  // 重置编辑框位置
  textEditRef.value.style.cssText = `
    position: fixed;
    top: 100%;
    left: 100%;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  `;
  textEditRef.value.value = "";
  editPath.value = "";
};

/**
 * 点击外部区域（选中页面）
 * @param {MouseEvent} e - 鼠标事件
 */
const handleClickOutside = (e) => {
  // 检查是否点击了排除区域
  let target = e.target;
  let isExcluded = false;
  while (target && target !== document) {
    if (EXCLUDE_CLICK_CLASSES.some((cls) => target.classList?.contains(cls))) {
      isExcluded = true;
      break;
    }
    target = target.parentNode;
  }

  // 未点击排除区域则选中页面
  if (!isExcluded) {
    console.log(props);

    selectComp({
      type: "page",
      ...pageBase.value,
    });

    // settingStore.setIsPage(true);
    // settingStore.setSelected({
    //   type: "page",
    //   page: cloneElement.value.page,
    // });
    // selectPath.value = "";
  }
};

// ========== 工具函数 ==========
/**
 * 通过路径设置对象值
 * @param {Object} target - 目标对象
 * @param {string} path - 路径字符串
 * @param {any} value - 要设置的值
 */
const setValueByPath = (path, value, setKey = "value") => {
  // 基础校验：目标对象或路径为空直接返回
  if (!path) return false;

  // 解析路径（支持 . 和 [] 两种格式）
  const pathSegments = path.split(/\.|\[|\]/).filter((seg) => seg.trim());
  if (pathSegments.length === 0) return false;

  // 遍历找到目标属性的父节点
  let current = cloneElement.value;
  const lastIndex = pathSegments.length - 1;
  const lastKey = pathSegments[lastIndex];

  // 遍历到父节点（排除最后一个key）
  for (let i = 0; i < lastIndex; i++) {
    const key = pathSegments[i];
    if (!current.hasOwnProperty(key)) {
      console.error(`路径节点 ${key} 不存在`);
      return false;
    }
    current = current[key];
  }

  // 目标属性不存在则直接返回
  if (!current[lastKey]) return true;

  // 深克隆原始值用于撤销操作
  const originalValue = deepClone(current[lastKey]);

  // 封装状态更新函数，减少代码重复
  const updateSelected = (data) => {
    settingStore.setSelected({
      ...settingStore.selected,
      data,
      sameData: data,
    });
  };

  // 添加撤销/重做操作
  useUndoManager().add({
    undo: () => {
      current[lastKey][setKey] = originalValue[setKey];
      updateSelected(originalValue);
    },
    redo: () => {
      current[lastKey][setKey] = value;
      updateSelected(current[lastKey]);
    },
  });

  // 执行赋值并更新状态
  current[lastKey][setKey] = value;
  updateSelected(current[lastKey]);

  return true;
};

// ========== 生命周期 ==========
onMounted(() => {
  // 初始化页眉/页脚高度
  if (cloneElement.value.pageHeader && !cloneElement.value.pageHeader.height) {
    cloneElement.value.pageHeader.height = 40;
  }
  if (cloneElement.value.pageFooter && !cloneElement.value.pageFooter.height) {
    cloneElement.value.pageFooter.height = 40;
  }

  // 添加全局点击监听
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  // 移除全局监听
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("mousemove", handleSliderDrag);
  document.removeEventListener("mouseup", stopSliderDrag);

  // 恢复鼠标样式
  document.body.style.cursor = "default";
});

// ========== 提供方法 & 暴露方法 ==========
provide("handleEdit", handleTextEdit);
</script>

<style lang="scss" scoped>
.main_container {
  background-color: #e6e6e6;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .drag-container-box {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    padding: 40px;
    display: flex;
    position: relative;

    .drag-container {
      background-color: #fff;
      box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      position: relative;
      cursor: default;
      margin: 0 auto;
    }

    .canvas-highlight {
      box-shadow: 0 0 0 2px var(--el-color-primary);
    }
  }
}

.select {
  border: 2px solid var(--el-color-primary) !important;
}

.element-item {
  position: absolute;
  box-sizing: border-box;
  border-radius: 4px;
}

// 临时占位元素样式
.temp-element {
  cursor: move;
  .iconfont {
    margin-right: 8px;
  }
}

// 可拖拽元素样式
:deep(.drv-handle) {
  width: 10px;
  height: 10px;
  background: #fff;
  border: 1px solid rgba(32, 95, 120, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 900;
}

:deep(.drv-active) {
  border: 0.5px dashed var(--el-color-primary) !important;
  z-index: 200 !important;
}
:deep(.drv) {
  border: 0.5px dashed gray;
}

:deep(.drv_line) {
  position: absolute;
  border: 0 !important;
}

// 文本编辑框样式
.text_area {
  position: fixed;
  width: 0;
  height: 0;
  top: 100%;
  left: 100%;
  background-color: #fff;
  z-index: 900;
  font-size: 13px;
  border: none;
  outline: none;
  resize: none;
  margin: 0;
  color: inherit;
  line-height: inherit;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: none;
  border-radius: 0;
}

.text_area::-webkit-scrollbar {
  display: none;
}

.text_area:focus {
  border: none;
  outline: none;
  box-shadow: none;
}

// 核心容器样式
.container {
  display: flex;
  flex-direction: column;
  user-select: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.container_content {
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0px 0px /
      20px 20px,
    linear-gradient(0deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0px 0px / 20px 20px;
}

// 表格元素样式
.table-element {
  width: auto !important;
  height: 100%;
  border: 0;
}

:deep(.drv-container) {
  border: 1px solid #e4e4e4;
}

// 页眉/主体/页脚样式
.page_header,
.page_footer {
  position: relative;
  overflow: hidden;
}
.page_body {
  position: relative;
}

.page_body {
  flex: 1;
}

.page_header_placeholder,
.page_body_placeholder,
.page_footer_placeholder {
  position: absolute;
  top: 5px;
  left: 0;
  color: #ccc;
  font-size: 12px;
  pointer-events: none;
}

// 滑块样式优化
.page_header_slider {
  position: absolute;
  width: 100%;
  height: 4px;
  cursor: ns-resize;
  pointer-events: all;
  bottom: 0;
  border-bottom: 2px dashed var(--el-color-primary);
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--el-color-primary-dark-2);
    background-color: rgba(64, 158, 255, 0.1);
    height: 6px;
  }
}

.page_footer_slider {
  position: absolute;
  width: 100%;
  height: 4px;
  cursor: ns-resize;
  pointer-events: all;
  top: 0;
  border-top: 2px dashed var(--el-color-primary);
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--el-color-primary-dark-2);
    background-color: rgba(64, 158, 255, 0.1);
    height: 6px;
  }
}
</style>
