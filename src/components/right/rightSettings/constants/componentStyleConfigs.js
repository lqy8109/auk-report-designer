/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-04 10:24:58
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-05 16:32:20
 * @description: 
 */
// src/components/StyleEditor/constants/componentStyleConfigs.js
import { list } from 'postcss'
import { DEFAULT_FONT_STYLE, DEFAULT_LAYOUT_STYLE } from './defaultStyles'
import {
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHTS,
  TEXT_ALIGN,
  TEXT_DECORATIONS,
  TEXT_ALIGN_LAST,
  VERTICAL_ALIGN,
  WHITE_SPACES,
  BORDER_STYLES,
  PAGE_TYPE,
  QRCODE_TYPE,
  BACKGROUND_SIZE,
  ECHARTS_TYPES,
  ECHARTS_TRIGGER_TYPES,
  ECHARTS_POSITIONS,
  ECHARTS_LEGEND_POSITIONS,
  ECHARTS_LINE_STYLES,
  ECHARTS_SYMBOL_TYPES,
  ECHARTS_SYMBOL_SIZES,
  ECHARTS_COLOR_GRADIENTS,
  ECHARTS_FUNNEL_ORIENT,
} from '@/config/styleConfig'



// 1. 通用配置（所有组件都可能用到的配置项）
export const COMMON_STYLE_CONFIGS = {
  // ========== 原有通用配置（font/margin/paper/background/border等）保持不变 ==========
  font: {
    label: '文本字体',
    items: [
      { key: 'color', label: '颜色', type: 'color', dataType: 'style' },
      { key: 'font-family', label: '字体', type: 'select', dataType: 'style', options: FONT_FAMILIES },
      { key: 'font-size', label: '字号', type: 'select', dataType: 'style', options: FONT_SIZES },
      { key: 'font-style', label: '字形', type: 'select', dataType: 'style', options: [{ label: '正常', value: 'normal' }, { label: '斜体', value: 'italic' }] },
      { key: 'font-weight', label: '粗细', type: 'select', dataType: 'style', options: FONT_WEIGHTS },
      { key: 'text-decoration', label: '特殊效果', type: 'select', dataType: 'style', options: TEXT_DECORATIONS },
      { key: 'text-align', label: '文本对齐', type: 'select', dataType: 'style', options: TEXT_ALIGN },
      { key: 'text-align-last', label: '两端对齐', type: 'select', dataType: 'style', options: TEXT_ALIGN_LAST },
      { key: 'vertical-align', label: '垂直对齐', type: 'select', dataType: 'style', options: VERTICAL_ALIGN },
      { key: 'white-space', label: '自动换行', type: 'select', dataType: 'style', options: WHITE_SPACES },
      { key: 'line-height', label: '行高', type: 'pxEdit', dataType: 'style', placeholder: '' },
      { key: 'letter-spacing', label: '字间距', type: 'pxEdit', dataType: 'style', placeholder: '' },
    ],
    default: DEFAULT_FONT_STYLE
  },
  margin: {
    label: '页边距',
    items: [
      { key: 'margin', label: '页边距大小', type: 'pageMargin', dataType: '', placeholder: '' },
    ],
  },
  paper: {
    label: '纸张选项',
    items: [
      { key: 'pageType', label: '纸张类型', type: 'pageType', dataType: '', placeholder: '', options: PAGE_TYPE },
      { key: 'pageDirection', label: '纸张方向', type: 'direction', dataType: '', placeholder: '', options: [{ label: '纵向', value: 'vertical' }, { label: '横向', value: 'horizontal' }] },
      { key: 'pageWidth', label: '纸张宽度', type: 'widthAndHeight', dataType: '', placeholder: '' },
      { key: 'pageHeight', label: '纸张高度', type: 'widthAndHeight', dataType: '', placeholder: '' },
    ],
    default: {}
  },
  background: {
    label: '背景选项',
    items: [
      { key: 'background-color', label: '背景颜色', type: 'color', dataType: 'style', },
      { key: 'background-image', label: '背景图片', type: 'backgroundImage', dataType: 'style', hide: ['qrcode', 'image', 'echarts'] },
    ],
    default: {},
  },
  border: {
    label: '边框选项',
    items: [
      { key: 'border-width', label: '粗细', type: 'borderWidth', dataType: 'style', placeholder: '' },
      { key: 'border-style', label: '线型', type: 'borderStyle', dataType: 'style', options: BORDER_STYLES },
      { key: 'border-color', label: '颜色', type: 'color', dataType: 'style', placeholder: '' },
    ],
    default: { 'border-width': '', 'border-style': '', 'border-color': '' }
  },
  lineBorder: {
    label: '边框选项',
    items: [
      { key: 'border-width', label: '粗细', type: 'lineBorderWidth', dataType: 'style', placeholder: '' },
      { key: 'border-style', label: '线型', type: 'lineBorderStyle', dataType: 'style', options: BORDER_STYLES },
      { key: 'border-color', label: '颜色', type: 'color', dataType: 'style', placeholder: '' },
    ],
    default: { 'border-width': '', 'border-style': '', 'border-color': '' }
  },
  borderRadius: {
    label: '圆角',
    items: [
      { key: 'border-radius', label: '圆角', type: 'borderRadius', dataType: 'style', placeholder: '' },
    ],
    default: { 'border-radius': '' }
  },
  data: {
    label: '数据选项',
    items: [
      { key: 'value', label: '数据', type: 'data', placeholder: '', dataType: '', updateType: 'base' },
    ],
    default: {}
  },
  expand: {
    label: '数据展开方向',
    items: [
      { key: 'expand', label: '数据展开方向', type: 'select', dataType: 'data',updateType: 'base' , options: [{ label: '无', value: '' }, { label: '向下', value: 'down' }, { label: '向右', value: 'right' }] },
    ],
    default: { expand: '' }
  },
  text: {
    label: '数据选项',
    items: [
      { key: 'value', label: '数据', type: 'data', placeholder: '', dataType: '', hideSelectField: true, updateType: 'base' },
    ],
    default: {}
  },
  qrcodeFont: {
    label: '二维码字体',
    items: [
      { key: 'color', label: '颜色', type: 'color', dataType: 'style' },
    ],
    default: DEFAULT_FONT_STYLE
  },
  qrcodeType: {
    label: '二维码类型',
    items: [
      { key: 'qrcodeType', label: '二维码类型', type: 'select', options: QRCODE_TYPE, updateType: 'base' },
    ],
    default: { qrcodeType: 'qrcode' }
  },
  dataSource: {
    label: '数据选项',
    items: [
      { key: 'dataSetName', label: '数据集名称', type: 'dataSourceSelect', updateType: 'base' },
      { key: 'dataSetSort', label: '数据排序规则', type: 'dataSourceSort', updateType: 'base' },
      { key: 'dataSetFilter', label: '数据过滤条件', type: 'dataSourceFilter', updateType: 'base' },
    ],
    default: {}
  },

  // ========== ECharts 基础配置组 ==========
  echartsBase: {
    label: '图表基础配置',
    items: [
      {
        key: 'echartsOption.series[0].type',
        label: '图表类型',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_TYPES,
        updateType: 'base',
        updateOther: [{
          isValue: 'radar',
          key: 'echartsOption.radar.indicator',
          value: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ],

        }, {
          noIsValue: 'radar',
          key: 'echartsOption.radar.indicator',
          value: [],
        }, {
          isValue: 'gauge',
          key: 'echartsOption.series[0].data',
          value: [{
            value: 50,
            name: 'SCORE'
          }],
        }]
      },
      {
        key: 'echartsOption.title.text',
        label: '图表标题',
        type: 'input',
        dataType: 'echarts',
        placeholder: '请输入图表标题',
        updateType: 'base'
      },
      {
        key: 'echartsOption.title.left',
        label: '标题位置',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_POSITIONS,
        updateType: 'base'
      },
      {
        key: 'echartsOption.tooltip.trigger',
        label: '提示框触发方式',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_TRIGGER_TYPES,
        updateType: 'base'
      },
      {
        key: 'echartsOption.legend.show',
        label: '显示图例',
        type: 'select',
        dataType: 'echarts',
        options: [{ label: '是', value: true }, { label: '否', value: false }],
        updateType: 'base'
      },
      {
        key: 'echartsOption.legend.bottom',
        label: '图例位置',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_LEGEND_POSITIONS,
        updateType: 'base',
        hide: ['pie', 'radar']
      },
      {
        key: 'echartsOption.backgroundColor',
        label: '图表背景色',
        type: 'color',
        dataType: 'echarts',
        updateType: 'style'
      },
    ],
    default: {
      'echartsOption.series[0].type': 'line',
      'echartsOption.title.text': '图表标题',
      'echartsOption.title.left': 'center',
      'echartsOption.tooltip.trigger': 'axis',
      'echartsOption.legend.show': true,
      'echartsOption.legend.bottom': '0',
      'echartsOption.backgroundColor': '#ffffff'
    }
  },

  // ========== ECharts 坐标轴配置组 ==========
  echartsAxis: {
    label: '图表坐标轴配置',
    items: [
      {
        key: 'echartsOption.xAxis.show',
        label: 'X轴是否显示',
        type: 'select',
        dataType: 'echarts',
        options: [{ label: '是', value: true }, { label: '否', value: false }],
        updateType: 'base'
      },
      {
        key: 'echartsOption.xAxis.data',
        label: 'X轴类目',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：1月,2月,3月（英文逗号分隔）',
        updateType: 'base',
        // hide: ['pie', 'radar', 'gauge', 'funnel']
      },
      {
        key: 'echartsOption.yAxis.show',
        label: 'Y轴是否显示',
        type: 'select',
        dataType: 'echarts',
        options: [{ label: '是', value: true }, { label: '否', value: false }],
        updateType: 'base'
      },
      {
        key: 'echartsOption.yAxis.name',
        label: 'Y轴名称',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：销量（件）',
        updateType: 'base',
        // hide: ['pie', 'radar', 'gauge', 'funnel']
      },
      {
        key: 'echartsOption.xAxis.axisLabel.rotate',
        label: 'X轴标签旋转角度',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：-45 / 0',
        updateType: 'style',
        // hide: ['pie', 'radar', 'gauge', 'funnel']
      },
    ],
    default: {
      'echartsOption.xAxis.data': '',
      'echartsOption.yAxis.name': '',
      'echartsOption.xAxis.axisLabel.rotate': 0
    },
    // hide: ['pie', 'radar', 'gauge', 'funnel'], // 新增
  },

  // ========== 折线图专属配置组 ==========
  echartsLine: {
    label: '折线图专属配置',
    items: [
      {
        key: 'echartsOption.series[0].smooth',
        label: '平滑曲线',
        type: 'select',
        dataType: 'echarts',
        options: [{ label: '是', value: true }, { label: '否', value: false }],
        updateType: 'style',
        hide: ['bar', 'pie', 'radar', 'gauge', 'funnel', 'scatter']
      },
      {
        key: 'echartsOption.series[0].symbol',
        label: '数据点样式',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_SYMBOL_TYPES,
        updateType: 'style',
        hide: ['bar', 'pie', 'radar', 'gauge', 'funnel', 'scatter']
      },
      {
        key: 'echartsOption.series[0].lineStyle.type',
        label: '线条样式',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_LINE_STYLES,
        updateType: 'style',
        hide: ['bar', 'pie', 'radar', 'gauge', 'funnel', 'scatter']
      },
      {
        key: 'echartsOption.series[0].symbolSize',
        label: '数据点大小',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_SYMBOL_SIZES,
        updateType: 'style',
        hide: ['bar', 'pie', 'radar', 'gauge', 'funnel', 'scatter']
      },
    ],
    default: {
      'echartsOption.series[0].smooth': false,
      'echartsOption.series[0].symbol': 'circle',
      'echartsOption.series[0].lineStyle.type': 'solid',
      'echartsOption.series[0].symbolSize': 20
    },
    hide: ['bar', 'pie', 'radar', 'gauge', 'funnel', 'scatter'], // 新增
  },

  // ========== 柱状图专属配置组 ==========
  echartsBar: {
    label: '柱状图专属配置',
    items: [
      {
        key: 'echartsOption.series[0].barWidth',
        label: '柱子宽度',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：30 / 50%',
        updateType: 'style',
        hide: ['line', 'pie', 'radar', 'gauge', 'funnel', 'scatter']
      },
      {
        key: 'echartsOption.series[0].barGap',
        label: '柱子间距',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：20% / 0',
        updateType: 'style',
        hide: ['line', 'pie', 'radar', 'gauge', 'funnel', 'scatter']
      },
    ],
    default: {
      'echartsOption.series[0].barWidth': '30',
      'echartsOption.series[0].barGap': '20%'
    },
    hide: ['line', 'pie', 'radar', 'gauge', 'funnel', 'scatter'], // 新增
  },

  // ========== 饼图专属配置组 ==========
  echartsPie: {
    label: '饼图专属配置',
    items: [
      {
        key: 'echartsOption.series[0].radius[0]',
        label: '内半径',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：40% / 0',
        updateType: 'style',
        hide: ['line', 'bar', 'radar', 'gauge', 'funnel', 'scatter']
      },
      {
        key: 'echartsOption.series[0].radius[1]',
        label: '外半径',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：70%',
        updateType: 'style',
        hide: ['line', 'bar', 'radar', 'gauge', 'funnel', 'scatter']
      },
      {
        key: 'echartsOption.series[0].label.show',
        label: '显示扇区标签',
        type: 'select',
        dataType: 'echarts',
        options: [{ label: '是', value: true }, { label: '否', value: false }],
        updateType: 'style',
        hide: ['line', 'bar', 'radar', 'gauge', 'funnel', 'scatter']
      },
      {
        key: 'echartsOption.series[0].roseType',
        label: '玫瑰图模式',
        type: 'select',
        dataType: 'echarts',
        options: [{ label: '无', value: false }, { label: '半径', value: 'radius' }, { label: '面积', value: 'area' }],
        updateType: 'style',
        hide: ['line', 'bar', 'radar', 'gauge', 'funnel', 'scatter']
      },
    ],
    default: {
      'echartsOption.series[0].radius[0]': '40%',
      'echartsOption.series[0].radius[1]': '70%',
      'echartsOption.series[0].label.show': true,
      'echartsOption.series[0].roseType': false
    },
    hide: ['line', 'bar', 'radar', 'gauge', 'funnel', 'scatter'], // 新增
  },

  // ========== 新增：散点图专属配置组 ==========
  echartsScatter: {
    label: '散点图专属配置',
    items: [
      {
        key: 'echartsOption.series[0].symbol',
        label: '散点样式',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_SYMBOL_TYPES,
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'radar', 'gauge', 'funnel']
      },
      {
        key: 'echartsOption.series[0].symbolSize',
        label: '散点大小',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_SYMBOL_SIZES,
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'radar', 'gauge', 'funnel']
      },
      {
        key: 'echartsOption.series[0].itemStyle.opacity',
        label: '散点透明度',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：0.5 / 1（0-1之间）',
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'radar', 'gauge', 'funnel']
      },
    ],
    default: {
      'echartsOption.series[0].symbol': 'circle',
      'echartsOption.series[0].symbolSize': 20,
      'echartsOption.series[0].itemStyle.opacity': 1
    },
    hide: ['line', 'bar', 'pie', 'radar', 'gauge', 'funnel']
  },

  // ========== 新增：雷达图专属配置组 ==========
  echartsRadar: {
    label: '雷达图专属配置',
    items: [
      {
        key: 'echartsOption.radar.indicator',
        label: '雷达维度',
        type: 'listData',
        dataType: 'echarts',
        placeholder: '如：[{"name":"维度1","max":100},{"name":"维度2","max":100}]',
        updateType: 'base',
        hide: ['line', 'bar', 'pie', 'gauge', 'funnel', 'scatter'],
        listKey: 'name',
        listValue: 'max'
      },
      {
        key: 'echartsOption.radar.radius',
        label: '雷达图半径',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：70% / 80',
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'gauge', 'funnel', 'scatter']
      },
      {
        key: 'echartsOption.series[0].areaStyle.opacity',
        label: '填充透明度',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：0.3 / 0.5（0-1之间）',
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'gauge', 'funnel', 'scatter']
      },
    ],
    default: {
      'echartsOption.radar.indicator': '',
      'echartsOption.radar.radius': '70%',
      'echartsOption.series[0].areaStyle.opacity': 0.3
    },
    hide: ['line', 'bar', 'pie', 'gauge', 'funnel', 'scatter']
  },

  // ========== 新增：仪表盘图专属配置组 ==========
  echartsGauge: {
    label: '仪表盘图专属配置',
    items: [
      {
        key: 'echartsOption.series[0].progress.show',
        label: '是否显示进度条',
        type: 'select',
        dataType: 'echarts',
        options: [{ label: '是', value: true }, { label: '否', value: false }],
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'funnel', 'scatter']
      },
    ],
    default: {
      'echartsOption.series[0].progress.show': true
    },
    hide: ['line', 'bar', 'pie', 'funnel', 'scatter']
  },
  // ========== 新增：漏斗图专属配置组 ==========
  echartsFunnel: {
    label: '漏斗图专属配置',
    items: [
      {
        key: 'echartsOption.series[0].funnelAlign',
        label: '漏斗对齐方式',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_POSITIONS,
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'radar', 'gauge', 'scatter']
      },
      {
        key: 'echartsOption.series[0].gap',
        label: '漏斗层级间距',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：2 / 5（像素）',
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'radar', 'gauge', 'scatter']
      },
      {
        key: 'echartsOption.series[0].orient',
        label: '漏斗方向',
        type: 'select',
        dataType: 'echarts',
        options: ECHARTS_FUNNEL_ORIENT,
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'radar', 'gauge', 'scatter']
      },
      {
        key: 'echartsOption.series[0].label.position',
        label: '标签位置',
        type: 'select',
        dataType: 'echarts',
        options: [{ label: '内部', value: 'inside' }, { label: '外部', value: 'outside' }],
        updateType: 'style',
        hide: ['line', 'bar', 'pie', 'radar', 'gauge', 'scatter']
      },
    ],
    default: {
      'echartsOption.series[0].funnelAlign': 'center',
      'echartsOption.series[0].gap': 2,
      'echartsOption.series[0].orient': 'vertical',
      'echartsOption.series[0].label.position': 'inside'
    },
    hide: ['line', 'bar', 'pie', 'radar', 'gauge', 'scatter']
  },
  echartsOption: {
    label: 'ECharts配置项',
    items: [
      {
        key: 'echartsOption',
        label: '图表完整配置',
        type: 'echartsOption',
        dataType: 'echarts',
        placeholder: '请配置完整的ECharts配置',
        updateType: 'base'
      }
    ],
  },

  // ========== ECharts 数据配置组 ==========
  echartsData: {
    label: '图表数据配置',
    items: [
      {
        key: 'echartsOption.series[0].data',
        label: '图表数据',
        type: 'data',
        dataType: 'echarts',
        placeholder: '请选择/输入图表数据',
        updateType: 'base'
      },
      {
        key: 'echartsOption.series[0].name',
        label: '系列名称',
        type: 'input',
        dataType: 'echarts',
        placeholder: '如：产品A',
        updateType: 'base'
      },

    ],
    default: {
      'echartsOption.series[0].data': [],
      'echartsOption.series[0].name': '系列1'
    }
  }
}

