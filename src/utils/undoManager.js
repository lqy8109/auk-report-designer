// src/utils/undoManager.js
import { ref, reactive } from 'vue'; // 引入Vue响应式API
import UndoManager from 'undo-manager'; // 基础undo-manager

// 1. 创建全局唯一的单例实例
const globalUndoManager = new UndoManager();

// 2. 定义响应式状态（核心：让Vue能感知状态变化）
const undoState = reactive({
    canUndo: ref(false),    // 是否可撤销
    canRedo: ref(false),    // 是否可重做

});

// 3. 状态更新方法（统一更新响应式状态）
const updateState = () => {
    undoState.canUndo = globalUndoManager.hasUndo();
    undoState.canRedo = globalUndoManager.hasRedo();

};

// 4. 封装通用方法（操作后自动更新状态）
const undoManager = {
    // 核心实例（暴露出去，方便特殊场景自定义）
    instance: globalUndoManager,

    // 撤销（执行后更新状态）
    undo() {
        const result = globalUndoManager.undo();
        updateState(); // 关键：更新响应式状态
        return result;
    },

    // 重做（执行后更新状态）
    redo() {
        const result = globalUndoManager.redo();
        updateState(); // 关键：更新响应式状态
        return result;
    },

    // 记录操作（添加后更新状态）
    add(func) {
        const undoFn = func.undo;
        const redoFn = func.redo;
        globalUndoManager.add({
            undo: () => {
                console.log('撤销');
                undoFn();
            },
            redo: () => {
                console.log('重做');
                redoFn();
            }
        });
        updateState(); // 关键：添加操作后更新状态
    },

    // 清空历史（清空后更新状态）
    clearHistory() {
        globalUndoManager.clear();
        updateState(); // 关键：清空后更新状态
    },

    // 获取撤销/重做数量（返回响应式数据）
    getCounts() {
        return {
            undoCount: undoState.undoCount,
            redoCount: undoState.redoCount
        };
    },

    // 暴露响应式状态（方便组件直接使用）
    state: undoState
};

// 初始化状态（页面加载时先更新一次）
updateState();

// 5. 组合式函数（Vue组件更友好）
export function useUndoManager() {
    return {
        ...undoManager,
        // 直接返回响应式的canUndo/canRedo，无需手动调用方法
        canUndo: undoState.canUndo,
        canRedo: undoState.canRedo,
    };
}

// 默认导出
export default undoManager;