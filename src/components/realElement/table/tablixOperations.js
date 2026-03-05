// src/utils/tableOperations.js
import deepClone from "@/utils/deepClone";
import parsePathString from "@/utils/parsePathString";

// ===================== 1. 常量定义（统一管理） =====================
export const CONST = {
  DEFAULT_ROW_HEIGHT: 28,
  DEFAULT_COL_WIDTH: 80,
  DEFAULT_CELL_STYLE: {
    "background-color": "#ffffff",
    color: "#000000",
    border: "1px solid #e0e0e0",
    "font-size": "14px",
    "font-family": "inherit",
  },
  KEEP_SELECTION_CLASS: "right_container",
  DEFAULT_CELL_HEIGHT: 24,
  MIN_COLUMN_COUNT: 1,
  DEBOUNCE_DELAY: 300,
  TABLE_CELL_TYPE: "textbox",
  // 区域类型枚举
  SECTION_TYPE: {
    HEADER: "header",
    GROUP_HEADERS: "groupHeaders",
    DETAILS: "details",
    GROUP_FOOTERS: "groupFooters",
    FOOTER: "footer",
  },
  // 操作类型枚举
  OP_TYPE: {
    INSERT: "insert",
    DELETE: "delete",
    UNDO: "undo",
    REDO: "redo",
  },
  // 位置枚举
  POSITION: {
    ABOVE: "above",
    BELOW: "below",
    START: "start",
    END: "end",
  },
};

// 缓存容器（弱引用，避免内存泄漏）
export const ROW_MAP_CACHE = new Map();

// ===================== 2. 基础工具方法 =====================
/**
 * 防抖函数
 * @param {Function} fn - 目标函数
 * @param {Number} delay - 延迟时间
 * @returns {Function} 防抖后的函数
 */
export const debounce = (fn, delay = CONST.DEBOUNCE_DELAY) => {
  let timer = null;
  const debounced = function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };
  return debounced;
};

/**
 * 生成缓存key
 * @param {Object} config - 表格配置
 * @returns {string} 唯一key
 */
export const generateCacheKey = (config) => {
  return JSON.stringify(config, (key, val) => {
    if (key === "style" && Object.keys(val).length === 0) return undefined;
    return val;
  });
};

/**
 * 创建新行
 * @returns {Object} 新行配置
 */
export const createNewRow = () => ({
  height: CONST.DEFAULT_CELL_HEIGHT,
  type: "tablerow",
  tableCells: [],
});

/**
 * 创建新单元格
 * @returns {Object} 新单元格配置
 */
export const createNewCell = () => ({
  colSpan: 1,
  rowSpan: 1,
  item: { style: {}, value: "" },
});

// ===================== 3. 行映射和区域信息方法 =====================
/**
 * 构建行号-结构映射表
 * @param {Object} config - 表格配置
 * @returns {Array} 映射表
 */
export const buildRowMap = (config) => {
  const cacheKey = generateCacheKey(config);
  if (ROW_MAP_CACHE.has(cacheKey)) {
    return ROW_MAP_CACHE.get(cacheKey);
  }

  const rowMap = [];
  const configClone = deepClone(config);

  // Header 区域
  configClone.header?.tableRows?.forEach((_, childIndex) => {
    rowMap.push({ key: CONST.SECTION_TYPE.HEADER, index: childIndex, childIndex });
  });

  // TableGroups.Header 区域
  configClone.tableGroups?.forEach((group, index) => {
    group.header?.tableRows?.forEach((_, childIndex) => {
      rowMap.push({ key: CONST.SECTION_TYPE.GROUP_HEADERS, index, childIndex });
    });
  });

  // Details 区域
  configClone.details?.tableRows?.forEach((_, childIndex) => {
    rowMap.push({ key: CONST.SECTION_TYPE.DETAILS, index: childIndex, childIndex });
  });

  // TableGroups.Footer 区域
  const reversedTableGroups = [...(configClone.tableGroups || [])].reverse();
  reversedTableGroups?.forEach((group, index) => {
    group.footer?.tableRows?.forEach((_, childIndex) => {
      rowMap.push({
        key: CONST.SECTION_TYPE.GROUP_FOOTERS,
        index: reversedTableGroups.length - index - 1,
        childIndex: childIndex,
      });
    });
  });

  // Footer 区域
  configClone.footer?.tableRows?.forEach((_, childIndex) => {
    rowMap.push({ key: CONST.SECTION_TYPE.FOOTER, index: childIndex, childIndex });
  });

  ROW_MAP_CACHE.set(cacheKey, rowMap);
  return rowMap;
};

/**
 * 根据行号获取区域信息
 * @param {Number} num - 行号
 * @param {Object} config - 表格配置
 * @returns {Object} 区域信息
 */
export const getSectionInfo = (num, config) => {
  const configClone = deepClone(config);
  const rowMap = buildRowMap(configClone);
  return num >= 0 && num < rowMap.length
    ? rowMap[num]
    : { key: null, index: -1, childIndex: -1 };
};

