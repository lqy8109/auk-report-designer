<script setup>
import { ref, watch, computed, onMounted, nextTick, onUnmounted } from "vue";
import { CaretRight } from "@element-plus/icons-vue";
import { useSettingStore } from "@/stores/index";
// 引入颜色选择器组件
import { ElColorPickerPanel } from "element-plus";
import { useUndoManager } from "@/utils/undoManager";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
import { FONT_FAMILIES, FONT_SIZES } from "@/config/styleConfig.js";
import {
  UNDO_REDO_MENU_LIST as undoRedoMenuList,
  STYLE_MENU_LIST as styleMenuList,
  COLOR_MENU_LIST as colorMenuList,
  PREDEFINE_COLORS as predefineColors,
} from "@/config/headerConfig.js";

const {
  pageConfig,
  getFinalData,
  addPageHeaderOrFooter,
  deletePageHeaderOrFooter,
  hasSelectedComp,
  selectedPageType,
  selectedComp,
  updateCompProps,
} = useLowcodeEditor();
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false,
  },
  leftCollapse: {
    type: Boolean,
    default: false,
  },
  elements: { type: Object, default: () => {} },
});

const headerWidth = computed(() => {
  return !props.leftCollapse ? "calc(100vw - 200px)" : "calc(100vw - 54px)";
});

const settingStore = useSettingStore();
const activeName = ref("began");

const selectedCompType = computed(() => {
  return selectedComp.value?.type || "";
});

const styleConfigs = ref([]);
const defaultStyles = ref({});
const selectedCompStyle = computed(() => selectedComp.value?.style || {});
const color = ref("");

// 格式化options：统一转换成 {label: '', value: ''} 格式
const formattedOptions = (options) => {
  return options.map((item) => {
    // 如果是对象（且不是null），直接使用（兼容label/value格式）
    if (typeof item === "object" && item !== null) {
      return {
        label: item.label ?? item.value ?? "", // 优先取label，没有则取value
        value: item.value ?? item.label ?? "", // 优先取value，没有则取label
      };
    }
    // 如果是基础类型（字符串/数字/布尔），label和value都用当前值
    else {
      return {
        label: item,
        value: item,
      };
    }
  });
};

const fontFamilies = ref(formattedOptions(FONT_FAMILIES));
const fontSizes = ref(formattedOptions(FONT_SIZES));

// ========== 新增：监听toolbar_item宽度变化 ==========
const toolbarItemRef = ref(null); // 获取toolbar_item元素
const showMoreBtn = ref(false); // 是否显示more按钮
const showMore = ref(false);
const activeRight = ref("setting");

// 检查内容是否超出
const checkContentOverflow = () => {
  if (!toolbarItemRef.value) return;
  const container = toolbarItemRef.value;
  setTimeout(() => {
    if (container.clientHeight > 50) {
      showMoreBtn.value = true;
    } else {
      showMoreBtn.value = false;
      showMore.value = false;
    }
  }, 300);
};

// 监听窗口大小变化
onMounted(() => {
  // 初始检查
  nextTick(() => {
    checkContentOverflow();
  });

  // 监听窗口resize
  window.addEventListener("resize", checkContentOverflow);

  // 监听collapse变化（侧边栏折叠/展开）
  watch([() => props.collapse, () => props.leftCollapse], () => {
    checkContentOverflow();
  });

  // 监听选中元素变化（可能导致样式按钮状态变化）
  // watch(
  //   () => settingStore.selected,
  //   () => {
  //     nextTick(checkContentOverflow);
  //   }
  // );
});

// 组件卸载时移除监听
onUnmounted(() => {
  window.removeEventListener("resize", checkContentOverflow);
});

watch(
  () => selectedCompType.value,
  (newVal) => {
    // console.log(selectedComp.value);
  }
);

// 3. 处理普通样式点击事件（原有逻辑）
const handleStyleClick = (item, select) => {
  if (select) {
    var style = selectedComp.value.style || {};
    const newStyle = {
      ...style,
    };

    newStyle[item.key] = "";
    if (item.otherKeyValue) {
      for (let i in item.otherKeyValue) {
        newStyle[i] = "";
      }
    }
    updateCompProps(selectedComp.value, { style: newStyle });
  } else {
    var style = selectedComp.value.style || {};
    const newStyle = {
      ...style,
    };
    newStyle[item.key] = item.value;
    if (item.otherKeyValue) {
      for (let i in item.otherKeyValue) {
        newStyle[i] = item.otherKeyValue[i];
      }
    }
    updateCompProps(selectedComp.value, { style: newStyle });
  }
};

// 4. 处理颜色选择事件
const handleColorChange = (color, key) => {
  var style = selectedComp.value.style || {};
  const newStyle = {
    ...style,
  };
  newStyle[key] = color;
  updateCompProps(selectedComp.value, { style: newStyle });
};

