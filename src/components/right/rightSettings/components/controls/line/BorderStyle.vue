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
  // 支持传入字符串（完整的border样式）或对象（分方向）
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

// 存储四个方向的值（对应 CSS border 顺序：上 右 下 左）
const directionValues = ref({
  top: "", // 上
  right: "", // 右
  bottom: "", // 下
  left: "", // 左
});

// 解析初始值
const initValues = () => {
  if (typeof props.modelValue === "string" && props.modelValue) {
    // 如果是字符串，按空格分割成数组（上 右 下 左）
    const values = props.modelValue.split(/\s+/);
    directionValues.value = {
      top: values[0] || "",
      right: values[1] || values[0] || "",
      bottom: values[2] || values[0] || "",
      left: values[3] || values[0] || "",
    };
  } else if (typeof props.modelValue === "object" && props.modelValue) {
    // 如果是对象，直接赋值
    directionValues.value = {
      top: props.modelValue.top || "",
      right: props.modelValue.right || "",
      bottom: props.modelValue.bottom || "",
      left: props.modelValue.left || "",
    };
  }else{
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

// 计算整体显示值：四个方向值相同时显示该值，否则显示"自定义"
const allDisplayValue = computed(() => {
  const { top, right, bottom, left } = directionValues.value;
  // 四个方向值完全相同
  if (top && top === right && top === bottom && top === left) {
    return top;
  }
  // 有自定义值时显示组合结果
  return getCombinedValue();
});

// 计算整体显示的中文值
const allDisplayLabel = computed(() => {
  const { top, right, bottom, left } = directionValues.value;
  // 四个方向值完全相同
  if (top && top === right && top === bottom && top === left) {
    return getLabelByValue(top);
  }
  // 组合成中文字符串（上 右 下 左）
  return getCombinedLabel();
});

// 计算组合后的border值（上 右 下 左）
const getCombinedValue = () => {
  const { top, right, bottom, left } = directionValues.value;
  // 按 CSS border 语法组合：上 右 下 左

  return `${top || ""} ${right || top || ""} ${bottom || top || ""} ${
    left || top || ""
  }`.trim();
};

// 工具函数：根据value获取对应的中文label
const getLabelByValue = (value) => {
  if (!value || !props.options.length) return "";
  const option = props.options.find((item) => item.value === value);
  return option ? option.label : value; // 找不到对应项则返回原值
};

// 计算组合后的中文值（供显示用）
const getCombinedLabel = () => {
  const { top, right, bottom, left } = directionValues.value;
  // 按 CSS border 语法组合中文：上 右 下 左
  const topLabel = getLabelByValue(top || "");
  const rightLabel = getLabelByValue(right || top || "");
  const bottomLabel = getLabelByValue(bottom || top || "");
  const leftLabel = getLabelByValue(left || top || "");

  return `${topLabel} ${rightLabel} ${bottomLabel} ${leftLabel}`.trim();
};

// 监听方向值变化，触发父组件事件
watch(
  directionValues,
  () => {
    // const combinedValue = getCombinedValue();
    // emit("update:modelValue", combinedValue);
    // emit("change", {
    //   type: props.type,
    //   value: combinedValue,
    //   directionValues: { ...directionValues.value }, // 同时返回分方向的值
    // });
  },
  { deep: true }
);

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

// 整体选择框变化时，同步到四个方向
const handleAllChange = (val) => {
  directionValues.value = {
    top: val,
    right: val,
    bottom: val,
    left: val,
  };
  console.log(allDisplayValue.value)

   var style = selectedComp.value.style || {};
  const newStyle = {
    ...style,
  };
  newStyle[props.type] = `${allDisplayValue.value} none none`;
  updateCompProps(selectedComp.value, { style: newStyle });
 
  
  // emit("update:modelValue", `${allDisplayValue.value} none none`);
  // emit("change", { type: props.type, value: `${allDisplayValue.value} none none` });
};

// 单个方向选择框变化时
const handleDirectionChange = (direction, val) => {
  directionValues.value[direction] = val;
  emit("update:modelValue", allDisplayValue);
  emit("change", { type: props.type, value: allDisplayValue });
};
</script>

<template>
  <div class="border-style-select">
    <div class="main-select-wrapper">
      <el-select
        v-model="allDisplayLabel"
        style="flex: 1"
        :placeholder="placeholder"
        @change="handleAllChange"
        :disabled="!allDisplayValue && showDirectionSelect"
       popper-class="right_container"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

     
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
  :deep(.el-select__wrapper) {
    // border-radius: 4px 0 0 4px;
  }

  :deep(.el-button) {
    // border-radius: 0 4px 4px 0;
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
