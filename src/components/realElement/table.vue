<template>
  <div
    style="width: 100%; height: 100%; position: relative"
    :class="{
      table_active:
        settingStore.selectedParentPath == props.path &&
        settingStore.selected.type == 'table',
    }"
    ref="tableWrapper"
  >
    <div ref="hotTableContainer" style="width: 100%; height: 100%">
      <hot-table :settings="state.settings" ref="hotTableComponent"></hot-table>
    </div>
    <div class="handle no_page" @click.stop="handleSelectTable">
      <el-icon><Rank /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick, onMounted, inject, onUnmounted } from "vue";
import { HotTable } from "@handsontable/vue3";
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from "handsontable/registry";
import "handsontable/languages/zh-CN";
import { Rank } from "@element-plus/icons-vue";
import { registerCellType, NumericCellType } from "handsontable/cellTypes";
import { registerPlugin, UndoRedo } from "handsontable/plugins";
import convertJsonToHandsontableConfig from "@/utils/table";
import { useSettingStore } from "@/stores/index";
import parsePathString from "@/utils/parsePathString";
import { useUndoManager } from "@/utils/undoManager";
import deepClone from "@/utils/deepClone";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

const {
  selectComp,
  handleCompValueChange,
  selectTableCell,
  selectedTableCells,
  updateComp,
  deleteComp,
} = useLowcodeEditor();
// 引入抽离的工具方法和常量

import {
  CONST,
  ROW_MAP_CACHE,
  debounce,
  createNewRow,
  createNewCell,
  getSectionInfo,
  setTargetCellValue,
  handleColOperation,
  getCellPath,
  getSelectMetaData,
  mergeStyles,
  processItemData,
  updateTableCellMergeState,
} from "./table/tableOperations";

// ===================== 1. 初始化注册 =====================
registerAllModules();
registerCellType(NumericCellType);
registerPlugin(UndoRedo);

// ===================== 2. 组件基础配置 =====================
// 事件派发
const emit = defineEmits(["handleDeleteItem", "handleUndoDeleteItem", "setWidth"]);
// 注入依赖
const contextMenuState = inject("contextMenuState");
const { closeMenu } = contextMenuState;
const settingStore = useSettingStore();
const handleSelect = inject("handleSelect");

// 模板引用
const hotTableComponent = ref(null);
const tableWrapper = ref(null);
const hotTableContainer = ref(null);

const initTable = ref(false);

// 接收父组件传参
const props = defineProps({
  dataItem: {
    type: Object,
    default: () => ({}),
    validator: (val) => typeof val === "object" && val !== null,
  },
  path: {
    type: String,
    default: "",
    validator: (val) => typeof val === "string",
  },
  index: {
    type: Number,
    default: 0,
    validator: (val) => typeof val === "number" && val >= 0,
  },
  dataSources: { type: Array, default: () => [] },
  dataSets: { type: Array, default: () => [] },
  pageType: { type: String, default: "" },
});

// 响应式数据
const state = reactive({
  settings: {},
  sectionRowCounts: {},
  cellStyles: [],
});

// 数据克隆
const cloneConfig = ref(deepClone(props.dataItem));
const baseConfig = ref(null);
let originalDeselectCell = null; // 保存原始方法

//
const handleSelectTable = () => {
  console.log(props);

  const selectedData = {
    ...cloneConfig.value,
    // style: mergeStyles(cellMetas),
    type: "table",
    // sameData: processItemData(selectMetaData),
  };

  selectComp(props.dataItem, props.pageType, props.index);

  // console.log(selectedData);

  // settingStore.setSelectedParentPath(props.path);
  // settingStore.setSelected(selectedData);
  // settingStore.setIsPage(false);
};

// ===================== 3. 核心业务方法（组件特有） =====================
/**
 * 获取选中单元格元数据（防抖版）
 */
