/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-27 11:14:35
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-03 10:23:08
 * @description: 
 */
import { defineStore } from 'pinia';

export const useSelectFieldStore = defineStore('selectField', {
    state: () => ({
        // 弹框显示状态
        visible: false,
        // 弹框定位样式
        position: {
            top: '0px',
            left: '0px',
            minWidth: '100px'
        },
        value: '',
        // 选项列表
        options: [],
        // 选择后的回调函数
        onSelect: null,
        // 触发元素（用于计算位置）
        triggerEl: null,
        defaultBoxSize: {
            width: 200, // 默认宽度
            height: 330 // 最大高度（对应样式中的max-height: 200px）
        },
        selectType: 'bodySelect', // 选择类型，默认为'field'
    }),
    actions: {
        /**
         * 显示全局选择框
         * @param {Object} params 配置参数
         * @param {HTMLElement} params.triggerEl 触发元素（必传）
         * @param {string} params.value 选中的值 （必传）
         * @param {Array} params.options 选项列表 （必传）
         * @param {Function} params.onSelect 选择后的回调（必传）
         */
        show({ triggerEl, selectType = 'bodySelect', value, options, onSelect }) {
            if (!triggerEl || !options || !onSelect) return;

            const rect = triggerEl.getBoundingClientRect();

            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };

            // ========== 核心：边缘判断逻辑 ==========
            let top, left, transform = '';

            // 1. 垂直方向判断（是否超出底部视口）
            const boxBottom = rect.bottom + this.defaultBoxSize.height;
            if (boxBottom > viewport.height) {
                // 超出底部 → 弹框显示在触发元素上方
                // top = `${rect.top - this.defaultBoxSize.height + window.scrollY}px`;
                top = `${rect.bottom + window.scrollY}px`;
                // 兼容transform调整（可选，让弹框向上展开）
                transform = 'translateY(-107%)';
            } else {
                // 未超出 → 正常显示在下方
                top = `${rect.bottom + window.scrollY}px`;
            }

            // 2. 水平方向判断（是否超出右侧视口）
            const boxRight = rect.left + this.defaultBoxSize.width;
            if (boxRight > viewport.width) {
                // 超出右侧 → 弹框右对齐视口右侧
                left = `${viewport.width - this.defaultBoxSize.width + window.scrollX}px`;
            } else {
                // 未超出 → 正常左对齐触发元素
                left = `${rect.left + window.scrollX}px`;
            }

            // 3. 最终定位（兜底：确保不超出左侧/顶部）
            const finalLeft = Math.max(0, parseInt(left)) + 'px';
            const finalTop = Math.max(0, parseInt(top)) + 'px';

            // 更新状态
            this.position = {
                top: finalTop,
                left: finalLeft,
                minWidth: `${this.defaultBoxSize.width}px`,
                transform
            };
            this.triggerEl = triggerEl;
            this.value = value;
            this.options = options;
            this.onSelect = onSelect;
            this.visible = true;
            this.selectType = selectType;
        },
        /**
         * 关闭全局选择框
         */
        hide() {
            this.visible = false;
            this.onSelect = null;
            this.triggerEl = null;
        },
        /**
         * 处理选项选择
         * @param {*} value 选中的值
         */
        handleSelect(value) {
            if (typeof this.onSelect === 'function') {
                this.onSelect(value);
            }
            this.hide();
        }
    }
});