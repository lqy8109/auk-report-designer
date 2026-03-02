<script setup>
import { ref, computed, onBeforeMount, onMounted, onUnmounted, watch } from "vue";
import { mapJsonLineToBorderStyle } from "@/utils/styleMapper";
import { useSettingStore } from "@/stores/index";
import { useUndoManager } from "@/utils/undoManager";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

const {
  selectComp,
  handleCompValueChange,
  deleteComp,
  selectedPageType,
  selectedIndex,
} = useLowcodeEditor();

const settingStore = useSettingStore();

// 接收外层可拖拽容器的属性（用于坐标计算）
const props = defineProps({
  dataItem: { type: Object, default: () => {} },
  path: { type: String, default: "" },
  index: { type: Number, default: 0 },
  selectPath: { type: String, default: "" },
  pageType: { type: String, default: "" },
});
const emit = defineEmits(["setWidth", "setHeight", "setLeftTop"]);

// 线条端点坐标（相对于容器内部）
const oldLeft = ref(0);
const oldTop = ref(0);
const startX = ref(0);
const startY = ref(0);
const endX = ref(0);
const endY = ref(0);

// 交互状态
const isDragging = ref(false);
const dragTarget = ref("");
const dragStartPos = ref({ x: 0, y: 0 });
const dragBasePos = ref({ startX: 0, startY: 0, endX: 0, endY: 0 });
const lineStyle = ref({
  backgroundColor: "#000",
});
const borderWidth = ref("1px");
const rotate = ref(0);

// 保存原始样式快照
const originalStyleSnapshot = ref({});

const baseStyle = computed(() => mapJsonLineToBorderStyle(props.dataItem.style));

// 处理垂直对齐和flex布局的核心函数
const handleVerticalAlignAndFlex = (styleObj) => {
  const newStyle = { ...styleObj };
  return newStyle;
};

// 计算最终样式
const style = computed(() => {
  return handleVerticalAlignAndFlex(baseStyle.value);
});

// 计算两点之间的距离（线条实际长度）
const getLineLength = () => {
  const dx = endX.value - startX.value;
  const dy = endY.value - startY.value;
  return Math.sqrt(dx * dx + dy * dy);
};

// 保存当前状态快照（用于撤销/重做）
const saveStateSnapshot = () => {
  return {
    // 保存端点坐标
    startPoint: { x: startX.value, y: startY.value },
    endPoint: { x: endX.value, y: endY.value },
    // 保存样式
    style: { ...props.dataItem.style },
    // 保存旋转角度
    rotate: rotate.value,
    // 保存边框宽度
    borderWidth: borderWidth.value
  };
};

// 恢复状态快照
const restoreStateSnapshot = (snapshot) => {
  if (!snapshot) return;
  
  // 恢复端点坐标
  startX.value = snapshot.startPoint.x;
  startY.value = snapshot.startPoint.y;
  endX.value = snapshot.endPoint.x;
  endY.value = snapshot.endPoint.y;
  
  // 恢复样式（深拷贝）
  props.dataItem.style = { ...snapshot.style };
  
  // 恢复旋转角度
  rotate.value = snapshot.rotate;
  
  // 恢复边框宽度
  borderWidth.value = snapshot.borderWidth;
  
  // 更新数据项中的端点信息
  props.dataItem.startPoint = { ...snapshot.startPoint };
  props.dataItem.endPoint = { ...snapshot.endPoint };
  
  // 向外传递更新后的值
  emit("setWidth", getLineLength());
  emit("setLeftTop", { left: startX.value, top: startY.value });
  
  // 触发组件重新计算样式
  handleCompValueChange && handleCompValueChange();
};

onBeforeMount(() => {
  // 初始化端点坐标
  startX.value = props.dataItem.startPoint?.x || 0;
  startY.value = props.dataItem.startPoint?.y || 0;
  endX.value = props.dataItem.endPoint?.x || 100;
  endY.value = props.dataItem.endPoint?.y || 0;

  // 计算旋转角度
  const dx = endX.value - startX.value;
  const dy = endY.value - startY.value;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  rotate.value = angle;

  // 初始化线条样式
  borderWidth.value = style.value["border-width"];
  emit("setWidth", getLineLength());
  oldLeft.value = startX.value;
  oldTop.value = startY.value;
  emit("setLeftTop", { left: startX.value, top: startY.value });
  
  // 保存初始状态快照
  originalStyleSnapshot.value = saveStateSnapshot();
});