const getSelectedCellMetas = debounce(function (row, column, row2, column2) {
  const hot = hotTableComponent.value?.hotInstance;
  if (!hot) return;

  // 确定选中范围
  const startRow = Math.min(row, row2);
  const endRow = Math.max(row, row2);
  const startCol = Math.min(column, column2);
  const endCol = Math.max(column, column2);

  // 收集所有单元格元数据
  const cellMetas = [];
  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      const rowIdx = r === -1 ? 0 : r;
      const colIdx = c === -1 ? 0 : c;
      const meta = hot.getCellMeta(rowIdx, colIdx);
      meta.row = r;
      meta.col = c;
      cellMetas.push(meta);
    }
  }

  // 格式化数据并更新store
  const selectMetaData = getSelectMetaData(cellMetas, cloneConfig.value);
  console.log(selectMetaData);
  const selectedData = {
    ...processItemData(selectMetaData),
    style: mergeStyles(cellMetas),
    type: "tableCell",
    dataSetName: cloneConfig.value.dataSetName,
  };
  console.log(cloneConfig.value);

  selectTableCell(
    selectMetaData,
    selectedData,
    props.pageType,
    props.index,
    updateSelected
  );

  // selectComp(selectedData, props.pageType, props.index);

  // settingStore.setSelectedParentPath(props.path);
  // settingStore.setSelected(selectedData);
  // settingStore.setIsPage(false);
});

/**
 * 处理单元格值更新
 * @param {Array} values - 变更值数组
 * @param {String} source - 变更来源
 */
const updateValue = (values, source) => {
  if (source != "edit" || !Array.isArray(values) || values.length == 0) return;
  console.log(values);
  const hot = hotTableComponent.value?.hotInstance;
  if (!hot) return;
  const updateCellValue = (items, isUndo = false, isSetDataAtCell = true) => {
    items.forEach((item) => {
      const [row, col, oldVal, newVal] = item;
      const targetValue = isUndo ? oldVal : newVal;
      const sectionInfo = getSectionInfo(row, cloneConfig.value);
      setTargetCellValue(sectionInfo, col, targetValue, cloneConfig.value);
      hot.selectCell(row, col);
      if (isSetDataAtCell) {
        hot.setDataAtCell(row, col, targetValue);
      }
    });
  };

  updateCellValue(values, false, false);


  updateComp(props.pageType, props.index, cloneConfig.value);

  // 注册撤销重做
  useUndoManager().add({
    undo: () => updateCellValue(values, true),
    redo: () => updateCellValue(values, false),
  });
};

/**
 * 更新选中单元格样式/值
 * @param {Object} newData - 新数据
 */
const updateSelected = (newData) => {
  if (!newData) return;
  // const selectData = settingStore.selected;
  const hot = hotTableComponent.value?.hotInstance;
  if (!hot) return;

  selectedTableCells.value.forEach((item) => {
    const current = parsePathString(item.path, cloneConfig.value);
    console.log(current, cloneConfig.value);
    if (!current) return;

    const keys = Object.keys(newData);
    keys.forEach((key) => {
      if (key == "style") {
        const cellMeta = hot.getCellMeta(item.row, item.col);
        var newStyle = { ...newData.style };
        current.item.style = newStyle;
        hot.setCellMetaObject(item.row, item.col, {
          style: newStyle,
        });
        //更新cloneConfig.value
        updateObjectByPath(item.path, current);
        hot.render();
      } else {
        current.item[key] = newData[key];
        updateObjectByPath(item.path, current);
        hot.setDataAtCell(item.row, item.col, newData[key]);
      }
    });
  });

  console.log(cloneConfig.value);

  updateComp(props.pageType, props.index, cloneConfig.value);
};

/**
 * 根据字符串路径更新对象的指定属性值
 * @param {Object} obj - 目标对象（会直接修改原对象）
 * @param {string} path - 字符串格式的属性路径，支持 . 和 [] 语法
 * @param {*} value - 要更新的新值
 * @throws {Error} 路径不存在/层级非对象/数组时抛出错误
 */
const updateObjectByPath = (path, value) => {
  // 1. 解析路径：拆分出属性名/数组索引的数组（索引转为数字）
  const pathSegments = path
    // 正则匹配：.xxx 或 [xxx] 格式，捕获xxx部分，拆分路径
    .split(/\.|(?=\[)/)
    .map((segment) => {
      // 处理数组索引片段（如 [0]）：去除中括号，转为数字
      if (segment.startsWith("[")) {
        return Number(segment.slice(1, -1));
      }
      // 普通属性名片段直接返回
      return segment;
    });

  // 2. 逐层遍历：到达目标属性的上一级节点（排除最后一个路径片段）
  let current = cloneConfig.value;
  const lastIndex = pathSegments.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    const key = pathSegments[i];
    // 检查当前层级是否存在，且是对象/数组（否则无法继续遍历）
    if (!Object.prototype.hasOwnProperty.call(current, key)) {
      throw new Error(`路径不存在：${pathSegments.slice(0, i + 1).join(".")}`);
    }
    if (typeof current[key] !== "object" || current[key] === null) {
      throw new Error(
        `路径层级${pathSegments.slice(0, i + 1).join(".")}不是对象/数组，无法继续遍历`
      );
    }
    current = current[key];
  }

  // 4. 更新值：上一级节点 + 最后一个路径片段，直接赋值
  const targetKey = pathSegments[lastIndex];
  current[targetKey] = value;
};

