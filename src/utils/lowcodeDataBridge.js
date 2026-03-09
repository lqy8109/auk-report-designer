/**
 * 低代码核心数据桥：独立管理canvas/pageHeader/pageFooter三个组件集合
 * 核心设计：1. 三个组件数组完全独立 2. 复用一套增删改API 3. 导出数据严格匹配原始结构
 * 兼容说明：原有画布组件操作逻辑完全保留，无破坏性修改
 */
import { reactive } from 'vue';
import deepClone from './deepClone.js';
import { convertCmToPxInObject, convertPxToCmInObject } from "@/utils/unitConversion.js";


// 生成组件唯一ID（原有方法，保留，用于canvas新增组件）
const generateCompId = () => {
    return `comp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

/**
 * 1. 页面基础配置 + 分区基础布局配置（pageHeader/pageFooter仅保留布局，无reportItems）
 * 完全贴合你给出的原始结构，reportItems为独立组件集合，后续导出自动归位
 */
const DEFAULT_PAGE_CONFIG = {
    pageHeader: {
        "type": "pagesection",
        "height": "1cm",
        "name": "PageHeader",
        "width": ''
    },
    pageFooter: {
        "name": "PageFooter",
        "height": "1cm",
        "type": "pagesection"
    },
    page: {
        "papeDirection": "vertical",
        "pageWidth": "21cm",
        "pageHeight": "29.7cm",
        "rightMargin": "1.7cm",
        "leftMargin": "1.8cm",
        "topMargin": "1.5cm",
        "bottomMargin": "1cm",
        "columns": 1,
        "columnSpacing": "0in",
        "pageType": "A4"
    }
};

/**
 * 2. 三个独立组件集合的初始值（完全匹配你给出的reportItems结构，无任何修改）
 * 严格分离：reportItemsComps/pageHeaderComps/pageFooterComps
 */
const DEFAULT_COMPONENTS = {
    // 页眉组件项：完全等于你的pageHeader.reportItems
    pageHeaderComps: [
        {
            "type": "text",
            "name": "文本框1",
            "canGrow": true,
            "keepTogether": true,
            "value": "时区：北京，重庆，香港特别行政区，乌鲁木齐",
            "style": {
                "font-family": "微软雅黑",
                "padding-left": "2pt",
                "padding-right": "2pt",
                "padding-top": "2pt",
                "padding-bottom": "2pt",
                "font-size": '14'
            },
            "left": "4.999cm",
            "top": "0cm",
            "width": "10.001cm",
            "height": "0.75cm"
        }
    ],
    // 页脚组件项：完全等于你的pageFooter.reportItems
    pageFooterComps: [
        {
            "type": "text",
            "name": "TextBox1",
            "canGrow": true,
            "keepTogether": true,
            "value": "=\"PAGE \" & Globals!PageNumber & \"  / TOTAL \" & Globals!TotalPages",
            "style": {
                "font-size": "8pt",
                "padding-left": "1pt",
                "padding-right": "1pt",
                "text-align": "Right",
                "lineSpacing": "1pt"
            },
            "left": "10cm",
            "top": "0cm",
            "width": "3.179cm",
            "height": "0.5cm"
        }
    ],
    // 画布主体组件项：原有compConfigs，初始为空
    reportItemsComps: []
};

/**
 * 核心响应式数据池（严格独立设计，完全按你的要求）
 * 1. pageConfig：页面+分区基础布局配置（无reportItems）
 * 2. 三个独立组件数组：reportItemsComps/pageHeaderComps/pageFooterComps
 * 3. selectedComp：全局唯一选中组件（跨三个分区，选中任意组件均更新此值）
 */
const dataPool = reactive({
    pageConfig: { ...DEFAULT_PAGE_CONFIG }, // 页面/分区布局配置（高度/边距等）
    reportItemsComps: [...DEFAULT_COMPONENTS.reportItemsComps], // 画布组件独立集合
    pageHeaderComps: [...DEFAULT_COMPONENTS.pageHeaderComps], // 页眉组件独立集合
    pageFooterComps: [...DEFAULT_COMPONENTS.pageFooterComps], // 页脚组件独立集合
    selectedComp: null, // 全局选中组件（跨分区，唯一）
    selectedPageType: null,
    selectedIndex: null,
    // 新增：表格单元格多选中核心状态
    selectedTableCells: [], // 关键：多选中用数组存储所有选中的单元格
    isTableSelectMode: false, // 标记当前是否为表格选中模式（用于互斥判断）

    updateSelectedCellCallBack: null // 表格单元格选中状态更新回调函数
});

/**
 * 桥操作API（核心：一套API支持三个分区，通过section标识区分，逻辑完全复用）
 * section取值：canvas / pageHeader / pageFooter
 */
const bridgeApi = {
    // ===================== 通用：获取指定分区的组件数组（内部方法，辅助API）=====================
    _getCompList: (section) => {
        const sectionMap = {
            canvas: dataPool.reportItemsComps,
            pageHeader: dataPool.pageHeaderComps,
            pageFooter: dataPool.pageFooterComps
        };
        return sectionMap[section] || [];
    },

    /**
     * 设置默认数据（重置所有组件数组为初始值）
     * @param {object} pageConfig 页面配置（包含pageHeader/pageFooter/reportItems）
     */
    setInitData: (pageConfig) => {
        dataPool.pageConfig = deepClone(pageConfig);
        dataPool.reportItemsComps = deepClone(pageConfig.reportItems) || [];
        dataPool.pageHeaderComps = pageConfig.pageHeader?.reportItems ? deepClone(pageConfig.pageHeader.reportItems) : [];
        dataPool.pageFooterComps = pageConfig.pageFooter?.reportItems ? deepClone(pageConfig.pageFooter.reportItems) : [];
        console.log(dataPool);
    },

    // ===================== 组件项核心操作API（复用一套，支持三个分区）=====================
    /**
     * 新增组件项（支持指定分区，canvas默认新增text，页眉/页脚可扩展）
     * @param {string} section 分区：canvas/pageHeader/pageFooter
     * @param {object} compProps 组件属性（匹配reportItems结构，必传）
     * @returns {object} 新增的组件项
     */
    addComponent: (section = 'canvas', compProps = {}, index = -1) => {
        const compList = bridgeApi._getCompList(section);
        // 画布组件自动生成唯一ID（原有逻辑保留），页眉/页脚按你的结构用name标识
        const newComp = {
            id: section === 'canvas' ? generateCompId() : '', // canvas专属ID
            type: 'text', // 默认文本组件，可扩展
            canGrow: true,
            keepTogether: true,
            value: '',
            style: {
                "font-size": "12pt",
                "text-align": "Left",
                "padding-left": "2pt"
            },
            left: "2cm",
            top: "0cm",
            width: "8cm",
            height: "0.75cm",
            ...compProps // 覆盖默认属性，支持自定义
        };
        if (index > -1) {
            compList.splice(index, 0, newComp);
        } else {
            compList.push(newComp);
        }
        console.log(section, index);

        bridgeApi.setSelectedComp(newComp, section, index); // 新增后自动选中
        return newComp;
    },


    /**
     * 设置全局选中组件（跨分区，唯一）
     * @param {object|null} comp 组件项/NULL（NULL为取消选中）
     */
    setSelectedComp: (comp, pageType, index) => {
        // 先清空表格选中状态
        dataPool.updateSelectedCellCallBack = null;
        dataPool.selectedTableCells = [];
        dataPool.isTableSelectMode = false;
        // 原有逻辑保留
        dataPool.selectedComp = comp;
        dataPool.selectedPageType = pageType;
        dataPool.selectedIndex = index;
    },

    /**
     * 新增：表格单元格单条选中（支持追加/覆盖，默认追加）
     * @param {object} cell 表格单元格对象（需包含cellKey/row/col等唯一标识）
     * @param {function} updateCallBack 单元格选中状态更新回调函数
     * @param {boolean} isCover 是否覆盖选中（true=清空原有，false=追加）
     */
    selectTableCell: (cell, updateCallBack) => {
        if (!cell) return false; // 单元格必须有唯一cellKey（如`row-col`）
        dataPool.updateSelectedCellCallBack = updateCallBack;
        dataPool.selectedTableCells = cell;

        return true;
    },

    /**
    * 新增：表格单元格批量选中
    * @param {array} cells 单元格数组（每个项需含cellKey）
    * @param {string} pageType 所属分区/页面类型
    * @param {number} index 表格所在组件索引
    */
    batchSelectTableCells: (cells, pageType, index) => {
        if (!Array.isArray(cells) || cells.length === 0) return false;
        // 互斥逻辑
        dataPool.selectedComp = null;
        dataPool.isTableSelectMode = true;
        // 为每个单元格补充所属标识，去重后赋值
        const uniqueCells = cells.filter(cell => cell.cellKey).map(cell => ({ ...cell, pageType, index }));
        dataPool.selectedTableCells = uniqueCells;
        return true;
    },

    /**
    * 新增：移除单个表格选中单元格
    * @param {string} cellKey 单元格唯一标识
    */
    removeSelectedTableCell: (cellKey) => {
        if (!cellKey) return false;
        dataPool.selectedTableCells = dataPool.selectedTableCells.filter(item => item.cellKey !== cellKey);
        // 若清空，退出表格选中模式
        if (dataPool.selectedTableCells.length === 0) {
            dataPool.isTableSelectMode = false;
        }
        return true;
    },

    /**
     * 新增：清空所有表格选中单元格
     */
    clearSelectedTableCells: () => {
        dataPool.selectedTableCells = [];
        dataPool.isTableSelectMode = false;
    },

    /**
     * 新增：表格单元格反选（已选中则移除，未选中则添加）
     * @param {object} cell 表格单元格对象
     * @param {string} pageType 所属分区/页面类型
     * @param {number} index 表格所在组件索引
     */
    toggleTableCell: (cell, pageType, index) => {
        if (!cell || !cell.cellKey) return false;
        dataPool.isTableSelectMode = true;
        dataPool.selectedComp = null;
        const isExisted = dataPool.selectedTableCells.some(item => item.cellKey === cell.cellKey);
        if (isExisted) {
            // 已选中 → 移除
            bridgeApi.removeSelectedTableCell(cell.cellKey);
        } else {
            // 未选中 → 追加
            bridgeApi.selectTableCell(cell, pageType, index, false);
        }
        return true;
    },


    /**
     * 更新组件（跨分区，支持单个属性）
     * @param {*} section 分区
     * @param {*} setIndex 选中的组件项索引（canvas/pageHeader/pageFooter）
     * @param {*} targetComp 要更新的组件项（直接传对象，精准匹配）
     * @param {*} newProps 要更新的属性（支持style深层更新）
     */
    updateComp: (section, setIndex, newComp) => {
        if (!section  || !newComp) return false;
        const compList = bridgeApi._getCompList(section);

        compList.splice(setIndex, 1, newComp);
        console.log(compList);
    },

    getComp: (section, setIndex) => {
        const compList = bridgeApi._getCompList(section);
        return compList[setIndex];
    },

    /**
     * 更新组件属性（通用：支持三个分区的所有组件，精准匹配）
     * @param {string} section 分区：canvas/pageHeader/pageFooter
     * @param {number} setIndex 选中的组件项索引（canvas/pageHeader/pageFooter）
     * @param {object} targetComp 要更新的组件项（直接传对象，精准匹配）
     * @param {object} newProps 要更新的属性（支持style深层更新）
     * @returns {boolean} 是否更新成功
     */
    updateCompProps: (section, setIndex, targetComp, newProps) => {
        if (!section || !targetComp || !newProps) return false;
        //单元格属性更新 因为不好找具体单元格，所以先更新选中的数据，再回调方法，方法内会整体更新表格数据，再由整体表格数据更新
        if (dataPool.updateSelectedCellCallBack) {
            for (const [key, val] of Object.entries(newProps)) {
                dataPool.selectedComp = {
                    ...dataPool.selectedComp,
                    [key]: val,
                }
                dataPool.updateSelectedCellCallBack({ [key]: val });
            }
        } else {
            // 普通组件
            const compList = bridgeApi._getCompList(section);
            // 保留原逻辑：深层更新属性，支持style嵌套对象合并（仅覆盖修改项，保留原有属性）
            for (const [key, val] of Object.entries(newProps)) {
                // if (key === 'style' && typeof val === 'object' && val !== null) {
                //     compList[setIndex].style = val;
                // } else {
                //     compList[setIndex][key] = val;
                // }
                compList[setIndex][key] = val;
            }
            // 保留原逻辑：同步更新选中组件，触发Vue响应式刷新，确保数据一致
            if (dataPool.selectedComp === targetComp) {
                dataPool.selectedComp = compList[setIndex];
            }
        }

        return true;
    },


    /**
     * 删除组件项（通用：支持三个分区）
     * @param {string} section 分区：canvas/pageHeader/pageFooter
     * @param {number} setIndex 要删除的组件项索引（canvas/pageHeader/pageFooter）
     * @returns {boolean} 是否删除成功
     */
    deleteComp: (section, setIndex) => {
        if (!section) return false;
        const compList = bridgeApi._getCompList(section);
        console.log(section, setIndex, compList);
        compList.splice(setIndex, 1);
        console.log(compList);
        bridgeApi.setSelectedComp(null);
        return true;
    },

    // ===================== 页面/分区布局配置API（管理高度/边距等，保留原有）=====================
    /**
     * 更新页面基础配置（pageWidth/pageHeight/边距等）
     * @param {object} newPageProps 页面属性
     * @returns {boolean} 是否成功
     */
    updatePageBase: (newPageProps) => {
        if (!newPageProps) return false;
        Object.assign(dataPool.pageConfig.page, newPageProps);
        // ============== 新增核心代码：同步刷新selectedComp ==============
        // 若存在选中组件，重新赋值触发响应式更新（引用不变，仅通知Vue刷新依赖）
        if (dataPool.selectedComp) {
            dataPool.selectedComp = {
                type: 'page',
                ...dataPool.pageConfig.page,
            }
        }
        return true;
    },

    /**
     * 更新页眉基础布局（仅height/name等，无组件项）
     * @param {object} newHeaderProps 页眉布局属性（如{height: '1.5cm'}）
     * @returns {boolean} 是否成功
     */
    updatePageHeaderBase: (newHeaderProps) => {
        if (!newHeaderProps) return false;
        Object.assign(dataPool.pageConfig.pageHeader, newHeaderProps);
        return true;
    },

    /**
     * 更新页脚基础布局（仅height/name等，无组件项）
     * @param {object} newFooterProps 页脚布局属性
     * @returns {boolean} 是否成功
     */
    updatePageFooterBase: (newFooterProps) => {
        if (!newFooterProps) return false;
        Object.assign(dataPool.pageConfig.pageFooter, newFooterProps);
        return true;
    },

    /**
     * 获取指定属性值
     * @param {string} key 属性名（如'pageWidth'）
     * @returns {*} 属性值（null表示未找到）
     */
    getSpecifiedData: (key) => {
        console.log(dataPool.pageConfig)
        var pageConfig = dataPool.pageConfig;
        return pageConfig[key];
    },

    /**
     * 设置指定属性值
     * @param {string} key 属性名（如'pageWidth'）
     * @param {*} value 属性值
     * @returns {boolean} 是否成功
     */
    setSpecifiedData: (key, value) => {
        if (!key) return false;
        dataPool.pageConfig[key] = value;
        return true;
    },

    addPageHeaderOrFooter: (props = {}) => {
        Object.assign(dataPool.pageConfig, props);
        return true;
    },

    /**
    * 删除页眉或页脚基础布局（仅height/name等，无组件项）
    * @param {string} pageType 页面类型：pageHeader/pageFooter
    * @returns {boolean} 是否成功
    */
    deletePageHeaderOrFooter: (pageType) => {
        if (!pageType) return false;
        if (pageType === 'pageHeader') {
            delete dataPool.pageConfig.pageHeader;
            dataPool.pageHeaderComps = [];
        } else if (pageType === 'pageFooter') {
            delete dataPool.pageConfig.pageFooter;
            dataPool.pageFooterComps = [];
        }
        console.log(dataPool)
        return true;
    },



    // ===================== 核心：获取最终数据（严格匹配你的原始结构，自动归位reportItems）=====================
    /**
     * 导出数据：完全贴合你的要求，无需额外处理，可直接提交后端
     * 结构：{pageHeader: {..., reportItems: []}, pageFooter: {..., reportItems: []}, page: {}, compConfigs: []}
     */
    getFinalData: () => {
        // 深拷贝，避免外部修改桥内响应式数据，防止响应式泄漏

        var finalData = {
            ...deepClone(dataPool.pageConfig),
        };

        if (dataPool.pageConfig.pageHeader) {
            finalData.pageHeader.reportItems = deepClone(dataPool.pageHeaderComps);
        }
        if (dataPool.pageConfig.pageFooter) {
            finalData.pageFooter.reportItems = deepClone(dataPool.pageFooterComps);
        }
        if (dataPool.pageConfig.page) {
            finalData.page = deepClone(dataPool.pageConfig.page);
        }
        if (dataPool.reportItemsComps) {
            finalData.reportItems = deepClone(dataPool.reportItemsComps);
        }

        var newData = convertPxToCmInObject(finalData);

        return newData;
    },

    /**
     * 清空所有数据（重置为默认值）
     */
    clearAll: () => {
        dataPool.pageConfig = { ...DEFAULT_PAGE_CONFIG };
        dataPool.reportItemsComps = [...DEFAULT_COMPONENTS.reportItemsComps];
        dataPool.pageHeaderComps = [...DEFAULT_COMPONENTS.pageHeaderComps];
        dataPool.pageFooterComps = [...DEFAULT_COMPONENTS.pageFooterComps];
        dataPool.selectedComp = null;
    }
};

// 暴露桥核心：响应式数据+操作API（单例，全局唯一）
export const lowcodeBridge = {
    data: dataPool,
    api: bridgeApi
};