// ===================== 4. 单元格操作方法 =====================
/**
 * 定位目标单元格
 * @param {Object} sectionInfo - 区域信息
 * @param {Number} col - 列索引
 * @param {Object} cloneConfig - 克隆配置
 * @returns {Object|null} 目标单元格
 */
export const getTargetCell = (sectionInfo, col, cloneConfig) => {
  const { key, index, childIndex } = sectionInfo;
  switch (key) {
    case CONST.SECTION_TYPE.GROUP_HEADERS:
      return cloneConfig.tableGroups[index]?.header?.tableRows[childIndex]?.tableCells[col];
    case CONST.SECTION_TYPE.GROUP_FOOTERS:
      return cloneConfig.tableGroups[index]?.footer?.tableRows[childIndex]?.tableCells[col];
    case CONST.SECTION_TYPE.HEADER:
    case CONST.SECTION_TYPE.DETAILS:
    case CONST.SECTION_TYPE.FOOTER:
      return cloneConfig[key]?.tableRows[index]?.tableCells[col];
    default:
      return null;
  }
};

/**
 * 设置目标单元格值
 * @param {Object} sectionInfo - 区域信息
 * @param {Number} col - 列索引
 * @param {any} value - 要设置的值
 * @param {Object} cloneConfig - 克隆配置
 */
export const setTargetCellValue = (sectionInfo, col, value, cloneConfig) => {
  const { key, index, childIndex } = sectionInfo;
  let targetCell = getTargetCell(sectionInfo, col, cloneConfig);

  if (!targetCell) {
    targetCell = createNewCell();
    switch (key) {
      case CONST.SECTION_TYPE.GROUP_HEADERS:
        if (!cloneConfig.tableGroups[index]?.header?.tableRows[childIndex]) return;
        cloneConfig.tableGroups[index].header.tableRows[childIndex].tableCells[col] = targetCell;
        break;
      case CONST.SECTION_TYPE.GROUP_FOOTERS:
        if (!cloneConfig.tableGroups[index]?.footer?.tableRows[childIndex]) return;
        cloneConfig.tableGroups[index].footer.tableRows[childIndex].tableCells[col] = targetCell;
        break;
      case CONST.SECTION_TYPE.HEADER:
      case CONST.SECTION_TYPE.DETAILS:
      case CONST.SECTION_TYPE.FOOTER:
        if (!cloneConfig[key]?.tableRows[index]) return;
        cloneConfig[key].tableRows[index].tableCells[col] = targetCell;
        break;
    }
  }

  targetCell.item.value = value;
};

/**
 * 获取单元格路径
 * @param {Object} sectionInfo - 区域信息
 * @param {Number} col - 列索引
 * @returns {String} 单元格路径
 */
export const getCellPath = (sectionInfo, col) => {
  const { key, index, childIndex } = sectionInfo;
  switch (key) {
    case CONST.SECTION_TYPE.HEADER:
      return `header.tableRows[${index}].tableCells[${col}]`;
    case CONST.SECTION_TYPE.DETAILS:
      return `details.tableRows[${index}].tableCells[${col}]`;
    case CONST.SECTION_TYPE.FOOTER:
      return `footer.tableRows[${index}].tableCells[${col}]`;
    case CONST.SECTION_TYPE.GROUP_HEADERS:
      return `tableGroups[${index}].header.tableRows[${childIndex}].tableCells[${col}]`;
    case CONST.SECTION_TYPE.GROUP_FOOTERS:
      return `tableGroups[${index}].footer.tableRows[${childIndex}].tableCells[${col}]`;
    default:
      return "";
  }
};

// ===================== 5. 行列操作方法 =====================
/**
 * 处理列操作公共逻辑
 * @param {Number} colIndex - 列索引
 * @param {String} type - 操作类型：insert/delete
 * @param {Number} insertPosOffset - 插入位置偏移
 * @param {Array} colData - 恢复数据
 * @param {Object} cloneConfig - 克隆配置
 */
