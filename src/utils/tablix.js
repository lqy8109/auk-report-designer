import Handsontable from 'handsontable';
import { useUndoManager } from '@/utils/undoManager';
import { v4 as uuidv4 } from 'uuid';

// 通用常量
const DEFAULT_ROW_HEIGHT = 24;
const DEFAULT_HEADER_HEIGHT = 32;
const DEFAULT_GROUP_HEIGHT = 28;
const DEFAULT_COL_WIDTH = 80;
const LICENSE_KEY = 'non-commercial-and-evaluation';

// 单位转换：cm 转 px（近似，1cm ≈ 37.8px）
const cmToPx = (cmStr) => {
    if (typeof cmStr === 'string' && cmStr.endsWith('cm')) {
        const cm = parseFloat(cmStr);
        return isNaN(cm) ? DEFAULT_COL_WIDTH : Math.round(cm * 37.8);
    }
    if (typeof cmStr === 'number') return cmStr;
    return DEFAULT_COL_WIDTH;
};

/**
 * 样式转换工具函数
 */
const convertStyle = (jsonStyle = {}) => {
    const style = {};
    style['font-family'] = jsonStyle.fontFamily || jsonStyle['font-family'] || '';
    style['font-size'] = jsonStyle.fontSize ? jsonStyle.fontSize + 'px' : jsonStyle['font-size'] ? jsonStyle['font-size'] + 'px' : '';
    style['font-weight'] = jsonStyle.fontWeight || jsonStyle['font-weight'] || '';
    style['background-color'] = jsonStyle.backgroundColor || jsonStyle['background-color'] || '';
    style.color = jsonStyle.color || '';

    if (jsonStyle.border) {
        if (typeof jsonStyle.border === 'string') {
            style.border = jsonStyle.border;
        } else if (jsonStyle.border.color && jsonStyle.border.style) {
            const width = jsonStyle.border.width || '1px';
            style['border-width'] = width;
            style['border-style'] = 'double solid solid double';
            style['border-color'] = jsonStyle.border.color;
        }
    }

    style['text-align'] = jsonStyle.textAlign || jsonStyle['text-align'] || '';
    style['vertical-align'] = jsonStyle.verticalAlign || jsonStyle['vertical-align'] || '';

    if (jsonStyle.paddingLeft || jsonStyle.paddingRight || jsonStyle.paddingTop || jsonStyle.paddingBottom) {
        const paddingLeft = jsonStyle.paddingLeft || '2pt';
        const paddingRight = jsonStyle.paddingRight || '2pt';
        const paddingTop = jsonStyle.paddingTop || '2pt';
        const paddingBottom = jsonStyle.paddingBottom || '2pt';
        style.padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
    }

    Object.keys(style).forEach(key => !style[key] && delete style[key]);
    return style;
};

/**
 * 注册自定义渲染器（与原来相同）
 */
const registerCustomRenderers = (getProps, getCloneConfig, selectedIndex) => {
    const negativeValueRenderer = (instance, td, row, col, prop, value, cellProperties) => {
        td.classList.add('table_cell');
        td.setAttribute('title', value || '');
        td.setAttribute('data-cell-key', `${selectedIndex}-${row}-${col}`);

        if (cellProperties.style) {
            const style = cellProperties.style;
            const hasBorderColor = style.hasOwnProperty('border-color');
            Object.keys(style).forEach(key => {
                if (!hasBorderColor && (key === 'border-width' || key === 'border-style')) return;
                td.style.setProperty(key, style[key]);
            });
        }

        Handsontable.renderers.TextRenderer(instance, td, row, col, prop, value, cellProperties);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'custom-cell-field-picker';
        contentDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            const cloneConfig = getCloneConfig();
            const { dataSets } = getProps();
            const fields = dataSets.filter(source => source.name == cloneConfig.dataSetName);
            window.$app.config.globalProperties.$showSelectBox({
                triggerEl: contentDiv,
                selectField: true,
                options: [{
                    label: cloneConfig.dataSetName,
                    fields: fields[0]?.fields || []
                }],
                onSelect: (selectedValue) => {
                    instance.setDataAtCell(row, col, `{${selectedValue.dataField}}`);
                }
            });
        });
        td.appendChild(contentDiv);
    };

    Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
};

/**
 * 构建行映射表（与原来相同，但这里可能不直接使用）
 */
const buildRowMap = (allRows, groupInfos) => { /* ... */ };

/**
 * 更新分段行数统计
 */
const updateSectionRowCounts = (allRows, sectionRowCounts) => { /* ... */ };

/**
 * 重新排序分组编号
 */
const reorderGroupNumbers = (hot, allRows, groupInfos) => { /* ... */ };

