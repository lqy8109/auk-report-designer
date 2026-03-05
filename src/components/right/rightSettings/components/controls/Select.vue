<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-05 10:47:11
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-02 14:34:28
 * @description: 
-->
<script setup>
import { ref, watch, computed } from "vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
import { judgeStringType, setValueByPath } from "@/utils";
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
  updateType: { type: String, default: "" },
  updateOther: { type: Array, default: [] },
});
const emit = defineEmits(["update:modelValue", "change"]);

const value = computed(() => props.modelValue);

// watch(
//   () => props.modelValue,
//   (val) => {
//     value.value = val;
//   }
// );

// 格式化options：统一转换成 {label: '', value: ''} 格式
const formattedOptions = computed(() => {
  return props.options.map((item) => {
    // 如果是对象（且不是null），直接使用（兼容label/value格式）
    if (typeof item === "object" && item !== null) {
      return {
        label: item.label ?? item.value ?? "", // 优先取label，没有则取value
        value: item.value ?? item.label ?? "", // 优先取value，没有则取label
      };
    }
    // 如果是基础类型（字符串/数字/布尔），label和value都用当前值
    else {
      return {
        label: item,
        value: item + "",
      };
    }
  });
});

const handleChange = (value) => {
  console.log(judgeStringType(props.type), formattedOptions.value);
  switch (judgeStringType(props.type)) {
    case "multiLevel":
      var newData = setValueByPath(selectedComp.value, props.type, value);
      updateCompProps(selectedComp.value, newData);

      props.updateOther.forEach((item) => {
        if (item.isValue === value) {
          var newData = setValueByPath(selectedComp.value, item.key, item.value);
          updateCompProps(selectedComp.value, newData);
        } else if (item.noIsValue != value) {
          var newData = setValueByPath(selectedComp.value, item.key, item.value);
          updateCompProps(selectedComp.value, newData);
        }
      });
      break;
    case "singleLevel":
      if (props.updateType === "base") {
        updateCompProps(selectedComp.value, { [props.type]: value });
      } else {
        var style = selectedComp.value.style || {};
        const newStyle = {
          ...style,
        };
        newStyle[props.type] = value;
        updateCompProps(selectedComp.value, { style: newStyle });
      }
      break;
    default:
      break;
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