// ===================== 4. 行列/合并/分组操作（简化封装） =====================
// 行操作
const insertRow = (params) => {
  if (!params || typeof params.row !== "number") return;
  const { row, position = CONST.POSITION.ABOVE } = params;
  const sectionInfo = getSectionInfo(row, cloneConfig.value);
  if (!sectionInfo.key) return;

  const newRow = createNewRow();
  const insertIndex =
    position === CONST.POSITION.ABOVE ? sectionInfo.index : sectionInfo.index + 1;

  switch (sectionInfo.key) {
    case CONST.SECTION_TYPE.HEADER:
      cloneConfig.value.header.tableRows.splice(insertIndex, 0, newRow);
      break;
    case CONST.SECTION_TYPE.GROUP_HEADERS:
      cloneConfig.value.tableGroups[sectionInfo.index].header.tableRows.splice(
        sectionInfo.childIndex + (position === CONST.POSITION.BELOW ? 1 : 0),
        0,
        newRow
      );
      break;
    case CONST.SECTION_TYPE.DETAILS:
      cloneConfig.value.details.tableRows.splice(insertIndex, 0, newRow);
      break;
    case CONST.SECTION_TYPE.GROUP_FOOTERS:
      cloneConfig.value.tableGroups[sectionInfo.index].footer.tableRows.splice(
        sectionInfo.childIndex + (position === CONST.POSITION.BELOW ? 1 : 0),
        0,
        newRow
      );
      break;
    case CONST.SECTION_TYPE.FOOTER:
      cloneConfig.value.footer.tableRows.splice(insertIndex, 0, newRow);
      break;
  }

  updateComp(props.pageType, props.index, cloneConfig.value);
};

const removeRow = (params) => {
  if (!params || typeof params.row !== "number") return;
  const { row } = params;
  const sectionInfo = getSectionInfo(row, cloneConfig.value);
  if (!sectionInfo.key) return;

  switch (sectionInfo.key) {
    case CONST.SECTION_TYPE.HEADER:
      cloneConfig.value.header.tableRows.splice(sectionInfo.index, 1);
      break;
    case CONST.SECTION_TYPE.GROUP_HEADERS:
      cloneConfig.value.tableGroups[sectionInfo.index].header.tableRows.splice(
        sectionInfo.childIndex,
        1
      );
      break;
    case CONST.SECTION_TYPE.DETAILS:
      cloneConfig.value.details.tableRows.splice(sectionInfo.index, 1);
      break;
    case CONST.SECTION_TYPE.GROUP_FOOTERS:
      cloneConfig.value.tableGroups[sectionInfo.index].footer.tableRows.splice(
        sectionInfo.childIndex,
        1
      );
      break;
    case CONST.SECTION_TYPE.FOOTER:
      cloneConfig.value.footer.tableRows.splice(sectionInfo.index, 1);
      break;
  }
  updateComp(props.pageType, props.index, cloneConfig.value);
};

const unRemoveRow = (params) => {
  if (!params || !params.sectionInfo || !params.rowData) return;
  const { sectionInfo, rowData } = params;
  if (!sectionInfo.key) return;

  switch (sectionInfo.key) {
    case CONST.SECTION_TYPE.HEADER:
      cloneConfig.value.header.tableRows.splice(sectionInfo.index, 0, rowData);
      break;
    case CONST.SECTION_TYPE.GROUP_HEADERS:
      cloneConfig.value.tableGroups[sectionInfo.index].header.tableRows.splice(
        sectionInfo.childIndex,
        0,
        rowData
      );
      break;
    case CONST.SECTION_TYPE.DETAILS:
      cloneConfig.value.details.tableRows.splice(sectionInfo.index, 0, rowData);
      break;
    case CONST.SECTION_TYPE.GROUP_FOOTERS:
      cloneConfig.value.tableGroups[sectionInfo.index].footer.tableRows.splice(
        sectionInfo.childIndex,
        0,
        rowData
      );
      break;
    case CONST.SECTION_TYPE.FOOTER:
      cloneConfig.value.footer.tableRows.splice(sectionInfo.index, 0, rowData);
      break;
  }
  updateComp(props.pageType, props.index, cloneConfig.value);
};

