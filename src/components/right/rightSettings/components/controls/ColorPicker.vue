<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-05 10:47:00
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-02 09:58:17
 * @description: 
-->
<script setup>
import { ref, watch, onMounted, nextTick, computed } from "vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
import { PREDEFINE_COLORS as predefineColors } from "@/config/headerConfig.js";
import { judgeStringType, setValueByPath } from "@/utils";

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

const value = computed(() => {
  return props.modelValue;
});

const handleChange = (value) => {
  // emit("update:modelValue", value);
  // emit("change", { type: props.type, value: value });

  switch (judgeStringType(props.type)) {
    case "multiLevel":
      var newData = setValueByPath(selectedComp.value, props.type, value);
      console.log(newData);
      updateCompProps(selectedComp.value, newData);
      break;
    case "singleLevel":
      var newStyle = {
        ...selectedComp.value.style,
      };
      if (selectedComp.value.type == "page") {
        newStyle[props.type] = value;
        updatePageBase({
          style: {
            ...newStyle,
          },
        });
      } else {
        newStyle[props.type] = value;
        updateCompProps(selectedComp.value, { style: newStyle });
      }
      break;
    default:
      break;
  }
};

watch(
  () => props.modelValue,
  (val) => {
    value.value = val;
  }
);
</script>
<template>
  <el-input
    v-model="value"
    size="default"
    @change="handleChange"
    :placeholder="placeholder"
  >
    <template #append>
      <el-color-picker
        v-model="value"
        @change="handleChange"
        popper-class="right_container"
        show-alpha
        :predefine="predefineColors"
      />
    </template>
  </el-input>
</template>
<style lang="scss" scoped>
:deep(.el-input__inner) {
  font-size: 13px;
}
:deep(.el-input-group__append) {
  background-color: #fff;
  padding: 0;
  .el-color-picker__trigger {
    border: 0;
    border-radius: 0;
  }
}
</style>
