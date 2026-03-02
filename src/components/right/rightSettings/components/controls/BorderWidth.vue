<script setup>
import { ref, watch, computed } from "vue";
import { Rank } from "@element-plus/icons-vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

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

// 控制上下左右选择框的显示/隐藏
const showDirectionSelect = ref(false);

// 存储四个方向的值（纯数字，无px）
const directionValues = ref({
  top: "",
  right: "",
  bottom: "",
  left: "",
});

// 解析初始值（移除px，只保留数字）
const initValues = () => {
  if (typeof props.modelValue === "string" && props.modelValue) {
    const values = props.modelValue.split(/\s+/);
    directionValues.value = {
      top: values[0]?.replace("px", "") || "",
      right: values[1]?.replace("px", "") || values[0].replace("px", "") || "",
      bottom: values[2]?.replace("px", "") || values[0].replace("px", "") || "",
      left: values[3]?.replace("px", "") || values[0].replace("px", "") || "",
    };
  } else if (typeof props.modelValue === "object" && props.modelValue) {
    directionValues.value = {
      top: props.modelValue.top?.replace("px", "") || "",
      right: props.modelValue.right?.replace("px", "") || "",
      bottom: props.modelValue.bottom?.replace("px", "") || "",
      left: props.modelValue.left?.replace("px", "") || "",
    };
  } else {
    directionValues.value = {
      top: "",
      right: "",
      bottom: "",
      left: "",
    };
  }
};

// 初始化值
initValues();

// 计算整体显示值（仅用于展示，无需setter）
const allDisplayValue = computed(() => {
  const { top, right, bottom, left } = directionValues.value;
  // 四个方向值完全相同（包括空值）
  if (top === right && top === bottom && top === left) {
    return top;
  }
  console.log(getCombinedValue(false));
  // 有自定义值时显示组合结果（无px）
  return getCombinedValue(false);
});

// 计算组合后的border值
// hasUnit: 是否添加px单位（true: 带px，false: 纯数字）
const getCombinedValue = (hasUnit = true) => {
  const { top, right, bottom, left } = directionValues.value;
  // 处理单个值（添加/移除px）
  const formatValue = (val) => {
    if (!val) return "";
    return hasUnit ? `${val}px` : val;
  };

  // 按 CSS border 语法组合：上 右 下 左
  return `${formatValue(top)} ${formatValue(right || top)} ${formatValue(
    bottom || top
  )} ${formatValue(left || top)}`.trim();
};

// 监听方向值变化，触发父组件事件（传递带px的值）
watch(directionValues, () => {}, { deep: true });

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
  directionValues.value = {
    top: pureValue,
    right: pureValue,
    bottom: pureValue,
    left: pureValue,
  };
  const combinedValue = getCombinedValue(true); // 带px
  // emit("update:modelValue", combinedValue);
  // emit("change", {
  //   type: props.type,
  //   value: combinedValue,
  //   directionValues: { ...directionValues.value }, // 纯数字，无px
  // });

  var style = selectedComp.value.style || {};
  const newStyle = {
    ...style,
  };
  newStyle[props.type] = combinedValue;
  updateCompProps(selectedComp.value, { style: newStyle });
};

// 单个方向选择框变化时
const handleDirectionChange = (direction, val) => {
  // 确保值是纯数字（移除可能的px）
  const pureValue = val?.replace("px", "") || "";
  directionValues.value[direction] = pureValue;
  const combinedValue = getCombinedValue(true); // 带px
  // emit("update:modelValue", combinedValue);
  // emit("change", {
  //   type: props.type,
  //   value: combinedValue,
  //   directionValues: { ...directionValues.value }, // 纯数字，无px
  // });

  var style = selectedComp.value.style || {};
  const newStyle = {
    ...style,
  };
  newStyle[props.type] = combinedValue;

  updateCompProps(selectedComp.value, { style: newStyle });
};
</script>

<template>
  <div class="border-style-select">
    <div class="main-select-wrapper">
      <!-- 核心修改：用:model-value + @input替代v-model -->

      <el-input
        :model-value="allDisplayValue"
        @input="handleMainInput"
        style="flex: 1"
        :placeholder="placeholder"
        popper-class="right_container"
      >
      </el-input>

      <el-button
        :icon="Rank"
        style="padding: 8px 8px 8px 7px"
        @click="toggleDirectionSelect"
      >
      </el-button>
    </div>

    <!-- 上下左右选择框（默认隐藏） -->
    <div v-show="showDirectionSelect" class="direction-select-wrapper">
      <div class="direction-item">
        <span style="font-size: 12px">↑</span>
        <el-input
          v-model="directionValues.top"
          style="width: 100px"
          :placeholder="placeholder"
          @change="(val) => handleDirectionChange('top', val)"
          popper-class="right_container"
          type="number"
        >
        </el-input>
      </div>

      <div class="direction-item">
        <span style="font-size: 12px">←</span>
        <el-input
          v-model="directionValues.left"
          style="width: 100px"
          :placeholder="placeholder"
          @change="(val) => handleDirectionChange('left', val)"
          popper-class="right_container"
          type="number"
        >
        </el-input>
      </div>
      <div class="direction-item">
        <span style="font-size: 12px">↓</span>
        <el-input
          v-model="directionValues.bottom"
          style="width: 100px"
          :placeholder="placeholder"
          @change="(val) => handleDirectionChange('bottom', val)"
          popper-class="right_container"
          type="number"
        >
        </el-input>
      </div>
      <div class="direction-item">
        <span style="font-size: 12px">→</span>
        <el-input
          v-model="directionValues.right"
          style="width: 100px"
          :placeholder="placeholder"
          @change="(val) => handleDirectionChange('right', val)"
          popper-class="right_container"
          type="number"
        >
        </el-input>
      </div>
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
    svg {
      transform: rotate(45deg);
    }
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
