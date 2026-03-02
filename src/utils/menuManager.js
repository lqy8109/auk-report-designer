// menuManager.js
class MenuManager {
  constructor() {
    this.activeMenu = null;
    this.menuInstances = new Map();
  }

  register(id, closeCallback) {
    this.menuInstances.set(id, {
      close: closeCallback,
      visible: false,
      onShow: () => {} // 新增默认空回调
    });
  }

  unregister(id) {
    this.menuInstances.delete(id);
  }

  show(id, x, y, menuData = []) {
    this.closeAll();
    this.activeMenu = id;
    const instance = this.menuInstances.get(id);
    if (instance) {
      instance.visible = true;
      instance.menuData = menuData; // 存储菜单数据
      instance.onShow?.(x, y);
    }
  }

  close(id) {
    const instance = this.menuInstances.get(id);
    if (instance) {
      instance.visible = false;
      instance.close?.();
    }
    if (this.activeMenu === id) {
      this.activeMenu = null;
    }
  }

  closeAll() {
    Array.from(this.menuInstances.keys()).forEach(id => this.close(id));
    this.activeMenu = null;
  }

  getActiveMenu() {
    return this.activeMenu;
  }

  // 新增：获取指定菜单的配置
  getMenuData(id) {
    return this.menuInstances.get(id)?.menuData || [];
  }
}

export const menuManager = new MenuManager();

// 全局点击关闭菜单
document.addEventListener('click', () => {
  menuManager.closeAll();
});

// 表格区域阻止默认右键
document.addEventListener('contextmenu', (e) => {
  if (e.target.closest('.table-inner-only')) {
    e.preventDefault();
  }
});