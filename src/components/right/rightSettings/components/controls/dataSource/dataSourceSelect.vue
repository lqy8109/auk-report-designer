<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-27 10:21:15
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-04 16:25:49
 * @description: 
-->
<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
// 解构状态和方法
const {
  selectedComp,
  updateCompProps
} = useLowcodeEditor();

const props = defineProps({
  dataSources: {
    type: Array,
    default: () => [],
  },
  dataSets: {
    type: Array,
    default: () => [],
  },
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
  form: {
    type: Object,
    default: () => {},
  },
  updateType: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue", "change"]);

const value = computed(() => props.modelValue || "");


const handleChange = (value) => {
  console.log(value);
  ElMessage({
    message: "绑定数据集变化，请检查字段绑定是否正确！",
    type: "warning",
  });
  updateCompProps(selectedComp.value, { dataSetName: value });
};
</script>
<template>
  <div class="dataSourceSelect" style="width: 100%">
    <el-select v-model="value" placeholder="请选择" @change="handleChange">
      <el-option
        v-for="item in props.dataSets"
        :key="item.name"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
  </div>
</template>
<style lang="scss" scoped></style>