export const handleColOperation = (colIndex, type, insertPosOffset = 0, colData = [], cloneConfig) => {
  const insertPos = colIndex + insertPosOffset;
  const defaultTableCell = {
    colSpan: 1,
    rowSpan: 1,
    item: {
      style: {},
      value: "",
      width: CONST.DEFAULT_COL_WIDTH,
      type: CONST.TABLE_CELL_TYPE,
    },
  };

  // 处理基础区域
  const sections = [
    { key: CONST.SECTION_TYPE.HEADER, path: "header.tableRows" },
    { key: CONST.SECTION_TYPE.DETAILS, path: "details.tableRows" },
    { key: CONST.SECTION_TYPE.FOOTER, path: "footer.tableRows" },
  ];

  sections.forEach(({ path }) => {
    const target = parsePathString(path, cloneConfig);
    if (!target) return;
    target.forEach((row, rowIndex) => {
      if (type === CONST.OP_TYPE.INSERT) {
        const cellData = colData[rowIndex] || defaultTableCell;
        row.tableCells.splice(insertPos, 0, cellData);
      } else if (type === CONST.OP_TYPE.DELETE) {
        row.tableCells.splice(colIndex, 1);
      }
    });
  });

  // 处理TableGroups的Header/Footer
  if (cloneConfig.tableGroups) {
    cloneConfig.tableGroups.forEach((group) => {
      ["header", "footer"].forEach((key) => {
        const rows = group[key]?.tableRows;
        if (!rows) return;
        rows.forEach((row, rowIndex) => {
          if (type === CONST.OP_TYPE.INSERT) {
            const cellData = colData[rowIndex] || defaultTableCell;
            row.tableCells.splice(insertPos, 0, cellData);
          } else if (type === CONST.OP_TYPE.DELETE) {
            row.tableCells.splice(colIndex, 1);
          }
        });
      });
    });
  }

  // 同步更新TableColumns
  if (cloneConfig.tableColumns) {
    if (type === CONST.OP_TYPE.INSERT) {
      const columnData = colData.colConfig || {};
      cloneConfig.tableColumns.splice(insertPos, 0, columnData);
    } else if (type === CONST.OP_TYPE.DELETE) {
      cloneConfig.tableColumns.splice(colIndex, 1);
    }
  }
};

// ===================== 6. 合并单元格方法 =====================
/**
 * 更新单元格合并属性
 * @param {Array} data - 行数据
 * @param {Array} mergeArr - 合并范围
 * @param {Boolean} isUnMerge - 是否取消合并
 * @returns {Array} 更新后的行数据
 */
export const updateTableCellMergeState = (data, mergeArr, isUnMerge = false) => {
  const [targetRowIdx, targetColIdx, rowSpan, colSpan] = mergeArr;
  if (!data[targetRowIdx] || !data[targetRowIdx].tableCells[targetColIdx]) {
    console.error("目标行或列不存在");
    return data;
  }

  const newTableData = deepClone(data);

  if (isUnMerge) {
    for (let i = targetRowIdx; i <= rowSpan; i++) {
      for (let o = targetColIdx; o <= colSpan; o++) {
        if (!newTableData[i].tableCells[o]) {
          newTableData[i].tableCells[o] = createNewCell();
        }
        newTableData[i].tableCells[o].rowSpan = 1;
        newTableData[i].tableCells[o].colSpan = 1;
      }
    }
  } else {
    newTableData[targetRowIdx].tableCells[targetColIdx].rowSpan = rowSpan - targetRowIdx + 1;
    newTableData[targetRowIdx].tableCells[targetColIdx].colSpan = colSpan - targetColIdx + 1;
  }

  return newTableData;
};



// ===================== 7. 选中单元格处理方法 =====================
/**
 * 合并选中单元格样式
 * @param {Array} cellMetas - 单元格元数据数组
 * @returns {Object} 合并后的样式
 */
export const mergeStyles = (cellMetas) => {
  if (!Array.isArray(cellMetas) || cellMetas.length === 0) return {};

  const validCells = cellMetas.filter(
    (cellMeta) =>
      cellMeta.spanned === true ||
      (cellMeta.hidden !== true && cellMeta.spanned !== false)
  );
  if (validCells.length === 0) return {};

  const styleMap = {};
  validCells.forEach((cellMeta) => {
    const style = cellMeta.style || {};
    Object.entries(style).forEach(([key, value]) => {
      if (!styleMap[key]) styleMap[key] = new Set();
      styleMap[key].add(value);
    });
  });

  const merged = {};
  Object.entries(styleMap).forEach(([key, values]) => {
    if (values.size === 1) merged[key] = Array.from(values)[0];
  });

  return merged;
};

/**
 * 处理选中单元格数据
 * @param {Array} data - 原始数据数组
 * @returns {Object} 整合后的数据
 */
export const processItemData = (data) => {
  const merged = {};
  if (!Array.isArray(data) || data.length === 0) return merged;

  data.forEach((item, index) => {
    if (item.data?.item) {
      Object.entries(item.data.item).forEach(([key, value]) => {
        if (key === "style") return;
        if (index === 0) {
          merged[key] = value;
        } else if (merged[key] !== value) {
          merged[key] = "";
        }
      });
    }
  });
  return merged;
};

/**
 * 获取选中单元格元数据
 * @param {Array} cellMetas - 单元格元数据数组
 * @param {Object} cloneConfig - 克隆配置
 * @returns {Array} 格式化后的元数据
 */
export const getSelectMetaData = (cellMetas, cloneConfig) => {
  if (!Array.isArray(cellMetas)) return [];

  const validCells = cellMetas.filter(
    (cellMeta) =>
      cellMeta.spanned === true ||
      (cellMeta.hidden !== true && cellMeta.spanned !== false)
  );

  return validCells.map((item) => {
    const sectionInfo = getSectionInfo(item.row, deepClone(cloneConfig));
    return {
      path: getCellPath(sectionInfo, item.col),
      data: parsePathString(getCellPath(sectionInfo, item.col), cloneConfig),
      row: item.row,
      col: item.col,
    };
  });
};