const colorPopoverRef = ref(null);
const handleBeforeEnter = (item) => {
  color.value = selectedCompStyle.value[item.key];
};

const handleColorClear = (item) => {
  handleColorChange("", item.key);
  colorPopoverRef.value?.forEach((item) => {
    item.hide();
  });
};
const handleColorOk = (item) => {
  handleColorChange(color.value, item.key);
  colorPopoverRef.value?.forEach((item) => {
    item.hide();
  });
};

const handleChangeFontSize = (value) => {
  var style = selectedComp.value.style || {};
  const newStyle = {
    ...style,
  };
  newStyle["font-size"] = value;
  updateCompProps(selectedComp.value, { style: newStyle });
};

const handleChangeFontFamily = (value) => {
  var style = selectedComp.value.style || {};
  const newStyle = {
    ...style,
  };
  newStyle["font-family"] = value;
  updateCompProps(selectedComp.value, { style: newStyle });
};

const emit = defineEmits(["toggle-collapse", "handleTabActive"]);
const toggleCollapse = () => {
  emit("toggle-collapse");
};

const handleUndoClick = () => {
  useUndoManager().undo();
};

const handleRedoClick = () => {
  useUndoManager().redo();
};

// more按钮点击事件（可根据需求扩展）
const handleMoreClick = () => {
  // 这里可以实现more按钮的下拉菜单逻辑
  showMore.value = !showMore.value;
};

const handleAddHeaderOrFooter = (type) => {
  var data = {
    type: "pagesection",
    height: 38,
    name: type,
    reportItems: [],
  };
  addPageHeaderOrFooter({
    [type]: data,
  });
};

const handleRemoveHeaderOrFooter = (type) => {
  deletePageHeaderOrFooter(type);
};

const handleActive = (type) => {
  activeRight.value = type;
  emit("handleTabActive", type);
};

const handleSave = () => {
  console.log(getFinalData());
};
</script>

