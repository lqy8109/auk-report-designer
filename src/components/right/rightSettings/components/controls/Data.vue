<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-05 10:47:00
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-26 17:13:00
 * @description: 仅实时获取父组件值，不回传
-->
<script setup>
import { ref, watch, getCurrentInstance, computed } from "vue";
import { EditPen } from "@element-plus/icons-vue";
import { useSelectFieldStore } from "@/stores/selectField";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

// 解构状态和方法
const {
  selectedComp,
  updateCompProps
} = useLowcodeEditor();

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
console.log(localVal.value)
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
  updateCompProps(selectedComp.value, { value: val });
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
    const currentDataSet = props.dataSets.find(item => item.name === dataSetName);
    newDataSets = [
      {
        label: dataSetName,
        fields: currentDataSet?.fields?.map(ite => ({
          ...ite,
          dataSetName,
          type: "dataSet",
        })) || []
      }
    ];
  } else {
    newDataSets = props.dataSets.map(item => ({
      label: item.name,
      fields: item.fields.map(ite => ({
        ...ite,
        dataSetName: item.name,
        type: "dataSet",
      }))
    }));
  }

  proxy.$showSelectBox({
    triggerEl: btnRef.value,
    selectType: "rightSetting",
    value: localVal.value, // 使用本地变量的值
    options: newDataSets,
    onSelect: (newValue) => {
      const val = newValue.type === "dataSet" ? newValue.dataField : newValue.value;
      localVal.value = val; // 仅更新本地变量
      handleInputChange(val); // 触发内部更新逻辑
      // 编辑笔选择后，如需通知父组件可在这里emit，但按需求可不做
      if (newValue.type === "dataSet") {
        setTimeout(() => {
          emit("change", {
            type: "dataSetName",
            value: newValue.dataSetName,
            updateType: "base",
          });
        });
      }
    },
  });
};
</script>

<template>
  <!-- 输入框绑定本地变量，监听input事件 -->
  <el-input
    v-model="localVal"
    size="default"
    :placeholder="placeholder"
    @change="handleInputChange"
    v-if="!hideSelectField"
  >
    <template #append>
      <div
        ref="btnRef"
        class="wh-100 flex align-center justify-center"
        @click.stop="handleClickEditPen"
      >
        <el-icon><EditPen /></el-icon>
      </div>
    </template>
  </el-input>

  <!-- 隐藏编辑笔的输入框，逻辑一致 -->
  <el-input
    v-model="localVal"
    size="default"
    :placeholder="placeholder"
    @input="handleInputChange"
    v-if="hideSelectField"
  />
</template>

<style lang="scss" scoped>
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