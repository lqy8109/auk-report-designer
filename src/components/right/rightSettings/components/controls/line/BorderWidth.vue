<script setup>
import { ref, watch, computed } from "vue";
import { Rank } from "@element-plus/icons-vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
const {
  // 选中状态
  selectedComp,
  hasSelectedComp,
  // 页面布局
  pageBase,
  pageHeaderLayout,
  pageFooterLayout,
  // 页面更新方法
  updatePageBase,
  updatePageHeaderLayout,
  updatePageFooterLayout,
  //数据更新方法
  updateCompProps,
  updateCanvasComp,
  updatePageHeaderComp,
  updatePageFooterComp,
  // 通用监听
  watchSelectedComp,
  // 获取当前组件所在区域
  getCurrentSection,
} = useLowcodeEditor();

const props = defineProps({
  modelValue: {
    type: [String, Object],
    required: false,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  type: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "change"]);

// 控制上下左右选择框的显示/隐藏
const showDirectionSelect = ref(false);

// 存储四个方向的值（纯数字，无px）
const directionValues = ref("");

// 解析初始值（移除px，只保留数字）
const initValues = () => {
  const values = props.modelValue;
  directionValues.value = values?.replace("px", "");
};

// 初始化值
initValues();

// 监听父组件传入的modelValue变化
watch(
  () => props.modelValue,
  () => {
    initValues();
  },
  { immediate: true }
);

// 点击Rank按钮切换显示/隐藏
const toggleDirectionSelect = () => {
  showDirectionSelect.value = !showDirectionSelect.value;
};

// 处理主输入框的输入事件（核心：替代v-model的setter）
const handleMainInput = (newValue) => {
  // 确保值是纯数字（移除可能的px）
  const pureValue = newValue?.replace("px", "") || "";
  // 同步到四个方向值
  directionValues.value = pureValue;

  var style = selectedComp.value.style || {};
  const newStyle = {
    ...style,
  };
  newStyle[props.type] = directionValues.value + "px";
  updateCompProps(selectedComp.value, { style: newStyle });

  // emit("update:modelValue", directionValues.value + "px");
  // emit("change", {
  //   type: props.type,
  //   value: directionValues.value + 'px',
  // });
};
</script>

<template>
  <div class="border-style-select">
    <div class="main-select-wrapper">
      <el-input
        :model-value="directionValues"
        @input="handleMainInput"
        style="flex: 1"
        :placeholder="placeholder"
        popper-class="right_container"
      >
      </el-input>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-select__selected-item) {
  font-size: 13px;
}

.border-style-select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 8px; /* 整体选择框和方向选择框之间的间距 */
}

// 整体选择框+按钮的容器
.main-select-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.main-select-wrapper {
  :deep(.el-input__wrapper) {
    border-radius: 4px 0 0 4px;
  }

  :deep(.el-button) {
    border-radius: 0 4px 4px 0;
    border-left: 0;
    font-size: 16px;
    cursor: pointer;
  }
}

// 上下左右选择框容器
.direction-select-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  width: 100%;
  flex-wrap: wrap; /* 适配小屏幕 */
}

.direction-item {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  width: 47%;
  max-width: 47%;
}

.direction-item :deep(.el-select) {
  width: 100px;
}
</style>
