<!--
 * @Version: 1.2
 * @Autor: xwj
 * @Date: 2026-02-02 14:54:00
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-03 17:30:52
 * @description: 表达式编辑器-双击插入值+换行对齐+修复滚动条跳动
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
// 新增：保存textarea滚动位置，避免聚焦时滚动
const textareaScrollTop = ref(0);
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
    // 优化：聚焦但不滚动
    if (expressionTextarea.value) {
      // 先定位光标，再恢复滚动位置
      expressionTextarea.value.focus();
      expressionTextarea.value.setSelectionRange(
        lastCursorPos.value.start,
        lastCursorPos.value.end
      );
      // 初始滚动位置为0，避免空内容时滚动异常
      expressionTextarea.value.scrollTop = 0;
    }
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
  // 保存当前滚动位置
  textareaScrollTop.value = textarea.scrollTop;
  lastCursorPos.value = {
    start: textarea.selectionStart,
    end: textarea.selectionEnd,
  };
};

// 核心：处理textarea换行自动缩进对齐
const handleTextareaKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    
    const textarea = e.target;
    // 保存按下回车前的滚动位置
    const currentScrollTop = textarea.scrollTop;
    const cursorPos = textarea.selectionStart;
    const fullText = textarea.value;
    
    // 1. 截取光标前的内容，找到上一行
    const textBeforeCursor = fullText.substring(0, cursorPos);
    const lastLineBreakIndex = textBeforeCursor.lastIndexOf('\n');
    const currentLine = lastLineBreakIndex === -1 
      ? textBeforeCursor 
      : textBeforeCursor.substring(lastLineBreakIndex + 1);

    // 2. 计算当前行的缩进空格数
    const indentMatch = currentLine.match(/^(\s+)/);
    let indentSpaces = indentMatch ? indentMatch[1] : '';

    // 3. 智能缩进优化
    const prevLineContent = lastLineBreakIndex === -1 
      ? '' 
      : textBeforeCursor.substring(lastLineBreakIndex + 1);
    if (prevLineContent.trim().endsWith('{') || prevLineContent.trim().endsWith('(') || prevLineContent.trim().endsWith('[')) {
      indentSpaces += '    ';
    }

    // 4. 拼接新内容
    const newText = 
      fullText.substring(0, cursorPos) + 
      '\n' + indentSpaces + 
      fullText.substring(cursorPos);

    // 5. 更新内容并调整光标位置
    expression.value = newText;
    const newCursorPos = cursorPos + 1 + indentSpaces.length;
    lastCursorPos.value = {
      start: newCursorPos,
      end: newCursorPos
    };
    
    // 关键：先定位光标，再恢复滚动位置（避免滚动条跳动）
    nextTick(() => {
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.scrollTop = currentScrollTop; // 恢复滚动位置
    });
  }
};

// 修复大括号判断bug
const isCursorInBrackets = (str, cursorPos) => {
  const trimedStr = str.trim();
  if (trimedStr.length === 0) return false;

  let bracketCount = 0;
  for (let i = 0; i < cursorPos; i++) {
    if (i >= str.length) break;
    const char = str[i];
    if (char === "{") bracketCount++;
    if (char === "}") bracketCount--;
    if (bracketCount < 0) bracketCount = 0;
  }
  return bracketCount > 0;
};

// 双击节点插入值
const handleNodeDblclick = (node) => {
  console.log(node);
  if (!node?.value || !expressionTextarea.value) return;

  const textarea = expressionTextarea.value;
  // 保存插入前的滚动位置 ✨ 核心修复点
  const currentScrollTop = textarea.scrollTop;
  
  let insertText = node.value;
  if (node.type === "dataSet") {
    insertText = `First(${node.value}, "${node.dataSetName}")`;
  }

  const originBracketIndex = insertText.indexOf("(");
  const { start: lastStart, end: lastEnd } = lastCursorPos.value;
  const cursorInBrackets = isCursorInBrackets(expression.value, lastStart);
  const isCursorAtLast = lastStart === expression.value.length && lastStart > 0;

  if (!cursorInBrackets) {
    insertText = isCursorAtLast ? ` {${insertText}}` : `{${insertText}}`;
  }

  // 插入内容
  expression.value =
    expression.value.substring(0, lastStart) +
    insertText +
    expression.value.substring(lastEnd);

  // 计算新光标位置
  let newCursorPos;
  if (node.type === "dataSet") {
    newCursorPos = lastStart + insertText.length;
  } else if (originBracketIndex > -1) {
    if (cursorInBrackets) {
      newCursorPos = lastStart + originBracketIndex + 1;
    } else {
      newCursorPos = lastStart + (isCursorAtLast ? 1 : 0) + 1 + originBracketIndex + 1;
    }
  } else {
    newCursorPos = lastStart + insertText.length;
  }

  // 原有光标聚焦和位置更新逻辑（修复滚动问题）✨
  nextTick(() => {
    // 1. 先定位光标，不触发滚动
    textarea.setSelectionRange(newCursorPos, newCursorPos);
    // 2. 恢复之前的滚动位置（关键：避免滚动到最下方）
    textarea.scrollTop = currentScrollTop;
    // 3. 最后聚焦（此时光标已定位，聚焦不会触发滚动）
    textarea.focus();
    // 4. 同步更新光标位置记录
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
    :close-on-click-modal="false"
    draggable
    align-center
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
          @keydown="handleTextareaKeydown"
          @scroll="textareaScrollTop = $event.target.scrollTop"
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
  height: 600px;
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
      height: 300px;
      width: 100%;
      border: none;
      resize: none;
      padding: 8px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.1);
      box-shadow: none;
      border-radius: 4px;
      font-family: "Consolas", "Monaco", monospace;
      font-size: 14px;
      line-height: 1.5;
      // 新增：优化滚动行为，避免平滑滚动导致的延迟
      scroll-behavior: auto;
      overflow-y: auto;
    }
    .expression-textarea:focus {
      outline: none;
    }
    .right_bottom {
      user-select: none;
      max-height: calc(100% - 310px);
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
:deep(.jsoneditor) {
  border: 0;
  .ace-jsoneditor.ace_editor {
    background-color: transparent;
  }
}
:deep(.jsoneditor-menu) {
  display: none;
}
:deep(.jsoneditor-outer.has-main-menu-bar) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top:0 !important;
  margin-bottom:0 !important;
}
:deep(.jsoneditor-statusbar) {
  display: none;
}
:deep(.ace_gutter) {
  display: none;
}
:deep(.ace_scroller) {
  left: 10px !important;
  background-color: transparent !important;
}
:deep(.full-screen) {
  display: none;
}
</style>