<template>
  <div class="header_container" :style="{ width: headerWidth }">
    <div class="appbar flex justify-between">
      <div class="appbar_left">
        <el-button type="primary" :icon="CaretRight" size="small" text> 预览 </el-button>
        <div class="toolbar_splitter"></div>
        <el-tabs v-model="activeName" class="appbar_tabs">
          <el-tab-pane label="开始" name="began"></el-tab-pane>
          <el-tab-pane label="报表" name="statements"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="appbar_center flex align-center text-primary text-bold">{{elements.name}}</div>
      <div class="appbar_right">
         <el-button
          type="primary"
          :icon="CaretRight"
          size="small"
          text
          @click="handleSave"
        >
          保存
        </el-button>
      </div>
    </div>

    <div class="toolbar right_container" v-if="activeName == 'began'">
      <div class="toolbar_box" :style="{ overflow: showMore ? 'visible' : 'hidden' }">
        <!-- 核心修改：给toolbar_item添加ref，调整样式 -->
        <div
          class="toolbar_item"
          :class="{ toolbar_item_showMore: showMore }"
          ref="toolbarItemRef"
        >
          <div
            title="撤销"
            :class="[
              'menu-item',
              'menu-item__undo',
              {
                disabled: !useUndoManager().canUndo,
              },
            ]"
            @click="handleUndoClick"
          >
            <i></i>
          </div>
          <div
            title="恢复"
            :class="[
              'menu-item',
              'menu-item__redo',
              {
                disabled: !useUndoManager().canRedo,
              },
            ]"
            @click="handleRedoClick"
          >
            <i></i>
          </div>
          <div class="menu_item__splitter"></div>

          <!-- 字体样式选择 -->
          <el-select
            v-model="selectedCompStyle['font-family']"
            :disabled="selectedCompType == 'page'"
            placeholder=""
            style="min-width: 140px; max-width: 140px"
            @change="handleChangeFontFamily"
          >
            <el-option
              v-for="item in fontFamilies"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- 字体大小样式 -->
          <el-select
            v-model="selectedCompStyle['font-size']"
            :disabled="selectedCompType == 'page'"
            @change="handleChangeFontSize"
            placeholder=""
            style="min-width: 100px; max-width: 100px"
          >
            <el-option
              v-for="item in fontSizes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="menu_item__splitter"></div>
          <!-- 渲染普通样式按钮 -->
          <template v-for="item in styleMenuList">
            <div
              v-if="item.key != 'splitter'"
              :key="item.name"
              :title="item.title"
              :class="[
                'menu-item',
                'menu-item__' + item.name,
                {
                  select: item.value == selectedCompStyle[item.key],
                  disabled: selectedCompType == 'page',
                },
              ]"
              @click="handleStyleClick(item, item.value == selectedCompStyle[item.key])"
            >
              <i :style="{ width: item.width, height: item.height }"></i>
            </div>
            <div v-else class="menu_item__splitter"></div>
          </template>

          <!-- 渲染颜色选择器 -->
          <div
            v-for="item in colorMenuList"
            :key="item.name"
            :title="item.title"
            :class="[
              'menu-item',
              'menu-item__' + item.name,
              {
                disabled: selectedCompType == 'page',
              },
            ]"
          >
            <el-popover
              :width="350"
              @before-enter="handleBeforeEnter(item)"
              :disabled="selectedCompType == 'page'"
              trigger="click"
              popper-class="right_container"
              ref="colorPopoverRef"
            >
              <template #reference>
                <div class="color_box">
                  <i :style="{ width: item.width, height: item.height }"></i>
                  <div
                    class="show_color"
                    :style="{
                      backgroundColor: selectedCompStyle[item.key]
                        ? selectedCompStyle[item.key]
                        : item.defaultColor,
                    }"
                  ></div>
                </div>
              </template>
              <!-- 颜色选择器面板 -->
              <el-color-picker-panel
                v-model="color"
                :disabled="selectedCompType == 'page'"
                class="color-picker-panel"
                :predefine="predefineColors"
                show-alpha
              >
                <template #footer>
                  <div>
                    <el-button text size="small" @click="handleColorClear(item)"
                      >清空</el-button
                    >
                    <el-button size="small" @click="handleColorOk(item)">确定</el-button>
                  </div>
                </template>
              </el-color-picker-panel>
            </el-popover>
          </div>
        </div>

        <!-- 修改：根据showMoreBtn动态显示more按钮 -->
        <div
          v-if="showMoreBtn"
          title="更多"
          :class="['menu-item', 'menu-item__more']"
          @click="handleMoreClick"
        >
          <i></i>
        </div>
      </div>
      <div class="toolbar_right" :class="{ 'sidebar-hide': collapse }">
        <div class="toolbar_right_item setting_btn">
          <div
            class="setting"
            @click="handleActive('setting')"
            :class="{ active: activeRight == 'setting' }"
          >
            <i class="iconfont icon-shezhi"></i>
            <span v-if="activeRight == 'setting' && !collapse">属性设置</span>
          </div>
          <div
            class="data"
            @click="handleActive('data')"
            :class="{ active: activeRight == 'data' }"
          >
            <i class="iconfont icon-shujuku"></i>
            <span v-if="activeRight == 'data' && !collapse">数据绑定</span>
          </div>
          <div
            class="data"
            @click="handleActive('params')"
            :class="{ active: activeRight == 'params' }"
          >
            <i class="iconfont icon-canshu" style="font-size: 18px"></i>
            <span v-if="activeRight == 'params' && !collapse">参数</span>
          </div>
        </div>

        <div class="toolbar_right_item collapse_btn no_page" @click="toggleCollapse">
          <i class="shousuo no_page" v-if="!collapse"></i>
          <i class="zhankai no_page" v-if="collapse"></i>
        </div>
      </div>
    </div>
    <div class="toolbar1 right_container" v-else-if="activeName == 'statements'">
      <div
        class="add_header toolbar_item_1"
        v-if="!pageConfig.pageHeader"
        @click="handleAddHeaderOrFooter('pageHeader')"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m3 21h17c .553 0 1-.447 1-1v-15c0-.555-.447-1-1-1h-17c-.553 0-1 .445-1 1v15c0 .553.447 1 1 1z"
            class="wd-icon-color-white"
          ></path>
          <path
            d="m20 14v6h-17v-6h-1v6c0 .553.447 1 1 1h17c .553 0 1-.447 1-1v-6z"
            class="wd-icon-color-gray-blue"
          ></path>
          <path
            d="m21 5c0-.553-.447-1-1-1h-17c-.553 0-1 .447-1 1z"
            class="wd-icon-color-gray-blue"
          ></path>
          <path d="m0 0v24h24v-24z" class="wd-icon-color-none"></path>
          <path
            d="m2 6.001h19v3.5h-9v-2.001h-6v2.001h-4z"
            class="wd-icon-color-dark-yellow"
          ></path>
          <path d="m10 11v-2h-2v2h-2v2h2v2h2v-2h2v-2z" class="wd-icon-color-blue"></path>
          <g class="wd-icon-color-gray">
            <path d="m2 11h3v1h-3z"></path>
            <path d="m16 11.001h2v1h-2z"></path>
            <path d="m19 11.001h2v1h-2z"></path>
            <path d="m13 11h2v1h-2z"></path>
          </g>
        </svg>
        <span> 添加页眉</span>
      </div>
      <div
        class="remove_header toolbar_item_1"
        v-if="pageConfig.pageHeader"
        @click="handleRemoveHeaderOrFooter('pageHeader')"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m20 4h-17c-.553 0-1 .447-1 1v15c0 .555.447 1 1 1h17c .553 0 1-.445 1-1v-15c0-.553-.447-1-1-1z"
            class="wd-icon-color-white"
          ></path>
          <path
            d="m20 14v6h-17v-6h-1v6c0 .553.447 1 1 1h17c .553 0 1-.447 1-1v-6z"
            class="wd-icon-color-gray-blue"
          ></path>
          <path
            d="m21 5c0-.553-.447-1-1-1h-17c-.553 0-1 .447-1 1z"
            class="wd-icon-color-gray-blue"
          ></path>
          <path d="m0 0v24h24v-24z" class="wd-icon-color-none"></path>
          <path d="m2 6.001h19v3.5h-19z" class="wd-icon-color-dark-yellow"></path>
          <g class="wd-icon-color-gray">
            <path d="m16 11.001h2v1h-2z"></path>
            <path d="m19 11.001h2v1h-2z"></path>
            <path d="m13 11h2v1h-2z"></path>
          </g>
          <path d="m6 11h6v2h-6z" class="wd-icon-color-blue"></path>
          <path d="m4 11h-1-1v1h1 1 1v-1z" class="wd-icon-color-gray"></path>
        </svg>
        <span>删除页眉</span>
      </div>
      <div
        class="add_footer toolbar_item_1"
        v-if="!pageConfig.pageFooter"
        @click="handleAddHeaderOrFooter('pageFooter')"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m20 4h-17c-.553 0-1 .447-1 1v15c0 .555.447 1 1 1h17c .553 0 1-.445 1-1v-15c0-.553-.447-1-1-1z"
            class="wd-icon-color-white"
          ></path>
          <path
            d="m3 11v-6h17v6h1v-6c0-.553-.447-1-1-1h-17c-.553 0-1 .447-1 1v6z"
            class="wd-icon-color-gray-blue"
          ></path>
          <path
            d="m2 20c0 .553.447 1 1 1h17c .553 0 1-.447 1-1z"
            class="wd-icon-color-gray-blue"
          ></path>
          <path d="m0 0v24h24v-24z" class="wd-icon-color-none"></path>
          <path
            d="m2 15.499h4v2.001h6v-2.001h9v3.5h-19z"
            class="wd-icon-color-dark-yellow"
          ></path>
          <path d="m10 14v2h-2v-2h-2v-2h2v-2h2v2h2v2z" class="wd-icon-color-blue"></path>
          <g class="wd-icon-color-gray">
            <path d="m16 12.999h2v1h-2z"></path>
            <path d="m19 12.999h2v1h-2z"></path>
            <path d="m13 13h2v1h-2z"></path>
            <path d="m2 13h3v1h-3z"></path>
          </g>
        </svg>
        <span>添加页尾</span>
      </div>

      <div
        class="remove_footer toolbar_item_1"
        v-if="pageConfig.pageFooter"
        @click="handleRemoveHeaderOrFooter('pageFooter')"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m20 4h-17c-.553 0-1 .447-1 1v15c0 .555.447 1 1 1h17c .553 0 1-.445 1-1v-15c0-.553-.447-1-1-1z"
            class="wd-icon-color-white"
          ></path>
          <path
            d="m3 11v-6h17v6h1v-6c0-.553-.447-1-1-1h-17c-.553 0-1 .447-1 1v6z"
            class="wd-icon-color-gray-blue"
          ></path>
          <path
            d="m2 20c0 .553.447 1 1 1h17c .553 0 1-.447 1-1z"
            class="wd-icon-color-gray-blue"
          ></path>
          <path d="m0 0v24h24v-24z" class="wd-icon-color-none"></path>
          <path d="m2 15.499h19v3.5h-19z" class="wd-icon-color-dark-yellow"></path>
          <g class="wd-icon-color-gray">
            <path d="m2 13h3v1h-3z"></path>
            <path d="m16 12.999h2v1h-2z"></path>
            <path d="m19 12.999h2v1h-2z"></path>
            <path d="m13 13h2v1h-2z"></path>
          </g>
          <path d="m6 12h6v2h-6z" class="wd-icon-color-blue"></path>
        </svg>
        <span> 删除页尾</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header_container {
  height: 80px;
  background-color: #f1f1f1;
  // overflow: hidden;
}
.appbar {
  width: 100%;
  height: 30px;
  box-shadow: inset 0 -1px 0 0 #dbdbdb;
  padding: 0 15px;
  .appbar_left {
    display: flex;
    align-items: center;
  }
  :deep(.el-button--small) {
    height: 28px;
  }
  :deep(.el-button.is-text:not(.is-disabled):hover) {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .toolbar_splitter {
    height: 20px;
    width: 1px;
    background-color: #dbdbdb;
    margin: 0 10px;
  }
  .appbar_tabs {
    height: 28px;
    :deep(.el-tabs__item) {
      height: 28px;
      line-height: 28px;
      font-size: 12px;
    }
    :deep(.el-tabs__nav-wrap:after) {
      height: 0px;
    }
  }
}

:deep(.el-tabs__item) {
  padding: 0 10px;
}
.toolbar {
  display: flex;
  // align-items: center;
  justify-content: space-between;
  height: 50px;

  .toolbar_box {
    position: relative;
    flex: 1;
  }

  // ========== 核心修改：调整toolbar_item样式 ==========
  .toolbar_item {
    display: flex;
    align-items: center;
    padding: 5px 5px;
    overflow: hidden; // 隐藏超出内容
    white-space: nowrap; // 禁止换行
    width: 100%; // 占满父容器
    box-sizing: border-box;
    flex-wrap: wrap;
    padding-right: 40px;
    position: relative;
    z-index: 10;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 5px 5px;

    :deep(.el-select__wrapper) {
      box-shadow: none;
      background-color: #f1f1f1;
    }

    .color_box {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .select {
      background-color: rgba(0, 0, 0, 0.05);
    }
    .disabled {
      opacity: 0.38;
      cursor: not-allowed;
    }
  }
  .toolbar_item_showMore {
    :deep(.el-select__wrapper) {
      box-shadow: none;
      background-color: #fff;
    }
  }

  .toolbar_item_showMore::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    display: block;
    width: 100%;
    height: 100px;
    content: " ";
    background-color: #fff;

    // z-index:10;
  }

  // ========== 修改more按钮样式 ==========
  .menu-item__more {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    right: 0;
    top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10; // 确保在最上层
  }

  .toolbar_right {
    min-width: 330px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    transition: all 0.3s;
    box-sizing: border-box;
    // background-color:#fff;
    .setting_btn {
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
      }
      .active::after {
        content: "";
        position: absolute;
        bottom: -11px;
        left: 0px;
        width: 100%;
        height: 2px;
        background-color: var(--el-color-primary);

        transition: all 0.3s;
      }
      .data {
        margin-left: 20px;
      }
      i {
        font-size: 24px;
      }
      span {
        font-size: 13px;
        margin-left: 3px;
      }
      .active {
        color: var(--el-color-primary);
      }
    }
    .collapse_btn i {
      width: 26px;
      height: 26px;
      color: var(--el-color-primary);
      display: inline-block;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0iIzIwNWY3OCI+PHBhdGggY2xhc3M9ImdjLWljb24tY29sb3ItLXRleHQiIGQ9Ik0xOSAyMUg1Yy0xLjA5NyAwLTItLjkwMy0yLTJWNWMwLTEuMDk3LjkwMy0yIDItMmgxNGMxLjA5NyAwIDIgLjkwMyAyIDJ2MTRjMCAxLjA5Ny0uOTAzIDItMiAyek0xMyA1SDV2MTRoOFY1em02IDBoLTR2MTRoNFY1em0tOCAzbC00IDQgNCA0Vjh6Ij48L3BhdGg+PC9zdmc+");
    }
    .shousuo {
      transform: rotate(180deg);
    }
  }
  .sidebar-hide {
    min-width: 200px;
  }
}
.toolbar1 {
  height: 50px;
  display: flex;
  align-items: center;
}
.menu_item__splitter {
  position: relative;
  display: block;
  overflow: hidden;
  width: 1px;
  height: 40px;
  padding: 0 5px;
}
.menu_item__splitter::after {
  content: "";
  // position: absolute;
  display: block;
  width: 1px;
  height: 20px;
  margin: 10px 0;
  content: " ";
  background-color: #dbdbdb;
}
.menu-item {
  min-width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 5px;
  margin-bottom: 5px;
  transition: all 0.3s;
  border-radius: 4px;
  position: relative;
  z-index: 10;
  i {
    width: 18px;
    height: 18px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .show_color {
    width: 20px;
    height: 5px;
    margin: 0 auto;
    border-radius: 2px;
    border: 1px dotted black;
  }
}
.menu-item:not(.disabled):hover {
  background-color: rgba(0, 0, 0, 0.1);
}

// 以下原有样式省略（保持不变）
.menu-item__undo i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M6%202.763v7.544l-4.29-3.73zM13%2014v-3a4%204%200%2000-4-4H6V6h3a5%205%200%20015%205v3h-1z'%20fill='%233D4757'/%3e%3c/svg%3e");
}