// 列操作
const insertCol = (params) => {
  if (!params || typeof params.col !== "number") return;
  const { col, position = CONST.POSITION.START } = params;
  handleColOperation(
    col,
    CONST.OP_TYPE.INSERT,
    position === CONST.POSITION.END ? 1 : 0,
    [],
    cloneConfig.value
  );
  updateComp(props.pageType, props.index, cloneConfig.value);

  const hot = hotTableComponent.value?.hotInstance;
  emit("setWidth", hot.getTableWidth() - 20);
};

const removeCol = (params) => {
  if (!params || typeof params.col !== "number") return;
  const { col } = params;
  // 校验最小列数
  const firstRowCells = cloneConfig.value.header?.tableRows?.[0]?.tableCells;
  if (firstRowCells && firstRowCells.length <= CONST.MIN_COLUMN_COUNT) {
    console.warn("至少保留1列，无法删除");
    return;
  }
  handleColOperation(col, CONST.OP_TYPE.DELETE, 0, [], cloneConfig.value);

  updateComp(props.pageType, props.index, cloneConfig.value);
};

const unRemoveCol = (params) => {
  if (!params || typeof params.col !== "number" || !params.colData) return;
  const { col, colData } = params;
  handleColOperation(col, CONST.OP_TYPE.INSERT, 0, colData, cloneConfig.value);
  updateComp(props.pageType, props.index, cloneConfig.value);
};

// 合并单元格
const mergeCell = (params) => {
  const { mergeList } = params || {};
  if (!Array.isArray(mergeList) || mergeList.length < 4) {
    console.warn("mergeList 参数格式错误");
    return deepClone(cloneConfig.value);
  }

  const oldCloneConfig = deepClone(cloneConfig.value);
  const sectionInfo = getSectionInfo(mergeList[0], cloneConfig.value);
  const endSectionInfo = getSectionInfo(mergeList[2], cloneConfig.value);

  let targetTableRows = [];
  let processedMergeList = [...mergeList];

  switch (sectionInfo.key) {
    case CONST.SECTION_TYPE.GROUP_HEADERS:
      processedMergeList = [
        sectionInfo.childIndex,
        mergeList[1],
        endSectionInfo.childIndex,
        mergeList[3],
      ];
      targetTableRows = cloneConfig.value.tableGroups[sectionInfo.index].header.tableRows;
      break;
    case CONST.SECTION_TYPE.GROUP_FOOTERS:
      processedMergeList = [
        sectionInfo.childIndex,
        mergeList[1],
        mergeList[2] - mergeList[0],
        mergeList[3],
      ];
      targetTableRows = cloneConfig.value.tableGroups[sectionInfo.index].footer.tableRows;
      break;
    default:
      targetTableRows = cloneConfig.value[sectionInfo.key]?.tableRows || [];
      break;
  }

  const newTableRows = updateTableCellMergeState(targetTableRows, processedMergeList);
  // 更新配置
  if (sectionInfo.key === CONST.SECTION_TYPE.GROUP_HEADERS) {
    cloneConfig.value.tableGroups[sectionInfo.index].header.tableRows = newTableRows;
  } else if (sectionInfo.key === CONST.SECTION_TYPE.GROUP_FOOTERS) {
    cloneConfig.value.tableGroups[sectionInfo.index].footer.tableRows = newTableRows;
  } else if (sectionInfo.key) {
    cloneConfig.value[sectionInfo.key].tableRows = newTableRows;
  }
  updateComp(props.pageType, props.index, cloneConfig.value);

  return oldCloneConfig;
};

