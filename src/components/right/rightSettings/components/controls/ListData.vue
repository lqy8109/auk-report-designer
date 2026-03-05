<script setup>
import { ref, watch, computed } from "vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
import { judgeStringType, setValueByPath } from "@/utils";
import { CirclePlus, CircleClose } from "@element-plus/icons-vue";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: () => [],
  },
  options: { type: Array, default: () => [] },
  type: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  item: {
    type: Object,
    default: () => ({
      listKey: "name",
      listValue: "max",
    }),
  },
});

const {
  selectedComp,
  hasSelectedComp,
  pageBase,
  pageHeaderLayout,
  pageFooterLayout,
  updatePageBase,
  updatePageHeaderLayout,
  updatePageFooterLayout,
  updateCompProps,
  updateCanvasComp,
  updatePageHeaderComp,
  updatePageFooterComp,
  watchSelectedComp,
  getCurrentSection,
} = useLowcodeEditor();

const emit = defineEmits(["update:modelValue", "updateConfig"]);

// 解构属性名配置
const { listKey, listValue } = props.item;

// 响应式数组：存储当前编辑的数组数据（深拷贝避免引用问题）
const localList = ref(JSON.parse(JSON.stringify(props.modelValue)));

// 监听modelValue变化，同步到本地数组
watch(
  () => props.modelValue,
  (newVal) => {
    localList.value = JSON.parse(JSON.stringify(newVal));
  },
  { immediate: true, deep: true }
);

// 监听本地数组变化，自动同步到父组件和编辑器
watch(
  () => localList.value,
  (newList) => {
    // 通知父组件更新v-model
    // emit("update:modelValue", JSON.parse(JSON.stringify(newList)));
    // 更新到编辑器组件属性
    // updateCompData(newList);
  },
  { deep: true }
);

// 处理输入框值变化（简化：直接由v-model自动更新，此处保留可扩展）
const handleInputChange = () => {
  // 可添加输入值校验等逻辑
  console.log(33333);
  updateCompData();
};

// 添加新的数组项
const handleAddItem = () => {
  // 创建默认新项，自动生成维度名称
  const newItem = {
    [listKey]: `维度${localList.value.length + 1}`,
    [listValue]: 100,
  };
  localList.value.push(newItem);
  updateCompData();
};

// 删除指定索引的数组项
const handleDeleteItem = (index) => {
  if (localList.value.length <= 1) {
    // 至少保留一项，给出提示或直接返回
    ElMessage?.warning("至少需要保留一项数据");
    return;
  }
  localList.value.splice(index, 1);
  updateCompData();
};

// 统一更新组件属性的方法
const updateCompData = (data = localList.value) => {
  if (!selectedComp.value) return;

  switch (judgeStringType(props.type)) {
    case "multiLevel":
      const newData = setValueByPath(selectedComp.value, props.type, data);
      updateCompProps(selectedComp.value, newData);
      break;
    case "singleLevel":
      const style = selectedComp.value.style || {};
      updateCompProps(selectedComp.value, {
        style: { ...style },
        [props.type]: data,
      });
      break;
    default:
      updateCompProps(selectedComp.value, {
        ...selectedComp.value,
        [props.type]: data,
      });
      break;
  }

  emit("updateConfig", data);
};
</script>

<template>
  <div class="dimension-list-container">
    <!-- 循环渲染每一项 -->
    <div
      class="flex align-center margin-bottom-xs"
      v-for="(item, index) in localList"
      :key="index"
    >
      <!-- 第一个输入框：绑定当前项的listKey属性（如name） -->
      <el-input
        v-model="item[listKey]"
        size="default"
        @change="handleInputChange"
        :placeholder="`请输入${listKey}`"
        class="flex-sub"
      />

      <!-- 第二个输入框：绑定当前项的listValue属性（如max） -->
      <el-input
        class="margin-left-xs flex-sub"
        v-model="item[listValue]"
        size="default"
        @change="handleInputChange"
        :placeholder="`请输入${listValue}`"
      />

      <!-- 添加按钮：新增数组项 -->
      <el-icon
        class="margin-left-xs cursor-pointer"
        size="20px"
        @click.stop="handleAddItem"
      >
        <CirclePlus />
      </el-icon>

      <!-- 删除按钮：删除当前索引的项 -->
      <el-icon
        class="margin-left-xs cursor-pointer"
        size="20px"
        @click.stop="handleDeleteItem(index)"
      >
        <CircleClose />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dimension-list-container {
  padding: 4px 0;
}

:deep(.el-input-group__append) {
  width: 32px;
  max-width: 32px;
  padding: 0;
}

.flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.margin-left-xs {
  margin-left: 8px;
}

.margin-bottom-xs {
  margin-bottom: 8px;
}

.cursor-pointer {
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #409eff; // element-plus主色
  }
}
</style>