.menu-item__redo i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M3%2014v-3a4%204%200%20014-4h3V6H7a5%205%200%2000-5%205v3h1zm7.016-11.282v7.543l4.29-3.73z'%20fill='%233D4757'/%3e%3c/svg%3e");
}

.menu-item__painter i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cpath%20d='M7.5%202v2.5H4a.5.5%200%2000-.5.5v2a.5.5%200%2000.5.5h9a.5.5%200%2000.5-.5V5a.5.5%200%2000-.5-.5H9.5V2a.5.5%200%2000-.5-.5H8a.5.5%200%2000-.5.5z'%20stroke='%233D4757'/%3e%3cpath%20fill='%233D4757'%20d='M13%207h1v4h-1z'/%3e%3cpath%20d='M11%2013a2%202%200%20002-2V8.764A3%203%200%20118.764%2013H11z'%20fill='%233D4757'/%3e%3cpath%20fill='%233D4757'%20d='M1%2013h10v1H1z'/%3e%3cpath%20d='M1%2013a2%202%200%20002-2V8.764A3%203%200%20011%2014v-1z'%20fill='%233D4757'/%3e%3cpath%20fill='%233D4757'%20d='M3%207h1v4H3z'/%3e%3c/g%3e%3c/svg%3e");
}

.menu-item__format i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='%233D4757'%20fill-rule='evenodd'%3e%3cpath%20d='M8.213%2013H6.8l6.636-6.636-4.243-4.243-7.07%207.071L5.928%2013H4.515L1.06%209.546a.5.5%200%20010-.707L8.839%201.06a.5.5%200%2001.707%200l4.95%204.95a.5.5%200%20010%20.707L8.213%2013z'%20fill-rule='nonzero'/%3e%3cpath%20d='M4.536%206.364l4.95%204.95-.707.707-4.95-4.95zM4.521%2013h10.03v1H5.496z'/%3e%3c/g%3e%3c/svg%3e");
}

