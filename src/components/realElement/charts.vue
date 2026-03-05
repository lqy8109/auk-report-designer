<script setup>
import { ref, inject, watch, computed, getCurrentInstance, onMounted } from "vue";
import { mapJsonToStyle } from "@/utils/styleMapper";
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
const { proxy } = getCurrentInstance();

const settingStore = useSettingStore();
const props = defineProps({
  dataItem: { type: Object, default: () => {} },
  path: { type: String, default: "" },
  index: { type: Number, default: 0 },
  selectPath: { type: String, default: "" },
  pageType: { type: String, default: "" },
  dataSources: { type: Array, default: () => [] },
  dataSets: { type: Array, default: () => [] },
});

const emit = defineEmits(["handleActive", "setValueByPath"]);

const handleSelect = inject("handleSelect");
const handleEdit = inject("handleEdit");
const textAreaRef = ref(null);

// 初始化样式
const baseStyle = computed(() => mapJsonToStyle(props.dataItem.style));

// 处理垂直对齐和flex布局的核心函数
const handleVerticalAlignAndFlex = (styleObj) => {
  // 深拷贝避免修改原对象
  const newStyle = { ...styleObj };

  if (newStyle.hasOwnProperty("background-image")) {
    newStyle["background-image"] = `url(${newStyle["background-image"]})`;
  }

  return newStyle;
};

// 计算最终样式（包含flex和垂直对齐处理）
const style = computed(() => {
  return handleVerticalAlignAndFlex(baseStyle.value);
});

const handleClick = () => {
  selectComp(props.dataItem, props.pageType, props.index);
};

// 场景1：文本区域菜单（含分隔线）
const textMenuList = ref([
  {
    label: "删除",
    action: () => {
      deleteComp(props.pageType, props.index);
      // emit("handleDeleteItem", props.index, props.pageType);
    },
  },
]);

const chartRef = ref(null);
let chartInstance = null;


const initChart = () => {
  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(props.dataItem.echartsOption || {});
};

onMounted(() => {
  initChart();
});

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

watch(
  () => props.dataItem.echartsOption,
  (newVal) => {
    if (chartInstance) {
      chartInstance.dispose();
      initChart();
    }
  },
  { deep: true }
);

defineExpose({
  handleResize,
});
</script>

<template>
  <div
    class="no_page text-element"
    :class="{
      active: selectedPageType == props.pageType && selectedIndex == props.index,
    }"
    v-context-menu="textMenuList"
    @contextmenu="handleClick"
    @click="handleClick"
    @dblclick="handleDoubleClick"
  >
    <div
      class="zh-text-box handle no_page"
      :title="props.dataItem.value"
      :data-path="props.path"
      ref="textAreaRef"
    >
      <div class="zh-text ele_border" :style="style">
        <div ref="chartRef" class="wh-100"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.zh-text-box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.text-element {
  position: relative;
  width: 100%;
  height: 100%;
}

.text-element:hover .custom-cell-field-picker {
  display: block;
}
.custom-cell-field-picker {
  right: 3px;
}

.ele_border {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.active {
  width: 100%;
  height: 100%;
  position: relative;
}
.active::after {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  width: 100%;
  height: 100%;
  border: 1px dashed var(--el-color-primary);
  pointer-events: none;
}
</style>
