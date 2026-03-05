<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-04 10:24:25
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-03 10:01:41
 * @description: 
-->
<template>
  <div class="style-editor">
    <!-- 动态渲染配置组 -->

    <div class="config-group" v-for="config in styleConfigs" :key="config.label">
      <template v-if="!isConfigGroupShouldHide(config)">
        <Divider :title="config.label" />
        <!-- 动态渲染每个配置项（输入框/选择框/颜色选择器等） -->
        <div class="config-item" v-for="item in config.items" :key="item.key">
          <template
            v-if="!item?.hide || (Array.isArray(item.hide) && !isItemShouldHide(item))"
          >
            <label class="item-label">{{ item.label }}</label>

            <!-- 根据type渲染不同控件 -->
            <component
              :is="getComponentByType(item.type)"
              :modelValue="getConfigValue(item)"
              :type="item.key"
              :options="item.options"
              :hideSelectField="item.hideSelectField"
              :placeholder="item.placeholder"
              @updateConfig="handleConfigChange"
              :form="selectedComp"
              :updateType="item.updateType"
              :updateOther="item.updateOther"
              :dataSources="props.dataSources"
              :dataSets="props.dataSets"
              :embeddedImages="props.embeddedImages"
              :item="item"
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useStyleConfig } from "./composables/useStyleConfig";
import { useStyleUpdate } from "./composables/useStyleUpdate";
import { useSettingStore } from "@/stores/index";
import Divider from "./components/Divider.vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

// 导入动态控件组件
import PxEdit from "./components/controls/PxEdit.vue";
import Input from "./components/controls/Input.vue";
import Select from "./components/controls/Select.vue";
import ColorPicker from "./components/controls/ColorPicker.vue";
import BorderStyle from "./components/controls/BorderStyle.vue";
import Data from "./components/controls/Data.vue";
import BorderWidth from "./components/controls/BorderWidth.vue";
import PageType from "./components/page/type.vue";
import WidthAndHeight from "./components/page/widthAndHeight.vue";
import Direction from "./components/page/direction.vue";
import PageMargin from "./components/page/margin.vue";
import LineBorderStyle from "./components/controls/line/BorderStyle.vue";
import LineBorderWidth from "./components/controls/line/BorderWidth.vue";
import BorderRadius from "./components/controls/BorderRadius.vue";
import DataSourceSelect from "./components/controls/dataSource/dataSourceSelect.vue";
import DataSourceFilter from "./components/controls/dataSource/dataSourceFilter.vue";
import DataSourceSort from "./components/controls/dataSource/dataSourceSort.vue";
import BackgroundImage from "./components/controls/BackgroundImage.vue";
import BackgroundPositionLevel from "./components/controls/image/BackgroundPositionLevel.vue";
import BackgroundPositionVertical from "./components/controls/image/BackgroundPositionVertical.vue";
import ListData from "./components/controls/ListData.vue";
import EchartsOption from "./components/controls/EchartsOption.vue";
const props = defineProps({
  dataSources: {
    type: Array,
    default: () => [],
  },
  dataSets: {
    type: Array,
    default: () => [],
  },
  embeddedImages: {
    type: Array,
    default: () => [],
  },
});

const {
  selectedComp, // 当前选中组件
  hasSelectedComp, // 是否有选中组件
  updateComp, // 更新组件属性方法
  watchSelectedComp, // 监听选中组件变化方法
} = useLowcodeEditor();

watch(
  () => selectedComp,
  (newVal) => {
    // console.log(newVal.value);
  },
  { deep: true }
);

const settingStore = useSettingStore();

const emit = defineEmits(["style-change"]);

// 初始化配置（设置默认值）
const styleConfigs = ref([]);
const defaultStyles = ref({});

// 1. 组件类型（如 text/echarts）
const currentComponentType = computed(() => {
  return selectedComp.value?.type || "";
});

// 2. ECharts 子类型（如 line/bar/pie）
const currentEchartsType = computed(() => {
  if (currentComponentType.value !== "charts") return "";
  return getValueByPath(selectedComp.value, "echartsOption.series[0].type") || "";
});

// 3. 判断配置项是否应该隐藏
const isItemShouldHide = (item) => {
  const hideList = item.hide;
  // ECharts 组件：优先匹配子类型
  if (currentComponentType.value === "charts" && currentEchartsType.value) {
    return hideList.includes(currentEchartsType.value);
  }
  // 非 ECharts 组件：匹配原有组件类型
  return hideList.includes(currentComponentType.value);
};

// ========== 新增：判断配置组是否应该隐藏（和isItemShouldHide逻辑完全对齐） ==========
const isConfigGroupShouldHide = (configGroup) => {
  // 如果配置组没有hide字段，默认不隐藏
  if (!configGroup?.hide) return false;
  const hideList = configGroup.hide;

  // 规则和配置项完全一致：
  // 1. ECharts组件：优先匹配子类型（line/bar/pie）
  if (currentComponentType.value === "charts" && currentEchartsType.value) {
    return hideList.includes(currentEchartsType.value);
  }
  // 2. 非ECharts组件：匹配组件类型（text/qrcode/image）
  return hideList.includes(currentComponentType.value);
};