.menu-item__size-add i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='%233D4757'%20fill-rule='evenodd'%3e%3cpath%20d='M6.215%203.29H7.64L11.855%2014H10.52l-1.14-3H4.46l-1.14%203H2L6.215%203.29zM4.85%209.965h4.14L6.965%204.61h-.06L4.85%209.965z'/%3e%3cpath%20d='M12%204V2h1v2h2v1h-2v2h-1V5h-2V4h2z'%20fill-rule='nonzero'/%3e%3c/g%3e%3c/svg%3e");
}

.menu-item__size-minus i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='%233D4757'%20fill-rule='evenodd'%3e%3cpath%20fill-rule='nonzero'%20d='M11%204h4v1h-4z'/%3e%3cpath%20d='M6.215%203.29H7.64L11.855%2014H10.52l-1.14-3H4.46l-1.14%203H2L6.215%203.29zM4.85%209.965h4.14L6.965%204.61h-.06L4.85%209.965z'/%3e%3c/g%3e%3c/svg%3e");
}

.menu-item__bold i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M8.131%206.9c2.035%200%202.569-.9%202.569-1.869%200-.968-.64-1.831-2.623-1.831H5.2v3.7h2.931zm.524%205.9c2.045%200%202.545-1.305%202.545-2.3%200-.985-.506-2.4-2.81-2.4H5.2v4.7h3.455zM4%202h4.71c2.367%200%203.19%201.583%203.19%203s-.325%201.852-1.1%202.5c1.2.5%201.569%201.379%201.6%203%20.03%201.606-.586%203.5-3.769%203.5H4V2z'%20fill='%233D4757'%20fill-rule='evenodd'/%3e%3c/svg%3e");
}
.menu-item__backgroundColor i {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggY2xhc3M9ImdjLWljb24tY29sb3ItLXRleHQiIGQ9Ik0xOSAxMS41cy0yIDIuMTctMiAzLjVhMiAyIDAgMCAwIDIgMiAyIDIgMCAwIDAgMi0yYzAtMS4zMy0yLTMuNS0yLTMuNU01LjIxIDEwTDEwIDUuMjEgMTQuNzkgMTBtMS43Ny0xLjA2TDcuNjIgMCA2LjIxIDEuNDFsMi4zOCAyLjM4LTUuMTUgNS4xNWMtLjU5LjU2LS41OSAxLjUzIDAgMi4xMmw1LjUgNS41Yy4yOS4yOS42OC40NCAxLjA2LjQ0cy43Ny0uMTUgMS4wNi0uNDRsNS41LTUuNWMuNTktLjU5LjU5LTEuNTYgMC0yLjEyeiI+PC9wYXRoPjwvc3ZnPg==");
}

