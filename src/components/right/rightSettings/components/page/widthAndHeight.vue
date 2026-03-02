<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-05 10:47:00
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-03 16:51:39
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
  updateCanvasComp,
  updatePageHeaderComp,
  updatePageFooterComp,
  // 通用监听
  watchSelectedComp,
  // 获取当前组件所在区域
  getCurrentSection,
} = useLowcodeEditor();

const emit = defineEmits(["update:modelValue", "change"]);

// const value = ref(props.modelValue);

const value = computed(() => {
  return  props.modelValue;
});

const handleChange = (value) => {
  var newData = {
   
  };
  newData[props.type] = value;
  updatePageBase(newData);

  // emit("update:modelValue", value);
  // emit("change", { type: props.type, value: value });
};
</script>
<template>
  <el-input
    v-model="value"
    size="default"
    @change="handleChange"
    :placeholder="placeholder"
  >
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