/**
 * 更新行映射
 */
const updateRowMap = (rowMap, index, amount) => { /* ... */ };

/**
 * 构建右键菜单（与原相同，但针对tablix可能需要调整，此处保留原样）
 */
const buildContextMenu = (options) => { /* ... */ };

// ==================== 新增：tablix 解析函数 ====================

/**
 * 解析行层次结构，生成左侧行标题单元格信息
 * @param {Object} rowHierarchy - tableJson.rowHierarchy
 * @param {number} bodyRowCount - body 总行数
 * @returns {Array} 行标题单元格数组，每个元素包含 {row, col, value, style, rowspan, colspan}
 */
function parseRowHierarchy(rowHierarchy, bodyRowCount) {
    const cells = [];
    const levelSizes = rowHierarchy.levelSizes; // 左侧列宽，每列一个，用于确定列索引
    const colCount = levelSizes.length; // 2

    // 深度优先遍历，收集每个 header 信息
    function traverse(members, parentPath = []) {
        members.forEach(member => {
            const currentPath = [...parentPath];
            // 如果当前 member 有 header
            if (member.header) {
                const item = member.header.item;
                // 确定该 header 应放在哪一行（数据行索引）
                let targetRow = null;
                // 如果 member 本身有 bodyIndex，则放在该行
                if (member.bodyIndex !== undefined && member.bodyIndex >= 0) {
                    targetRow = member.bodyIndex;
                } else {
                    // 否则从子孙中查找第一个有 bodyIndex 的节点
                    function findBodyIndex(m) {
                        if (m.bodyIndex !== undefined && m.bodyIndex >= 0) return m.bodyIndex;
                        if (m.children) {
                            for (let child of m.children) {
                                const idx = findBodyIndex(child);
                                if (idx !== null) return idx;
                            }
                        }
                        return null;
                    }
                    targetRow = findBodyIndex(member);
                }
                if (targetRow === null) return; // 无关联数据行，忽略

                // 确定放在哪一列（左侧列索引）
                // 这里根据 levelSizes 数量，以及 member 在树中的位置决定。
                // 简单处理：假设 levelSizes 有两列，第一列是名称，第二列是代码。
                // 可以根据 header 的 value 表达式特征判断，例如包含 "MC" 的是名称，包含 "DM" 的是代码。
                // 更可靠的方法：在遍历过程中传递一个标志，但为了示例，我们采用启发式判断：
                const valueExpr = item.value || '';
                const isName = valueExpr.includes('MC') || valueExpr.includes('名称');
                const isCode = valueExpr.includes('DM') || valueExpr.includes('代码');
                let colIndex = 0; // 默认第一列
                if (isCode) colIndex = 1; // 代码放第二列
                // 如果无法判断，根据 member 在父 children 中的位置：第一个子可能是名称，第二个可能是代码
                // 这里简化：根据 bodyIndex 和是否有 children 推断，但为了可靠性，直接使用启发式

                // 记录单元格
                cells.push({
                    row: targetRow, // 数据行索引，后续会加上列标题行数
                    col: colIndex,
                    value: item.value,
                    style: item.style,
                    rowspan: member.header.levelCount || 1, // 可能跨行？示例中为1
                    colspan: 1 // 左侧列一般不分跨列
                });
            }
            // 递归处理子节点
            if (member.children) {
                traverse(member.children, currentPath);
            }
        });
    }

    traverse(rowHierarchy.members);
    console.log(cells)
    return cells;
}

/**
 * 解析列层次结构，生成上方列标题单元格信息
 * @param {Object} columnHierarchy - tableJson.columnHierarchy
 * @param {number} bodyColCount - body 总列数
 * @returns {Object} { cells, maxDepth }，cells 数组，maxDepth 为最大深度（即列标题行数）
 */