.menu-item__underline i {
  flex-shrink: 0;
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M5%202v6a3%203%200%20106%200V2h1v6a4%204%200%2011-8%200V2h1zM4%2013h8v1H4z'%20fill='%233D4757'/%3e%3c/svg%3e");
}
.menu-item__strikeout i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='%233D4757'%20fill-rule='evenodd'%3e%3cpath%20d='M10.42%207.903H6.692a9.182%209.182%200%2001-.41-.172%205.54%205.54%200%2001-.814-.447%202.955%202.955%200%2001-.655-.595%202.728%202.728%200%2001-.44-.777%202.877%202.877%200%2001-.162-1.006c0-.472.094-.888.282-1.25.188-.36.453-.663.793-.907s.747-.43%201.22-.558A5.97%205.97%200%20018.063%202c.504%200%20.95.049%201.337.147.387.097.725.23%201.013.398.287.169.53.365.73.59a3.337%203.337%200%2001.772%201.486c.03.13.054.255.073.379h-1.276a2.393%202.393%200%2000-.22-.615%202.315%202.315%200%2000-.59-.724%202.467%202.467%200%2000-.834-.44%203.376%203.376%200%2000-1.005-.146%204.69%204.69%200%2000-.958.097%202.77%202.77%200%2000-.839.314%201.765%201.765%200%2000-.597.566c-.152.233-.229.518-.229.854%200%20.348.086.642.258.884.171.241.401.449.689.622.287.174.615.323.983.448s.749.247%201.142.367c.31.097.62.196.934.297a8.439%208.439%200%2001.973.38zm1.376%201c.175.217.315.466.418.746.105.285.158.612.158.98%200%20.554-.104%201.041-.312%201.462-.207.42-.496.772-.867%201.054-.37.282-.81.495-1.32.64A6.12%206.12%200%20018.205%2014c-.543%200-1.071-.09-1.586-.273a4.44%204.44%200%2001-1.374-.773%203.873%203.873%200%2001-.97-1.217%203.695%203.695%200%2001-.395-1.612h1.27c.028.407.122.78.282%201.12a2.835%202.835%200%20001.581%201.465c.363.138.76.207%201.192.207.387%200%20.758-.042%201.112-.126a2.85%202.85%200%2000.938-.399%202.01%202.01%200%2000.647-.708c.16-.29.241-.642.241-1.054%200-.337-.087-.623-.261-.86a2.333%202.333%200%2000-.69-.61%204.651%204.651%200%2000-.495-.257h2.099z'/%3e%3cpath%20d='M3%207h10v1H3z'/%3e%3c/g%3e%3c/svg%3e");
}