watch(
  () => props.dataItem,
  () => {
    startX.value = props.dataItem.startPoint?.x || 0;
    startY.value = props.dataItem.startPoint?.y || 0;
    endX.value = props.dataItem.endPoint?.x || 100;
    endY.value = props.dataItem.endPoint?.y || 0;
  },
  { deep: true }
);

// 监听样式修改并添加撤销/重做
watch(
  () => settingStore.updateFlag,
  (newVal, oldVal) => {
    if (props.path === settingStore.selectedParentPath && newVal) {
      // 1. 保存修改前的完整状态快照
      const beforeSnapshot = saveStateSnapshot();
      
      // 2. 保存旧值并应用新值
      const oldStyleValue = { ...baseStyle.value };
      baseStyle.value[newVal.type] = newVal.value;
      borderWidth.value = style.value["border-width"];
      
      // 3. 保存修改后的状态快照
      const afterSnapshot = saveStateSnapshot();

      // 4. 添加完整的撤销/重做记录
      useUndoManager().add({
        // 撤销操作：恢复修改前的状态
        undo: () => {
          restoreStateSnapshot(beforeSnapshot);
          handleClick(); // 重新选中组件以更新视图
        },
        // 重做操作：恢复修改后的状态
        redo: () => {
          restoreStateSnapshot(afterSnapshot);
          handleClick(); // 重新选中组件以更新视图
        },
        // 可选：添加描述，方便调试
        description: `修改线条${newVal.type}属性: ${oldStyleValue[newVal.type]} → ${newVal.value}`
      });
    }
  },
  { deep: true }
);

watch(
  () => props.dataItem.style,
  (newStyle) => {
    baseStyle.value = mapJsonLineToBorderStyle(newStyle);
    borderWidth.value = newStyle["border-width"];
  },
  { deep: true, immediate: true }
);

// 开始拖拽
const startDrag = (target, e) => {
  e.stopPropagation();
  
  // 保存拖拽前的状态快照（用于撤销）
  dragBasePos.value = {
    startX: startX.value,
    startY: startY.value,
    endX: endX.value,
    endY: endY.value,
  };
  
  // 保存拖拽前的完整快照
  originalStyleSnapshot.value = saveStateSnapshot();
  
  oldLeft.value = startX.value;
  oldTop.value = startY.value;
  isDragging.value = true;
  dragTarget.value = target;
  dragStartPos.value = {
    x: e.clientX,
    y: e.clientY,
  };
};

// 处理鼠标移动
const handleMouseMove = (e) => {
  if (!isDragging.value) return;

  const deltaX = e.clientX - dragStartPos.value.x;
  const deltaY = e.clientY - dragStartPos.value.y;

  if (dragTarget.value === "left") {
    startX.value = dragBasePos.value.startX + deltaX;
    startY.value = dragBasePos.value.startY + deltaY;
    endX.value = dragBasePos.value.endX;
    endY.value = dragBasePos.value.endY;
  } else if (dragTarget.value === "right") {
    endX.value = dragBasePos.value.endX + deltaX;
    endY.value = dragBasePos.value.endY + deltaY;
    startX.value = dragBasePos.value.startX;
    startY.value = dragBasePos.value.startY;
  }

  // 重新计算角度和长度
  const dx = endX.value - startX.value;
  const dy = endY.value - startY.value;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  rotate.value = angle;
  lineStyle.value.width = `${getLineLength()}px`;

  // 向外传递更新后的值
  emit("setWidth", getLineLength());
  emit("setLeftTop", { left: startX.value, top: startY.value });

  // 更新dataItem中的坐标
  props.dataItem.startPoint = { x: startX.value, y: startY.value };
  props.dataItem.endPoint = { x: endX.value, y: endY.value };
};

