<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-05 10:47:00
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-03 16:15:20
 * @description: 仅实时获取父组件值，不回传
-->
<script setup>
import { ref, watch, getCurrentInstance, computed } from "vue";
import { EditPen } from "@element-plus/icons-vue";
import { useSelectFieldStore } from "@/stores/selectField";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

// 解构状态和方法
const { selectedComp, updateCompProps } = useLowcodeEditor();

const btnRef = ref(null);
const store = useSelectFieldStore();
const { proxy } = getCurrentInstance();

// 定义props
const props = defineProps({
  dataSources: {
    type: Array,
    default: () => [],
  },
  dataSets: {
    type: Array,
    default: () => [],
  },
  modelValue: { type: [String, Number, Boolean], required: true },
  options: { type: Array, default: [] },
  type: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  hideSelectField: { type: Boolean, default: false },
  form: {
    type: Object,
    default: () => ({}),
  },
});

// 定义emit（仅保留change事件，无需update:modelValue）
const emit = defineEmits(["change"]);

// 1. 只读计算属性：实时获取父组件的modelValue
const parentVal = computed(() => props.modelValue || "");

// 2. 本地响应式变量：存储输入框的临时值（不回传父组件）
const localVal = ref(parentVal.value || "");
console.log(localVal.value);
// 3. 监听父组件值变化：实时同步到本地变量
watch(
  () => parentVal.value,
  (newVal) => {
    localVal.value = newVal;
  },
  { immediate: true }
);

// 输入框值变化时：仅更新内部组件状态+触发change事件
const handleInputChange = (val) => {
  updateCompProps(selectedComp.value, {
    echartsOption: val,
  });
};

// 编辑笔点击事件
const handleClickEditPen = () => {
  if (store.visible) {
    proxy.$hideSelectBox();
    return;
  }

  const dataSetName = props.form.dataSetName;
  let newDataSets = [];

  if (dataSetName) {
    const currentDataSet = props.dataSets.find((item) => item.name === dataSetName);
    newDataSets = [
      {
        label: dataSetName,
        fields:
          currentDataSet?.fields?.map((ite) => ({
            ...ite,
            dataSetName,
            type: "dataSet",
          })) || [],
      },
    ];
  } else {
    newDataSets = props.dataSets.map((item) => ({
      label: item.name,
      fields: item.fields.map((ite) => ({
        ...ite,
        dataSetName: item.name,
        type: "dataSet",
      })),
    }));
  }

  proxy.$showSelectBox({
    triggerEl: btnRef.value,
    selectType: "rightSetting",
    value: JSON.stringify(localVal.value,null, 4), // 使用本地变量的值
    options: newDataSets,
    onSelect: (newValue) => {
      const val = newValue.type === "dataSet" ? newValue.dataField : newValue.value;
      // const standardJsonStr = val
      //   .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":') // 属性名加双引号
      //   .replace(/'/g, '"');
      var obj = eval(`(${val})`);

      localVal.value = obj; // 仅更新本地变量
      handleInputChange(obj); // 触发内部更新逻辑
    },
  });
};
</script>

<template>
  <!-- 输入框绑定本地变量，监听input事件 -->
  <div class="box">
    <a href="https://echarts.apache.org/zh/index.html" target="_blank" class="flex-sub">echarts官网</a>
    <div
      ref="btnRef"
      class="edit_btn flex align-center justify-center"
      @click.stop="handleClickEditPen"
    >
      <el-icon><EditPen /></el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-between: space-between;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  padding-left: 12px;
  padding-right: 0;
  gap: 6px;
  min-height: 32px;
  line-height: 24px;
  border-radius: var(--el-border-radius-base);
  background-color: var(--el-fill-color-blank);
  transition: var(--el-transition-duration);
  transform: translate3d(0, 0, 0);
  box-shadow: 0 0 0 1px var(--el-border-color) inset;
  a{
    color: var(--el-text-color-regular);
   
  }
  a:hover {
    color: var(--el-color-primary);
  }
  .edit_btn {
    width: 32px;
    height: 32px;
    border-radius: 0 4px 4px 0;
    background-color: var(--el-fill-color-blank);
    box-shadow: 0 0 0 1px var(--el-border-color) inset;
    transition: var(--el-transition-duration);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: var(--el-fill-color-blank);
      box-shadow: 0 0 0 1px var(--el-color-primary) inset;
      svg {
        color: var(--el-color-primary);
      }
    }
  }
}
:deep(.el-input__inner) {
  font-size: 13px;
}
:deep(.el-input-group__append) {
  width: 32px;
  max-width: 32px;
  padding: 0;
  cursor: pointer;
}
</style>
