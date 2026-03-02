/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-14 16:13:43
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-14 16:17:48
 * @description: 
 */
export default function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return null;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj;
    if (hash.has(obj)) return hash.get(obj); // 处理循环引用

    let clone = Array.isArray(obj) ? [] : {};
    hash.set(obj, clone); // 存储原始对象到克隆对象的映射

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], hash);
        }
    }
    return clone;
}