const unMergeCell = (params) => {
  const { mergeList } = params || {};
  if (!Array.isArray(mergeList) || mergeList.length < 4) {
    console.warn("mergeList 参数格式错误");
    return deepClone(cloneConfig.value);
  }

  const oldCloneConfig = deepClone(cloneConfig.value);
  const sectionInfo = getSectionInfo(mergeList[0], cloneConfig.value);
  const endSectionInfo = getSectionInfo(mergeList[2], cloneConfig.value);

  let targetTableRows = [];
  let processedMergeList = [...mergeList];

  switch (sectionInfo.key) {
    case CONST.SECTION_TYPE.GROUP_HEADERS:
      processedMergeList = [
        sectionInfo.childIndex,
        mergeList[1],
        endSectionInfo.childIndex,
        mergeList[3],
      ];
      targetTableRows = cloneConfig.value.tableGroups[sectionInfo.index].header.tableRows;
      break;
    case CONST.SECTION_TYPE.GROUP_FOOTERS:
      processedMergeList = [
        sectionInfo.childIndex,
        mergeList[1],
        mergeList[2] - mergeList[0],
        mergeList[3],
      ];
      targetTableRows = cloneConfig.value.tableGroups[sectionInfo.index].footer.tableRows;
      break;
    default:
      targetTableRows = cloneConfig.value[sectionInfo.key]?.tableRows || [];
      break;
  }

  const newTableRows = updateTableCellMergeState(
    targetTableRows,
    processedMergeList,
    true
  );
  // 更新配置
  if (sectionInfo.key === CONST.SECTION_TYPE.GROUP_HEADERS) {
    cloneConfig.value.tableGroups[sectionInfo.index].header.tableRows = newTableRows;
  } else if (sectionInfo.key === CONST.SECTION_TYPE.GROUP_FOOTERS) {
    cloneConfig.value.tableGroups[sectionInfo.index].footer.tableRows = newTableRows;
  } else if (sectionInfo.key) {
    cloneConfig.value[sectionInfo.key].tableRows = newTableRows;
  }

  updateComp(props.pageType, props.index, cloneConfig.value);
  return oldCloneConfig;
};

// 分组操作
const insertRowGroup = () => {
  if (!cloneConfig.value.tableGroups) cloneConfig.value.tableGroups = [];
  cloneConfig.value.tableGroups.push({
    type: "tablegroup",
    header: { type: "tableheader", tableRows: [createNewRow()] },
    footer: { type: "tablefooter", tableRows: [createNewRow()] },
  });
  updateComp(props.pageType, props.index, cloneConfig.value);
};

const removeRowGroup = (params) => {
  if (!params || typeof params.groupIndex !== "number") return null;
  const { groupIndex } = params;
  const sectionInfo = getSectionInfo(groupIndex, cloneConfig.value);
  if (!sectionInfo.key) return null;

  const removeData = cloneConfig.value.tableGroups[sectionInfo.index];
  cloneConfig.value.tableGroups.splice(sectionInfo.index, 1);
  updateComp(props.pageType, props.index, cloneConfig.value);
  return { removeData, index: sectionInfo.index };
};

const undoBatchGroupChanges = (params) => {
  if (!params || !params.removeGroupData) return;
  const { removeGroupData } = params;
  cloneConfig.value.tableGroups.splice(
    removeGroupData.index,
    0,
    deepClone(removeGroupData.removeData)
  );

  updateComp(props.pageType, props.index, cloneConfig.value);
};

// 批量行操作
const batchRowOperation = (type, action, params = {}) => {
  if (
    ![
      CONST.SECTION_TYPE.HEADER,
      CONST.SECTION_TYPE.DETAILS,
      CONST.SECTION_TYPE.FOOTER,
    ].includes(type)
  )
    return;
  if (![CONST.OP_TYPE.INSERT, CONST.OP_TYPE.DELETE].includes(action)) return;

  const target = cloneConfig.value[type];
  if (!target) return;

  if (action === CONST.OP_TYPE.INSERT) {
    const newRow = createNewRow();
    const insertIndex = type === CONST.SECTION_TYPE.FOOTER ? 0 : params.row || 0;
    target.tableRows.splice(insertIndex, 0, newRow);
  } else if (action === CONST.OP_TYPE.DELETE) {
    target.tableRows = [];
  }
  updateComp(props.pageType, props.index, cloneConfig.value);
};