// 监听组件类型变化，重新获取配置
watch(
  currentComponentType, // 监听计算属性本身（无需.value）
  (newType) => {
    // 类型变化时，重新调用函数并更新配置
    const res = useStyleConfig(newType);
    styleConfigs.value = res.styleConfigs.value || [];
    defaultStyles.value = res.defaultStyles.value || {};
  },
  { immediate: true } // 立即执行一次（初始化时获取配置）
);

// 2. 初始化表单（默认样式 + 已有样式）
const form = ref({});
const { updateStyle } = useStyleUpdate();

watch(
  () => settingStore.selected,
  (val) => {
    if (!val) {
      // 未选中任何组件时清空表单
      form.value = {};
      return;
    }

    if (settingStore.isPage) {
      // 合并默认样式和当前元素的已有样式
      form.value = {
        ...val.page,
      };
    } else {
      // 合并默认样式和当前元素的已有样式
      form.value = {
        ...defaultStyles.value,
        ...val,
        ...val.style,
        ...convertKeysToLowerCase(val.sameData),
      };
      delete form.value.style;
      delete form.value.sameData;
    }
  },
  { immediate: true }
);

// 递归转换对象键名首字母为小写的函数
function convertKeysToLowerCase(obj) {
  // 如果是数组，遍历每个元素并递归处理
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToLowerCase(item));
  }
  // 如果是对象且不是 null，处理每个键
  else if (obj !== null && typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 将键名首字母转为小写，其余保持不变
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        // 递归处理值
        newObj[newKey] = convertKeysToLowerCase(obj[key]);
      }
    }
    return newObj;
  }
  // 基本类型直接返回
  else {
    return obj;
  }
}

// 3. 控件映射（type → 组件）
const getComponentByType = (type) => {
  const componentMap = {
    pxEdit: PxEdit,
    input: Input,
    select: Select,
    borderStyle: BorderStyle,
    color: ColorPicker,
    data: Data,
    borderWidth: BorderWidth,
    pageType: PageType,
    widthAndHeight: WidthAndHeight,
    direction: Direction,
    pageMargin: PageMargin,
    lineBorderStyle: LineBorderStyle,
    lineBorderWidth: LineBorderWidth,
    borderRadius: BorderRadius,
    dataSourceSelect: DataSourceSelect,
    dataSourceFilter: DataSourceFilter,
    dataSourceSort: DataSourceSort,
    backgroundImage: BackgroundImage,
    backgroundPositionLevel: BackgroundPositionLevel,
    backgroundPositionVertical: BackgroundPositionVertical,
    listData: ListData,
    echartsOption: EchartsOption,
  };
  return componentMap[type] || Input;
};

// 新增：统一获取配置项值（兼容style/普通/echarts路径）
const getConfigValue = (item) => {
  if (!selectedComp.value) return "";

  // 1. 原有style类型（如text组件的font-size）
  if (item.dataType === "style") {
    return selectedComp.value.style?.[item.key] || "";
  }

  // 2. ECharts类型（多层级路径）
  if (item.dataType === "echarts") {
    return getValueByPath(selectedComp.value, item.key) || "";
  }

  // 3. 原有普通类型（如top/left/width）
  return selectedComp.value[item.key] || "";
};

const getValueByPath = (obj, path) => {
  if (!obj || !path) return "";
  // 处理数组路径（如 "echartsOption.series[0].data"）
  const pathArr = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  return pathArr.reduce((current, key) => {
    return current?.[key] ?? "";
  }, obj);
};

// 根据路径设置对象属性（支持多层级）
const setValueByPath = (obj, path, value) => {
  if (!obj || !path) return;
  const pathArr = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current = obj;
  for (let i = 0; i < pathArr.length - 1; i++) {
    const key = pathArr[i];
    // 若路径不存在则创建空对象/数组
    if (!current[key]) {
      current[key] = /^\d+$/.test(pathArr[i + 1]) ? [] : {};
    }
    current = current[key];
  }
  current[pathArr[pathArr.length - 1]] = value;
};

// 4. 处理配置变更
const handleConfigChange = (data) => {};
</script>
<style lang="scss" scoped>
.config-group {
  margin-bottom: 10px;
}
.config-item {
  display: flex;
  // align-items: center;
  margin-bottom: 5px;
  .item-label {
    width: 90px;
    min-width: 90px;
    max-height: 30px;
    vertical-align: middle;
    text-overflow: ellipsis;
    font-size: 12px;
    display: flex;
    align-items: center;
    // line-height: 30px;
  }
}
</style>
