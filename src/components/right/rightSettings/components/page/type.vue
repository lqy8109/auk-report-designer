<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-05 10:47:11
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-03 17:17:01
 * @description: 
-->
<script setup>
import { ref, watch, computed } from "vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
const props = defineProps({
  modelValue: { type: [String, Number, Boolean], required: true },
  options: {
    type: Array,
    default: () => [],
    // 简单校验，确保options是数组且内部元素是基础类型或对象
    validator: (val) => {
      return val.every(
        (item) =>
          typeof item === "string" ||
          typeof item === "number" ||
          typeof item === "boolean" ||
          (typeof item === "object" && item !== null)
      );
    },
  },
  type: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  form: { type: Object, default: () => ({}) },
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
const emit = defineEmits(["update:modelValue", "change", "setFormValue"]);

// const value = ref(props.modelValue);

const value = computed(() => {
  return  props.modelValue;
});

// 格式化options：统一转换成 {label: '', value: ''} 格式
const formattedOptions = computed(() => {
  return props.options.map((item) => {
    // 如果是对象（且不是null），直接使用（兼容label/value格式）
    if (typeof item === "object" && item !== null) {
      return {
        label: item.label ?? item.value ?? "", // 优先取label，没有则取value
        value: item.value ?? item.label ?? "", // 优先取value，没有则取label
        width: item.width ?? 0,
        height: item.height ?? 0,
      };
    }
    // 如果是基础类型（字符串/数字/布尔），label和value都用当前值
    else {
      return {
        label: item,
        value: item,
      };
    }
  });
});

const handleChange = (newVal) => {
  var selectedItem = formattedOptions.value.find((item) => item.value == newVal);
  if (props.form.papeDirection == "vertical") {
    updatePageBase({
     
      pageType: newVal,
      pageWidth: selectedItem.width,
      pageHeight: selectedItem.height,
    });
  } else {
    updatePageBase({
    
      pageType: newVal,
      pageWidth: selectedItem.height,
      pageHeight: selectedItem.width,
    });
  }
};
</script>
<template>
  <el-select
    v-model="value"
    :placeholder="placeholder"
    @change="handleChange"
    popper-class="right_container"
  >
    <el-option
      v-for="item in formattedOptions"
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
