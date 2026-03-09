// 1. 常量提取与规范（替换魔法值、统一命名）
import Handsontable from 'handsontable';
import { useUndoManager } from '@/utils/undoManager';

import { v4 as uuidv4 } from 'uuid';

// SVG常量（改为const，规范命名）
const SVG_TOP = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="14" height="14" id="svg3383"><defs id="defs3391"></defs><g transform="matrix(1 0 0 -1 0 800)" id="g3385"><path fill="currentColor" d="M875 675v-791.667h-791.667v791.667h791.667zM333.333 -75v208.333h-208.333v-208.333h208.333zM583.333 -75v208.333h-208.333v-208.333h208.333zM833.333 -75v208.333h-208.333v-208.333h208.333zM583.333 175v208.333h-208.333v-208.333h208.333zM833.333 175v208.333 h-208.333v-208.333h208.333zM333.333 175v208.333h-208.333v-208.333h208.333zM333.333 425v208.333h-208.333v-208.333h208.333zM583.333 425v208.333h-208.333v-208.333h208.333zM833.333 425v208.333h-208.333v-208.333h208.333z" id="path3387"></path></g><path class="wd-icon-color-data-visualizer-black" d="m 125.90913,470.69254 0,-103.36943 103.36943,0 103.36942,0 0,103.36943 0,103.36942 -103.36942,0 -103.36943,0 0,-103.36942 z" id="path3342" transform="translate(0,-200)"></path><path class="wd-icon-color-data-visualizer-black" d="m 376.0931,470.69254 0,-103.36943 103.36942,0 103.36943,0 0,103.36943 0,103.36942 -103.36943,0 -103.36942,0 0,-103.36942 z" id="path3344" transform="translate(0,-200)"></path><path class="wd-icon-color-data-visualizer-black" d="m 626.27707,470.69254 0,-103.36943 103.36942,0 103.36943,0 0,103.36943 0,103.36942 -103.36943,0 -103.36942,0 0,-103.36942 z" id="path3346" transform="translate(0,-200)"></path></svg>';
const SVG_CONT = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1000 1000" width="14" height="14" id="svg3383"><defs id="defs3391"></defs><g transform="matrix(1 0 0 -1 0 800)" id="g3385"><path fill="currentColor" d="M875 675v-791.667h-791.667v791.667h791.667zM333.333 -75v208.333h-208.333v-208.333h208.333zM583.333 -75v208.333h-208.333v-208.333h208.333zM833.333 -75v208.333h-208.333v-208.333h208.333zM583.333 175v208.333h-208.333v-208.333h208.333zM833.333 175v208.333 h-208.333v-208.333h208.333zM333.333 175v208.333h-208.333v-208.333h208.333zM333.333 425v208.333h-208.333v-208.333h208.333zM583.333 425v208.333h-208.333v-208.333h208.333zM833.333 425v208.333h-208.333v-208.333h208.333z" id="path3387"></path></g><path class="gc-icon-color--text" d="m 125.90913,720.8765 0,-103.36942 103.36943,0 103.36942,0 0,103.36942 0,103.36943 -103.36942,0 -103.36943,0 0,-103.36943 z" id="path3349" transform="translate(0,-200)"></path><path class="gc-icon-color--text" d="m 376.0931,720.8765 0,-103.36942 103.36942,0 103.36943,0 0,103.36942 0,103.36943 -103.36943,0 -103.36942,0 0,-103.36943 z" id="path3351" transform="translate(0,-200)"></path><path class="gc-icon-color--text" d="m 626.27707,720.8765 0,-103.36942 103.36942,0 103.36943,0 0,103.36942 0,103.36943 -103.36943,0 -103.36942,0 0,-103.36943 z" id="path3353" transform="translate(0,-200)"></path></svg>';
const SVG_BOTTOM = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="14" height="14" id="svg3383"><defs id="defs3391"></defs><g transform="matrix(1 0 0 -1 0 800)" id="g3385"><path fill="currentColor" d="M875 675v-791.667h-791.667v791.667h791.667zM333.333 -75v208.333h-208.333v-208.333h208.333zM583.333 -75v208.333h-208.333v-208.333h208.333zM833.333 -75v208.333h-208.333v-208.333h208.333zM583.333 175v208.333h-208.333v-208.333h208.333zM833.333 175v208.333 h-208.333v-208.333h208.333zM333.333 175v208.333h-208.333v-208.333h208.333zM333.333 425v208.333h-208.333v-208.333h208.333zM583.333 425v208.333h-208.333v-208.333h208.333zM833.333 425v208.333h-208.333v-208.333h208.333z" id="path3387"></path></g><path class="wd-icon-color-data-visualizer-black" d="m 125.90914,971.06047 0,-103.36942 103.36942,0 103.36942,0 0,103.36942 0,103.36943 -103.36942,0 -103.36942,0 0,-103.36943 z" id="path3418" transform="translate(0,-200)"></path><path class="wd-icon-color-data-visualizer-black" d="m 376.0931,971.06047 0,-103.36942 103.36943,0 103.36942,0 0,103.36942 0,103.36943 -103.36942,0 -103.36943,0 0,-103.36943 z" id="path3420" transform="translate(0,-200)"></path><path class="wd-icon-color-data-visualizer-black" d="m 626.27707,971.06047 0,-103.36942 103.36942,0 103.36943,0 0,103.36942 0,103.36943 -103.36943,0 -103.36942,0 0,-103.36943 z" id="path3422" transform="translate(0,-200)"></path></svg>';
const SVG_GROUP = '<svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" x="0px" y="0px"  width="8" height="14"  viewBox="0 0 36.000007 133.986"><g id="g3"><path class="gc-icon-color--text" id="path7" d="m 25.609823,15.184737 c 4.037,0 7.309,-3.271 7.309,-7.3079997 0,-4.037 -3.271,-7.30900004 -7.309,-7.30900004 l -14.616,0 c -4.0369995,0 -7.3089995,3.27200004 -7.3089995,7.30900004 l 0,119.3710027 c 0,4.034 3.271,7.307 7.3089995,7.307 l 14.616,0 c 4.037,0 7.309,-3.271 7.309,-7.307 0,-4.037 -3.271,-7.31 -7.309,-7.31 l -7.308,0 0,-104.753003 7.308,0 z"></path></g><g id="g11"></g><g id="g13"></g><g id="g15"></g><g id="g17"></g><g id="g19"></g><g id="g21"></g><g id="g23"></g><g id="g25"></g><g id="g27"></g><g id="g29"></g><g id="g31"></g><g id="g33"></g><g id="g35"></g><g id="g37"></g><g id="g39"></g></svg>';
// 通用常量
const DEFAULT_ROW_HEIGHT = 24;
const DEFAULT_HEADER_HEIGHT = 32;
const DEFAULT_GROUP_HEIGHT = 28;
const DEFAULT_COL_WIDTH = 80;
const LICENSE_KEY = 'non-commercial-and-evaluation';

/**
 * 创建表格状态快照（用于撤销/重做）
 * @param {Object} params - 快照参数
 * @returns {Object} 状态快照
 */
const createTableSnapshot = (params) => {
    const { allRows, sectionRowCounts, groupInfo, mergeCells, colWidths, rowHeights } = params;
    return {
        allRows: JSON.parse(JSON.stringify(allRows)),
        sectionRowCounts: { ...sectionRowCounts },
        groupInfo: JSON.parse(JSON.stringify(groupInfo)),
        mergeCells: JSON.parse(JSON.stringify(mergeCells)),
        colWidths: [...colWidths],
        rowHeights: [...rowHeights]
    };
};

/**
 * 样式转换工具函数：将JSON样式转换为CSS样式对象
 * @param {Object} jsonStyle - 原始JSON样式
 * @returns {Object} 标准化的CSS样式对象
 */
