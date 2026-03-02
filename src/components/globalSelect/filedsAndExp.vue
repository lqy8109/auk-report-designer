<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-27 11:15:26
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-27 16:54:05
 * @description: 
-->
<template>
  <!-- 使用Teleport挂载到body，全局唯一 -->
  <teleport to="body">
    <div
      v-show="store.visible"
      class="global-select-box"
      :style="store.position"
      @click.stop
    >
      <!-- 遍历多组选项 -->
      <div
        v-for="(item, groupIndex) in store.options"
        :key="item.label || groupIndex"
        class="option-group"
      >
        <!-- 分组标题：带展开/收缩图标 -->
        <div
          class="label"
          @click="handleLabelClick(groupIndex)"
          :class="{ disabled: store.options.length === 1 }"
        >
          <span>{{ item.label }}</span>
          <!-- 仅多组时显示展开/收缩图标 -->
          <el-icon v-if="store.options.length > 1" class="expand-icon">
            <ArrowDown v-if="expandedGroup === groupIndex" />
            <ArrowRight v-else />
          </el-icon>
        </div>

        <!-- 该组内容：展开时显示 -->
        <div v-show="isGroupExpanded(groupIndex)" class="group-content">
          <!-- 每组独立的搜索框 -->
          <div>
            <el-input
              v-model="searchTexts[groupIndex]"
              class="responsive-input"
              placeholder="输入字段名称进行查找"
              clearable
              @input="() => handleGroupSearch(groupIndex)"
              :input-style="{ fontSize: '12px' }"
              :prefix-icon="Search"
              size="small"
            >
            </el-input>
          </div>

          <!-- 筛选后的选项列表 -->
          <div class="select-option-box">
            <!-- 1. 有搜索结果时显示筛选后的选项 -->
            <div
              v-for="(option, index) in getFilteredOptions(groupIndex)"
              :key="index"
              class="select-option"
              @mouseenter="hoverIndex = index"
              @mouseleave="hoverIndex = -1"
              @click.stop="store.handleSelect({dataSet:item.dataSet,dataField:option.dataField})"
              :class="{ 'option-hover': hoverIndex === index }"
            >
              <!-- 高亮匹配的搜索文本 -->
              <span
                v-html="highlightMatchText(option.name || option.dataField, groupIndex)"
              ></span>
            </div>

            <!-- 2. 无搜索结果时显示提示 -->
            <div
              v-if="
                getFilteredOptions(groupIndex).length === 0 && searchTexts[groupIndex]
              "
              class="no-result"
            >
              暂无匹配的字段
            </div>

            <!-- 3. 未输入搜索词且无选项时显示提示 -->
            <div
              v-if="item.fields?.length === 0 && !searchTexts[groupIndex]"
              class="no-result"
            >
              暂无可选字段
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, reactive } from "vue";
import { useSelectFieldStore } from "@/stores/selectField";
import { Search, ArrowDown, ArrowRight } from "@element-plus/icons-vue"; // 导入图标

const store = useSelectFieldStore();
const hoverIndex = ref(-1);
// 每组独立的搜索文本（数组形式，索引对应分组）
const searchTexts = ref([]);
// 展开的分组索引（多组时默认展开第一个，单组时默认展开）
const expandedGroup = ref(0);

/**
 * 初始化：适配分组数量，初始化搜索文本和展开状态
 */
const initGroupState = () => {
  const groupCount = store.options?.length || 0;
  // 初始化搜索文本数组（每组一个空值）
  searchTexts.value = Array.from({ length: groupCount }, () => "");
  // 单组时默认展开，多组时默认展开第一个
  expandedGroup.value = groupCount > 0 ? 0 : -1;
};

// 监听options变化，重新初始化状态
watch(
  () => store.options,
  () => {
    initGroupState();
  },
  { deep: true, immediate: true }
);

/**
 * 判断分组是否展开
 * @param {number} groupIndex 分组索引
 * @returns {boolean} 是否展开
 */
const isGroupExpanded = (groupIndex) => {
  // 单组时强制展开，多组时匹配展开索引
  return store.options.length === 1 || expandedGroup.value === groupIndex;
};

/**
 * 处理label点击：切换展开/收缩（仅多组时生效）
 * @param {number} groupIndex 分组索引
 */
const handleLabelClick = (groupIndex) => {
  // 单组时不处理
  if (store.options.length === 1) return;

  // 切换展开状态：点击已展开的则收缩，否则展开（其余自动收缩）
  expandedGroup.value = expandedGroup.value === groupIndex ? -1 : groupIndex;

  // 展开新分组时，清空该组搜索框
  if (expandedGroup.value === groupIndex) {
    searchTexts.value[groupIndex] = "";
  }
};

