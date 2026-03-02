<template>
  <div class="right_container" :class="{ 'sidebar-hide': collapse }">
    <div class="menu menu-normal" :style="{ display: collapse ? 'none' : 'block' }">
      <RightSettings
        v-if="activeRight === 'setting'"
        :dataSources="dataSources"
        :dataSets="dataSets"
        :embeddedImages="embeddedImages"
      ></RightSettings>
      <RightData
        :dataSources="dataSources"
        :dataSets="dataSets"
        v-else-if="activeRight === 'data'"
      ></RightData>
      <RightParams
        :parameters="parameters"
        v-else-if="activeRight === 'params'"
      ></RightParams>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import RightSettings from "@/components/right/rightSettings/index.vue";
import RightData from "@/components/right/rightData/index.vue";
import { useSettingStore } from "@/stores/index.js";

const settingStore = useSettingStore();

// 定义Props：接收外部传入的折叠状态（可选，也可内部维护）
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false,
  },
  activeRight: {
    type: String,
    default: "setting",
  },
  dataSources: { type: Array, default: () => [] },
  dataSets: { type: Array, default: () => [] },
  parameters: { type: Array, default: () => [] },
  embeddedImages: { type: Array, default: () => [] },
});

// 定义Emits：拖拽开始时向父组件传递拖拽元素
const emit = defineEmits(["toggle-collapse"]);

const toggleCollapse = () => {
  emit("toggle-collapse");
};
</script>

<style lang="scss" scoped>
.right_container {
  width: 330px;
  min-width: 330px;
  height: calc(100vh - 80px);
  // border-right: 1px solid #e4e7ed;
  //   color: #bfcbd9;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: sticky;
  right: 0;
  box-shadow: -3px 7px 5px 1px rgba(0, 0, 0, 0.1);
  .right_top {
    height: 80px;
    background-color: #f1f1f1;
    .appbar {
      height: 30px;
      box-shadow: inset 0 -1px 0 0 #dbdbdb;
      padding: 0 15px;
    }
    .toobal {
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
    }
  }

  &.sidebar-hide {
    width: 0;
    min-width: 0;
    .menu {
      visibility: hidden;
    }
  }

  .sidebar-hide1 {
    width: 0 !important;
    min-width: 0 !important;
    padding: 0 !important;
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
    padding: 15px 15px;
    overflow-y: auto;

    transition: all 0.3s;
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
        font-size: 16px;
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