// 2. 组件专属配置
export const COMPONENT_SPECIFIC_CONFIGS = {
  button: {
    label: '按钮专属',
    items: [
      { key: 'btnType', label: '按钮类型', type: 'select', options: ['primary', 'secondary', 'danger'] },
      { key: 'borderRadius', label: '圆角', type: 'pxEdit', placeholder: '如 4px / 50%' },
      { key: 'disabled', label: '是否禁用', type: 'switch' }
    ],
    default: { btnType: 'primary', borderRadius: '4px', disabled: false }
  },
  image: {
    label: '图片',
    items: [
      { key: 'background-image', label: '图片地址', dataType: 'style', type: 'backgroundImage' },
      { key: 'background-size', label: '图片大小', dataType: 'style', type: 'select', options: BACKGROUND_SIZE },
      { key: 'background-position', label: '水平对齐', dataType: 'style', type: 'backgroundPositionLevel', },
      { key: 'background-position', label: '垂直对齐', dataType: 'style', type: 'backgroundPositionVertical', },
    ],
    default: {}
  },
  tableCell: {
    label: '表格单元格专属',
    items: [
      { key: 'backgroundColor', label: '背景颜色', dataType: 'style', type: 'color' },
      { key: 'border', label: '边框', dataType: 'style', type: 'pxEdit', placeholder: '如 1px solid #e0e0e0' },
      { key: 'fontSize', label: '字号', dataType: 'style', type: 'select', options: ['12px', '14px', '16px'] }
    ],
    default: { backgroundColor: '#ffffff', border: '' }
  },
  echarts: {
    label: 'ECharts专属',
    items: [],
    default: {}
  }
}

// 3. 组件-配置映射表
export const COMPONENT_STYLE_MAP = {
  label: ['text', 'background', 'border', 'font'],
  text: ['data', 'background', 'border', 'font'],
  page: ['background', 'paper', 'margin'],
  table: ['dataSource'],
  tableCell: ['data', 'background', 'border', 'font'],
  tablixCell: ['data', 'expand', 'background', 'border', 'font'],
  line: ['lineBorder'],
  graphic: ['background', 'border', 'borderRadius'],
  qrcode: ['data', 'qrcodeType', 'background', 'qrcodeFont'],
  image: ['background', 'image', 'border', 'borderRadius'],
  richText: ['data', 'background', 'border', 'borderRadius', 'font'],
  // ECharts 组件：包含所有新增的专属配置组
  charts: [
    'background',
    'border',
    'echartsOption',
    'echartsBase',
    'echartsAxis',
    'echartsLine', // 折线图
    'echartsBar', // 柱状图
    'echartsPie', // 饼图
    'echartsScatter', // 散点图
    'echartsRadar',   // 雷达图
    'echartsGauge', // 仪表盘图
    'echartsFunnel',  // 漏斗图
    'echartsData'
  ]
}