/**
 * 获取指定分组的筛选后选项
 * @param {number} groupIndex 分组索引
 * @returns {Array} 筛选后的选项列表
 */
const getFilteredOptions = (groupIndex) => {
  const group = store.options[groupIndex] || {};
  const fields = group.fields || [];
  const keyword = searchTexts.value[groupIndex]?.trim().toLowerCase() || "";

  // 无搜索词时返回全部
  if (!keyword) return fields;

  // 模糊搜索：匹配name或dataField（不区分大小写）
  return fields.filter((option) => {
    const name = (option.name || "").toLowerCase();
    const dataField = (option.dataField || "").toLowerCase();
    return name.includes(keyword) || dataField.includes(keyword);
  });
};

/**
 * 分组搜索处理（防抖可选）
 * @param {number} groupIndex 分组索引
 */
const handleGroupSearch = (groupIndex) => {
  // 基础版：计算属性已实时筛选，无需额外操作
  // 防抖版示例：
  // clearTimeout(timers[groupIndex]);
  // timers[groupIndex] = setTimeout(() => {}, 300);
};

/**
 * 高亮指定分组的匹配文本
 * @param {string} text 原始文本
 * @param {number} groupIndex 分组索引
 * @returns {string} 带高亮标签的文本
 */
const highlightMatchText = (text, groupIndex) => {
  const keyword = searchTexts.value[groupIndex]?.trim() || "";
  if (!keyword || !text) return text;

  // 转义特殊字符，避免正则报错
  const escapeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const reg = new RegExp(`(${escapeKeyword})`, "gi");
  return text.replace(reg, '<span class="highlight">$1</span>');
};

/**
 * 点击外部区域关闭弹框
 */
const handleOutsideClick = (e) => {
  if (!store.visible) return;

  const selectBox = document.querySelector(".global-select-box");
  if (
    store.triggerEl &&
    !store.triggerEl.contains(e.target) &&
    selectBox &&
    !selectBox.contains(e.target)
  ) {
    store.hide();
    initGroupState(); // 关闭时重置分组状态和搜索框
  }
};

/**
 * 窗口大小变化时更新弹框位置
 */
const handleResize = () => {
  if (store.visible && store.triggerEl) {
    if (store.reCalculatePosition) {
      store.reCalculatePosition();
    } else {
      const rect = store.triggerEl.getBoundingClientRect();
      store.position = {
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
      };
    }
  }
};

// 挂载时绑定全局事件
onMounted(() => {
  document.addEventListener("contextmenu", handleOutsideClick);
  document.addEventListener("click", handleOutsideClick);
  window.addEventListener("resize", handleResize);
});

// 卸载时解绑事件，避免内存泄漏
onUnmounted(() => {
  // 修复：解绑contextmenu事件时用removeEventListener
  document.removeEventListener("contextmenu", handleOutsideClick);
  document.removeEventListener("click", handleOutsideClick);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.global-select-box {
  position: absolute;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 99999;
  overflow: hidden;
  box-sizing: border-box;
  max-height: 300px;
  min-width: 200px;
  overflow-y: auto;
}

/* 分组容器 */
.option-group {
  border-bottom: 1px solid #f5f5f5;
  &:last-child {
    border-bottom: none;
  }
}

/* 分组标题 */
.label {
  background-color: #e5e5e5;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 单组时禁用点击样式 */
  &.disabled {
    cursor: default;
    opacity: 0.8;
  }
}

/* 展开/收缩图标 */
.expand-icon {
  font-size: 10px;
  transition: transform 0.2s;
}

/* 分组内容区域 */
.group-content {
  display: flex;
  flex-direction: column;
}

/* 搜索框样式 */
:deep(.responsive-input) {
  .el-input__wrapper {
    border-radius: 0;
    box-shadow: none;
    border: none;
    padding: 8px 12px;
    font-size: 12px;
  }
}

/* 选项容器 */
.select-option-box {
  /* max-height: 200px; */
  /* overflow-y: auto; */
}

/* 选项样式 */
.select-option {
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
  font-size: 12px;
  &:hover,
  &.option-hover {
    background-color: #f3f4f6;
  }
}

/* 无结果提示 */
.no-result {
  padding: 8px;
  text-align: center;
  font-size: 12px;
  color: #999;
}

/* 搜索高亮样式 */
:deep(.highlight) {
  color: var(--el-color-primary);
  font-weight: 500;
}
:deep(.responsive-input) {
  border-bottom: 1px solid #e5e7eb;
  .el-input__wrapper {
    border-radius: 0;
    box-shadow: none;
  }
}
</style>
