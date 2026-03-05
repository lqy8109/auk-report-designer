<!--
 * @Version: 1.1
 * @Autor: xwj
 * @Date: 2026-02-02 15:56:14
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-03 16:32:36
 * @description: 树形组件（带连接线）
-->
<template>
  <div class="tree-node"  :class="[{ 'tree-node1': !isLastLevel&&level-1 }]" :style="{ paddingLeft: (level - 1) * 10 + 'px' }">
    <!-- 节点内容：图标 + 名称 -->
    <div
      class="node-content"
      :class="[{ 'child-level': level - 1  }]"
      @click="handleParentClick"
      @click.stop="handleClick"
      @dblclick="handleDblclick"
    >
      <!-- 节点图标：末级/展开/折叠 -->
      <span class="node-icon1" v-if="isLastLevel"></span>
      <span class="node-icon expand-icon" v-else>
        <svg viewBox="0 0 24 24" v-if="node.expanded">
          <path class="gc-icon-color--text" d="M19,13H5V11H19V13Z"></path>
        </svg>
        <svg viewBox="0 0 24 24" v-else xmlns="http://www.w3.org/2000/svg">
          <path
            class="gc-icon-color--text"
            d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
          ></path>
        </svg>
      </span>
      <span class="node-name">{{ node.name }}</span>
    </div>

    <!-- 子节点容器：递归调用自身（新增tree-connector类名，用于连接线定位） -->
    <div class="child-nodes tree-connector" v-if="!isLastLevel && node.expanded">
      <tree-node
        v-for="(child, idx) in node.list"
        :key="idx"
        :node="child"
        :level="level + 1"
        @node-dblclick="$emit('node-dblclick', $event)"
        @node-click="$emit('node-click', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// 定义 props
const props = defineProps({
  node: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  level: {
    type: Number,
    required: true,
    default: 1,
  },
});

// 定义事件
const emit = defineEmits(["node-dblclick"]);

// 计算属性：判断是否为最后一层节点
const isLastLevel = computed(() => {
  return !props.node.list || props.node.list.length === 0;
});

// 父节点点击：切换展开/折叠状态
const handleParentClick = (e) => {
  if (isLastLevel.value) {
    emit("node-click", props.node);
  }
  if (isLastLevel.value) return;
  props.node.expanded = !props.node.expanded;
  e.stopPropagation(); // 阻止冒泡影响双击事件
};

const handleClick = () => {};

// 末级节点双击：派发事件到父组件
const handleDblclick = () => {
  if (isLastLevel.value) {
    emit("node-dblclick", props.node);
  }
};
</script>

<style scoped>
.tree-node {
  line-height: 28px;
  cursor: pointer;
  position: relative; /* 为连接线伪元素定位做基础 */
  padding-left: 10px;
}

.node-content {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-radius: 4px;
  transition: background-color 0.3s;
  font-size: 12px;
  position: relative;
  z-index: 1; /* 确保节点内容在连接线之上 */
 
}
.child-level{
    padding-left:10px;
}

.node-icon {
  display: flex;
  align-items: center;
  width: 16px;
  text-align: center;
  color: #666;
}

.expand-icon {
  color: #409eff;
}

.node-name {
  color: #333;
  transition: color 0.2s;
  font-size: 12px;
}

.node-content:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* 核心：树连接线样式 */
.tree-connector {
  position: relative;
  padding-left: 8px; /* 调整连接线与节点的间距 */
}

/* 纵向连接线（贯穿子节点区域） */
.child-level::before {
  content: "";
  position: absolute;
  top: 0;
  left: -10px;
  height: 100%;
  width: 1px;
  background-color: #dcdcdc; /* 连接线颜色，可根据主题调整 */
}

/* 横向连接线（连接父节点与子节点） */
.child-level::after {
  content: "";
  position: absolute;
  top: 14px; /* 垂直居中，与line-height(28px)匹配 */
  left: -9px;
  width: 8px; /* 横向线长度，与tree-connector的padding-left一致 */
  height: 1px;
  background-color: #dcdcdc; /* 与纵向线同色 */
}

.tree-node1::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 1px;
  background-color: #dcdcdc; 
  z-index: 0;
} 

/* 移除最后一个子节点的纵向连接线（避免多余线条） */
.tree-connector > .tree-node1:last-child::before {
  content: "";
  position: absolute;
  top:15px;
  left: 0;
  height: 14px; 
  width: 1px;
  background-color: #fff; 
  z-index: 2;
}



.tree-connector > .tree-node:last-child>.child-level::before {
  content: "";
  position: absolute;
  top: 0px;
  left: -10px;
  width: 1px; 
  height: 54%;
  background-color: #dcdcdc; 
  z-index: 2;
}
</style>