const undoBatchRowChanges = (type, params) => {
  if (!params || !params.rowData) return;
  if (
    ![
      CONST.SECTION_TYPE.HEADER,
      CONST.SECTION_TYPE.DETAILS,
      CONST.SECTION_TYPE.FOOTER,
    ].includes(type)
  )
    return;
  cloneConfig.value[type].tableRows = params.rowData;
  updateComp(props.pageType, props.index, cloneConfig.value);
};

// ===================== 5. 初始化/生命周期 =====================
/**
 * 初始化单元格样式
 * @param {Array} cellStyles - 样式数组
 */
const initCellStyle = (cellStyles) => {
  const hot = hotTableComponent.value?.hotInstance;
  if (!hot || !Array.isArray(cellStyles)) return;

  cellStyles.forEach((item) => {
    // hot.setCellMetaObject(item.row, item.col, { style: item.style });
  });
  hot.render();
};

/**
 * 处理行删除后的样式/行高校准
 * @param {Number} index - 行索引
 * @param {Number} amount - 删除数量
 */
const handleRemoveRow = (index, amount) => {
  const hot = hotTableComponent.value?.hotInstance;
  if (!hot) return;

  const rowHeights = hot.getSettings().rowHeights;
  if (Array.isArray(rowHeights)) {
    rowHeights.splice(index, amount);
    hot.render();
  }
};

const beforeSetCellMeta = (row, col, key, value) => {
  if (initTable.value) {
    const hot = hotTableComponent.value?.hotInstance;
    console.log(hot.getCellMeta(row, col));
    console.log(row, col, key, value);
  }
};

const getProps = () => {
  return props;
};

/**
 * 初始化表格配置
 */
const initTableConfig = () => {
  // 转换配置
  baseConfig.value = convertJsonToHandsontableConfig(
    props.dataItem,
    myExternalMethods,
    () => cloneConfig.value,
    getSectionInfo,
    getProps,
    props.index
  );

  state.sectionRowCounts = baseConfig.value.sectionRowCounts || {};
  state.cellStyles = baseConfig.value.cellStyles || [];

  // 构建表格配置
  state.settings = {
    ...baseConfig.value,
    afterRemoveRow: handleRemoveRow,
    beforeContextMenuShow: closeMenu,
    afterChange: updateValue,
    beforeSetCellMeta: beforeSetCellMeta,
    afterSelection: getSelectedCellMetas,
    afterColumnResize(size, col) {
      const hot = this;
      emit("setWidth", hot.getTableWidth() - 50);
    },
    afterInit() {
      initTable.value = true;
      const hot = this;
      setTimeout(() => {
        emit("setWidth", 800);
      }, 1000);

      originalDeselectCell = hot.deselectCell;

      // 重写取消选中逻辑
      hot.deselectCell = function () {
        const event = window.event || arguments.callee.caller.arguments[0];
        const target = event?.target;
        if (!target) return;

        const isInKeepArea = target.closest(`.${CONST.KEEP_SELECTION_CLASS}`);
        if (!isInKeepArea) {
          originalDeselectCell.apply(hot, arguments);
        }
      };

      // 兜底钩子
      hot.addHook("beforeDeselectCell", function () {
        const event = window.event || arguments.callee.caller.arguments[0];
        const target = event?.target;
        if (!target) return true;
        return !target.closest(`.${CONST.KEEP_SELECTION_CLASS}`);
      });
    },
  };

  nextTick(() => {
    initCellStyle(state.cellStyles);
  });
};