// 结束拖拽：添加拖拽操作的撤销/重做
const handleMouseUp = () => {
  if (isDragging.value) {
    isDragging.value = false;
    
    // 只有当坐标发生变化时才添加撤销记录
    const hasChanged = 
      startX.value !== dragBasePos.value.startX ||
      startY.value !== dragBasePos.value.startY ||
      endX.value !== dragBasePos.value.endX ||
      endY.value !== dragBasePos.value.endY;
    
    if (hasChanged) {
      // 拖拽前的快照
      const beforeDragSnapshot = originalStyleSnapshot.value;
      // 拖拽后的快照
      const afterDragSnapshot = saveStateSnapshot();

      // 添加拖拽操作的撤销/重做记录
      useUndoManager().add({
        // 撤销：恢复拖拽前的位置
        undo: () => {
          restoreStateSnapshot(beforeDragSnapshot);
          handleClick();
        },
        // 重做：恢复拖拽后的位置
        redo: () => {
          restoreStateSnapshot(afterDragSnapshot);
          handleClick();
        },
        description: `拖拽线条端点: (${dragBasePos.value.startX}, ${dragBasePos.value.startY}) → (${startX.value}, ${startY.value})`
      });
    }
    
    dragTarget.value = "";
  }
};

const handleClick = () => {
  selectComp(props.dataItem, props.pageType, props.index);
};

// 挂载时添加全局事件监听
onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});

// 卸载时移除监听
onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});

// 场景1：文本区域菜单（含分隔线）
const textMenuList = ref([
  {
    label: "删除",
    action: () => {
      // 删除操作也添加撤销/重做
      const deleteSnapshot = saveStateSnapshot();
      deleteComp(props.pageType, props.index);
      
      useUndoManager().add({
        undo: () => {
          // 恢复删除前的组件（需要根据你的业务逻辑实现）
          // 这里需要你补充恢复组件的逻辑，例如：
          // addComp(props.pageType, props.index, deleteSnapshot);
          handleClick();
        },
        redo: () => {
          deleteComp(props.pageType, props.index);
        },
        description: `删除线条组件: 索引${props.index}`
      });
    },
  },
]);

// 暴露方法（供父组件调用）
defineExpose({
  startX,
  startY,
  endX,
  endY,
  getLineLength,
  saveStateSnapshot,
  restoreStateSnapshot
});
</script>

<template>
  <!-- 原有模板不变 -->
  <div
    class="line-wrapper no_page"
    @click="handleClick"
    :style="{ transform: `rotate(${rotate}deg)`, '--borderWidth': borderWidth }"
    :class="{
      active: selectedPageType == props.pageType && selectedIndex == props.index,
    }"
    v-context-menu="textMenuList"
    @contextmenu="handleClick"
  >
    <div class="draggable-line handle" :style="style"></div>
    <div class="drag-point left-point" @mousedown="(e) => startDrag('left', e)"></div>
    <div class="drag-point right-point" @mousedown="(e) => startDrag('right', e)"></div>
  </div>
</template>

<style scoped lang="scss">
/* 原有样式不变 */
.line-wrapper {
  width: 100%;
  user-select: none;
  height: 10px;
  position: relative;
  transform-origin: left center;
}

.drag-point {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #205f7880;
  cursor: grab;
  z-index: 2;
  pointer-events: auto;
  display: none;
}
.drv-active .drag-point {
  display: block;
}
.active .drag-point {
  display: block;
}

.drag-point:active {
  cursor: grabbing;
}

.left-point {
  transform: translate(-100%, 0%);
  top: -4px;
  left: 0px;
}
.right-point {
  transform: translate(100%, 0%);
  top: -4px;
  right: 0px;
}

.drv-active {
  .line-wrapper::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 0;
    border: var(--borderWidth) dashed var(--el-color-primary);
    border-style: dashed none none;
  }
}

.draggable-line {
  width: 100%;
  height: 0px;
  background-color: inherit;
}

.active {
  width: 100%;
  position: relative;
}
.active::after {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 0;
  border: var(--borderWidth) dashed var(--el-color-primary);
  border-style: dashed none none;
}
</style>