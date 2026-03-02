<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-21 15:12:05
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-06 14:00:07
 * @description: 
-->
<script setup>
import { ref, inject, watch, computed, onMounted } from "vue";
import { mapJsonToStyle, mapJsonLineToBorderStyle } from "@/utils/styleMapper";
import { useSettingStore } from "@/stores/index";
import { useUndoManager } from "@/utils/undoManager";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";

const {
  selectComp,
  handleCompValueChange,
  deleteComp,
  selectedPageType,
  selectedIndex,
} = useLowcodeEditor();
const props = defineProps({
  dataItem: { type: Object, default: () => {} },
  path: { type: String, default: "" },
  index: { type: Number, default: 0 },
  selectPath: { type: String, default: "" },
  pageType: { type: String, default: "" },
});
// 响应式数据
const inputValue = ref(props.dataItem.value || "123"); // 输入内容
const codeType = ref("qrcode"); // 码类型：qrcode-二维码，barcode-条形码
const codeSize = ref(100); // 尺寸
const showResult = ref(false); // 是否显示结果
const qrcodeCanvas = ref(null); // 二维码画布ref
const barcodeCanvas = ref(null); // 条形码画布ref

const settingStore = useSettingStore();

// 初始化样式
const baseStyle = computed(() => mapJsonToStyle(props.dataItem.style));

// 处理垂直对齐和flex布局的核心函数
const handleVerticalAlignAndFlex = (styleObj) => {
  // 深拷贝避免修改原对象
  const newStyle = { ...styleObj };
  return newStyle;
};

// 计算最终样式（包含flex和垂直对齐处理）
const style = computed(() => {
  return handleVerticalAlignAndFlex(baseStyle.value);
});

const handleClick = () => {
  selectComp(props.dataItem, props.pageType, props.index);
};

// 监听样式更新
watch(
  () => settingStore.updateFlag,
  (newVal, oldVal) => {
    if (props.path === settingStore.selectedParentPath) {
      if (newVal.updateType === "base") {
        props.dataItem[newVal.type] = newVal.value;
        if (newVal.type === "value") {
          inputValue.value = newVal.value;
        } else {
          codeType.value = newVal.value;
        }
        generateCode();
      } else {
        var oldStyle = style.value[newVal.type];
        baseStyle.value[newVal.type] = newVal.value;
        generateCode();
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

// 生成码的核心方法
const generateCode = async () => {
  showResult.value = true;
  try {
    if (codeType.value === "qrcode") {
      // 生成二维码
      await QRCode.toCanvas(qrcodeCanvas.value, props.dataItem.value, {
        margin: 0.4,
        color: {
          dark: style.value.color ? rgbaToHex(style.value.color) : "#000000", // 二维码深色部分
          light: style.value["background-color"]
            ? rgbaToHex(style.value["background-color"])
            : "#ffffff", // 二维码浅色部分
        },
      });
    } else {
      // 生成条形码
      JsBarcode(barcodeCanvas.value, props.dataItem.value, {
        // width: 2, // 条码宽度
        // height: codeSize.value / 2, // 条码高度
        background: "#ffffff", // 条码背景颜色
        displayValue: false, // 是否显示条码内容
        fontSize: 16, // 文字大小
        margin: 4, // 边距
        lineColor: style.value.color ? rgbaToHex(style.value.color) : "#000000",
        background: style.value["background-color"]
          ? rgbaToHex(style.value["background-color"])
          : "#ffffff", // 二维码浅色部分
      });
    }
  } catch (error) {
    console.error("生成失败：", error);
  }
};

watch(
  () => props.dataItem,
  (newVal, oldVal) => {
    codeType.value = newVal.qrcodeType;
    generateCode();
  },
  { deep: true }
);

function rgbaToHex(colorStr, includeAlpha = true) {
  // 1. 新增：校验是否为十六进制格式，匹配 #fff / #ffffff / #ffff / #ffffffff 等
  const hexPattern = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
  if (hexPattern.test(colorStr)) {
    return colorStr; // 本身就是 Hex 格式，直接返回
  }

  // 2. 原有 RGBA 解析逻辑
  const rgbaPattern = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
  const matches = colorStr.match(rgbaPattern);

  if (!matches) {
    throw new Error(
      "输入的颜色格式不正确，请检查：支持 RGBA/RGB/Hex 格式，例如 rgba(255,0,0,1) 或 #ff0000"
    );
  }

  // 提取并转换数值
  const [, r, g, b, a] = matches;
  const red = Math.max(0, Math.min(255, parseInt(r, 10)));
  const green = Math.max(0, Math.min(255, parseInt(g, 10)));
  const blue = Math.max(0, Math.min(255, parseInt(b, 10)));

  // 将数值转为两位十六进制（不足补0）
  const toHex = (num) => num.toString(16).padStart(2, "0").toLowerCase();

  // 拼接 RGB 部分
  let hex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;

  // 处理透明度（如果需要）
  if (includeAlpha && a) {
    const alpha = Math.max(0, Math.min(255, Math.round(parseFloat(a) * 255)));
    hex += toHex(alpha);
  }

  return hex;
}

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

onMounted(() => {
  generateCode();
});
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
    <div class="graphic-content">
      <div
        :style="{ display: codeType === 'qrcode' ? 'block' : 'none' }"
        class="qrcode-container"
      >
        <canvas ref="qrcodeCanvas"></canvas>
      </div>

      <div
        :style="{ display: codeType === 'barcode' ? 'block' : 'none' }"
        class="barcode-container"
      >
        <canvas ref="barcodeCanvas"></canvas>
      </div>
    </div>
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
.qrcode-container,
.barcode-container {
  width: 100% !important;
  height: 100% !important;
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
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