.menu-item__italic i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.017%203L8.08%2013H9v1H6v-1h1.182L9%203H8V2h3v1h-.983z'%20fill='%233D4757'/%3e%3c/svg%3e");
}
.menu-item__color i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.997%203.429L6.398%208h3.2L7.997%203.429zM8.497%202L12%2012h-1L9.949%209h-3.9L5%2012H4L7.496%202h1z'%20fill='%233D4757'%20fill-rule='evenodd'/%3e%3c/svg%3e");
}

.menu-item__left i {
  background-image: url("data:image/svg+xml,%3csvg%20height='16'%20viewBox='0%200%2016%2016'%20width='16'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2%2013h12v1H2zm0-3h8v1H2zm0-3h12v1H2zm0-6h12v1H2zm0%203h8v1H2z'%20fill='%233d4757'%20fill-rule='evenodd'/%3e%3c/svg%3e");
}

.menu-item__center i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2%2013h12v1H2v-1zm2-3h8v1H4v-1zM2%207h12v1H2V7zm0-6h12v1H2V1zm2%203h8v1H4V4z'%20fill='%233D4757'%20fill-rule='evenodd'/%3e%3c/svg%3e");
}

.menu-item__right i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2%2013h12v1H2v-1zm4-3h8v1H6v-1zM2%207h12v1H2V7zm0-6h12v1H2V1zm4%203h8v1H6V4z'%20fill='%233D4757'%20fill-rule='evenodd'/%3e%3c/svg%3e");
}

.menu-item__justify i {
  background-image: url("data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20stroke='%233D4757'%20fill='%233D4757'%20d='M2%2010.5H14M2%2013.5H14'%20stroke-linecap='round'%20stroke-linejoin='miter'%3e%3c/path%3e%3cpath%20stroke='%233D4757'%20fill='%233D4757'%20d='M14%203.5L12%201.5M14%203.5L12%205.5M14%203.5L2%203.5M4%201.5L2%203.5M2%203.5L4%205.5'%20stroke-linecap='round'%20stroke-linejoin='miter'%3e%3c/path%3e%3c/svg%3e");
}

