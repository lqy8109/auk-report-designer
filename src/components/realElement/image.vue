<script setup>
import { ref, inject, watch, computed, getCurrentInstance } from "vue";
import { mapJsonToStyle } from "@/utils/styleMapper";
import { useSettingStore } from "@/stores/index";
import { useUndoManager } from "@/utils/undoManager";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

const {
  selectComp,
  handleCompValueChange,
  deleteComp,
  selectedPageType,
  selectedIndex,
} = useLowcodeEditor();
const { proxy } = getCurrentInstance();

const settingStore = useSettingStore();
const props = defineProps({
  dataItem: { type: Object, default: () => {} },
  path: { type: String, default: "" },
  index: { type: Number, default: 0 },
  selectPath: { type: String, default: "" },
  pageType: { type: String, default: "" },
  dataSources: { type: Array, default: () => [] },
  dataSets: { type: Array, default: () => [] },
});

const emit = defineEmits(["handleActive", "setValueByPath"]);

// 初始化样式
const baseStyle = ref(mapJsonToStyle(props.dataItem.style));

// 处理垂直对齐和flex布局的核心函数
const handleVerticalAlignAndFlex = (styleObj) => {
  // 深拷贝避免修改原对象
  const newStyle = { ...styleObj };

  if (newStyle.hasOwnProperty("background-image")) {
    newStyle["background-image"] = `url(${newStyle["background-image"]})`;
  }

  return newStyle;
};

// 计算最终样式（包含flex和垂直对齐处理）
const style = computed(() => {
  return handleVerticalAlignAndFlex(baseStyle.value);
});

const handleClick = () => {
  // var data = {
  //   data: props.dataItem,
  //   style: style.value,
  //   type: "image",
  //   sameData: props.dataItem,
  // };

  // console.log(style.value)

  // settingStore.setIsPage(false);
  // settingStore.setSelectedParentPath(props.path);
  // settingStore.setSelected(data);

  selectComp(props.dataItem, props.pageType, props.index);

  emit("handleActive", props.index);
};

// 监听样式更新
watch(
  () => settingStore.updateFlag,
  (newVal, oldVal) => {
    if (props.path === settingStore.selectedParentPath) {
      var oldStyle = style.value[newVal.type];
      baseStyle.value[newVal.type] = newVal.value;
      useUndoManager().add({
        undo: () => {
          baseStyle.value[newVal.type] = oldStyle;
          handleClick();
        },
        redo: () => {
          baseStyle.value[newVal.type] = newVal.value;
          handleClick();
        },
      });
    }
  },
  {
    deep: true,
  }
);

// 监听props.dataItem.style变化，重新初始化样式
watch(
  () => props.dataItem.style,
  (newStyle) => {
    baseStyle.value = mapJsonToStyle(newStyle);
  },
  { deep: true, immediate: true }
);

// 场景1：文本区域菜单（含分隔线）
const textMenuList = ref([
  {
    label: "删除",
    action: () => {
      deleteComp(props.pageType, props.index);
    },
  },
]);

const btnRef = ref(null);

const showSelectBox = () => {
  var newDataSets = props.dataSets.map((item) => {
    return {
      label: item.name,
      fields: item.fields,
    };
  });

  proxy.$showSelectBox({
    triggerEl: btnRef.value, // 触发元素（DOM）
    selectField: true, // 标识为字段选择
    options: newDataSets,
    onSelect: (value) => {
      // 选择后的回调
      emit("setValueByPath", `{${value.dataField}}`, "value");
      emit("setValueByPath", `{${value.dataSet}}`, "dataSetName");
    },
  });
};
</script>
<template>
  <div
    class="image_container"
    v-context-menu="textMenuList"
    @contextmenu="handleClick"
    @click.stop="handleClick"
     :class="{
      active: selectedPageType == props.pageType && selectedIndex == props.index,
    }"
  >
    <div class="image" :style="style" style="background-repeat: no-repeat"></div>
  </div>
</template>
<style lang="scss" scoped>
.image_container {
  width: 100%;
  height: 100%;
}
.active {
  width: 100%;
  height: 100%;
  position: relative;
}
.active::after {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  width: 100%;
  height: 100%;
  border: 1px dashed var(--el-color-primary);
}
</style>