// ===================== 6. 暴露给外部的方法 =====================
const myExternalMethods = {
  insertRowAbove: (params) => insertRow({ ...params, position: CONST.POSITION.ABOVE }),
  insertRowBelow: (params) => insertRow({ ...params, position: CONST.POSITION.BELOW }),
  removeRow,
  unRemoveRow,
  insertColStart: (params) => insertCol({ ...params, position: CONST.POSITION.START }),
  insertColEnd: (params) => insertCol({ ...params, position: CONST.POSITION.END }),
  removeCol,
  unRemoveCol,
  insertRowGroup,
  removeRowGroup,
  unRemoveRowGroup: undoBatchGroupChanges,
  mergeCell,
  mergeCellUndo: (params) => {
    if (params?.oldCloneConfig) cloneConfig.value = deepClone(params.oldCloneConfig);
  },
  unMergeCell,
  insertRowHeader: () =>
    batchRowOperation(CONST.SECTION_TYPE.HEADER, CONST.OP_TYPE.INSERT),
  insertRowDetail: (params) =>
    batchRowOperation(CONST.SECTION_TYPE.DETAILS, CONST.OP_TYPE.INSERT, params),
  insertRowFooter: (params) =>
    batchRowOperation(CONST.SECTION_TYPE.FOOTER, CONST.OP_TYPE.INSERT, params),
  removeRowHeader: () =>
    batchRowOperation(CONST.SECTION_TYPE.HEADER, CONST.OP_TYPE.DELETE),
  unRemoveRowHeader: (params) => undoBatchRowChanges(CONST.SECTION_TYPE.HEADER, params),
  removeRowDetail: () =>
    batchRowOperation(CONST.SECTION_TYPE.DETAILS, CONST.OP_TYPE.DELETE),
  unRemoveRowDetail: (params) => undoBatchRowChanges(CONST.SECTION_TYPE.DETAILS, params),
  removeRowFooter: () =>
    batchRowOperation(CONST.SECTION_TYPE.FOOTER, CONST.OP_TYPE.DELETE),
  unRemoveRowFooter: (params) => undoBatchRowChanges(CONST.SECTION_TYPE.FOOTER, params),
  removeTable: () => deleteComp(props.pageType, props.index),
  updateSectionRowCounts: (counts) => (state.sectionRowCounts = counts || {}),
};

// ===================== 7. 监听/清理 =====================
// 监听更新标识
watch(
  () => settingStore.updateFlag,
  (newVal) => {
    if (props.path === settingStore.selectedParentPath) {
      if (settingStore.selected.type == "table") {
        cloneConfig.value[newVal.type] = newVal.value;
      } else {
        console.log(newVal);
        updateSelected(newVal);
      }
    }
  },
  { immediate: false, flush: "post" }
);

// 初始化表格
initTableConfig();

// 组件卸载时清理
onUnmounted(() => {
  const hot = hotTableComponent.value?.hotInstance;
  if (hot && originalDeselectCell) {
    hot.deselectCell = originalDeselectCell;
  }
  ROW_MAP_CACHE.clear();
  getSelectedCellMetas.cancel();
});

// 暴露组件实例
defineExpose({
  hotTableComponent,
});
</script>

<style lang="scss" scoped>
:deep(.htCore) {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
}

:deep(.ht-root-wrapper) {
  width: 100% !important;
  height: 100% !important;
  left: 0 !important;
  top: 0 !important;
  left: -51px !important;
  top: -23px !important;
}

:deep(.htCell) {
  box-sizing: border-box !important;
  padding: 2px 4px !important;
  background-color: transparent !important;
  color: inherit !important;
  border: inherit !important;
  font-size: inherit !important;
}

.handle {
  position: absolute;
  left: -32px;
  top: -18px;
  z-index: 999;
  cursor: pointer;
}

:deep(.handsontable td) {
  overflow: auto;
  white-space: nowrap;
  line-height: unset;
}

:deep(.handsontable table.htCore) {
  border-collapse: collapse;
}

:deep(.htCore .relative) {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .rowHeader {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
}

// 样式类
:deep(.custom-bg) {
  background-color: inherit !important;
}
:deep(.text-align-left) {
  text-align: left !important;
}
:deep(.text-align-center) {
  text-align: center !important;
}
:deep(.text-align-right) {
  text-align: right !important;
}
:deep(.chinese-font) {
  font-family: "SimSun", serif !important;
}

:deep(.ht_master .wtHolder) {
  width: 100% !important;
  height: 100% !important;
}
:deep(.ht_master:not(.innerBorderInlineStart):not(.emptyColumns) tbody tr th) {
  border-left: 0.1px solid #ccc !important;
}
:deep(.ht_master:not(.innerBorderInlineStart):not(.emptyColumns)
    thead
    tr
    th:first-child) {
  border-left: 0.1px solid #ccc !important;
}
:deep(.wtHider) {
  border-right: 1px solid #ccc !important;
}
.table_active {
  :deep(.ht-root-wrapper::after) {
    content: "";
    position: absolute;
    left: -2px;
    top: -2px;
    width: 100%;
    height: 100%;
    border: 2px solid var(--el-color-primary);
    z-index: 998;
    pointer-events: none;
  }
}
:deep(.handsontable td) {
  position: relative;
}
:deep(.handsontable td:hover .custom-cell-field-picker) {
  display: block;
}
</style>
