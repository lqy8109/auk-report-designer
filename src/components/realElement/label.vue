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

const handleSelect = inject("handleSelect");
const handleEdit = inject("handleEdit");
const textAreaRef = ref(null);

// 初始化样式
const baseStyle = computed(() => mapJsonToStyle(props.dataItem.style));

// 处理垂直对齐和flex布局的核心函数
const handleVerticalAlignAndFlex = (styleObj) => {
  // 深拷贝避免修改原对象
  const newStyle = { ...styleObj };

  // 检查是否存在vertical-align属性
  if (newStyle.hasOwnProperty("vertical-align")) {
    // 添加display:flex
    newStyle.display = "flex";

    // 根据vertical-align的值设置对应的align-items
    const verticalAlignValue = newStyle["vertical-align"];
    switch (verticalAlignValue) {
      case "top":
        newStyle["align-items"] = "flex-start";
        break;
      case "middle":
      case "center":
        newStyle["align-items"] = "center";
        break;
      case "bottom":
        newStyle["align-items"] = "flex-end";
        break;
      // 兼容其他可能的值
      default:
        newStyle["align-items"] = verticalAlignValue;
        break;
    }
  }

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
    type: "text",
    sameData: props.dataItem,
  };

  selectComp(props.dataItem, props.pageType, props.index);

  // settingStore.setIsPage(false);
  // settingStore.setSelectedParentPath(props.path);
  // settingStore.setSelected(data);

  // emit("handleActive", props.index);
};

// 监听样式更新
watch(
  () => settingStore.updateFlag,
  (newVal, oldVal) => {
    if (props.path === settingStore.selectedParentPath) {
      if (newVal.updateType === "base") {
        var oldValue = props.dataItem[newVal.type];
        props.dataItem[newVal.type] = newVal.value;
        useUndoManager().add({
          undo: () => {
            props.dataItem[newVal.type] = oldValue;
            handleClick();
          },
          redo: () => {
            props.dataItem[newVal.type] = newVal.value;
            handleClick();
          },
        });
      } else {
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
    }
  },
  {
    deep: true,
  }
);

// 监听props.dataItem.style变化，重新初始化样式
watch(
  () => props.dataItem,
  (newStyle) => {
    // console.log(newStyle);
    // baseStyle.value = mapJsonToStyle(newStyle);
    // console.log(baseStyle.value)
  },
  { deep: true, immediate: true }
);

const handleDoubleClick = (e) => {
  const targetDom = e.target;
  const rect = targetDom.getBoundingClientRect();
  handleEdit(e.target.textContent, rect, props.path);

  console.log("fixed定位-相对于视口的位置：", {
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
  });
};

// 场景1：文本区域菜单（含分隔线）
const textMenuList = ref([
  {
    label: "删除",
    action: () => {
      deleteComp(props.pageType, props.index);
      // emit("handleDeleteItem", props.index, props.pageType);
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
      handleCompValueChange(props.dataItem, `{${value.dataField}}`);
    },
  });
};
</script>

<template>
  <div
    class="no_page text-element"
    :class="{
      active: selectedPageType == props.pageType && selectedIndex == props.index,
    }"
    v-context-menu="textMenuList"
    @contextmenu="handleClick"
    @click="handleClick"
    @dblclick="handleDoubleClick"
  >
    <div
      class="zh-text-box handle no_page"
      :title="props.dataItem.value"
      :data-path="props.path"
      ref="textAreaRef"
    >
      <div class="zh-text ele_border" :style="style">
        <div style="width: 100%; text-decoration: inherit">{{ dataItem.value }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.zh-text-box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.text-element {
  position: relative;
  width: 100%;
  height: 100%;
}

.text-element:hover .custom-cell-field-picker {
  display: block;
}
.custom-cell-field-picker {
  right: 3px;
}

.ele_border {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