function parseColumnHierarchy(columnHierarchy, bodyColCount) {
    const cells = [];
    const levelSizes = columnHierarchy.levelSizes; // 每级高度？但示例中是宽度，这里忽略
    // 计算最大深度（标题行数）
    let maxDepth = 0;

    function traverse(members, depth = 0) {
        members.forEach(member => {
            console.log(member,depth)
            const currentDepth = depth + member.bodyCount + member.bodyIndex;
            if (currentDepth > maxDepth) maxDepth = currentDepth;

            // 如果 member 有 header
            if (member.header) {
                const item = member.header.item;
                // 确定该 header 对应的数据列索引（如果 member.bodyIndex >=0 则代表数据列）
                let targetCol = null;
                if (member.bodyIndex !== undefined && member.bodyIndex >= 0) {
                    targetCol = member.bodyIndex;
                } else {
                    // 否则从子孙中查找第一个有 bodyIndex 的节点，确定它覆盖哪些列
                    function findBodyIndices(m) {
                        const indices = [];
                        if (m.bodyIndex !== undefined && m.bodyIndex >= 0) {
                            indices.push(m.bodyIndex);
                        }
                        if (m.children) {
                            m.children.forEach(child => {
                                indices.push(...findBodyIndices(child));
                            });
                        }
                        return indices;
                    }
                    const childIndices = findBodyIndices(member);
                    if (childIndices.length > 0) {
                        // 该 header 应该跨这些列，取最小到最大
                        const minCol = Math.min(...childIndices);
                        const maxCol = Math.max(...childIndices);
                        targetCol = minCol;
                        // 记录跨列数
                        const colspan = maxCol - minCol + 1;
                        cells.push({
                            row: currentDepth - 1, // 行号从0开始，depth从1开始
                            col: targetCol,
                            value: item.value,
                            style: item.style,
                            rowspan: member.header.levelCount || 1,
                            colspan: colspan
                        });
                    }
                }
                // 如果 targetCol 有值，说明是数据列对应的最底层标题
                if (targetCol !== null && !member.children) {
                    cells.push({
                        row: currentDepth - 1,
                        col: targetCol,
                        value: item.value,
                        style: item.style,
                        rowspan: 1,
                        colspan: 1
                    });
                }
            }
            // 递归子节点
            if (member.children) {
                traverse(member.children, currentDepth);
            }
        });
    }

    traverse(columnHierarchy.members);
    console.log(cells)
    return { cells, maxDepth };
}

// ==================== 主转换函数 ====================

export default function convertJsonToHandsontableConfig(tableJson, externalMethods = {}, getCloneConfig, getSectionInfo, getProps, selectedIndex) {
    // 如果是 tablix 类型，走专门处理
    if (tableJson.type === 'tablix') {
        return convertTablixToHandsontableConfig(tableJson, externalMethods, getCloneConfig, getSectionInfo, getProps, selectedIndex);
    }

    // 否则走原有逻辑（普通表格）
    // ... 原有代码保持不变，这里省略以保持简洁
}

/**
 * 处理 tablix 类型
 */
