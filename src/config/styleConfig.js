/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-04 10:24:44
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-03 09:18:30
 * @description: 
 */
export const STYLE_CATEGORIES = {
  FONT: 'font',
  LAYOUT: 'layout',
  BACKGROUND: 'background',
  BORDER: 'border'
}

export const BORDER_STYLES = [
  { label: '无', value: '' },
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dashed' },
  { label: '点线', value: 'dotted' },
  { label: '双实线', value: 'double' }
]

export const FONT_SIZES = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '34px', '36px', '38px', '40px']
export const FONT_WEIGHTS = [
  { label: '正常', value: 'normal' },
  { label: '粗体', value: 'bold' },
  { label: '超细', value: '200' }
]
export const FONT_FAMILIES = [
  "微软雅黑",
  "微软雅黑 Light",
  "等线",
  "等线 Light",
  "宋体",
  "仿宋",
  "新宋体",
  "幼圆",
  "楷体",
  "隶书",
  "黑体",
  "Arial",
  "Arial Black",
]

export const TEXT_DECORATIONS = [
  { label: '无', value: '' },
  { label: '下划线', value: 'underline' },
  { label: '上划线', value: 'overline' },
  { label: '删除线', value: 'line-through' },
  { label: '双下划线', value: 'underline double' }
]

export const TEXT_ALIGN = [
  { label: '左对齐', value: 'left' },
  { label: '居中对齐', value: 'center' },
  { label: '右对齐', value: 'right' },
  { label: '两端对齐', value: 'justify' }
]

export const TEXT_ALIGN_LAST = [
  { label: '无', value: '' },
  { label: '两端对齐', value: 'justify' },
]

export const VERTICAL_ALIGN = [
  { label: '顶部对齐', value: 'top' },
  { label: '居中对齐', value: 'middle' },
  { label: '底部对齐', value: 'bottom' },
]

export const WHITE_SPACES = [
  { label: '不换行', value: 'nowrap' },
  { label: '自动换行', value: 'normal' },
]


export const PAGE_TYPE = [
  { label: 'A4', value: 'A4', width: '21cm', height: '29.7cm' },
  { label: 'A2', value: 'A2', width: '42cm', height: '59.4cm' },
  { label: 'A3', value: 'A3', width: '29.7cm', height: '42.0cm' },
  { label: 'A5', value: 'A5', width: '14.8cm', height: '21cm' },
  { label: '5号信封', value: '5号信封', width: '22cm', height: '11cm' },
  { label: '6号信封', value: '6号信封', width: '17.6cm', height: '12.5cm' },
  { label: '7号信封', value: '7号信封', width: '22.9cm', height: '16.2cm' },
  { label: '9号信封', value: '9号信封', width: '32.4cm', height: '22.9cm' },
  { label: '信纸', value: '信纸', width: '18.8cm', height: '26.5cm' }
]


export const QRCODE_TYPE = [
  { label: '二维码', value: 'qrcode' },
  { label: '条形码', value: 'barcode' },
]

export const BACKGROUND_SIZE = [
  { label: '自动', value: '' },
  { label: '剪切', value: 'cover' },
  { label: '缩放', value: '100% 100%' },
  { label: '等比例缩放', value: 'contain' },
]



// ========== ECharts 专用配置项常量 ==========
export const ECHARTS_TYPES = [
  { label: '折线图', value: 'line' },
  { label: '柱状图', value: 'bar' },
  { label: '饼图', value: 'pie' },
  { label: '散点图', value: 'scatter' },
  { label: '雷达图', value: 'radar' },
  { label: '仪表盘图', value: 'gauge' },
  { label: '漏斗图', value: 'funnel' }
]
export const ECHARTS_TRIGGER_TYPES = [
  { label: '坐标轴触发', value: 'axis' },
  { label: '数据项触发', value: 'item' }
]
export const ECHARTS_POSITIONS = [
  { label: '左', value: 'left' },
  { label: '中', value: 'center' },
  { label: '右', value: 'right' }
]
export const ECHARTS_LEGEND_POSITIONS = [
  { label: '顶部', value: 'top' },
  { label: '底部', value: 'bottom' },
  { label: '左侧', value: 'left' },
  { label: '右侧', value: 'right' }
]
export const ECHARTS_LINE_STYLES = [
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dashed' },
  { label: '点线', value: 'dotted' }
]
export const ECHARTS_SYMBOL_TYPES = [
  { label: '圆形', value: 'circle' },
  { label: '矩形', value: 'rect' },
  { label: '三角形', value: 'triangle' },
  { label: '钻石形', value: 'diamond' },
  { label: '无', value: 'none' }
]
export const ECHARTS_SYMBOL_SIZES = [
  { label: '小号', value: 10 },
  { label: '中号', value: 20 },
  { label: '大号', value: 30 },
  { label: '超大', value: 40 }
]
export const ECHARTS_COLOR_GRADIENTS = [
  { label: '蓝到红', value: '["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8", "#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027", "#a50026"]' },
  { label: '绿到红', value: '["#1a9850", "#91cf60", "#d9ef8b", "#fee08b", "#fc8d59", "#d73027"]' },
  { label: '黑到白', value: '["#000000", "#333333", "#666666", "#999999", "#cccccc", "#ffffff"]' }
]
export const ECHARTS_FUNNEL_ORIENT = [
  { label: '垂直', value: 'vertical' },
  { label: '水平', value: 'horizontal' }
]