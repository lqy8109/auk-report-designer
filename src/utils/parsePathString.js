export  function parsePathString1(pathStr) {
 // 1. 移除首尾空格，容错处理
  const cleanPath = pathStr.trim();
  
  // 2. 新正则：直接匹配所有有效节点（属性名/数组索引）
  // 匹配规则：
  // - [^\.\[]+ ：匹配除了 . 和 [ 之外的字符（属性名）
  // - \[\d+\]  ：匹配 [数字] 形式的数组索引
  const regex = /([^\.\[]+)|(\[\d+\])/g;
  const matches = cleanPath.match(regex) || [];
  
  // 3. 处理匹配结果：提取数组索引，转换类型
  const parsedNodes = matches.map(match => {
    // 如果是 [数字] 格式，提取数字并转number
    if (match.startsWith('[')) {
      return Number(match.replace(/\[|\]/g, ''));
    }
    // 否则保留属性名字符串
    return match;
  });
  
  return parsedNodes;
}


/**
 * 解析路径字符串/数组，从目标对象中获取对应值
 * @param {String|Array} path - 路径（字符串："a.b[0].c" | 数组：['a','b','0','c']）
 * @param {Object} target - 目标对象（如cloneConfig.value）
 * @param {Boolean} [returnParent=false] - 是否返回父节点（用于修改子节点时）
 * @returns {*} 路径对应的值 | 父节点（returnParent=true） | undefined（路径无效）
 */
export default function parsePathString(path, target, returnParent = false) {
  // 边界校验：目标对象不存在直接返回
  if (!target || typeof target !== 'object') {
    console.warn('parsePathString: 目标对象无效');
    return undefined;
  }

  // 步骤1：统一将路径转为数组格式
  let pathArr = [];
  if (typeof path === 'string') {
    // 解析字符串路径：处理 "a.b[0].c[1]" → ["a","b","0","c","1"]
    pathArr = path
      .replace(/\[(\d+)\]/g, '.$1') // 将 [0] 替换为 .0
      .split('.') // 按 . 分割
      .filter(segment => segment.trim() !== ''); // 过滤空段（避免路径首尾有.的情况）
  } else if (Array.isArray(path)) {
    // 直接使用数组路径（兼容原代码中pathList的场景）
    pathArr = [...path];
  } else {
    console.warn('parsePathString: 路径格式无效（仅支持字符串/数组）');
    return undefined;
  }

  // 步骤2：遍历路径，逐层访问目标对象
  let current = target;
  let parent = null; // 记录父节点
  let lastSegment = null; // 记录最后一个路径段（用于returnParent场景）

  for (let i = 0; i < pathArr.length; i++) {
    const segment = pathArr[i];
    parent = current; // 保存当前节点作为父节点
    lastSegment = segment;

    // 边界校验：当前节点不存在，直接返回undefined
    if (current === null || current === undefined) {
      console.warn(`parsePathString: 路径段 "${segment}" 不存在`);
      return undefined;
    }

    // 区分数组和对象的访问方式
    if (Array.isArray(current)) {
      // 数组：路径段必须是数字索引
      const index = Number(segment);
      if (isNaN(index) || index < 0 || index >= current.length) {
        console.warn(`parsePathString: 数组索引 "${segment}" 无效`);
        return undefined;
      }
      current = current[index];
    } else {
      // 对象：直接访问属性（支持普通属性名）
      if (!current.hasOwnProperty(segment)) {
        console.warn(`parsePathString: 对象属性 "${segment}" 不存在`);
        return undefined;
      }
      current = current[segment];
    }
  }

  // 步骤3：返回结果（是否返回父节点）
  if (returnParent) {
    return {
      parent, // 父节点（对象/数组）
      key: lastSegment, // 最后一个路径段（属性名/数组索引）
      value: current // 最终节点值
    };
  }

  return current;
}

