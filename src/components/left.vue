<template>
  <div class="left_container" :class="{ 'sidebar-hide': collapse }">
    <!-- 隐藏的拖拽预览模板（用于自定义预览图） -->
    <div ref="dragPreviewRef" class="drag-preview"></div>
    <transition name="sidebarLogoFade">
      <div class="sidebar-logo-container" :class="{ collapse: collapse }">
        <img :src="logo" alt="" class="sidebar-logo" />
        <h1 class="sidebar-title" v-if="!collapse">报表设计器</h1>
      </div>
    </transition>

    <div class="menu menu-normal">
      <div
        class="item"
        v-for="item in dragList"
        :key="item.id"
        draggable="true"
        @dragstart="(e) => handleDragStart(e, item)"
        @dragend="handleDragEnd"
      >
        <span class="iconfont" :style="{fontSize:item.fontSize || '20px',marginLeft:item.marginLieft || '0px'}" :class="item.icon"></span>
        <span class="menu-item-text" v-if="!collapse">{{ item.name }}</span>
      </div>
    </div>

    <div class="menu-close">
      <div class="item" @click="toggleCollapse">
        <span class="iconfont icon-zhankai" v-if="collapse"></span>
        <span class="iconfont icon-shousuo" v-if="!collapse"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import logo from "@/assets/zhlogo.png";

// 定义Props：接收外部传入的折叠状态（可选，也可内部维护）
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false,
  },
});

// 定义Emits：拖拽开始时向父组件传递拖拽元素
const emit = defineEmits(["drag-start", "toggle-collapse"]);

// 左侧拖拽源列表（可通过Props传入，这里简化为内部定义）
const dragList = ref([
  {
    icon: "icon-Label",
    name: "标签",
    id: "1",
    bgColor: "#fff",
    type: "label",
    fontSize:'12px',
    marginLieft:'-3px'
  },
  {
    icon: "icon-wenbenkuang_fuzhi",
    name: "文本",
    id: "1",
    bgColor: "#fff",
    type: "text",
  },
  {
    icon: "icon-biaoge_fuzhi",
    name: "表格",
    id: "2",
    bgColor: "#fff",
    type: "table",
  },

  {
    icon: "icon-xiantiao",
    name: "线条",
    id: "3",
    bgColor: "#fff",
    type: "line",
  },
  {
    icon: "icon-tuxing",
    name: "图形",
    id: "3",
    bgColor: "#fff",
    type: "graphic",
  },
  {
    icon: "icon-tiaoxingma",
    name: "条形码",
    id: "3",
    bgColor: "#fff",
    type: "qrcode",
  },
  {
    icon: "icon-tupiankuang_fuzhi",
    name: "图片",
    id: "4",
    type: "image",
  },
   {
    icon: "icon-fuwenben",
    name: "富文本",
    id: "4",
    type: "richText",
  },
]);

// 暂存当前拖拽的元素（内部使用）
const currentDragItem = ref(null);
// 新增：拖拽预览相关
const dragPreviewRef = ref(null); // 预览模板DOM
const previewItem = ref({}); // 预览元素的信息

/**
 * 拖拽开始：向父组件发送拖拽元素信息
 */
// 修改：拖拽开始事件 - 自定义预览图
const handleDragStart = (e, item) => {
  console.log(item);
  currentDragItem.value = item;
  previewItem.value = item; // 赋值预览元素信息
  e.dataTransfer.setData("text/plain", JSON.stringify(item));
  e.dataTransfer.effectAllowed = "copy";

  // 关键：自定义拖拽预览图
  if (dragPreviewRef.value) {
    // setDragImage(预览DOM, 偏移x, 偏移y)
    console.log(dragPreviewRef.value);
    e.dataTransfer.setDragImage(dragPreviewRef.value, 20, 20);
  }

  emit("drag-start", item);
};

/**
 * 拖拽结束：清空暂存
 */
const handleDragEnd = () => {
  currentDragItem.value = null;
};

/**
 * 切换折叠状态：向父组件派发事件
 */
const toggleCollapse = () => {
  emit("toggle-collapse");
};
</script>

<style lang="scss" scoped>
.left_container {
  min-width: 200px;
  max-width: 200px;
  height: 100%;
  background-color: #304156;
  border-right: 1px solid #e4e7ed;
  color: #bfcbd9;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  position: sticky;
  left: 0;

  &.sidebar-hide {
    width: 54px;
    min-width: 54px;
    max-width: 54px;
  }

  .sidebar-logo-container {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: center;

    &.collapse .sidebar-logo {
      margin-right: 0;
    }

    .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  .menu {
    &.menu-normal {
      flex: 1;
    }

    .item {
      height: 50px;
      line-height: 50px;
      padding-left: 16px;
      cursor: grab;
      display: flex;
      align-items: center;
      transition: all 0.3s;

      &:hover {
        background-color: #00152870;
      }

      &:active {
        cursor: grabbing;
      }

      .iconfont {
        font-size: 20px;
        margin-right: 8px;
        vertical-align: middle;
      }

      .menu-item-text {
        font-size: 14px;
      }
    }

    &-close {
      border-top: 1px solid #e4e7ed;

      .item {
        height: 50px;
        line-height: 50px;
        padding-left: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;

        .iconfont {
          font-size: 20px;
          margin-right: 8px;
          vertical-align: middle;
        }
      }
    }
  }

  .sidebarLogoFade-enter-active {
    transition: opacity 0.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }
}
// 新增：拖拽预览模板样式
.drag-preview {
  border: 0.1px solid #409eff;
  opacity: 0;
}
</style>
