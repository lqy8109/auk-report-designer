<template>
  <teleport to="body">
    <div
      v-if="visible"
      ref="menuRef"
      class="context-menu"
      :style="{ top: `${top}px`, left: `${left}px`, zIndex: 10000 }"
      @click.stop
      @contextmenu.stop.prevent
    >
      <ul>
        <template v-for="(item, index) in menuList" :key="index">
          <li
            v-if="item.type !== 'divider'"
            class="context-menu-item"
            :class="{ disabled: item.disabled }"
            @click="!item.disabled && handleItemClick(item)"
          >
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </li>
          <li v-else class="context-menu-divider"></li>
        </template>
      </ul>
    </div>
  </teleport>
</template>

<script setup>
import { ref, watch, onUnmounted, nextTick } from "vue";

const props = defineProps({
  visible: { type: Boolean, default: false },
  top: { type: Number, default: 0 },
  left: { type: Number, default: 0 },
  menuList: { type: Array, default: () => [] },
  // 新增：是否为Handsontable专属菜单
  isHotMenu: { type: Boolean, default: false },
});

const emit = defineEmits(["close", "hotMenuClick"]);

const menuRef = ref(null);

// 点击菜单项：区分普通菜单和Hot菜单
const handleItemClick = (item) => {
  if (item.action) {
    item.action();
  }
  if (props.isHotMenu) {
    emit("hotMenuClick"); // 通知关闭Hot自带菜单
  }
  emit("close");
};

// 全局点击关闭菜单
const handleDocumentClick = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    emit("close");
  }
};

// 全局右键关闭菜单
const handleGlobalContextMenu = (e) => {
  if (props.visible && menuRef.value && !menuRef.value.contains(e.target)) {
    emit("close");
  }
};

// 边界检测
const adjustMenuPosition = () => {
  if (!menuRef.value) return;
  const menuEl = menuRef.value;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const menuWidth = menuEl.offsetWidth;
  const menuHeight = menuEl.offsetHeight;

  let newTop = props.top;
  let newLeft = props.left;

  if (newLeft + menuWidth > windowWidth) newLeft = windowWidth - menuWidth - 10;
  if (newTop + menuHeight > windowHeight) newTop = windowHeight - menuHeight - 10;
  newLeft = Math.max(10, newLeft);
  newTop = Math.max(10, newTop);

  menuEl.style.top = `${newTop}px`;
  menuEl.style.left = `${newLeft}px`;
};

// 窗口resize调整位置
const handleResize = () => {
  if (props.visible && menuRef.value) adjustMenuPosition();
};

// 监听显示状态绑定/解绑事件
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      document.addEventListener("click", handleDocumentClick);
      document.addEventListener("contextmenu", handleGlobalContextMenu);
      window.addEventListener("resize", handleResize);
      document.body.style.overflow = "hidden";
      nextTick(() => adjustMenuPosition());
    } else {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("contextmenu", handleGlobalContextMenu);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "";
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
  document.removeEventListener("contextmenu", handleGlobalContextMenu);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  z-index: 9999;
  background: #fff;
  margin: 0;
  list-style: none;
  cursor: pointer;
  user-select: none;
  min-width: 200px;
  border: 1px solid #ccc;
  ul {
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
  }
}

/* 菜单项样式 */
.context-menu-item {
  padding: 5px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #333;
  transition: background-color 0.2s;
  span {
    margin-left: 10px;
    margin-right: 6px;
  }
}

.context-menu-item:hover {
  background-color: #f3f3f3;
}

.context-menu-item.disabled {
  color: #999;
  cursor: not-allowed;
}

.context-menu-item.disabled:hover {
  background-color: transparent;
}

.context-menu-item i {
  margin-right: 8px;
  font-size: 14px;
}

/* 分隔线样式 */
.context-menu-divider {
  height: 1px;

  background-color: #ebeef5;
  overflow: hidden;
}
</style>
