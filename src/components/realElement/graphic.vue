<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-21 15:12:05
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-06 14:00:55
 * @description: 
-->
<script setup>
import { ref, inject, watch, computed } from "vue";
import { mapJsonToStyle, mapJsonLineToBorderStyle } from "@/utils/styleMapper";
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
const settingStore = useSettingStore();
const props = defineProps({
  dataItem: { type: Object, default: () => {} },
  path: { type: String, default: "" },
  index: { type: Number, default: 0 },
  selectPath: { type: String, default: "" },
  pageType: { type: String, default: "" },
});

// 初始化样式
const baseStyle = computed(() => mapJsonToStyle(props.dataItem.style));
watch(
  () => props.dataItem,
  (newStyle) => {
    // console.log(newStyle);
    // baseStyle.value = mapJsonToStyle(newStyle);
    // console.log(baseStyle.value)
  },
  { deep: true, immediate: true }
);

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
  var data = {
    data: props.dataItem,
    style: style.value,
    type: "graphic",
    sameData: props.dataItem,
  };

  selectComp(props.dataItem, props.pageType, props.index);

  // settingStore.setIsPage(false);
  // settingStore.setSelectedParentPath(props.path);
  // settingStore.setSelected(data);

  //   emit("handleActive", props.index);
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

const textMenuList = ref([
  {
    label: "删除",
    action: () => {
      deleteComp(props.pageType, props.index);
    },
  },
]);
</script>
<template>
  <div
    class="graphic-element no_page"
    @click="handleClick"
    v-context-menu="textMenuList"
    @contextmenu="handleClick"
    :class="{
      active: selectedPageType == props.pageType && selectedIndex == props.index,
    }"
  >
    <div class="graphic-content" :style="style"></div>
  </div>
</template>
<style lang="scss" scoped>
.graphic-element {
  width: 100%;
  height: 100%;
}
.graphic-content {
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
