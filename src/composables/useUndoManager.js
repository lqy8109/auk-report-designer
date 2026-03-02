import { ref, watch, onUnmounted } from 'vue';
import { globalUndoManager, CommonUndoManager } from '@/utils/undoManager';

/**
 * Vue 组合式函数：使用撤销管理器
 * @param {Object} options 配置项
 * @param {CommonUndoManager} options.manager 自定义实例（默认使用全局实例）
 * @returns {Object} 响应式状态和方法
 */
export function useUndoManager(options = {}) {
  // 选择使用的实例（自定义 or 全局）
  const undoManager = options.manager || globalUndoManager;

  // 响应式状态：是否可撤销/重做
  const canUndo = ref(undoManager.hasUndo());
  const canRedo = ref(undoManager.hasRedo());

  // 监听 undo/redo 状态变化，更新响应式数据
  const updateStatus = () => {
    canUndo.value = undoManager.hasUndo();
    canRedo.value = undoManager.hasRedo();
  };

  // 绑定事件回调
  const originalOnUndo = undoManager.onUndo;
  const originalOnRedo = undoManager.onRedo;
  const originalOnAdd = undoManager.onAdd;

  undoManager.onUndo = (data) => {
    updateStatus();
    originalOnUndo?.(data);
  };

  undoManager.onRedo = (data) => {
    updateStatus();
    originalOnRedo?.(data);
  };

  undoManager.onAdd = (data) => {
    updateStatus();
    originalOnAdd?.(data);
  };

  // 初始化状态
  updateStatus();

  // 组件卸载时恢复原始回调（防止内存泄漏）
  onUnmounted(() => {
    undoManager.onUndo = originalOnUndo;
    undoManager.onRedo = originalOnRedo;
    undoManager.onAdd = originalOnAdd;
  });

  // 封装画布场景常用的操作：添加元素
  /**
   * 封装「添加元素」的可撤销操作
   * @param {Array} elementList 元素列表（响应式数组）
   * @param {Object} newElement 新添加的元素
   * @param {string} name 操作名称
   */
  const addElementWithUndo = (elementList, newElement, name = '添加元素') => {
    // 记录插入位置（默认最后）
    const insertIndex = elementList.length;
    
    undoManager.add({
      name,
      undo: () => {
        // 撤销：删除添加的元素
        elementList.splice(insertIndex, 1);
      },
      redo: () => {
        // 重做：重新添加元素
        elementList.splice(insertIndex, 0, newElement);
      }
    });

    // 执行正向操作
    elementList.push(newElement);
  };

  /**
   * 封装「删除元素」的可撤销操作
   * @param {Array} elementList 元素列表（响应式数组）
   * @param {number} index 要删除的元素索引
   * @param {string} name 操作名称
   */
  const deleteElementWithUndo = (elementList, index, name = '删除元素') => {
    // 记录被删除的元素
    const deletedElement = elementList[index];
    
    undoManager.add({
      name,
      undo: () => {
        // 撤销：恢复删除的元素
        elementList.splice(index, 0, deletedElement);
      },
      redo: () => {
        // 重做：删除元素
        elementList.splice(index, 1);
      }
    });

    // 执行正向操作
    elementList.splice(index, 1);
  };

  /**
   * 封装「修改元素属性」的可撤销操作
   * @param {Object} element 元素对象（响应式）
   * @param {string} prop 属性名（如 left/top/width/height）
   * @param {any} newValue 新值
   * @param {string} name 操作名称
   */
  const updateElementPropWithUndo = (element, prop, newValue, name = '修改元素属性') => {
    // 记录旧值
    const oldValue = element[prop];
    
    undoManager.add({
      name,
      undo: () => {
        // 撤销：恢复旧值
        element[prop] = oldValue;
      },
      redo: () => {
        // 重做：设置新值
        element[prop] = newValue;
      }
    });

    // 执行正向操作
    element[prop] = newValue;
  };

  // 暴露给组件的方法和状态
  return {
    // 响应式状态
    canUndo,
    canRedo,
    // 核心方法
    undo: () => undoManager.undo(),
    redo: () => undoManager.redo(),
    clearUndo: () => undoManager.clear(),
    addCommand: (command) => undoManager.add(command),
    addBatchCommand: (commands, name) => undoManager.addBatch(commands, name),
    // 画布场景封装方法
    addElementWithUndo,
    deleteElementWithUndo,
    updateElementPropWithUndo,
    // 原始实例（供高级使用）
    undoManagerInstance: undoManager
  };
}