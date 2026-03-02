<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-05 10:47:00
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-27 10:29:47
 * @description: 
-->
<script setup>
import { ref, watch, computed } from "vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
const props = defineProps({
  modelValue: { type: [String, Number, Boolean], required: true },
  options: { type: Array, default: () => [] },
  type: { type: String, default: "" },
  placeholder: { type: String, default: "" },
});

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
const emit = defineEmits(["update:modelValue", "change"]);

const parentVal = computed(() => props.modelValue || "");

// 2. 本地响应式变量：存储输入框的临时值（不回传父组件）
const localVal = ref(parentVal.value || "");

watch(
  () => parentVal.value,
  (newVal) => {
    localVal.value = newVal;
  },
  { immediate: true }
);

const handleChange = (value) => {
  var style = selectedComp.value.style || {};
  const newStyle = {
    ...style,
  };
  newStyle[props.type] = value + "px";

  updateCompProps(selectedComp.value, { style: newStyle });
};
</script>
<template>
  <el-input
    v-model="localVal"
    size="default"
    @change="handleChange"
    :placeholder="placeholder"
  >
    <template #append >px</template>
  </el-input>
</template>
<style lang="scss" scoped>
:deep(.el-input__inner) {
  font-size: 13px;
}
:deep(.el-input-group__append) {
  width: 32px;
  max-width: 32px;
  padding: 0;
}
</style>
