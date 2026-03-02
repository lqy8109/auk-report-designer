/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-30 10:50:58
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-26 10:19:41
 * @description: 单位转换工具（px ↔ cm/pt/in），适配真实屏幕DPI
 */

// 获取屏幕真实DPI（设备像素密度）
function js_getDPI() {
    var arrDPI = new Array();
    if (window.screen?.deviceXDPI !== undefined) {
        arrDPI[0] = window.screen.deviceXDPI;
        arrDPI[1] = window.screen.deviceYDPI;
    } else {
        var tmpNode = document.createElement("DIV");
        tmpNode.style.cssText =
            "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
        document.body.appendChild(tmpNode);
        arrDPI[0] = parseInt(tmpNode.offsetWidth);
        arrDPI[1] = parseInt(tmpNode.offsetHeight);
        tmpNode.parentNode.removeChild(tmpNode);
    }
    // 兜底：如果获取失败，使用默认96DPI
    return arrDPI[0] > 0 ? arrDPI : [96, 96];
}

/**
 * 扩展后的单位转换函数：cm/pt/in → px（适配真实DPI）
 * @param {string} unitStr - 带单位的字符串（如 "10cm", "12pt", "2in"）
 * @returns {number|string} 转换后的px值（数字），不匹配则返回原字符串
 */
const unitToPx = (unitStr) => {
    // 空值/非字符串处理
    if (!unitStr || typeof unitStr !== 'string') return unitStr;

    const dpi = js_getDPI()[0];
    const trimStr = unitStr.trim();

    // 匹配 cm 单位 (例如: "10cm", "5.5 cm", "3.14CM")
    const cmMatch = trimStr.match(/^(\d*\.?\d+)\s*cm$/i);
    if (cmMatch) {
        const cm = parseFloat(cmMatch[1]);
        const px = (cm * dpi) / 2.54; // 1英寸 = 2.54厘米
        return Math.round(px);
    }

    // 匹配 pt 单位 (例如: "12pt", "14.5 pt", "16PT")
    const ptMatch = trimStr.match(/^(\d*\.?\d+)\s*pt$/i);
    if (ptMatch) {
        const pt = parseFloat(ptMatch[1]);
        const px = pt * (dpi / 72); // 1英寸=72磅(pt)
        return Math.round(px);
    }

    // 匹配 in 单位 (例如: "2in", "1.5 in", "0.75IN")
    const inMatch = trimStr.match(/^(\d*\.?\d+)\s*in$/i);
    if (inMatch) {
        const inch = parseFloat(inMatch[1]);
        const px = inch * dpi; // 1英寸 = dpi个像素
        return Math.round(px);
    }

    // 不匹配任何单位则原样返回
    return unitStr;
};

/**
 * 反向单位转换函数：px → cm/pt/in（适配真实DPI）
 * @param {number|string} pxValue - px值（如 100, "100px"）
 * @param {string} targetUnit - 目标单位（cm/pt/in，默认cm）
 * @param {number} precision - 小数保留位数（默认2位）
 * @returns {string|number} 转换后的带单位字符串（如 "2.65cm"），失败则返回原值
 */
const pxToUnit = (pxValue, targetUnit = 'cm', precision = 2) => {
    // 空值处理
    if (pxValue === null || pxValue === undefined || pxValue === '') return pxValue;

    // 提取纯数字（移除px单位）
    const numStr = String(pxValue).trim().replace(/px/g, '');
    const px = parseFloat(numStr);

    // 非数字判断
    if (isNaN(px)) {
        console.warn(`无法转换为像素值: ${pxValue}`);
        return pxValue;
    }

    const dpi = js_getDPI()[0];
    let result = 0;

    // 根据目标单位计算
    switch (targetUnit.toLowerCase()) {
        case 'cm':
            // cm = (px * 2.54) / dpi
            result = (px * 2.54) / dpi;
            break;
        case 'pt':
            // pt = (px * 72) / dpi
            result = (px * 72) / dpi;
            break;
        case 'in':
            // in = px / dpi
            result = px / dpi;
            break;
        default:
            console.warn(`不支持的目标单位: ${targetUnit}，默认转为cm`);
            result = (px * 2.54) / dpi;
            targetUnit = 'cm';
            break;
    }

    // 保留指定位数小数并返回带单位的字符串
    const fixedResult = Number(result.toFixed(precision));
    return `${fixedResult}${targetUnit.toLowerCase()}`;
};