.menu-item__verticalTop i {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDNINGMtMS4xMDQgMC0yIC44OTYtMiAydjE1YzAgMS4xMDUuODk2IDIgMiAyaDE1YzEuMTA0IDAgMi0uODk1IDItMlY1YzAtMS4xMDQtLjg5Ni0yLTItMnoiIGZpbGw9IiNmZmYiPjwvcGF0aD48ZyBmaWxsPSIjYjNiM2IzIj48cGF0aCBkPSJNNSA4aDEzdjFINXpNNSA2aDEzdjFINXpNNSAxMGgxM3YxSDV6Ij48L3BhdGg+PC9nPjxwYXRoIGNsYXNzPSJnYy1pY29uLWNvbG9yLS10ZXh0IiBkPSJNMTkgNGMuNTUxIDAgMSAuNDQ5IDEgMXYxNWMwIC41NTMtLjQ0OSAxLTEgMUg0Yy0uNTUxIDAtMS0uNDQ3LTEtMVY1YzAtLjU1MS40NDktMSAxLTF6bTAtMUg0Yy0xLjEwNCAwLTIgLjg5Ni0yIDJ2MTVjMCAxLjEwNS44OTYgMiAyIDJoMTVjMS4xMDQgMCAyLS44OTUgMi0yVjVjMC0xLjEwNC0uODk2LTItMi0yeiI+PC9wYXRoPjwvc3ZnPg==");
}
.menu-item__verticalMiddle i {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDNINGMtMS4xMDQgMC0yIC44OTYtMiAydjE1YzAgMS4xMDUuODk2IDIgMiAyaDE1YzEuMTA0IDAgMi0uODk1IDItMlY1YzAtMS4xMDQtLjg5Ni0yLTItMnoiIGZpbGw9IiNmZmYiPjwvcGF0aD48ZyBmaWxsPSIjYjNiM2IzIj48cGF0aCBkPSJNNSAxMmgxM3YxSDV6TTUgMTBoMTN2MUg1ek01IDE0aDEzdjFINXoiPjwvcGF0aD48L2c+PHBhdGggY2xhc3M9ImdjLWljb24tY29sb3ItLXRleHQiIGQ9Ik0xOSA0Yy41NTEgMCAxIC40NDkgMSAxdjE1YzAgLjU1My0uNDQ5IDEtMSAxSDRjLS41NTEgMC0xLS40NDctMS0xVjVjMC0uNTUxLjQ0OS0xIDEtMXptMC0xSDRjLTEuMTA0IDAtMiAuODk2LTIgMnYxNWMwIDEuMTA1Ljg5NiAyIDIgMmgxNWMxLjEwNCAwIDItLjg5NSAyLTJWNWMwLTEuMTA0LS44OTYtMi0yLTJ6Ij48L3BhdGg+PC9zdmc+");
}
.menu-item__verticalBottom i {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48cGF0aCBkPSJNMTkgM0g0Yy0xLjEwNCAwLTIgLjg5Ni0yIDJ2MTVjMCAxLjEwNS44OTYgMiAyIDJoMTVjMS4xMDQgMCAyLS44OTUgMi0yVjVjMC0xLjEwNC0uODk2LTItMi0yeiIgZmlsbD0iI2ZmZiI+PC9wYXRoPjxnIGZpbGw9IiNiM2IzYjMiPjxwYXRoIGQ9Ik01IDE2aDEzdjFINXpNNSAxOGgxM3YxSDV6TTUgMTRoMTN2MUg1eiI+PC9wYXRoPjwvZz48cGF0aCBjbGFzcz0iZ2MtaWNvbi1jb2xvci0tdGV4dCIgZD0iTTQgMjFjLS41NTEgMC0xLS40NDktMS0xVjVjMC0uNTUzLjQ0OS0xIDEtMWgxNWMuNTUxIDAgMSAuNDQ3IDEgMXYxNWMwIC41NTEtLjQ0OSAxLTEgMXptMCAxaDE1YzEuMTA0IDAgMi0uODk2IDItMlY1YzAtMS4xMDUtLjg5Ni0yLTItMkg0Yy0xLjEwNCAwLTIgLjg5NS0yIDJ2MTVjMCAxLjEwNC44OTYgMiAyIDJ6Ij48L3BhdGg+PC9zdmc+");
}
.menu-item__more i {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB0PSIxNzY4NTI2MTMwMzQwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjUyNzEiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZD0iTTUxMiAyNTZhNjQgNjQgMCAxIDAtNjQtNjQgNjQuMSA2NC4xIDAgMCAwIDY0IDY0eiBtMCAxOTJhNjQgNjQgMCAxIDAgNjQgNjQgNjQuMSA2NC4xIDAgMCAwLTY0LTY0eiBtMCAzMjBhNjQgNjQgMCAxIDAgNjQgNjQgNjQuMSA2NC4xIDAgMCAwLTY0LTY0eiIgcC1pZD0iNTI3MiI+PC9wYXRoPjwvc3ZnPg==");
}

.add_header,
.add_footer,
.remove_header,
.remove_footer {
  display: flex;
  align-items: center;
  margin-left: 20px;
  svg {
    width: 24px;
    height: 24px;
  }
  span {
    font-size: 13px;
    margin-left: 7px;
  }
}

.wd-icon-color-white {
  fill: #fff;
}
.wd-icon-color-gray-blue {
  fill: #819cce;
}
.wd-icon-color-none {
  fill: none;
}
.wd-icon-color-dark-yellow {
  fill: #f5c633;
}
.wd-icon-color-blue {
  fill: #1c7cdc;
}
.wd-icon-color-gray {
  fill: #b3b3b3;
}
.toolbar_item_1 {
  min-width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  padding: 0 4px;
}
.toolbar_item_1:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
