<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-02-02 14:54:00
 * @LastEditors: xwj
 * @Date: 2026-02-03 15:00:00
 * @description: 表达式编辑器-双击节点插入值，光标在大括号外自动加{}，内则不加
-->
<script setup>
import { ref, nextTick } from "vue";
import { left_list } from "./data.js";
import functionData from "@/static/function.json";
import { useSelectFieldStore } from "@/stores/selectField";
const store = useSelectFieldStore();

const functionList = ref(functionData);
const dialogVisible = ref(false);
const leftList = ref(left_list);
const expression = ref("");
// 持久化光标位置 - 记录最后一次的起始/结束位置
const lastCursorPos = ref({
  start: 0,
  end: 0,
});
const defaultProps = {
  children: "list",
  label: "name",
};

const handleOpen = (value = "", options) => {
  var index = leftList.value.findIndex((item) => item.name === "数据集");
  if (index !== -1) {
    leftList.value[index].list = options;
  }
  expression.value = value;

  dialogVisible.value = true;
  // 打开弹窗后，重置光标位置为文本末尾
  nextTick(() => {
    lastCursorPos.value = {
      start: expression.value.length,
      end: expression.value.length,
    };
  });
};

const handleClose = () => {
  dialogVisible.value = false;
};

const selectNode = ref({});
const expressionTextarea = ref(null);
const handleNodeClick = (node) => {
  selectNode.value = node;
};

// 更新光标位置的方法 - 统一维护lastCursorPos
const updateCursorPos = () => {
  if (!expressionTextarea.value) return;
  const textarea = expressionTextarea.value;
  lastCursorPos.value = {
    start: textarea.selectionStart,
    end: textarea.selectionEnd,
  };
};

// 核心新增：判断光标位置是否在任意一对合法的大括号 {} 内（支持嵌套）
const isCursorInBrackets = (str, cursorPos) => {
  // 去除首尾空白（不影响光标位置判断，仅统一字符串处理）
  const trimedStr = str.trim();
  if (trimedStr.length === 0) return false; // 空字符串，光标不在括号内

  let bracketCount = 0; // 大括号计数器：{+1，}-1
  for (let i = 0; i < cursorPos; i++) {
    // 超出字符串长度则终止循环
    if (i >= str.length) break;
    const char = str[i];
    if (char === "{") bracketCount++;
    if (char === "}") bracketCount--;
    // 计数器最小为0（避免右括号多于左括号导致负数）
    if (bracketCount < 0) bracketCount = 0;
  }
  // 计数器>0 → 光标前有未闭合的{ → 光标在大括号内
  return bracketCount > 0;
};

// 双击节点插入值（光标外自动加{}，内则不加）+ 精准光标定位 + 光标末尾加前置空格
const handleNodeDblclick = (node) => {
  console.log(node);
  if (!node?.value || !expressionTextarea.value) return;

  const textarea = expressionTextarea.value;
  let insertText = node.value;

  // 数据集字段原有处理逻辑
  if (node.type === "dataSet") {
    insertText = `First(${node.value}, "${node.dataSetName}")`;
  }

  const originBracketIndex = insertText.indexOf("(");
  const { start: lastStart, end: lastEnd } = lastCursorPos.value;
  const cursorInBrackets = isCursorInBrackets(expression.value, lastStart);
  // 保留光标末尾判断（非0位置）
  const isCursorAtLast = lastStart === expression.value.length && lastStart > 0;

  // ########## 核心调整：大括号包裹时，根据光标位置加前置空格 ##########
  if (!cursorInBrackets) {
    // 光标在末尾+非0位置 → 大括号前加空格；否则直接包裹{}
    insertText = isCursorAtLast ? ` {${insertText}}` : `{${insertText}}`;
  }

  // 原有内容插入/替换逻辑（无改动）
  expression.value =
    expression.value.substring(0, lastStart) +
    insertText +
    expression.value.substring(lastEnd);

  // ########## 补充：光标定位偏移适配（因空格仅占1位，需调整小括号定位逻辑） ##########
  let newCursorPos;
  if (node.type === "dataSet") {
    newCursorPos = lastStart + insertText.length;
  } else if (originBracketIndex > -1) {
    if (cursorInBrackets) {
      newCursorPos = lastStart + originBracketIndex + 1;
    } else {
      // 光标在大括号外：偏移量 = 空格(1) + 左大括号(1) + 小括号索引 + 1
      newCursorPos = lastStart + (isCursorAtLast ? 1 : 0) + 1 + originBracketIndex + 1;
    }
  } else {
    newCursorPos = lastStart + insertText.length;
  }

  // 原有光标聚焦和位置更新逻辑（无改动）
  nextTick(() => {
    textarea.focus();
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    updateCursorPos();
  });
};

const handleConfirm = () => {
  store.handleSelect({
    value: expression.value,
  });
  dialogVisible.value = false;
};

defineExpose({
  handleOpen,
});
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="表达式编辑器"
    width="800"
    :before-close="handleClose"
    append-to-body
    @click.stop
  >
    <div class="flex content">
      <div class="left">
        <tree-node
          v-for="(node, index) in leftList"
          :key="index"
          :node="node"
          :level="1"
          @node-click="handleNodeClick"
          @node-dblclick="handleNodeDblclick"
        />
      </div>
      <div class="right flex-sub flex flex-direction">
        <textarea
          v-model="expression"
          ref="expressionTextarea"
          class="expression-textarea"
          @input="updateCursorPos"
          @click="updateCursorPos"
        />
        <div class="right_bottom flex flex-sub">
          <div class="right_bottom_left flex-sub">
            <tree-node
              v-for="(node, index) in functionList"
              :key="index"
              :node="node"
              :level="1"
              @node-click="handleNodeClick"
              @node-dblclick="handleNodeDblclick"
            />
          </div>
          <div class="right_bottom_right flex-sub">
            <div class="title" v-if="selectNode.syntax">语法:</div>
            <div class="cont" v-if="selectNode.syntax">{{ selectNode.syntax }}</div>
            <div class="title" v-if="selectNode.description">说明:</div>
            <div class="cont" v-if="selectNode.description">
              {{ selectNode.description }}
            </div>
            <div class="title" v-if="selectNode.example">示例:</div>
            <div class="cont" v-if="selectNode.example">{{ selectNode.example }}</div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click.stop="handleConfirm"> 确定 </el-button>
        <el-button @click.stop="dialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.content {
  height: 500px;
  .left {
    width: 30%;
    border-right: 1px solid #e4e7ed;
    overflow-y: auto;
    padding-right: 10px;
    :deep(.el-tree-node__label) {
      font-size: 12px;
    }
  }
  .right {
    padding-left: 10px;
    .expression-textarea {
      height: 200px;
      width: 100%;
      //   outline: 1px solid #e4e7ed;
      border: none;
      resize: none;
      padding: 8px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.1);
      box-shadow: none;
      border-radius: 4px;
    }
    .expression-textarea:focus {
      outline: none;
      color: var(--el-color-primary);
    }
    .right_bottom {
      user-select: none;
      max-height: calc(100% - 210px);
      margin-top: 10px;
      .right_bottom_left {
        padding-right: 10px;
        overflow-y: auto;
        border-right: 1px solid #e4e7ed;
        min-width: calc(100% - 50%);
      }
      .right_bottom_right {
        padding-left: 15px;

        .title {
          font-weight: bold;
          height: 30px;
          line-height: 30px;
          font-size: 13px;
          color: #000;
        }

        .cont {
          color: #666;
          font-size: 12px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
.dialog-footer {
  text-align: right;
}
</style>
