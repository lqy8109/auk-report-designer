<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-05 10:47:11
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-04 15:57:59
 * @description: 
-->
<script setup>
import { ref, watch, computed } from "vue";
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
  modelValue: { type: [String, Number, Boolean], required: true },
  type: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  updateType: { type: String, default: "" },
  form: { type: Object, default: () => ({}) },
});
const emit = defineEmits(["update:modelValue", "change"]);
const options = ref([
  { label: "顶端对齐", value: "top" },
  { label: "垂直居中", value: "center" },
  { label: "底端对齐", value: "bottom" },
]);
const value = ref(props.form["background-position"]?.split(" ")[1] || "top");
watch(
  () => props.form["background-position"],
  (val) => {
    value.value = props.form["background-position"]?.split(" ")[1] || "top";
  }
);

const handleChange = (val) => {
  var backgroundPosition = props.form["background-position"];
  if (backgroundPosition) {
    var style = selectedComp.value.style || {};
    const newStyle = {
      ...style,
    };
    newStyle[props.type] = `${level} ${val}`;
    updateCompProps(selectedComp.value, { style: newStyle });
  } else {
    var style = selectedComp.value.style || {};
    const newStyle = {
      ...style,
    };
    newStyle[props.type] = `left ${val}`;
    updateCompProps(selectedComp.value, { style: newStyle });
  }
};
</script>
<template>
  <el-select
    v-model="value"
    :empty-values="[null, undefined]"
    :placeholder="placeholder"
    @change="handleChange"
    popper-class="right_container"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<style lang="scss" scoped>
:deep(.el-select__selected-item) {
  font-size: 13px;
}
</style>
