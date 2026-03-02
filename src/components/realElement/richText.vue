<script setup>
import { ref, inject, watch, computed, getCurrentInstance } from "vue";
import { mapJsonToStyle } from "@/utils/styleMapper";
import { useSettingStore } from "@/stores/index";
import { useUndoManager } from "@/utils/undoManager";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { formatQuillClass } from "@/utils/formatQuillClass";
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
    type: "richText",
    sameData: props.dataItem,
  };

  selectComp(props.dataItem, props.pageType, props.index);

  emit("handleActive", props.index);
};

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

  selectComp(props.dataItem, props.pageType, props.index);

  proxy.$showSelectBox({
    triggerEl: btnRef.value, // 触发元素（DOM）
    selectField: true, // 标识为字段选择
    options: newDataSets,

    onSelect: (value) => {
      // 选择后的回调
      handleCompValueChange(props.dataItem, `{${value.dataField}}`);
      // emit("setValueByPath", `{${value.dataField}}`, "value");
      // emit("setValueByPath", `{${value.dataSet}}`, "dataSetName");
    },
  });
};

const options = ref({
  theme: "snow",
  content: "",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image"],
    ],
  },
});

const content = ref("");
const dialogVisible = ref(false);
const handleDoubleClick = (e) => {
  options.value.content = props.dataItem.value;
  dialogVisible.value = true;
};

const quillEditorRef = ref(null);
const handleSubmit = () => {
  var html = quillEditorRef.value.getHTML();
  html = formatQuillClass(html);
  handleCompValueChange(props.dataItem, html);
  // emit("setValueByPath", html, "value");
  dialogVisible.value = false;
};
</script>

<template>
  <div
    class="no_page text-element rich-text"
    :class="{  active: selectedPageType == props.pageType && selectedIndex == props.index}"
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
    <div class="custom-cell-field-picker" ref="btnRef" @click.stop="showSelectBox"></div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="富文本"
    width="700"
    :before-close="handleClose"
    append-to-body
    @click.stop
  >
    <QuillEditor
      class="no_page"
      :options="options"
      ref="quillEditorRef"
      style="height: 300px"
    />

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click.stop="handleSubmit"> 确定 </el-button>
        <el-button @click.stop="dialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
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
.zh-text {
  word-wrap: break-word;
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
<style>
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