/**
 * 快捷方法：px → cm（封装pxToUnit，默认保留2位小数）
 * @param {number|string} pxValue - px值
 * @param {number} precision - 小数保留位数
 * @returns {string} 带cm单位的字符串
 */
const pxToCm = (pxValue, precision = 2) => {
    return pxToUnit(pxValue, 'cm', precision);
};

/**
 * 快捷方法：px → pt（封装pxToUnit，默认保留2位小数）
 * @param {number|string} pxValue - px值
 * @param {number} precision - 小数保留位数
 * @returns {string} 带pt单位的字符串
 */
const pxToPt = (pxValue, precision = 2) => {
    return pxToUnit(pxValue, 'pt', precision);
};

/**
 * 快捷方法：px → in（封装pxToUnit，默认保留2位小数）
 * @param {number|string} pxValue - px值
 * @param {number} precision - 小数保留位数
 * @returns {string} 带in单位的字符串
 */
const pxToIn = (pxValue, precision = 2) => {
    return pxToUnit(pxValue, 'in', precision);
};

/**
 * 递归将对象/数组中指定key的px值转换为cm值（适配真实DPI）
 * @param {object|array} obj - 要转换的对象/数组
 * @param {array} convertKeys - 需要转换的key列表（可选，默认常用尺寸属性）
 * @param {number} precision - 小数保留位数（默认2位）
 * @returns {object|array} 转换后的对象/数组
 */
const convertPxToCmInObject = (obj, convertKeys = ['width', 'height', 'left', 'top', 'x', 'y', ], precision = 2) => {
    // 递归处理函数
    const process = (value, key) => {
        // page关键字不转换
        if (key === "page") {
            return value;
        }

        // 只转换指定key且值为px相关（数字或带px字符串）的情况
        if (convertKeys.includes(key)) {
            // 数字类型（纯px值）
            if (typeof value === 'number') {
                return pxToCm(value, precision);
            }
            // 字符串类型（带px单位）
            else if (typeof value === 'string' && value.includes('px')) {
                return pxToCm(value, precision);
            }
        }

        // 数组处理：递归处理每一项
        if (Array.isArray(value)) {
            return value.map((item) => process(item));
        }

        // 对象处理：递归遍历属性
        if (value !== null && typeof value === 'object') {
            const result = {};
            for (const propKey in value) {
                if (Object.prototype.hasOwnProperty.call(value, propKey)) {
                    result[propKey] = process(value[propKey], propKey);
                }
            }
            return result;
        }

        // 其他类型直接返回
        return value;
    };

    return process(obj);
};

/**
 * 递归将对象/数组中指定key的cm/pt/in值转换为px值（适配真实DPI）
 * @param {object|array} obj - 要转换的对象/数组
 * @param {array} convertKeys - 需要转换的key列表（可选，默认常用尺寸属性）
 * @returns {object|array} 转换后的对象/数组
 */
const convertCmToPxInObject = (obj, convertKeys = ['width', 'height', 'left', 'top', 'x', 'y']) => {
    // 递归处理函数
    const process = (value, key) => {
        // page关键字不转换
        if (key === "page") {
            return value;
        }

        // 只转换指定key且值为字符串（带单位）的情况
        if (typeof value === "string" && convertKeys.includes(key)) {
            return unitToPx(value);
        } else if (Array.isArray(value)) {
            return value.map((item) => process(item));
        } else if (value !== null && typeof value === "object") {
            const result = {};
            for (const propKey in value) {
                if (Object.prototype.hasOwnProperty.call(value, propKey)) {
                    result[propKey] = process(value[propKey], propKey);
                }
            }
            return result;
        }
        return value;
    };

    return process(obj);
};

export {
    unitToPx,
    convertCmToPxInObject,
    convertPxToCmInObject,
};