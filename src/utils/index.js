/**
 * 判断字符串是多层级点分隔类型（如 echartsOption.title.text）还是单名称类型（如 text）
 * @param {string} str - 要判断的字符串
 * @returns {string} 返回 'multiLevel' | 'singleLevel' | 'invalid'
 */
export const judgeStringType = (str) => {
    // 先做基础校验：必须是字符串且非空
    if (typeof str !== 'string' || str.trim() === '') {
        return 'invalid';
    }

    const trimmedStr = str.trim();
    // 正则匹配：是否包含至少一个英文点，且点不在开头/结尾，也没有连续的点
    const multiLevelReg = /^[^\.]+(\.[^\.]+)+$/;

    if (multiLevelReg.test(trimmedStr)) {
        // 包含合法的多层级点分隔（如 echartsOption.title.text）
        return 'multiLevel';
    } else if (/^[^\.]+$/.test(trimmedStr)) {
        // 纯单名称，无任何点（如 text）
        return 'singleLevel';
    } else {
        // 非法格式（如 .text、text.、text..title 等）
        return 'invalid';
    }
}

// 根据路径设置对象属性（支持多层级）
export const setValueByPath = (obj, path, value) => {
    console.log(obj);
    if (!obj || !path) return;
    const pathArr = path.replace(/\[(\d+)\]/g, ".$1").split(".");
    let current = obj;
    for (let i = 0; i < pathArr.length - 1; i++) {
        const key = pathArr[i];
        // 若路径不存在则创建空对象/数组
        if (!current[key]) {
            current[key] = /^\d+$/.test(pathArr[i + 1]) ? [] : {};
        }
        current = current[key];
    }
    current[pathArr[pathArr.length - 1]] = value;
    return obj;
};