const convertStyle = (jsonStyle = {}) => {
    const style = {};
    // 字体样式
    style['font-family'] = jsonStyle.fontFamily || jsonStyle['font-family'] || '';
    style['font-size'] = jsonStyle.fontSize ? jsonStyle.fontSize + 'px' : jsonStyle['font-size'] ? jsonStyle['font-size'] + 'px' : '';
    style['font-weight'] = jsonStyle.fontWeight || jsonStyle['font-weight'] || '';
    // 颜色样式
    style['background-color'] = jsonStyle.backgroundColor || jsonStyle['background-color'] || '';
    style.color = jsonStyle.color || '';

    // 边框样式
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

    // 对齐方式
    style['text-align'] = jsonStyle.textAlign || jsonStyle['text-align'] || '';
    style['vertical-align'] = jsonStyle.verticalAlign || jsonStyle['vertical-align'] || '';

    // 内边距
    if (jsonStyle.paddingLeft || jsonStyle.paddingRight || jsonStyle.paddingTop || jsonStyle.paddingBottom) {
        const paddingLeft = jsonStyle.paddingLeft || '2pt';
        const paddingRight = jsonStyle.paddingRight || '2pt';
        const paddingTop = jsonStyle.paddingTop || '2pt';
        const paddingBottom = jsonStyle.paddingBottom || '2pt';
        style.padding = `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
    }

    // 过滤空值
    Object.keys(style).forEach(key => !style[key] && delete style[key]);
    return style;
};

/**
 * 构建行映射表（封装重复逻辑）
 * @param {Array} allRows - 所有行数据
 * @param {Array} groupInfos - 分组信息数组
 * @returns {Object} 行号到行信息的映射
 */
const buildRowMap = (allRows, groupInfos) => {
    const rowMap = {};
    allRows.forEach((row, index) => {
        rowMap[index] = {
            section: row.section,
            groupId: row.groupId,
            groupInd: row.groupInd,
            group: row.groupId ? groupInfos.find(g => g.id === row.groupId) : null
        };
    });
    return rowMap;
};

/**
 * 更新各分段行数统计（核心工具函数）
 * @param {Array} allRows - 所有行数据
 * @param {Object} sectionRowCounts - 行数统计对象
 */
const updateSectionRowCounts = (allRows, sectionRowCounts) => {
    sectionRowCounts.header = allRows.filter(row => row.section === 'header').length;
    sectionRowCounts.groupHeaders = allRows.filter(row => row.section === 'groupHeader').length;
    sectionRowCounts.details = allRows.filter(row => row.section === 'details').length;
    sectionRowCounts.groupFooters = allRows.filter(row => row.section === 'groupFooter').length;
    sectionRowCounts.footer = allRows.filter(row => row.section === 'footer').length;
};

/**
 * 重新排序分组编号（解耦，独立函数）
 * @param {Object} hot - Handsontable实例
 * @param {Array} allRows - 所有行数据
 * @param {Array} groupInfos - 分组信息数组
 * @returns {Object} 更新后的分组信息
 */
const reorderGroupNumbers = (hot, allRows, groupInfos) => {
    // 重新编号分组
    groupInfos.forEach((group, newIndex) => {
        const newGroupInd = newIndex + 1;
        group.groupInd = newGroupInd;
        group.name = `分组${newGroupInd}`;

        // 更新allRows中的分组编号
        allRows.forEach(row => {
            if (row.groupId === group.id) {
                row.groupInd = newGroupInd;
            }
        });
    });

    // 刷新表格
    hot?.render();
    return groupInfos;
};

/**
 * 计数更新工具函数
 * @param {Object} rowMap - 行映射表
 * @param {number} index - 操作起始行号
 * @param {number} amount - 增减数量（正数增加，负数减少）
 * @returns {Object} 更新后的行映射表
 */
const updateRowMap = (rowMap, index, amount) => {
    const newRowMap = { ...rowMap };
    Object.keys(newRowMap).forEach(rowNum => {
        const num = parseInt(rowNum);
        if (num >= index) {
            const newRowNum = num + amount;
            newRowMap[newRowNum] = newRowMap[rowNum];
            delete newRowMap[rowNum];
        }
    });
    return newRowMap;
};

/**
 * 注册自定义渲染器（初始化一次）
 */
const registerCustomRenderers = (getProps, getCloneConfig, selectedIndex) => {
    // 负值渲染器（带样式和提示）
    const negativeValueRenderer = (instance, td, row, col, prop, value, cellProperties) => {

        td.classList.add('table_cell');
        td.setAttribute('title', value || '');
        td.setAttribute('data-cell-key', `${selectedIndex}-${row}-${col}`);

        if (cellProperties.style) {
            const style = cellProperties.style;
            const hasBorderColor = style.hasOwnProperty('border-color');

            Object.keys(style).forEach(key => {
                // 边界保护：无border-color时跳过border-width/style
                if (!hasBorderColor && (key === 'border-width' || key === 'border-style')) {
                    return;
                }
                td.style.setProperty(key, style[key]);
            });
        }

        Handsontable.renderers.TextRenderer(instance, td, row, col, prop, value, cellProperties);

        if (cellProperties.expand) {

            const imgBox = document.createElement('div');
            imgBox.innerHTML = `<img src="${cellProperties.expand == 'down' ? './down.png' : './right.png'}" />`;
            imgBox.classList = cellProperties.expand == 'down' ? 'expand-icon-down' : 'expand-icon-right';
            td.insertBefore(imgBox, td.firstChild);
        }

        // 添加动态字段选择框
        // 1. 创建新的div元素
        const contentDiv = document.createElement('div');
        // 可选：给div添加类名，方便后续样式控制
        contentDiv.className = 'custom-cell-field-picker';

        contentDiv.addEventListener('click', (e) => {
            // 阻止事件冒泡（可选，避免触发表格其他点击事件）
            e.stopPropagation();
            // 2. 显示全局选择框
            var cloneConfig = getCloneConfig();
            var { dataSets } = getProps();
            var fields = dataSets.filter(source => source.name == cloneConfig.dataSetName);
            window.$app.config.globalProperties.$showSelectBox({
                triggerEl: contentDiv, // 触发元素是当前div
                selectField: true, // 标识为字段选择
                options: [{
                    label: cloneConfig.dataSetName,
                    fields: fields[0]?.fields || []
                }],
                onSelect: (selectedValue) => {
                    // 更新Handsontable单元格值
                    instance.setDataAtCell(row, col, `{${selectedValue.dataField}}`);
                }
            });


        });

        // 3. 将div添加回td中
        td.appendChild(contentDiv);
    };

    // 注册渲染器（避免重复注册）
    Handsontable.renderers.registerRenderer('negativeValueRenderer', negativeValueRenderer);
};



/**
 * 构建右键菜单配置（独立函数，降低主函数复杂度）
 * @param {Object} options - 配置项
 * @returns {Object} 右键菜单配置
 */
const buildContextMenu = (options) => {
    const {
        colCount,
        allRows,
        sectionRowCounts,
        groupInfo,
        externalMethods,
        updateSectionRowCounts,
        buildRowMap,
        getCloneConfig,
        getSectionInfo,
    } = options;


    // 优化后的withUndo函数（保留原有逻辑）
    const withUndo = (actionName, actionFn, undoFn, redoFn) => {
        if (typeof actionName !== 'string' || actionName.trim() === '') {
            console.warn('withUndo: actionName必须是非空字符串');
            return;
        }
        if (typeof actionFn !== 'function') {
            console.warn('withUndo: actionFn必须是函数');
            return;
        }

        const _undoFn = typeof undoFn === 'function' ? undoFn : () => { };
        const _redoFn = typeof redoFn === 'function' ? redoFn : () => { };


        let actionResult;
        try {
            actionResult = actionFn();
        } catch (e) {
            console.error(`withUndo: 执行【${actionName}】失败`, e);
            return;
        }



        useUndoManager().add({
            undo: () => {
                try {
                    _undoFn(actionResult);
                } catch (e) {
                    console.error(`withUndo: 撤销【${actionName}】失败`, e);
                }
            },
            redo: () => {
                try {
                    _redoFn(actionResult);
                } catch (e) {
                    console.error(`withUndo: 重做【${actionName}】失败`, e);
                }
            }
        });
    };

    return {
        items: {
            removeTable: {
                name: '删除当前表格',
                callback() {
                    externalMethods.removeTable?.();
                },
            },
            sp0: '---------',
            // 基础编辑操作
            cut: { name: '剪切' },
            copy: { name: '复制' },
            paste: { name: '粘贴' },
            sp1: '---------',

            // 行操作子菜单
            row: {
                name: '行操作',
                submenu: {
                    items: [
                        {
                            key: 'row:above',
                            name: '向上插入行',
                            callback() {

                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中要插入行的位置');
                                    return;
                                }
                                const targetRow = selected[0][0];


                                withUndo(
                                    '向上插入行',
                                    // actionFn：执行插入行（记录关键数据）
                                    () => {
                                        // 1. 执行原生插入行
                                        hot.alter('insert_row_above', targetRow);
                                        // 2. 记录插入前的行数据（供撤销时验证）
                                        const insertPos = targetRow;
                                        // 3. 创建空行业务数据
                                        const emptyRow = {
                                            tableCells: Array(colCount).fill({
                                                item: { value: '', style: {} },
                                                colSpan: 1,
                                                rowSpan: 1
                                            }),
                                            height: DEFAULT_ROW_HEIGHT,
                                            section: groupInfo.rowMap[targetRow]?.section || 'details',
                                            groupId: groupInfo.rowMap[targetRow]?.groupId || null,
                                            groupInd: groupInfo.rowMap[targetRow]?.groupInd || null
                                        };
                                        // 4. 更新业务数据
                                        allRows.splice(insertPos, 0, emptyRow);
                                        // 5. 同步更新映射和计数
                                        groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                        updateSectionRowCounts(allRows, sectionRowCounts);
                                        externalMethods.insertRowAbove?.({ row: targetRow });
                                        hot.render();


                                        // 返回关键数据供undo/redo使用
                                        return {
                                            actionType: 'insert_row_above',
                                            targetRow,
                                            insertPos,
                                            rowData: emptyRow
                                        };
                                    },
                                    // undoFn：撤销插入行（反向执行hot.alter）
                                    (actionResult) => {
                                        const { insertPos } = actionResult;
                                        if (hot) {
                                            // 1. 反向执行原生API：删除插入的行
                                            hot.alter('remove_row', insertPos);
                                            // 2. 同步删除业务数据中的对应行
                                            allRows.splice(insertPos, 1);
                                            // 3. 恢复映射和计数
                                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                            updateSectionRowCounts(allRows, sectionRowCounts);
                                            // 4. 通知外部撤销
                                            externalMethods.removeRow?.({ row: insertPos });
                                            console.log(`【撤销】向上插入行: 执行hot.alter('remove_row', ${insertPos})`);
                                        }
                                    },
                                    // redoFn：重做插入行（重新执行hot.alter）
                                    (actionResult) => {
                                        const { targetRow, rowData } = actionResult;
                                        if (hot) {
                                            // 1. 重新执行原生插入行
                                            hot.alter('insert_row_above', targetRow);
                                            // 2. 恢复业务数据
                                            allRows.splice(targetRow, 0, rowData);
                                            // 3. 恢复映射和计数
                                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                            updateSectionRowCounts(allRows, sectionRowCounts);
                                            // 4. 通知外部重做
                                            externalMethods.insertRowAbove?.({ row: targetRow });
                                            console.log(`【重做】向上插入行: 执行hot.alter('insert_row_above', ${targetRow})`);
                                        }
                                    }
                                );
                            }
                        },
                        {
                            key: 'row:below',
                            name: '向下插入行',
                            callback() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中要插入行的位置');
                                    return;
                                }

                                const targetRow = selected[0][0];
                                withUndo(
                                    '向下插入行',
                                    // actionFn：执行插入行（记录关键数据）
                                    () => {
                                        const insertPos = targetRow + 1;
                                        // 插入行
                                        hot.alter('insert_row_below', targetRow);
                                        externalMethods.insertRowBelow?.({ row: targetRow });

                                        // 创建空行数据
                                        const emptyRow = {
                                            tableCells: Array(colCount).fill({
                                                item: { value: '', style: {} },
                                                colSpan: 1,
                                                rowSpan: 1
                                            }),
                                            height: DEFAULT_ROW_HEIGHT,
                                            section: groupInfo.rowMap[targetRow]?.section || 'details',
                                            groupId: groupInfo.rowMap[targetRow]?.groupId || null,
                                            groupInd: groupInfo.rowMap[targetRow]?.groupInd || null
                                        };
                                        allRows.splice(insertPos, 0, emptyRow);

                                     
                                        // 更新映射和计数
                                        groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                        updateSectionRowCounts(allRows, sectionRowCounts);
                                        externalMethods.updateSectionRowCounts?.(sectionRowCounts);

                                        hot.render();
                                        // 返回关键数据供undo/redo使用
                                        return {
                                            actionType: 'insert_row_below',
                                            targetRow,
                                            insertPos,
                                            rowData: emptyRow
                                        };
                                    },
                                    // undoFn：撤销插入行（反向执行hot.alter）
                                    (actionResult) => {
                                        const { insertPos } = actionResult;
                                        if (hot) {
                                            // 1. 反向执行原生API：删除插入的行
                                            hot.alter('remove_row', insertPos);
                                            // 2. 同步删除业务数据中的对应行
                                            allRows.splice(insertPos, 1);
                                            // 3. 恢复映射和计数
                                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                            updateSectionRowCounts(allRows, sectionRowCounts);
                                            // 4. 通知外部撤销
                                            externalMethods.removeRow?.({ row: insertPos });
                                            console.log(`【撤销】向上插入行: 执行hot.alter('remove_row', ${insertPos})`);
                                        }
                                    },
                                    // redoFn：重做插入行（重新执行hot.alter）
                                    (actionResult) => {
                                        const { targetRow, rowData } = actionResult;
                                        if (hot) {
                                            // 1. 重新执行原生插入行
                                            hot.alter('insert_row_below', targetRow);
                                            // 2. 恢复业务数据
                                            allRows.splice(targetRow, 0, rowData);
                                            // 3. 恢复映射和计数
                                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                            updateSectionRowCounts(allRows, sectionRowCounts);
                                            // 4. 通知外部重做
                                            externalMethods.insertRowAbove?.({ row: targetRow });
                                            console.log(`【重做】向上插入行: 执行hot.alter('insert_row_above', ${targetRow})`);
                                        }
                                    }
                                );
                            }
                        },
                        {
                            key: 'row:delete',
                            name: '删除选中行',
                            callback() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中要删除的行');
                                    return;
                                }

                                const targetRow = selected[0][0];
                                withUndo(
                                    '删除选中行',
                                    // actionFn：执行插入行（记录关键数据）
                                    () => {
                                        const insertPos = targetRow;
                                        const mergePlugin = hot.getPlugin('mergeCells');
                                        var mergerCells = mergePlugin.mergedCellsCollection.mergedCells;
                                        var newMergerList = [];
                                        mergerCells.map(item => {
                                            if (item.row == targetRow) {
                                                newMergerList.push({
                                                    row: item.row,
                                                    col: item.col,
                                                    rowspan: item.rowspan,
                                                    colspan: item.colspan,
                                                })
                                            }
                                        });

                                        // 删除行
                                        hot.alter('remove_row', targetRow);
                                        const emptyRow = allRows[insertPos];
                                        const sectionInfo = getSectionInfo(targetRow, getCloneConfig());
                                        externalMethods.removeRow?.({ row: targetRow });
                                        // 从allRows中删除
                                        allRows.splice(targetRow, 1);
                                        // 更新映射和计数
                                        groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                        updateSectionRowCounts(allRows, sectionRowCounts);
                                        externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                        hot.render();

                                        // 返回关键数据供undo/redo使用
                                        return {
                                            actionType: 'remove_row',
                                            targetRow,
                                            insertPos,
                                            rowData: emptyRow,
                                            sectionInfo,
                                            mergerCells: newMergerList,
                                        };
                                    },
                                    // redoFn：重做插入行（重新执行hot.alter）
                                    (actionResult) => {
                                        const { targetRow, insertPos, rowData, sectionInfo, mergerCells } = actionResult;
                                        if (hot) {
                                            hot.undoRedo.undo();
                                            allRows.splice(insertPos, 0, rowData);
                                            // 更新映射和计数
                                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                            updateSectionRowCounts(allRows, sectionRowCounts);
                                            externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                            externalMethods.unRemoveRow?.({ sectionInfo: sectionInfo, rowData });
                                            const mergePlugin = hot.getPlugin('mergeCells');
                                            mergerCells.forEach((item) => {
                                                mergePlugin.merge(item.row,
                                                    item.col,
                                                    item.rowspan == 1 ? item.row : item.row + item.rowspan - 1,
                                                    item.colspan == 1 ? item.col : item.col + item.colspan - 1);
                                            });
                                            hot.render();
                                        }
                                    },
                                    // undoFn：撤销插入行（反向执行hot.alter）
                                    (actionResult) => {
                                        const { insertPos } = actionResult;
                                        if (hot) {
                                            // 1. 反向执行原生API：删除插入的行
                                            hot.alter('remove_row', insertPos);
                                            // 2. 同步删除业务数据中的对应行
                                            allRows.splice(insertPos, 1);
                                            // 3. 恢复映射和计数
                                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                            updateSectionRowCounts(allRows, sectionRowCounts);
                                            // 4. 通知外部撤销
                                            externalMethods.removeRow?.({ row: insertPos });
                                            console.log(`【撤销】向上插入行: 执行hot.alter('remove_row', ${insertPos})`);
                                        }
                                    },
                                );

                            }
                        }
                    ]
                }
            },
            sp2: '---------',
            // 标题行操作
            addHeader: {
                name: '添加标题行',
                callback() {
                    const hot = this;
                    const targetRow = 0;



                    withUndo(
                        '添加标题行',
                        // actionFn：执行插入行（记录关键数据）
                        () => {
                            // 插入标题行
                            hot.alter('insert_row_above', targetRow);
                            externalMethods.insertRowHeader?.({ row: targetRow });

                            // 创建标题行数据
                            const emptyRow = {
                                tableCells: [{
                                    item: {
                                        value: '标题行',
                                        style: {
                                            backgroundColor: '#e8f4f8',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                        }
                                    },
                                    colSpan: colCount,
                                    rowSpan: 1
                                }],
                                height: DEFAULT_HEADER_HEIGHT,
                                section: 'header',
                                groupId: null,
                                groupInd: null
                            };

                            // 插入到allRows
                            allRows.splice(targetRow, 0, emptyRow);

                            // 更新映射和计数
                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                            updateSectionRowCounts(allRows, sectionRowCounts);
                            externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                            hot.render();

                            // 返回关键数据供undo/redo使用
                            return {
                                actionType: 'insert_row_above',
                                targetRow,
                                insertPos: 0,
                                rowData: emptyRow
                            };
                        },
                        // undoFn：撤销插入行（反向执行hot.alter）
                        (actionResult) => {
                            const { insertPos } = actionResult;
                            if (hot) {
                                hot.undoRedo.undo();
                                // 1. 反向执行原生API：删除插入的行
                                // hot.alter('remove_row', insertPos);
                                // 2. 同步删除业务数据中的对应行
                                allRows.splice(insertPos, 1);
                                // 3. 恢复映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                // 4. 通知外部撤销
                                externalMethods.removeRow?.({ row: insertPos });
                              
                            }
                        },
                        // redoFn：重做插入行（重新执行hot.alter）
                        (actionResult) => {
                            const { targetRow, rowData } = actionResult;
                            if (hot) {
                                // 1. 重新执行原生插入行
                                hot.alter('insert_row_above', targetRow);
                                // 2. 恢复业务数据
                                allRows.splice(targetRow, 0, rowData);
                                // 3. 恢复映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                // 4. 通知外部重做
                                externalMethods.insertRowHeader?.({ row: targetRow });
                                console.log(`【重做】向上插入行: 执行hot.alter('insert_row_above', ${targetRow})`);
                            }
                        }
                    );
                },
                hidden() {
                    return sectionRowCounts.header > 0;
                }
            },
            removeHeader: {
                name: '删除标题行',
                callback() {
                    const hot = this;
                    const headerIndices = allRows
                        .map((item, index) => item.section === 'header' ? index : -1)
                        .filter(index => index !== -1);

                    const startIndex = headerIndices[0];
                    const totalLength = headerIndices[headerIndices.length - 1] - startIndex + 1;
                    console.log('删除标题行', startIndex, totalLength)

                    withUndo(
                        '删除标题行',
                        // actionFn：执行插入行（记录关键数据）
                        () => {

                            const mergePlugin = hot.getPlugin('mergeCells');


                            var mergerCells = mergePlugin.mergedCellsCollection.mergedCells;
                            var newMergerList = [];
                            mergerCells.map(item => {
                                newMergerList.push({
                                    row: item.row,
                                    col: item.col,
                                    rowspan: item.rowspan,
                                    colspan: item.colspan,
                                })
                            });



                            var rowHeightList = [];


                            const emptyRowList = [];
                            const sectionInfo = [];
                            for (var i = startIndex; i < totalLength; i++) {
                                rowHeightList.push({
                                    index: i,
                                    height: hot.getRowHeight(i),
                                })
                                emptyRowList.push(allRows[i]);
                                sectionInfo.push(getSectionInfo(i, getCloneConfig()))
                            }



                            // 删除行
                            hot.alter('remove_row', startIndex, totalLength);
                            externalMethods.removeRowHeader?.({ row: startIndex });
                            // 从allRows中删除
                            allRows.splice(startIndex, totalLength);
                            // 更新映射和计数
                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                            updateSectionRowCounts(allRows, sectionRowCounts);
                            externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                            hot.render();


                            // 返回关键数据供undo/redo使用
                            return {
                                actionType: 'remove_row',
                                startIndex,
                                totalLength,
                                rowData: emptyRowList,
                                sectionInfo,
                                mergerCells: newMergerList,
                                rowHeightList: JSON.parse(JSON.stringify(rowHeightList)),
                            };
                        },
                        // redoFn：重做插入行（重新执行hot.alter）
                        (actionResult) => {
                            const { targetRow, startIndex, totalLength, rowData, sectionInfo, mergerCells, rowHeightList } = actionResult;

                            if (hot) {
                                hot.undoRedo.undo();
                                rowData.map((item, index) => {
                                    allRows.splice(startIndex + index, 0, item);
                                })


                                // 更新映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                externalMethods.unRemoveRowHeader?.({ sectionInfo: sectionInfo, rowData });
                                const mergePlugin = hot.getPlugin('mergeCells');
                                mergerCells.forEach((item) => {
                                    mergePlugin.merge(item.row,
                                        item.col,
                                        item.rowspan == 1 ? item.row : item.row + item.rowspan - 1,
                                        item.colspan == 1 ? item.col : item.col + item.colspan - 1);
                                });


                                var manualRowResizePlugin = hot.getPlugin('manualRowResize');
                                rowHeightList.map(item => {
                                    manualRowResizePlugin.setManualSize(item.index, item.height);
                                })

                            }
                        },
                        // undoFn：撤销插入行（反向执行hot.alter）
                        (actionResult) => {
                            const { insertPos } = actionResult;
                            if (hot) {
                                // 1. 反向执行原生API：删除插入的行
                                hot.alter('remove_row', startIndex, totalLength);
                                externalMethods.removeRowHeader?.({ row: startIndex });
                                // 从allRows中删除
                                allRows.splice(startIndex, totalLength);
                                // 更新映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                hot.render();
                            }
                        },
                    );

                },
                hidden() {
                    return sectionRowCounts.header <= 0;
                }
            },
            // 明细行操作
            addDetail: {
                name: '添加明细行',
                callback() {
                    const hot = this;
                    const hasGroups = groupInfo.groups.length > 0;
                    let insertRowIndex;

                    if (hasGroups) {
                        // 有分组：插入到第一个分组头之后
                        const firstGroup = groupInfo.groups[0];
                        insertRowIndex = Math.max(...firstGroup.headerRows) + 1;
                    } else {
                        // 无分组：插入到表头和表尾中间
                        const headerEndRow = sectionRowCounts.header - 1;
                        const footerStartRow = allRows.length - sectionRowCounts.footer;
                        insertRowIndex = Math.floor((headerEndRow + footerStartRow) / 2);
                    }

                    withUndo(
                        '添加明细行',
                        // actionFn：执行插入行（记录关键数据）
                        () => {


                            // 插入明细行
                            hot.alter('insert_row_below', insertRowIndex);
                            externalMethods.insertRowDetail?.({ row: insertRowIndex });

                            // 创建明细行数据
                            const emptyRow = {
                                tableCells: Array(colCount).fill({
                                    item: { value: '', style: { textAlign: 'left' } },
                                    colSpan: 1,
                                    rowSpan: 1
                                }),
                                height: DEFAULT_ROW_HEIGHT,
                                section: 'details',
                                groupId: hasGroups ? groupInfo.groups[0].id : null,
                                groupInd: hasGroups ? groupInfo.groups[0].groupInd : null
                            };

                            // 插入到allRows
                            allRows.splice(insertRowIndex + 1, 0, emptyRow);

                            // 更新映射和计数
                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                            updateSectionRowCounts(allRows, sectionRowCounts);
                            externalMethods.updateSectionRowCounts?.(sectionRowCounts);

                            hot.render();

                            // 返回关键数据供undo/redo使用
                            return {
                                actionType: 'insert_row_above',

                                insertPos: insertRowIndex,
                                rowData: emptyRow
                            };
                        },
                        // undoFn：撤销插入行（反向执行hot.alter）
                        (actionResult) => {
                            const { insertPos } = actionResult;
                            if (hot) {
                                hot.undoRedo.undo();
                                // 1. 反向执行原生API：删除插入的行
                                // hot.alter('remove_row', insertPos);
                                // 2. 同步删除业务数据中的对应行
                                allRows.splice(insertPos + 1, 1);
                                // 3. 恢复映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                // 4. 通知外部撤销
                                externalMethods.removeRow?.({ row: insertPos });
                            }
                        },
                        // redoFn：重做插入行（重新执行hot.alter）
                        (actionResult) => {
                            const { insertPos, rowData } = actionResult;
                            if (hot) {
                                // 1. 重新执行原生插入行
                                hot.alter('insert_row_below', insertPos);
                                // 2. 恢复业务数据
                                allRows.splice(insertPos + 1, 0, rowData);
                                // 3. 恢复映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                // 4. 通知外部重做
                                externalMethods.insertRowDetail?.({ row: insertPos });

                            }
                        }
                    );
                },
                hidden() {
                    return sectionRowCounts.details > 0;
                }
            },
            removeDetail: {
                name: '删除明细行',
                callback() {
                    const hot = this;
                    const detailIndices = allRows
                        .map((item, index) => item.section === 'details' ? index : -1)
                        .filter(index => index !== -1);

                    if (detailIndices.length === 0) {
                        alert('暂无明细行可删除');
                        return;
                    }

                    const startIndex = detailIndices[0];
                    const totalLength = detailIndices[detailIndices.length - 1] - startIndex + 1;

                    withUndo(
                        '删除明细行',
                        // actionFn：执行插入行（记录关键数据）
                        () => {

                            const mergePlugin = hot.getPlugin('mergeCells');


                            var mergerCells = mergePlugin.mergedCellsCollection.mergedCells;
                            var newMergerList = [];
                            mergerCells.map(item => {
                                newMergerList.push({
                                    row: item.row,
                                    col: item.col,
                                    rowspan: item.rowspan,
                                    colspan: item.colspan,
                                })
                            });

                            const rowHeightList = [];

                            const emptyRowList = [];
                            const sectionInfo = [];
                            for (var i = startIndex; i < totalLength + startIndex; i++) {
                                rowHeightList.push({
                                    index: i,
                                    height: hot.getRowHeight(i),
                                })
                                emptyRowList.push(allRows[i]);
                                sectionInfo.push(getSectionInfo(i, getCloneConfig()))
                            }


                            // 删除行
                            hot.alter('remove_row', startIndex, totalLength);
                            externalMethods.removeRowDetail?.({ row: startIndex });
                            // 从allRows中删除
                            allRows.splice(startIndex, totalLength);
                            // 更新映射和计数
                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                            updateSectionRowCounts(allRows, sectionRowCounts);
                            externalMethods.updateSectionRowCounts?.(sectionRowCounts);

                            hot.render();


                            // 返回关键数据供undo/redo使用
                            return {
                                actionType: 'remove_row',
                                startIndex,
                                totalLength,
                                rowData: emptyRowList,
                                sectionInfo,
                                mergerCells: newMergerList,
                                rowHeightList,
                            };
                        },
                        // redoFn：重做插入行（重新执行hot.alter）
                        (actionResult) => {
                            const { targetRow, startIndex, totalLength, rowData, sectionInfo, mergerCells, rowHeightList } = actionResult;
                            if (hot) {
                                hot.undoRedo.undo();

                                rowData.map((item, index) => {
                                    allRows.splice(startIndex + index, 0, item);
                                })
                                console.log(rowData)



                                // 更新映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                console.log('重做插入行', groupInfo)
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                externalMethods.updateSectionRowCounts?.(sectionRowCounts);

                                externalMethods.unRemoveRowDetail?.({ sectionInfo: sectionInfo, rowData });

                                const mergePlugin = hot.getPlugin('mergeCells');
                                mergerCells.forEach((item) => {
                                    mergePlugin.merge(item.row,
                                        item.col,
                                        item.rowspan == 1 ? item.row : item.row + item.rowspan - 1,
                                        item.colspan == 1 ? item.col : item.col + item.colspan - 1);
                                });
                                console.log('重做插入行', allRows)
                                var manualRowResizePlugin = hot.getPlugin('manualRowResize');
                                rowHeightList.map(item => {
                                    manualRowResizePlugin.setManualSize(item.index, item.height);
                                })


                            }
                        },
                        // undoFn：撤销插入行（反向执行hot.alter）
                        (actionResult) => {
                            const { insertPos } = actionResult;
                            if (hot) {
                                // 1. 反向执行原生API：删除插入的行
                                hot.alter('remove_row', startIndex, totalLength);
                                externalMethods.removeRowDetail?.({ row: startIndex });
                                // 从allRows中删除
                                allRows.splice(startIndex, totalLength);
                                // 更新映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                hot.render();
                            }
                        },
                    );


                },
                hidden() {
                    return sectionRowCounts.details <= 0;
                }
            },
            // 汇总行操作
            addFooter: {
                name: '添加汇总行',
                callback() {
                    const hot = this;
                    const targetRow = allRows.length - 1;


                    withUndo(
                        '添加汇总行',
                        // actionFn：执行插入行（记录关键数据）
                        () => {

                            // 插入汇总行
                            hot.alter('insert_row_below', targetRow);
                            externalMethods.insertRowFooter?.({ row: targetRow });

                            // 创建汇总行数据
                            const emptyRow = {
                                tableCells: [{
                                    item: {
                                        value: '汇总行',
                                        style: {
                                            backgroundColor: '#f0f8fb',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            verticalAlign: 'middle'
                                        }
                                    },
                                    colSpan: colCount,
                                    rowSpan: 1
                                }],
                                height: DEFAULT_HEADER_HEIGHT,
                                section: 'footer',
                                groupId: null,
                                groupInd: null
                            };

                            // 插入到allRows
                            allRows.splice(targetRow + 1, 0, emptyRow);

                            // 更新映射和计数
                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                            updateSectionRowCounts(allRows, sectionRowCounts);
                            externalMethods.updateSectionRowCounts?.(sectionRowCounts);

                            hot.render();

                            // 返回关键数据供undo/redo使用
                            return {
                                actionType: 'insert_row_above',

                                insertPos: targetRow,
                                rowData: emptyRow
                            };
                        },
                        // undoFn：撤销插入行（反向执行hot.alter）
                        (actionResult) => {
                            const { insertPos } = actionResult;

                            if (hot) {
                                hot.undoRedo.undo();
                                // 1. 反向执行原生API：删除插入的行
                                // hot.alter('remove_row', insertPos);
                                // 2. 同步删除业务数据中的对应行
                                allRows.splice(insertPos + 1, 1);
                                // 3. 恢复映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                // 4. 通知外部撤销
                                externalMethods.removeRow?.({ row: insertPos + 1 });
                            }
                        },
                        // redoFn：重做插入行（重新执行hot.alter）
                        (actionResult) => {
                            const { insertPos, rowData } = actionResult;
                            if (hot) {
                                // 1. 重新执行原生插入行
                                hot.alter('insert_row_below', insertPos);
                                // 2. 恢复业务数据
                                allRows.splice(insertPos + 1, 0, rowData);
                                // 3. 恢复映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                // 4. 通知外部重做
                                externalMethods.insertRowFooter?.({ row: insertPos });

                            }
                        }
                    );


                },
                hidden() {
                    return sectionRowCounts.footer > 0;
                }
            },
            removeFooter: {
                name: '删除汇总行',
                callback() {
                    const hot = this;
                    const footerIndices = allRows
                        .map((item, index) => item.section === 'footer' ? index : -1)
                        .filter(index => index !== -1);

                    if (footerIndices.length === 0) {
                        alert('暂无汇总行可删除');
                        return;
                    }

                    const startIndex = footerIndices[0];
                    const totalLength = footerIndices[footerIndices.length - 1] - startIndex + 1;

                    withUndo(
                        '删除汇总行',
                        // actionFn：执行插入行（记录关键数据）
                        () => {
                            const mergePlugin = hot.getPlugin('mergeCells');
                            var mergerCells = mergePlugin.mergedCellsCollection.mergedCells;
                            var newMergerList = [];
                            mergerCells.map(item => {
                                newMergerList.push({
                                    row: item.row,
                                    col: item.col,
                                    rowspan: item.rowspan,
                                    colspan: item.colspan,
                                })
                            });

                            const rowHeightList = [];

                            const emptyRowList = [];
                            const sectionInfo = [];
                            for (var i = startIndex; i < totalLength + startIndex; i++) {
                                rowHeightList.push({
                                    index: i,
                                    height: hot.getRowHeight(i),
                                })
                                emptyRowList.push(allRows[i]);
                                sectionInfo.push(getSectionInfo(i, getCloneConfig()))
                            }

                            // 删除行
                            hot.alter('remove_row', startIndex, totalLength);
                            externalMethods.removeRowFooter?.({ row: startIndex });

                            // 从allRows中删除
                            allRows.splice(startIndex, totalLength);

                            // 更新映射和计数
                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                            updateSectionRowCounts(allRows, sectionRowCounts);
                            externalMethods.updateSectionRowCounts?.(sectionRowCounts);

                            hot.render();

                            // 返回关键数据供undo/redo使用
                            return {
                                actionType: 'remove_row',
                                startIndex,
                                totalLength,
                                rowData: emptyRowList,
                                sectionInfo,
                                mergerCells: newMergerList,
                                rowHeightList,
                            };
                        },
                        // redoFn：重做插入行（重新执行hot.alter）
                        (actionResult) => {
                            const { targetRow, startIndex, totalLength, rowData, sectionInfo, mergerCells, rowHeightList } = actionResult;
                            if (hot) {
                                hot.undoRedo.undo();

                                rowData.map((item, index) => {
                                    allRows.splice(startIndex + index, 0, item);
                                })

                                // 更新映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                console.log('重做插入行', groupInfo)
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                externalMethods.updateSectionRowCounts?.(sectionRowCounts);

                                externalMethods.unRemoveRowFooter?.({ sectionInfo: sectionInfo, rowData });

                                const mergePlugin = hot.getPlugin('mergeCells');
                                mergerCells.forEach((item) => {
                                    mergePlugin.merge(item.row,
                                        item.col,
                                        item.rowspan == 1 ? item.row : item.row + item.rowspan - 1,
                                        item.colspan == 1 ? item.col : item.col + item.colspan - 1);
                                });
                                console.log('重做插入行', allRows)
                                var manualRowResizePlugin = hot.getPlugin('manualRowResize');
                                rowHeightList.map(item => {
                                    manualRowResizePlugin.setManualSize(item.index, item.height);
                                })
                            }
                        },
                        // undoFn：撤销插入行（反向执行hot.alter）
                        (actionResult) => {
                            const { insertPos } = actionResult;
                            if (hot) {
                                // 1. 反向执行原生API：删除插入的行
                                hot.alter('remove_row', startIndex, totalLength);
                                externalMethods.removeRowFooter?.({ row: startIndex });
                                // 从allRows中删除
                                allRows.splice(startIndex, totalLength);
                                // 更新映射和计数
                                groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                updateSectionRowCounts(allRows, sectionRowCounts);
                                externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                hot.render();
                            }
                        },
                    );



                },
                hidden() {
                    return sectionRowCounts.footer <= 0;
                }
            },
            sp3: '---------',
            // 列操作子菜单
            col: {
                name: '列操作',
                submenu: {
                    items: [
                        {
                            key: 'col:left',
                            name: '向左插入列',
                            callback() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中要插入列的位置');
                                    return;
                                }
                                const targetCol = selected[0][1];


                                withUndo(
                                    '向左插入列',
                                    // actionFn：执行插入列（记录关键数据）
                                    () => {
                                        // 1. 备份插入前列宽配置（供撤销使用）
                                        const originalColWidths = [...(hot.getSettings?.().colWidths || [])];
                                        console.log(hot.getColWidth())
                                        // 2. 执行原生插入列
                                        hot.alter('insert_col_start', targetCol);
                                        externalMethods.insertColStart?.({ col: targetCol });

                                        // 3. 记录插入位置和空列数据
                                        const insertPos = targetCol;
                                        const emptyColData = {
                                            item: { value: '', style: {} },
                                            colSpan: 1,
                                            rowSpan: 1
                                        };

                                        // 4. 同步更新业务数据（allRows的每一行添加空列）
                                        allRows.forEach(row => {
                                            if (row.tableCells) {
                                                row.tableCells.splice(insertPos, 0, JSON.parse(JSON.stringify(emptyColData)));
                                            }
                                        });

                                        // 5. 更新列宽配置
                                        hot.getSettings?.().colWidths?.splice(insertPos, 0, DEFAULT_COL_WIDTH);
                                        // hot.render();

                                        // 返回关键数据供undo/redo使用
                                        return {
                                            actionType: 'insert_col_start',
                                            targetCol,
                                            insertPos,
                                            emptyColData,
                                            originalColWidths,
                                            newColCount: colCount + 1 // 记录新的列数
                                        };
                                    },
                                    // undoFn：撤销向左插入列
                                    (actionResult) => {
                                        const { insertPos, originalColWidths } = actionResult;
                                        if (hot) {
                                            // 1. 反向执行原生API：删除插入的列
                                            hot.alter('remove_col', insertPos);
                                            // 2. 恢复原始列宽配置
                                            if (hot.getSettings?.()) {
                                                hot.getSettings().colWidths = originalColWidths;
                                            }
                                            // 3. 同步删除业务数据中的对应列
                                            allRows.forEach(row => {
                                                if (row.tableCells) {
                                                    row.tableCells.splice(insertPos, 1);
                                                }
                                            });
                                            // 4. 通知外部撤销
                                            externalMethods.removeCol?.({ col: insertPos });
                                            // hot.render();

                                        }
                                    },
                                    // redoFn：重做向左插入列
                                    (actionResult) => {
                                        const { targetCol, insertPos, emptyColData } = actionResult;
                                        if (hot) {
                                            // 1. 重新执行原生插入列
                                            hot.alter('insert_col_start', targetCol);
                                            // 2. 恢复列宽配置
                                            hot.getSettings?.().colWidths?.splice(insertPos, 0, DEFAULT_COL_WIDTH);
                                            // 3. 恢复业务数据
                                            allRows.forEach(row => {
                                                if (row.tableCells) {
                                                    row.tableCells.splice(insertPos, 0, JSON.parse(JSON.stringify(emptyColData)));
                                                }
                                            });
                                            // 4. 通知外部重做
                                            externalMethods.insertColStart?.({ col: targetCol });
                                            // hot.render();

                                        }
                                    }
                                );
                            }
                        },
                        {
                            key: 'col:right',
                            name: '向右插入列',
                            callback() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中要插入列的位置');
                                    return;
                                }
                                const targetCol = selected[0][1];
                                withUndo(
                                    '向右插入列',
                                    // actionFn：执行插入列（记录关键数据）
                                    () => {
                                        // 1. 备份插入前列宽配置
                                        const originalColWidths = [...(hot.getSettings?.().colWidths || [])];
                                        // 2. 执行原生插入列
                                        hot.alter('insert_col_end', targetCol);
                                        externalMethods.insertColEnd?.({ col: targetCol });

                                        // 3. 记录插入位置和空列数据
                                        const insertPos = targetCol + 1;
                                        const emptyColData = {
                                            item: { value: '', style: {} },
                                            colSpan: 1,
                                            rowSpan: 1
                                        };

                                        // 4. 同步更新业务数据
                                        allRows.forEach(row => {
                                            if (row.tableCells) {
                                                row.tableCells.splice(insertPos, 0, JSON.parse(JSON.stringify(emptyColData)));
                                            }
                                        });
                                        console.log('插入列后宽度', hot.getTableWidth());

                                        // 5. 更新列宽配置
                                        hot.getSettings?.().colWidths?.splice(insertPos, 0, DEFAULT_COL_WIDTH);
                                        // hot.render();

                                        // 返回关键数据供undo/redo使用
                                        return {
                                            actionType: 'insert_col_end',
                                            targetCol,
                                            insertPos,
                                            emptyColData,
                                            originalColWidths,
                                            newColCount: colCount + 1
                                        };
                                    },
                                    // undoFn：撤销向右插入列
                                    (actionResult) => {
                                        const { insertPos, originalColWidths } = actionResult;
                                        if (hot) {
                                            // 1. 反向执行原生API：删除插入的列
                                            hot.alter('remove_col', insertPos);
                                            // 2. 恢复原始列宽配置
                                            if (hot.getSettings?.()) {
                                                hot.getSettings().colWidths = originalColWidths;
                                            }
                                            // 3. 同步删除业务数据中的对应列
                                            allRows.forEach(row => {
                                                if (row.tableCells) {
                                                    row.tableCells.splice(insertPos, 1);
                                                }
                                            });
                                            // 4. 通知外部撤销
                                            externalMethods.removeCol?.({ col: insertPos });
                                            // hot.render();
                                            console.log(`【撤销】向右插入列: 执行hot.alter('remove_col', ${insertPos})`);
                                        }
                                    },
                                    // redoFn：重做向右插入列
                                    (actionResult) => {
                                        const { targetCol, insertPos, emptyColData } = actionResult;
                                        if (hot) {
                                            // 1. 重新执行原生插入列
                                            hot.alter('insert_col_end', targetCol);
                                            // 2. 恢复列宽配置
                                            hot.getSettings?.().colWidths?.splice(insertPos, 0, DEFAULT_COL_WIDTH);
                                            // 3. 恢复业务数据
                                            allRows.forEach(row => {
                                                if (row.tableCells) {
                                                    row.tableCells.splice(insertPos, 0, JSON.parse(JSON.stringify(emptyColData)));
                                                }
                                            });
                                            // 4. 通知外部重做
                                            externalMethods.insertColEnd?.({ col: targetCol });
                                            // hot.render();
                                            console.log(`【重做】向右插入列: 执行hot.alter('insert_col_end', ${targetCol})`);
                                        }
                                    }
                                );
                            }
                        },
                        {
                            key: 'col:delete',
                            name: '删除选中列',
                            callback() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中要删除的列');
                                    return;
                                }

                                const targetCol = selected[0][1];

                                withUndo(
                                    '删除选中列',
                                    // actionFn：执行删除列（记录关键数据）
                                    () => {
                                        // 1. 备份删除前列宽配置和列数据
                                        const originalColWidths = [...(hot.getSettings?.().colWidths || [])];
                                        const deletedColWidth = hot.getSettings?.().colWidths?.[targetCol] || DEFAULT_COL_WIDTH;
                                        // 2. 备份要删除的列数据（供撤销恢复使用）
                                        const deletedColData = [];
                                        allRows.forEach(row => {
                                            if (row.tableCells) {
                                                deletedColData.push(JSON.parse(JSON.stringify(row.tableCells[targetCol])));
                                            } else {
                                                deletedColData.push(null);
                                            }
                                        });
                                        console.log(deletedColData)

                                        // 3. 执行原生删除列
                                        hot.alter('remove_col', targetCol);
                                        externalMethods.removeCol?.({ col: targetCol });

                                        // 4. 同步删除业务数据中的对应列
                                        allRows.forEach(row => {
                                            if (row.tableCells) {
                                                row.tableCells.splice(targetCol, 1);
                                            }
                                        });

                                        // 5. 更新列宽配置
                                        hot.getSettings?.().colWidths?.splice(targetCol, 1);
                                        // hot.render();
                                        console.log(getCloneConfig())

                                        // 返回关键数据供undo/redo使用
                                        return {
                                            actionType: 'remove_col',
                                            targetCol,
                                            deletedColData,
                                            deletedColWidth,
                                            originalColWidths,
                                            oldColCount: colCount
                                        };
                                    },
                                    // undoFn：撤销删除列（恢复被删除的列）
                                    (actionResult) => {
                                        const { targetCol, deletedColData, deletedColWidth } = actionResult;
                                        if (hot) {
                                            // 1. 恢复原生列
                                            hot.undoRedo.undo();
                                            // 2. 恢复列宽配置
                                            hot.getSettings?.().colWidths?.splice(targetCol, 0, deletedColWidth);
                                            // 3. 恢复业务数据
                                            allRows.forEach((row, rowIndex) => {
                                                if (row.tableCells && deletedColData[rowIndex]) {
                                                    row.tableCells.splice(targetCol, 0, deletedColData[rowIndex]);
                                                }
                                            });
                                            console.log(allRows)
                                            // 4. 通知外部恢复
                                            externalMethods.unRemoveCol?.({ col: targetCol, colData: deletedColData });
                                            // hot.render();
                                            console.log(getCloneConfig())
                                            console.log(`【撤销】删除选中列: 恢复列${targetCol}`);
                                        }
                                    },
                                    // redoFn：重做删除列（重新删除）
                                    (actionResult) => {
                                        const { targetCol } = actionResult;
                                        if (hot) {
                                            // 1. 重新执行原生删除列
                                            hot.alter('remove_col', targetCol);
                                            // 2. 同步删除业务数据
                                            allRows.forEach(row => {
                                                if (row.tableCells) {
                                                    row.tableCells.splice(targetCol, 1);
                                                }
                                            });
                                            // 3. 恢复列宽配置
                                            hot.getSettings?.().colWidths?.splice(targetCol, 1);
                                            // 4. 通知外部重做
                                            externalMethods.removeCol?.({ col: targetCol });
                                            // hot.render();
                                            console.log(getCloneConfig())
                                            console.log(`【重做】删除选中列: 执行hot.alter('remove_col', ${targetCol})`);
                                        }
                                    }
                                );
                            }
                        }
                    ]
                }
            },
            sp4: '---------',
            // 单元格操作
            cell: {
                name: '单元格操作',
                submenu: {
                    items: [
                        {
                            key: 'cell:merge',
                            name: '合并选中单元格',
                            callback() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中要合并的单元格区域');
                                    return;
                                }

                                const [startRow, startCol, endRow, endCol] = selected[0];
                                const mergePlugin = hot.getPlugin('mergeCells');

                                var mergerCells = mergePlugin.mergedCellsCollection.mergedCells;
                                var newMergerList = [];
                                mergerCells.map(item => {
                                    if (endRow == item.row) {
                                        newMergerList.push({
                                            row: item.row,
                                            col: item.col,
                                            rowspan: item.rowspan,
                                            colspan: item.colspan,
                                        })
                                    }
                                });
                                console.log(getCloneConfig())

                                withUndo(
                                    '合并选中单元格',
                                    // actionFn：执行插入列（记录关键数据）
                                    () => {
                                        // 合并单元格
                                        var data = hot.getData(startRow, startCol, endRow, endCol);
                                        var newData = [];
                                        data.forEach((rowData, relativeRowIndex) => {
                                            // 计算实际行索引
                                            const actualRow = startRow + relativeRowIndex;
                                            // 遍历列（data中的列索引是相对索引，需要+startCol得到实际列号）
                                            rowData.forEach((cellValue, relativeColIndex) => {
                                                const actualCol = startCol + relativeColIndex;
                                                // 组装 [行, 栏, 值] 子数组并加入新数组
                                                newData.push([actualRow, actualCol, cellValue]);
                                            });
                                        });

                                        var oldCloneConfig = externalMethods.mergeCell?.({ mergeList: selected[0] });

                                        mergePlugin.mergeSelection();
                                        return {
                                            actionType: 'mergeCell',
                                            mergeList: selected[0],
                                            newData,
                                            oldCloneConfig,
                                        };
                                    },
                                    // redoFn：重做插入列（根据记录删除列）
                                    (actionResult) => {
                                        var { newData, oldCloneConfig } = actionResult;
                                        hot.setDataAtCell(newData)
                                        mergePlugin.unmergeSelection();
                                        newMergerList.forEach((item) => {
                                            mergePlugin.merge(item.row,
                                                item.col,
                                                item.rowspan == 1 ? item.row : item.row + item.rowspan - 1,
                                                item.colspan == 1 ? item.col : item.col + item.colspan - 1);
                                        });
                                        externalMethods.mergeCellUndo?.({ oldCloneConfig: oldCloneConfig });
                                    },
                                    // 取消合并
                                    (actionResult) => {
                                        mergePlugin.mergeSelection();
                                        externalMethods.mergeCell?.({ mergeList: selected[0] });
                                    }
                                )
                            },
                            disabled() {
                                const hot = this;
                                const selected = hot.getSelected();
                                const [startRow, startCol, endRow, endCol] = selected[0];
                                if (startRow !== endRow || startCol !== endCol) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        },
                        {
                            key: 'cell:unmerge',
                            name: '取消单元格合并',
                            callback() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中已合并的单元格');
                                    return;
                                }

                                const [startRow, startCol, endRow, endCol] = selected[0];
                                const mergePlugin = hot.getPlugin('mergeCells');
                                var mergerCells = mergePlugin.mergedCellsCollection.mergedCells;
                                var newMergerList = [];
                                mergerCells.map(item => {
                                    if (endRow == item.row) {
                                        newMergerList.push({
                                            row: item.row,
                                            col: item.col,
                                            rowspan: item.rowspan,
                                            colspan: item.colspan,
                                        })
                                    }
                                });


                                withUndo(
                                    '取消合并选中单元格',
                                    // actionFn：执行插入列（记录关键数据）
                                    () => {
                                        mergePlugin.unmergeSelection();
                                        // 合并单元格


                                        var data = hot.getData(startRow, startCol, endRow, endCol);
                                        var newData = [];
                                        data.forEach((rowData, relativeRowIndex) => {
                                            // 计算实际行索引
                                            const actualRow = startRow + relativeRowIndex;
                                            // 遍历列（data中的列索引是相对索引，需要+startCol得到实际列号）
                                            rowData.forEach((cellValue, relativeColIndex) => {
                                                const actualCol = startCol + relativeColIndex;
                                                // 组装 [行, 栏, 值] 子数组并加入新数组
                                                newData.push([actualRow, actualCol, cellValue]);
                                            });
                                        });

                                        var oldCloneConfig = externalMethods.unMergeCell({ mergeList: selected[0] })

                                        console.log(getCloneConfig())
                                        return {
                                            actionType: 'mergeCell',
                                            mergeList: selected[0],
                                            newData,
                                            oldCloneConfig,
                                        };
                                    },
                                    // redoFn：重做插入列（根据记录删除列）
                                    (actionResult) => {
                                        var { newData, oldCloneConfig } = actionResult;
                                        hot.setDataAtCell(newData)
                                        mergePlugin.unmergeSelection();
                                        newMergerList.forEach((item) => {
                                            mergePlugin.merge(item.row,
                                                item.col,
                                                item.rowspan == 1 ? item.row : item.row + item.rowspan - 1,
                                                item.colspan == 1 ? item.col : item.col + item.colspan - 1);
                                        });
                                        console.log(oldCloneConfig)
                                        externalMethods.mergeCellUndo?.({ oldCloneConfig: oldCloneConfig });

                                        console.log(getCloneConfig())


                                    },
                                    // 取消合并
                                    (actionResult) => {
                                        mergePlugin.unmergeSelection();
                                        externalMethods.unMergeCell({ mergeList: selected[0] })
                                    }
                                )
                            },
                            disabled() {
                                const hot = this;
                                const selected = hot.getSelected();
                                const [startRow, startCol, endRow, endCol] = selected[0];
                                if (startRow !== endRow || startCol !== endCol) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        }
                    ]
                },
                hidden() {
                    const hot = this;
                    const selected = hot.getSelected();
                    const [startRow, startCol, endRow, endCol] = selected[0];
                    console.log(startRow, endRow)
                    var sectionInfo = getSectionInfo(startRow, getCloneConfig());
                    var endSectionInfo = getSectionInfo(endRow, getCloneConfig());
                    console.log(sectionInfo, endSectionInfo)
                    if (sectionInfo.key !== endSectionInfo.key) {
                        return true;
                    } else {
                        if (sectionInfo.key == 'groupHeaders' || endSectionInfo.key == 'groupFooters') {
                            if (sectionInfo.index !== endSectionInfo.index) {
                                return true;
                            }
                        }
                    }
                }
            },
            sp5: '---------',
            // 分组操作
            grouping: {
                name: '分组操作',
                submenu: {
                    items: [
                        {
                            key: 'grouping:add',
                            name: '插入分组',
                            callback() {

                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中表格内容区域的行');
                                    return;
                                }

                                // 计算目标行
                                const targetRow = sectionRowCounts.header + sectionRowCounts.groupHeaders;
                                const rowInfo = groupInfo.rowMap[targetRow] || {};

                                if (rowInfo.section !== 'details') {
                                    alert('仅支持在表格内容区域插入分组');
                                    return;
                                }

                                // 生成新分组信息
                                const newGroupId = `group_${groupInfo.groups.length}`;
                                const newGroupInd = groupInfo.groups.length + 1;

                                // 构建分组头行
                                const groupHeaderRow = {
                                    tableCells: [{
                                        item: {
                                            value: ``,
                                            style: {
                                                backgroundColor: '#f0f2f5',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }
                                        },
                                        colSpan: colCount,
                                        rowSpan: 1
                                    }],
                                    height: DEFAULT_GROUP_HEIGHT,
                                    section: 'groupHeader',
                                    groupId: newGroupId,
                                    groupInd: newGroupInd
                                };

                                // 构建分组尾行
                                const groupFooterRow = {
                                    tableCells: [{
                                        item: {
                                            value: ``,
                                            style: {
                                                backgroundColor: '#f0f2f5',
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                verticalAlign: 'middle'
                                            }
                                        },
                                        colSpan: colCount,
                                        rowSpan: 1
                                    }],
                                    height: DEFAULT_GROUP_HEIGHT,
                                    section: 'groupFooter',
                                    groupId: newGroupId,
                                    groupInd: newGroupInd
                                };

                                withUndo(
                                    '插入分组',
                                    // actionFn：执行插入列（记录关键数据）
                                    () => {
                                        // 插入行
                                        hot.alter('insert_row_above', targetRow);
                                        hot.alter('insert_row_below', targetRow + sectionRowCounts.details);
                                        externalMethods.insertRowGroup?.({ groupIndex: targetRow });

                                        // 更新allRows
                                        allRows.splice(targetRow, 0, groupHeaderRow);
                                        allRows.splice(targetRow + sectionRowCounts.details + 1, 0, groupFooterRow);
                                        console.log(allRows)
                                        // 更新分组信息
                                        const newGroupData = {
                                            id: newGroupId,
                                            name: `分组${newGroupInd}`,
                                            expression: '',
                                            headerRows: [targetRow],
                                            footerRows: [targetRow + sectionRowCounts.details],
                                            startRow: targetRow,
                                            endRow: targetRow + sectionRowCounts.details
                                        };
                                        groupInfo.groups.push(newGroupData);

                                        // 更新映射和计数
                                        groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                        updateSectionRowCounts(allRows, sectionRowCounts);
                                        externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                        console.log(getCloneConfig())
                                        hot.render();

                                    },
                                    // redoFn：重做插入列（根据记录删除列）
                                    (actionResult) => {
                                        hot.undoRedo.undo();
                                        hot.undoRedo.undo();

                                        externalMethods.removeRowGroup?.({ groupIndex: targetRow + sectionRowCounts.details });
                                        allRows.splice(targetRow, 1);
                                        allRows.splice(targetRow + sectionRowCounts.details, 1);
                                        groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                        updateSectionRowCounts(allRows, sectionRowCounts);
                                        externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                        console.log(getCloneConfig(), allRows)
                                    },
                                    // 取消合并
                                    (actionResult) => {
                                        // 插入行
                                        hot.alter('insert_row_above', targetRow);
                                        hot.alter('insert_row_below', targetRow + sectionRowCounts.details);
                                        externalMethods.insertRowGroup?.({ groupIndex: targetRow });

                                        // 更新allRows
                                        allRows.splice(targetRow, 0, groupHeaderRow);
                                        allRows.splice(targetRow + sectionRowCounts.details + 1, 0, groupFooterRow);
                                        console.log(allRows)
                                        // 更新分组信息
                                        const newGroupData = {
                                            id: newGroupId,
                                            name: `分组${newGroupInd}`,
                                            expression: '',
                                            headerRows: [targetRow],
                                            footerRows: [targetRow + sectionRowCounts.details],
                                            startRow: targetRow,
                                            endRow: targetRow + sectionRowCounts.details
                                        };
                                        groupInfo.groups.push(newGroupData);

                                        // 更新映射和计数
                                        groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                        updateSectionRowCounts(allRows, sectionRowCounts);
                                        externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                        console.log(getCloneConfig())
                                        hot.render();
                                    }
                                )


                            },
                            disabled() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) return true;
                                const targetRow = selected[0][0];
                                const rowInfo = groupInfo.rowMap[targetRow] || {};
                                return rowInfo.section !== 'details';
                            }
                        },
                        {
                            key: 'grouping:remove',
                            name: '删除分组',
                            callback() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) {
                                    alert('请先选中要删除的分组头或分组尾行');
                                    return;
                                }

                                // 获取分组信息
                                const selectedRow = selected[0][0];
                                const rowInfo = groupInfo.rowMap[selectedRow] || {};

                                const groupId = rowInfo.groupId;

                                if (!groupId) {
                                    alert('请选中分组头或分组尾行进行删除');
                                    return;
                                }

                                // 查找分组数据
                                const groupData = groupInfo.groups.find(g => g.id === groupId);


                                var groupIndexList = [];
                                for (let i in groupInfo.rowMap) {
                                    if (groupInfo.rowMap[i].groupId === groupId) {
                                        groupIndexList.push(i);
                                    }
                                }


                                // 收集要删除的行
                                const rowsToDelete = groupIndexList
                                    .sort((a, b) => b - a); // 从后往前删，避免索引偏移

                                const mergePlugin = hot.getPlugin('mergeCells');
                                var mergerCells = mergePlugin.mergedCellsCollection.mergedCells;
                                var newMergerList = [];
                                mergerCells.map(item => {
                                    newMergerList.push({
                                        row: item.row,
                                        col: item.col,
                                        rowspan: item.rowspan,
                                        colspan: item.colspan,
                                    })
                                });


                                withUndo(
                                    '插入分组',
                                    // actionFn：执行插入列（记录关键数据）
                                    () => {

                                        const rowHeightList = [];

                                        const emptyRowList = [];
                                        const sectionInfo = [];




                                        // 删除行
                                        rowsToDelete.forEach(i => {
                                            rowHeightList.push({
                                                index: i,
                                                height: hot.getRowHeight(i),
                                            })
                                            emptyRowList.push(allRows[i]);

                                            sectionInfo.push(getSectionInfo(i, getCloneConfig()))

                                            hot.alter('remove_row', Number(i));
                                            allRows.splice(i, 1);
                                        });

                                        var removeGroupData = externalMethods.removeRowGroup?.({ groupIndex: selectedRow });

                                        // 移除分组信息
                                        groupInfo.groups = groupInfo.groups.filter(g => g.id !== groupId);

                                        // 更新剩余分组的行号
                                        const deletedCount = rowsToDelete.length;
                                        groupInfo.groups.forEach(group => {
                                            if (group.startRow > groupData.startRow) {
                                                const offset = deletedCount;
                                                group.startRow -= offset;
                                                group.endRow -= offset;
                                                group.headerRows = group.headerRows.map(row => row - offset);
                                                group.footerRows = group.footerRows.map(row => row - offset);
                                            }
                                        });

                                        // 更新映射和计数
                                        groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                        updateSectionRowCounts(allRows, sectionRowCounts);
                                        externalMethods.updateSectionRowCounts?.(sectionRowCounts);

                                        // 重新排序分组编号
                                        reorderGroupNumbers(hot, allRows, groupInfo.groups);

                                        hot.render();


                                        return {
                                            // actionType: 'remove_row',
                                            rowsToDelete,
                                            rowData: emptyRowList,
                                            sectionInfo,
                                            removeGroupData,
                                            mergerCells: newMergerList,
                                            rowHeightList,
                                        };
                                    },
                                    // redoFn：重做插入列（根据记录删除列）
                                    (actionResult) => {


                                        const { targetRow, startIndex, totalLength, rowData, sectionInfo, mergerCells, rowHeightList, rowsToDelete, removeGroupData } = actionResult;

                                        const newRowsToDelete = rowsToDelete.reverse();
                                        const newRowData = rowData.reverse();

                                        if (hot) {


                                            newRowsToDelete.forEach(rowNum => {
                                                hot.undoRedo.undo();
                                            });


                                            console.log(newRowData)
                                            newRowData.map((item, index) => {
                                                allRows.splice(newRowsToDelete[index], 0, item);
                                            })


                                            // 更新映射和计数
                                            groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                            console.log('重做插入行', groupInfo)

                                            updateSectionRowCounts(allRows, sectionRowCounts);
                                            externalMethods.updateSectionRowCounts?.(sectionRowCounts);
                                            console.log(sectionInfo, newRowData);
                                            externalMethods.unRemoveRowGroup?.({ removeGroupData });
                                            console.log(getCloneConfig(), allRows)

                                            const mergePlugin = hot.getPlugin('mergeCells');
                                            mergerCells.forEach((item) => {
                                                mergePlugin.merge(item.row,
                                                    item.col,
                                                    item.rowspan == 1 ? item.row : item.row + item.rowspan - 1,
                                                    item.colspan == 1 ? item.col : item.col + item.colspan - 1);
                                            });
                                            console.log('重做插入行', allRows)
                                            var manualRowResizePlugin = hot.getPlugin('manualRowResize');
                                            rowHeightList.map(item => {
                                                manualRowResizePlugin.setManualSize(item.index, item.height);
                                            })
                                        }




                                    },
                                    // 取消合并
                                    (actionResult) => {
                                        const { targetRow, startIndex, totalLength, rowData, sectionInfo, mergerCells, rowHeightList, rowsToDelete, removeGroupData } = actionResult;
                                        console.log(rowsToDelete)
                                        const newRowsToDelete = rowsToDelete.reverse();
                                        const newRowData = rowData.reverse();
                                        // 删除行
                                        newRowsToDelete.forEach(i => {
                                            hot.alter('remove_row', Number(i));
                                            allRows.splice(i, 1);
                                        });

                                        externalMethods.removeRowGroup?.({ groupIndex: selectedRow });

                                        // 移除分组信息
                                        groupInfo.groups = groupInfo.groups.filter(g => g.id !== groupId);

                                        // 更新剩余分组的行号
                                        const deletedCount = newRowsToDelete.length;
                                        groupInfo.groups.forEach(group => {
                                            if (group.startRow > groupData.startRow) {
                                                const offset = deletedCount;
                                                group.startRow -= offset;
                                                group.endRow -= offset;
                                                group.headerRows = group.headerRows.map(row => row - offset);
                                                group.footerRows = group.footerRows.map(row => row - offset);
                                            }
                                        });

                                        // 更新映射和计数
                                        groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);
                                        updateSectionRowCounts(allRows, sectionRowCounts);
                                        externalMethods.updateSectionRowCounts?.(sectionRowCounts);

                                        // 重新排序分组编号
                                        reorderGroupNumbers(hot, allRows, groupInfo.groups);
                                        console.log(getCloneConfig())
                                        hot.render();

                                    }
                                )


                            },
                            disabled() {
                                const hot = this;
                                const selected = hot.getSelected();
                                if (!selected || selected.length === 0) return true;
                                const selectedRow = selected[0][0];
                                const rowInfo = groupInfo.rowMap[selectedRow] || {};

                                if (rowInfo.section === 'groupFooter' || rowInfo.section === 'groupHeader') {
                                    return false;
                                } else {
                                    return true;
                                }

                            }
                        }
                    ]
                }
            }
        }
    };
};

/**
 * 将JSON配置转换为Handsontable配置的核心函数
 * @param {Object} tableJson - 原始表格JSON配置
 * @param {Object} externalMethods - 外部方法集合
 * @param {Object} getCloneConfig() - 克隆配置（可选）
 * @returns {Object} Handsontable完整配置
 */
export default function convertJsonToHandsontableConfig(tableJson, externalMethods = {}, getCloneConfig, getSectionInfo, getProps, selectedIndex) {
    // 初始化核心数据结构
    const allRows = [];
    const sectionRowCounts = {
        header: 0,
        groupHeaders: 0,
        details: 0,
        groupFooters: 0,
        footer: 0
    };
    const groupInfo = {
        groups: [],
        rowMap: {}
    };

    // 初始化渲染器
    registerCustomRenderers(getProps, getCloneConfig, selectedIndex);

    // 处理基础Header
    if (tableJson.header?.tableRows) {
        sectionRowCounts.header = tableJson.header.tableRows.length;
        tableJson.header.tableRows.forEach(row => {
            allRows.push({ ...row, section: 'header', groupId: null });
        });
    }

    // 处理分组
    if (tableJson.tableGroups?.length > 0) {
        tableJson.tableGroups.forEach((group, groupIndex) => {
            const groupId = `group_${groupIndex}`;
            const groupInd = groupIndex + 1;
            const groupData = {
                id: groupId,
                name: group.group?.name || `分组${groupIndex + 1}`,
                expression: group.group?.groupExpressions?.[0] || '',
                headerRows: [],
                footerRows: [],
                startRow: allRows.length,
                endRow: 0
            };

            // 处理分组Header
            if (group.header?.tableRows) {
                const groupHeaderRows = group.header.tableRows;
                groupData.headerRows = groupHeaderRows.map((_, idx) => allRows.length + idx);

                groupHeaderRows.forEach(row => {
                    allRows.push({ ...row, section: 'groupHeader', groupId, groupInd });
                });

                sectionRowCounts.groupHeaders += groupHeaderRows.length;
                groupData.endRow = allRows.length - 1;
            }

            // 暂存分组Footer（后续插入到details之后）
            if (group.footer?.tableRows) {
                groupData.footerRowsData = group.footer.tableRows;
            }

            groupInfo.groups.push(groupData);
        });
    }

    // 处理Details
    if (tableJson.details?.tableRows) {
        sectionRowCounts.details = tableJson.details.tableRows.length;
        tableJson.details.tableRows.forEach(row => {
            allRows.push({
                ...row,
                section: 'details',
                groupId: tableJson.tableGroups?.length > 0 ? `group_0` : null
            });
        });
    }

    // 处理分组Footer（倒序插入）
    if (tableJson.tableGroups?.length > 0) {
        [...tableJson.tableGroups].reverse().forEach((group, reversedIndex) => {
            const originalGroupIndex = tableJson.tableGroups.length - 1 - reversedIndex;
            const groupId = `group_${originalGroupIndex}`;
            const groupInd = originalGroupIndex + 1;
            const groupData = groupInfo.groups.find(g => g.id === groupId);

            if (group.footer?.tableRows && groupData) {
                const groupFooterRows = group.footer.tableRows;
                groupData.footerRows = groupFooterRows.map((_, idx) => allRows.length + idx);
                groupData.endRow = allRows.length + groupFooterRows.length - 1;

                groupFooterRows.forEach(row => {
                    allRows.push({ ...row, section: 'groupFooter', groupId, groupInd });
                });

                sectionRowCounts.groupFooters += groupFooterRows.length;
            }
        });
    }

    // 处理基础Footer
    if (tableJson.footer?.tableRows) {
        sectionRowCounts.footer = tableJson.footer.tableRows.length;
        tableJson.footer.tableRows.forEach(row => {
            allRows.push({ ...row, section: 'footer', groupId: null });
        });
    }

    // 构建行映射表
    groupInfo.rowMap = buildRowMap(allRows, groupInfo.groups);

    // 构建表格数据和合并配置
    const colCount = tableJson.tableColumns?.length || 0;
    const data = [];
    const mergeCells = [];
    const cellStyles = [];
    const cellStyleCache = {};

    // 处理每一行数据
    allRows.forEach((row, rowIndex) => {
        const rowData = new Array(colCount).fill('');
        let colIndex = 0;

        // 处理空行
        if (!row.tableCells) {
            data.push(rowData);
            return;
        }

        // 处理单元格
        row.tableCells.forEach((cell, cellIndex) => {
            if (!cell) {
                colIndex++;
                return;
            }

            // 获取单元格值
            const cellValue = cell.item?.value || '';

            // 处理合并单元格
            if (cell.colSpan) {
                for (let i = 0; i < cell.colSpan; i++) {
                    rowData[cellIndex + i] = i === 0 ? cellValue : '';
                }
                if (cell.colSpan > 1) {
                    mergeCells.push({
                        row: rowIndex,
                        col: cellIndex,
                        rowspan: 1,
                        colspan: cell.colSpan
                    });
                }
                colIndex += cell.colSpan;
            } else if (cell.rowSpan && cell.rowSpan > 1) {
                rowData[cellIndex] = cellValue;
                mergeCells.push({
                    row: rowIndex,
                    col: cellIndex,
                    rowspan: cell.rowSpan,
                    colspan: 1
                });
                colIndex++;
            } else {
                rowData[cellIndex] = cellValue;
                colIndex++;
            }

            // 处理单元格样式
            if (cell.item) {
                const style = convertStyle(cell.item.style);
                const cacheKey = `${rowIndex}-${cellIndex}`;
                cellStyles.push({
                    row: rowIndex,
                    col: cellIndex,
                    style: { ...style },
                    expand: cell.item.expand,
                });
                cellStyleCache[cacheKey] = style;
            }
        });
        data.push(rowData);
    });

    // 构建列配置
    //   const columns = tableJson.tableColumns?.map(() => ({
    //     renderer: 'customRenderer'
    //   })) || [];

    // 构建列宽配置
    const colWidths = tableJson.tableColumns?.map(col => {
        if (col.width) {
            const cmValue = parseFloat(col.width);
            return isNaN(cmValue) ? DEFAULT_COL_WIDTH : cmValue - 0.2;
        }
        return DEFAULT_COL_WIDTH;
    }) || [];

    // 构建行高配置
    const rowHeights = allRows.map(row => {
        if (row.height) {
            const cmValue = parseFloat(row.height);
            return isNaN(cmValue) ? DEFAULT_ROW_HEIGHT : cmValue;
        }
        return DEFAULT_ROW_HEIGHT;
    });

    // 单元格配置函数
    const cells = (row, col) => ({
        renderer: 'negativeValueRenderer'
    });


    // 构建右键菜单
    const contextMenuSettings = buildContextMenu({
        colCount,
        allRows,
        sectionRowCounts,
        groupInfo,
        externalMethods,
        updateSectionRowCounts,
        buildRowMap,
        tableJson,
        getCloneConfig,
        getSectionInfo,
    });

    // 构建行头渲染函数
    const renderRowHeader = (visualRowIndex) => {
        let prefix = '';
        const rowInfo = groupInfo.rowMap[visualRowIndex] || {};

        switch (rowInfo.section) {
            case 'header':
                prefix = SVG_TOP;
                break;
            case 'groupHeader':
            case 'groupFooter':
                prefix = SVG_GROUP + (rowInfo.groupInd || '');
                break;
            case 'details':
                prefix = SVG_CONT;
                break;
            case 'footer':
                prefix = SVG_BOTTOM;
                break;
            default:
                prefix = '';
        }

        return prefix;
    };


    const handleWidth = () => {
        console.log(colWidths)
        return colWidths.reduce((acc, cur) => acc + cur + 3, 0) + 50
    }




    // 基础配置
    const baseConfig = {
        language: "zh-CN",
        data,
        colHeaders: () => '',
        rowHeaders: renderRowHeader,
        colWidths,
        rowHeights,
        // height: 'auto',
        // // width: colWidths.reduce((acc, cur) => acc + cur + 3 , 0) + 50,
        // width: tableJson.width ? parseFloat(tableJson.width) + 50 : 500,
        // height: 'auto',
        // width:handleWidth,
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
        // autoWrapRow: true,
        // autoWrapCol: true,
        cell: cellStyles,
        cells,
        // 附加数据（供外部使用）
        sectionRowCounts: { ...sectionRowCounts },
        mergeCells,

    };





    // 合并克隆配置，返回最终配置
    return { ...baseConfig };
}