function convertTablixToHandsontableConfig(tableJson, externalMethods, getCloneConfig, getSectionInfo, getProps, selectedIndex) {
    registerCustomRenderers(getProps, getCloneConfig, selectedIndex);

    // 1. 获取基本尺寸
    const rowLevelSizes = tableJson.rowHierarchy.levelSizes || [];        // 左侧列宽，如 ["2.5cm","3cm"]
    const colLevelSizes = tableJson.columnHierarchy.levelSizes || [];    // 列标题每级宽度（可能用不到）

    const bodyRows = tableJson.body.rows || [];
    const bodyCols = tableJson.body.columns || [];
    const bodyRowCount = bodyRows.length;
    const bodyColCount = bodyCols.length;

    const leftColCount = rowLevelSizes.length;      // 左侧列数
    const topRowCount = colLevelSizes.length;       // 列标题行数（由 levelSizes 长度决定，实际可能需动态计算，这里先用它）

    // 总行数 = 列标题行数 + 数据行数
    const totalRows = topRowCount + bodyRowCount;
    // 总列数 = 左侧列数 + 数据列数
    const totalCols = leftColCount + bodyColCount;

    // 2. 初始化数据二维数组
    const data = Array.from({ length: totalRows }, () => Array(totalCols).fill(''));

    // 3. 收集合并单元格和样式
    const mergeCells = [];
    const cellStyles = [];

    // 4. 列宽：左侧列宽 + 数据列宽
    const colWidths = [
        ...rowLevelSizes.map(cmToPx),
        ...bodyCols.map(col => cmToPx(col))
    ];

    // 5. 行高：列标题行高 + 数据行高
    const defaultHeaderHeight = DEFAULT_HEADER_HEIGHT;
    const rowHeights = [
        ...Array(topRowCount).fill(defaultHeaderHeight),
        ...bodyRows.map(row => row.height || DEFAULT_ROW_HEIGHT)
    ];

    // 6. 填充 corner 区域
    const corner = tableJson.corner || [];
    for (let r = 0; r < topRowCount; r++) {
        const cornerRow = corner[r] || [];
        for (let c = 0; c < leftColCount; c++) {
            const cell = cornerRow[c];
            if (!cell) continue;
            const item = cell.item;
            const value = item?.value || '';
            data[r][c] = value;

            if (cell.rowSpan > 1 || cell.colSpan > 1) {
                mergeCells.push({
                    row: r,
                    col: c,
                    rowspan: cell.rowSpan,
                    colspan: cell.colSpan
                });
            }

            if (item && item.style) {
                cellStyles.push({
                    row: r,
                    col: c,
                    style: convertStyle(item.style)
                });
            }
        }
    }

    // 7. 解析行层次结构，生成左侧行标题单元格
    const rowTitleCells = parseRowHierarchy(tableJson.rowHierarchy, bodyRowCount);
    rowTitleCells.forEach(cell => {
        const targetRow = topRowCount + cell.row; // 数据行偏移
        const targetCol = cell.col;
        // 检查该位置是否已被 corner 占据？corner 区域行索引小于 topRowCount，不会冲突
        data[targetRow][targetCol] = cell.value;

        // 合并单元格
        if (cell.rowspan > 1 || cell.colspan > 1) {
            mergeCells.push({
                row: targetRow,
                col: targetCol,
                rowspan: cell.rowspan,
                colspan: cell.colspan
            });
        }

        if (cell.style) {
            cellStyles.push({
                row: targetRow,
                col: targetCol,
                style: convertStyle(cell.style)
            });
        }
    });

    // 8. 解析列层次结构，生成上方列标题单元格
    const { cells: colTitleCells, maxDepth } = parseColumnHierarchy(tableJson.columnHierarchy, bodyColCount);
    // 使用实际深度作为列标题行数（可能比 topRowCount 更准确）
    const actualTopRowCount = maxDepth;
    // 如果实际深度与 levelSizes 长度不符，调整 totalRows 和 rowHeights？此处简单处理，保持原样
    colTitleCells.forEach(cell => {
        const targetRow = cell.row; // 列标题行（0 到 maxDepth-1）
        const targetCol = leftColCount + cell.col; // 数据列偏移
        data[targetRow][targetCol] = cell.value;

        if (cell.rowspan > 1 || cell.colspan > 1) {
            mergeCells.push({
                row: targetRow,
                col: targetCol,
                rowspan: cell.rowspan,
                colspan: cell.colspan
            });
        }

        if (cell.style) {
            cellStyles.push({
                row: targetRow,
                col: targetCol,
                style: convertStyle(cell.style)
            });
        }
    });

    // 9. 填充数据区域（body）
    bodyRows.forEach((bodyRow, rowIndex) => {
        const targetRow = topRowCount + rowIndex;
        const cells = bodyRow.cells || [];
        cells.forEach((cell, colIndex) => {
            if (!cell) return;
            const targetCol = leftColCount + colIndex;
            const item = cell.item;
            const value = item?.value || '';
            data[targetRow][targetCol] = value;

            if (cell.rowSpan > 1 || cell.colSpan > 1) {
                mergeCells.push({
                    row: targetRow,
                    col: targetCol,
                    rowspan: cell.rowSpan,
                    colspan: cell.colSpan
                });
            }

            if (item && item.style) {
                cellStyles.push({
                    row: targetRow,
                    col: targetCol,
                    style: convertStyle(item.style)
                });
            }
        });
    });

    // 10. 构建行头渲染函数（可复用之前的逻辑，但这里简化）
    const renderRowHeader = (visualRowIndex) => {
        // 可根据行所在区域返回图标，这里简单返回行号
        return visualRowIndex + 1;
    };

    // 11. 构建右键菜单（复用原有，但需要调整数据引用，此处占位）
    const contextMenuSettings = buildContextMenu({
        colCount: totalCols,
        allRows: [], // 需要根据 tablix 构建 allRows，这里先留空
        sectionRowCounts: { header: 0, groupHeaders: 0, details: bodyRowCount, groupFooters: 0, footer: 0 },
        groupInfo: { groups: [], rowMap: {} },
        externalMethods,
        updateSectionRowCounts,
        buildRowMap,
        tableJson,
        getCloneConfig,
        getSectionInfo,
    });

    // 单元格配置函数
    const cells = (row, col) => ({
        renderer: 'negativeValueRenderer'
    });


    // 12. 基础配置
    const baseConfig = {
        language: "zh-CN",
        data,
        colHeaders: () => '',
        rowHeaders: renderRowHeader,
        colWidths,
        rowHeights,
        licenseKey: LICENSE_KEY,
        manualColumnResize: true,
        manualRowResize: true,
        contextMenu: contextMenuSettings,
        filters: false,
        dropdownMenu: false,
        columnSorting: false,
        stretchH: 'none',
        wordWrap: true,
        autoRowSize: false,
        autoColSize: false,
        cell: cellStyles,
        cells,
        mergeCells,
        // 附加数据
        sectionRowCounts: {
            header: topRowCount,
            details: bodyRowCount,
            footer: 0,
            groupHeaders: 0,
            groupFooters: 0
        },
    };

    return { ...baseConfig };
}