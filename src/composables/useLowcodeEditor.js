/**
 * 低代码编辑器通用Composables
 * 升级说明：适配三个独立组件集合，封装分区快捷方法，与原有逻辑解耦
 * 兼容说明：原有画布组件操作逻辑完全保留，无修改
 */
import { ref, computed, watch, onUnmounted } from 'vue';
import { lowcodeBridge } from '@/utils/lowcodeDataBridge';
import { useUndoManager } from "@/utils/undoManager";
import deepClone from '@/utils/deepClone';

export function useLowcodeEditor() {
    // ===================== 1. 响应式状态：解构页面配置+三个独立组件集合+全局选中 =====================
    // 页面/分区基础布局配置
    const pageConfig = computed(() => lowcodeBridge.data.pageConfig);
    const pageBase = computed(() => lowcodeBridge.data.pageConfig.page); // 页面基础（宽高/边距）
    const pageHeaderLayout = computed(() => lowcodeBridge.data.pageConfig.pageHeader); // 页眉布局
    const pageFooterLayout = computed(() => lowcodeBridge.data.pageConfig.pageFooter); // 页脚布局

    // 三个独立组件集合（严格对应中间桥，响应式透传）
    const canvasComps = computed(() => lowcodeBridge.data.reportItemsComps);
    const pageHeaderComps = computed(() => lowcodeBridge.data.pageHeaderComps);
    const pageFooterComps = computed(() => lowcodeBridge.data.pageFooterComps);

    // 全局选中组件+是否有选中
    const selectedComp = computed(() => lowcodeBridge.data.selectedComp);
    const selectedPageType = computed(() => lowcodeBridge.data.selectedPageType);
    const selectedIndex = computed(() => lowcodeBridge.data.selectedIndex);
    const hasSelectedComp = computed(() => !!selectedComp.value);

    // 新增：表格单元格多选中状态（核心）
    const selectedTableCells = computed(() => lowcodeBridge.data.selectedTableCells); // 选中的单元格数组
    const isTableSelectMode = computed(() => lowcodeBridge.data.isTableSelectMode); // 是否为表格选中模式
    const hasSelectedTableCells = computed(() => selectedTableCells.value.length > 0); // 是否有选中的单元格

    // const updateSelectedCellCallBack = computed(() => lowcodeBridge.data.updateSelectedCellCallBack); // 表格单元格选中状态更新回调函数

    // ===================== 2. 通用操作方法：封装桥的API，简化分区调用 =====================
    // --- 画布组件专属方法（原有逻辑保留，默认section=canvas）---
    const addComp = (pageType, compProps = {}) => {
        var index = -1;
        switch (pageType) {
            case 'canvas':
                index = canvasComps.value.length;
                break;
            case 'pageHeader':
                index = pageHeaderComps.value.length;
                break;
            case 'pageFooter':
                index = pageFooterComps.value.length;
                break;
            default:
                break;
        }
        var oldPageType = pageType;
        useUndoManager().add({
            undo: () => {
                return lowcodeBridge.api.deleteComp(oldPageType, index);
            },
            redo: () => {
                return lowcodeBridge.api.addComponent(oldPageType, compProps);
            },
        });
        return lowcodeBridge.api.addComponent(pageType, compProps);
    };
    const deleteComp = () => {
        var comp = selectedComp.value;
        var index = selectedIndex.value;
        var pageType = selectedPageType.value;
        useUndoManager().add({
            undo: () => {
                return lowcodeBridge.api.addComponent(pageType, comp, index);
            },
            redo: () => {
                setTimeout(() => {
                    selectComp({
                        type: "page",
                        ...pageBase.value,
                    });
                })
                return lowcodeBridge.api.deleteComp(pageType, index);
            },
        });
        setTimeout(() => {
            selectComp({
                type: "page",
                ...pageBase.value,
            });
        })

        return lowcodeBridge.api.deleteComp(selectedPageType.value, selectedIndex.value);
    };
    const updateCanvasComp = (targetComp, newProps) => {
        return lowcodeBridge.api.updateCompProps('canvas', targetComp, newProps);
    };
    const updateCompProps = (targetComp, newProps) => {
        var oldData = deepClone(selectedComp.value);
        var keys = Object.keys(newProps);
        var oldProps = {};
        keys.map(item => {
            oldProps[item] = oldData[item];
        })


        useUndoManager().add({
            undo: () => {
                return lowcodeBridge.api.updateCompProps(selectedPageType.value, selectedIndex.value, targetComp, oldProps);
            },
            redo: () => {
                return lowcodeBridge.api.updateCompProps(selectedPageType.value, selectedIndex.value, targetComp, newProps);
            },
        });
        return lowcodeBridge.api.updateCompProps(selectedPageType.value, selectedIndex.value, targetComp, newProps);
    }



    //更新完整组件
    const updateComp = (pageType, index, newComp) => {
        // var oldComp = deepClone(lowcodeBridge.api.getComp(pageType, index));
        // console.log(oldComp)
        // useUndoManager().add({
        //     undo: () => {
        //         return lowcodeBridge.api.updateComp(pageType, index, oldComp);
        //     },
        //     redo: () => {
        //         return lowcodeBridge.api.updateComp(pageType, index, newComp);
        //     },
        // });


        return lowcodeBridge.api.updateComp(pageType, index, newComp);
    }

    const deleteCanvasComp = (targetComp) => {
        return lowcodeBridge.api.deleteComp('canvas', targetComp);
    };


    // --- 页眉组件专属方法 ---
    const addPageHeaderOrFooter = (props = {}) => {
        return lowcodeBridge.api.addPageHeaderOrFooter(props);
    }
    const deletePageHeaderOrFooter = (pageType) => {
        return lowcodeBridge.api.deletePageHeaderOrFooter(pageType);
    }
    const addPageHeaderComp = (compProps = {}) => {
        return lowcodeBridge.api.addComponent('pageHeader', compProps);
    };
    const updatePageHeaderComp = (targetComp, newProps) => {
        return lowcodeBridge.api.updateCompProps('pageHeader', targetComp, newProps);
    };
    const deletePageHeaderComp = (targetComp) => {
        return lowcodeBridge.api.deleteComp('pageHeader', targetComp);
    };

    // --- 页脚组件专属方法 ---

    const addPageFooterComp = (compProps = {}) => {
        return lowcodeBridge.api.addComponent('pageFooter', compProps);
    };
    const updatePageFooterComp = (targetComp, newProps) => {
        return lowcodeBridge.api.updateCompProps('pageFooter', targetComp, newProps);
    };
    const deletePageFooterComp = (targetComp) => {
        return lowcodeBridge.api.deleteComp('pageFooter', targetComp);
    };

    // --- 全局通用方法 ---
    const selectComp = (comp, pageType, index) => { // 全局选中组件
        lowcodeBridge.api.setSelectedComp(comp, pageType, index);
    };

    // --- 新增：表格单元格多选中专属方法（与普通组件方法平级）---
    /**
     * 表格单元格单条选中（支持追加/覆盖）
     * @param {object} cell 单元格对象（含cellKey）
     * @param {object} comp 表格组件对象（含compKey）
     * @param {string} pageType 所属分区/页面类型
     * @param {number} index 表格所在组件索引
     * @param {function} updateCallBack 选中状态更新回调函数（可选）
     */
    const selectTableCell = (cell, comp, pageType, index, updateCallBack) => {
        lowcodeBridge.api.setSelectedComp(comp, pageType, index);
        return lowcodeBridge.api.selectTableCell(cell, updateCallBack);
    };

    /**
     * 表格单元格批量选中
     * @param {array} cells 单元格数组
     * @param {string} pageType 所属分区/页面类型
     * @param {number} index 表格所在组件索引
     */
    const batchSelectTableCells = (cells, pageType, index) => {
        return lowcodeBridge.api.batchSelectTableCells(cells, pageType, index);
    };

    /**
     * 移除单个选中的表格单元格
     * @param {string} cellKey 单元格唯一标识
     */
    const removeSelectedTableCell = (cellKey) => {
        return lowcodeBridge.api.removeSelectedTableCell(cellKey);
    };

    /**
     * 清空所有选中的表格单元格
     */
    const clearSelectedTableCells = () => {
        lowcodeBridge.api.clearSelectedTableCells();
    };

    /**
     * 表格单元格反选（点选切换选中状态）
     * @param {object} cell 单元格对象（含cellKey）
     * @param {string} pageType 所属分区/页面类型
     * @param {number} index 表格所在组件索引
     */
    const toggleTableCell = (cell, pageType, index) => {
        return lowcodeBridge.api.toggleTableCell(cell, pageType, index);
    };



    const getCurrentSection = () => {
        // 边界处理：避免空值报错
        if (!selectedComp.value || !pageHeaderLayout.value || !pageFooterLayout.value) {
            return 'canvas';
        }

        // 移除冗余深拷贝，解构排除isActive
        const { isActive, ...matchComp } = selectedComp.value;

        // 🔥 通用深度内容比较函数：纯对象/基本类型通用，自动排除null/undefined
        const isObjectEqual = (obj1, obj2) => {
            // 同一引用/基本类型值相等，直接返回true
            if (obj1 === obj2) return true;
            // 其中一个不是对象/为null，直接不相等
            if (
                typeof obj1 !== 'object' || obj1 === null ||
                typeof obj2 !== 'object' || obj2 === null
            ) {
                return false;
            }
            // 获取两个对象的自身属性键（排除继承属性）
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);
            // 键的数量不一致，直接不相等
            if (keys1.length !== keys2.length) return false;
            // 递归遍历所有属性，比较值
            for (const key of keys1) {
                if (!isObjectEqual(obj1[key], obj2[key])) {
                    return false;
                }
            }
            return true;
        };

        // 依次匹配页头、页脚
        if (pageHeaderLayout.value.reportItems?.find(item => isObjectEqual(item, matchComp))) {
            return 'pageHeader';
        }
        if (pageFooterLayout.value.reportItems?.find(item => isObjectEqual(item, matchComp))) {
            return 'pageFooter';
        }
        return 'canvas';
    }
    const updatePageBase = (newProps) => { // 更新页面基础配置
        return lowcodeBridge.api.updatePageBase(newProps);
    };
    const updatePageHeaderLayout = (newProps) => { // 更新页眉布局（高度等）
        return lowcodeBridge.api.updatePageHeaderBase(newProps);
    };
    const updatePageFooterLayout = (newProps) => { // 更新页脚布局（高度等）
        return lowcodeBridge.api.updatePageFooterBase(newProps);
    };

    // ===================== 3. 封装监听逻辑：自动销毁，避免内存泄漏 =====================
    /**
     * 监听全局选中组件变化
     * @param {Function} callback 回调
     * @param {boolean} immediate 是否立即执行
     * @returns {Function} 停止监听方法
     */
    const watchSelectedComp = (callback, immediate = false) => {
        const watcher = watch(selectedComp, callback, { immediate });
        onUnmounted(() => watcher());
        return watcher;
    };



    // ===================== 4. 快捷方法：处理组件输入/样式更新（通用，跨分区）=====================
    /**
     * 处理组件值更新（text/input等，跨分区）
     * @param {string} section 分区
     * @param {object} comp 组件项
     * @param {string} value 新值
     * @returns {boolean} 是否成功
     */
    const handleCompValueChange = (comp, value) => {
        return lowcodeBridge.api.updateCompProps(selectedPageType.value, selectedIndex.value, comp, { value });
    };

    /**
     * 处理组件样式更新（跨分区，支持单个样式属性）
     * @param {string} section 分区
     * @param {object} comp 组件项
     * @param {object} style 样式对象（如{font-size: '10pt'}）
     * @returns {boolean} 是否成功
     */
    const handleCompStyleChange = (section, comp, style) => {
        return lowcodeBridge.api.updateCompProps(section, comp, { style });
    };

    const setInitData = (data) => {
        lowcodeBridge.api.setInitData(data);
    }

    /**
     * 获取指定属性值
     * @param {string} key 属性名（如'pageWidth'）
     * @returns {*} 属性值（null表示未找到）
     */
    const getSpecifiedData = (key) => {
        return lowcodeBridge.api.getSpecifiedData(key);
    }

    /**
     * 设置指定属性值
     * @param {string} key 属性名（如'pageWidth'）
     * @param {*} value 属性值
     * @returns {boolean} 是否成功
     */
    const setSpecifiedData = (key, value) => {
        return lowcodeBridge.api.setSpecifiedData(key, value);
    }



    // ===================== 5. 全局导出/清空方法 =====================
    const getFinalData = () => { // 获取最终数据（匹配你的结构）
        return lowcodeBridge.api.getFinalData();
    };
    const clearAll = () => { // 清空所有数据
        lowcodeBridge.api.clearAll();
    };


    // ===================== 暴露所有状态和方法（按需解构使用）=====================
    return {
        // 页面/分区布局配置
        pageConfig,
        pageBase,
        pageHeaderLayout,
        pageFooterLayout,
        // 三个独立组件集合
        canvasComps,
        pageHeaderComps,
        pageFooterComps,
        // 全局选中状态
        selectedComp,
        selectedPageType,
        selectedIndex,
        hasSelectedComp,
        // 分区专属操作方法（画布/页眉/页脚）
        addComp,
        deleteComp,
        updateComp,
        updateCompProps,
        updateCanvasComp,
        deleteCanvasComp,
        addPageHeaderComp,
        updatePageHeaderComp,
        deletePageHeaderComp,
        addPageFooterComp,
        updatePageFooterComp,
        deletePageFooterComp,
        addPageHeaderOrFooter,
        deletePageHeaderOrFooter,
        // 通用方法
        selectComp,
        updatePageBase,
        updatePageHeaderLayout,
        updatePageFooterLayout,
        watchSelectedComp,
        handleCompValueChange,
        handleCompStyleChange,
        getCurrentSection,
        // 全局方法
        setInitData,
        getSpecifiedData,
        setSpecifiedData,
        getFinalData,
        clearAll,

        // 新增：表格单元格多选中状态
        selectedTableCells,
        isTableSelectMode,
        hasSelectedTableCells,

        // 新增：表格单元格多选中方法
        selectTableCell,
        batchSelectTableCells,
        removeSelectedTableCell,
        clearSelectedTableCells,
        toggleTableCell,
    };
}