/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2025-12-31 10:15:34
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-05 14:27:24
 * @description: 
 */
export default {
    "name": "demo2",
    "type": "report",
    "reportItems": [
        {
            "type": "table",
            "tableColumns": [
                {
                    "type": "tablecolumn",
                    "width": "2.8cm"
                },
                {
                    "type": "tablecolumn",
                    "width": "1.99958cm"
                },
                {
                    "type": "tablecolumn",
                    "width": "1.999579cm"
                },
                {
                    "type": "tablecolumn",
                    "width": "1.999579cm"
                },
                {
                    "type": "tablecolumn",
                    "width": "1.999579cm"
                },
                {
                    "type": "tablecolumn",
                    "width": "1.999579cm"
                },
                {
                    "type": "tablecolumn",
                    "width": "1.5cm"
                },
                {
                    "type": "tablecolumn",
                    "width": "3.003951cm"
                }
            ],
            "details": {
                "type": "tabledetails",
                "tableRows": [
                    {
                        "type": "tablerow",
                        "height": "0.75cm",
                        "tableCells": [
                            {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "value": "=Fields!产品名称.Value",
                                    "name": "TextBox5",
                                    "style": {
                                        "background-color": "=IIF( RowNumber()  mod 2,\"#FFFFFF\",\"#F1F9F8\")",
                                        "font-family": "微软雅黑",
                                        "text-align": "Center",
                                        "vertical-align": "Middle",
                                        "color": "#404040",
                                        "padding-left": "2pt",
                                        "padding-right": "2pt",
                                        "padding-top": "2pt",
                                        "padding-bottom": "2pt",
                                        "style-name": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox9",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "rowSpan": 1,
                                "colSpan": 1,
                                "autoMergeMode": "Never"
                            },
                            {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "value": "=Fields!单位数量.Value",
                                    "name": "TextBox6",
                                    "style": {
                                        "background-color": "=IIF( RowNumber()  mod 2,\"#FFFFFF\",\"#F1F9F8\")",
                                        "font-family": "微软雅黑",
                                        "text-align": "Center",
                                        "vertical-align": "Middle",
                                        "color": "#404040",
                                        "padding-left": "2pt",
                                        "padding-right": "2pt",
                                        "padding-top": "2pt",
                                        "padding-bottom": "2pt",
                                        "style-name": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox10",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "rowSpan": 1,
                                "colSpan": 1,
                                "autoMergeMode": "Never"
                            },
                            {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "value": "=Fields!单价.Value",
                                    "name": "TextBox7",
                                    "style": {
                                        "background-color": "=IIF( RowNumber()  mod 2,\"#FFFFFF\",\"#F1F9F8\")",
                                        "font-family": "微软雅黑",
                                        "text-align": "Right",
                                        "vertical-align": "Middle",
                                        "color": "#404040",
                                        "padding-left": "2pt",
                                        "padding-right": "2pt",
                                        "padding-top": "2pt",
                                        "padding-bottom": "2pt",
                                        "style-name": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox12",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "rowSpan": 1,
                                "colSpan": 1,
                                "autoMergeMode": "Never"
                            },
                            {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "value": "=Fields!订购量.Value",
                                    "name": "TextBox20",
                                    "style": {
                                        "background-color": "=IIF( RowNumber()  mod 2,\"#FFFFFF\",\"#F1F9F8\")",
                                        "font-family": "微软雅黑",
                                        "text-align": "Right",
                                        "vertical-align": "Middle",
                                        "color": "#404040",
                                        "padding-left": "2pt",
                                        "padding-right": "2pt",
                                        "padding-top": "2pt",
                                        "padding-bottom": "2pt",
                                        "style-name": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox20",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "rowSpan": 1,
                                "colSpan": 1,
                                "autoMergeMode": "Never"
                            },
                            {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "value": "=Fields!库存量.Value",
                                    "name": "TextBox25",
                                    "style": {
                                        "background-color": "=IIF( RowNumber()  mod 2,\"#FFFFFF\",\"#F1F9F8\")",
                                        "font-family": "微软雅黑",
                                        "text-align": "Right",
                                        "vertical-align": "Middle",
                                        "color": "#404040",
                                        "padding-left": "2pt",
                                        "padding-right": "2pt",
                                        "padding-top": "2pt",
                                        "padding-bottom": "2pt",
                                        "style-name": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox25",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "rowSpan": 1,
                                "colSpan": 1,
                                "autoMergeMode": "Never"
                            },
                            {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "value": "=Fields!再订购量.Value",
                                    "name": "TextBox30",
                                    "style": {
                                        "background-color": "=IIF( RowNumber()  mod 2,\"#FFFFFF\",\"#F1F9F8\")",
                                        "font-family": "微软雅黑",
                                        "text-align": "Right",
                                        "vertical-align": "Middle",
                                        "color": "#404040",
                                        "padding-left": "2pt",
                                        "padding-right": "2pt",
                                        "padding-top": "2pt",
                                        "padding-bottom": "2pt",
                                        "style-name": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox30",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "rowSpan": 1,
                                "colSpan": 1,
                                "autoMergeMode": "Never"
                            },
                            {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "name": "TextBox71",
                                    "style": {
                                        "background-color": "=IIF( RowNumber()  mod 2,\"#FFFFFF\",\"#F1F9F8\")",
                                        "font-family": "微软雅黑",
                                        "text-align": "Right",
                                        "vertical-align": "Middle",
                                        "color": "#404040",
                                        "padding-left": "2pt",
                                        "padding-right": "2pt",
                                        "padding-top": "2pt",
                                        "padding-bottom": "2pt",
                                        "style-name": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox13",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "rowSpan": 1,
                                "colSpan": 1,
                                "autoMergeMode": "Never"
                            },
                            {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "value": "=Fields!单价.Value* Fields!订购量.Value",
                                    "name": "TextBox40",
                                    "style": {
                                        "background-color": "=IIF( RowNumber()  mod 2,\"#FFFFFF\",\"#F1F9F8\")",
                                        "font-family": "微软雅黑",
                                        "format": "c",
                                        "text-align": "Right",
                                        "vertical-align": "Middle",
                                        "color": "#404040",
                                        "padding-left": "2pt",
                                        "padding-right": "2pt",
                                        "padding-top": "2pt",
                                        "padding-bottom": "2pt",
                                        "style-name": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox40",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "rowSpan": 1,
                                "colSpan": 1,
                                "autoMergeMode": "Never"
                            }
                        ]
                    }
                ],
                "group": {
                    "pageBreakDisabled": "false",
                    "printFooterAtBottom": false,
                    "name": ""
                },
                "keepTogether": false
            },
            "tableGroups": [
                {
                    "type": "tablegroup",
                    "group": {
                        "name": "Table1_Group1",
                        "groupExpressions": [
                            "=Fields!类别名称.Value"
                        ],
                        "pageBreakDisabled": "false",
                        "printFooterAtBottom": false
                    },
                    "header": {
                        "type": "tableheader",
                        "tableRows": [
                            {
                                "type": "tablerow",
                                "height": "1cm",
                                "tableCells": [
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "=Fields!类别ID.Value.ToString()+\"、\"+Fields!类别名称.Value+\"（包括：\"+Fields!类别说明.Value+\"）\"",
                                            "name": "TextBox11",
                                            "style": {
                                                "background-color": "#02a274",
                                                "font-family": "微软雅黑",
                                                "font-size": "12pt",
                                                "font-weight": "Bold",
                                                "text-align": "Left",
                                                "vertical-align": "Middle",
                                                "color": "White",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "Gray"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox11",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 8,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                ]
                            },
                            {
                                "type": "tablerow",
                                "height": "0.75cm",
                                "tableCells": [
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "产品名称",
                                            "name": "TextBox12",
                                            "style": {
                                                "background-color": "#a8dcdb",
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Center",
                                                "vertical-align": "Middle",
                                                "color": "#103340",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox2",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 1,
                                        "autoMergeMode": "Never"
                                    },
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "单位数量",
                                            "name": "TextBox13",
                                            "style": {
                                                "background-color": "#a8dcdb",
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Center",
                                                "vertical-align": "Middle",
                                                "color": "#103340",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox3",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 1,
                                        "autoMergeMode": "Never"
                                    },
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "单价",
                                            "name": "TextBox17",
                                            "style": {
                                                "background-color": "#a8dcdb",
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Center",
                                                "vertical-align": "Middle",
                                                "color": "#103340",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox5",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 1,
                                        "autoMergeMode": "Never"
                                    },
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "订购量",
                                            "name": "TextBox19",
                                            "style": {
                                                "background-color": "#a8dcdb",
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Center",
                                                "vertical-align": "Middle",
                                                "color": "#103340",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox6",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 1,
                                        "autoMergeMode": "Never"
                                    },
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "库存量",
                                            "name": "TextBox24",
                                            "style": {
                                                "background-color": "#a8dcdb",
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Center",
                                                "vertical-align": "Middle",
                                                "color": "#103340",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox7",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 1,
                                        "autoMergeMode": "Never"
                                    },
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "再订购量",
                                            "name": "TextBox29",
                                            "style": {
                                                "background-color": "#a8dcdb",
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Center",
                                                "vertical-align": "Middle",
                                                "color": "#103340",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox28",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 1,
                                        "autoMergeMode": "Never"
                                    },
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "销售中",
                                            "name": "TextBox34",
                                            "style": {
                                                "background-color": "#a8dcdb",
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Center",
                                                "vertical-align": "Middle",
                                                "color": "#103340",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox8",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 1,
                                        "autoMergeMode": "Never"
                                    },
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "销售额",
                                            "name": "TextBox39",
                                            "style": {
                                                "background-color": "#a8dcdb",
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Center",
                                                "vertical-align": "Middle",
                                                "color": "#103340",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox39",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 1,
                                        "autoMergeMode": "Never"
                                    }
                                ]
                            }
                        ],
                        "repeatOnNewPage": true
                    },
                    "footer": {
                        "type": "tablefooter",
                        "tableRows": [
                            {
                                "type": "tablerow",
                                "height": "0.75cm",
                                "tableCells": [
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "产品数量：",
                                            "name": "TextBox31",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "Solid"
                                                },
                                                "bottom-border": {
                                                    "style": "None"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox31",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "=Count(Fields!产品ID.Value)&\" 件\"",
                                            "name": "TextBox41",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "Solid"
                                                },
                                                "bottom-border": {
                                                    "style": "None"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox41",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "订购总量：",
                                            "name": "TextBox28",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "Solid"
                                                },
                                                "bottom-border": {
                                                    "style": "None"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox14",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "=Sum(Fields!订购量.Value)&\" 件\"",
                                            "name": "TextBox38",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "Solid"
                                                },
                                                "bottom-border": {
                                                    "style": "None"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox38",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null
                                ]
                            },
                            {
                                "type": "tablerow",
                                "height": "0.75cm",
                                "tableCells": [
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "库存总量：",
                                            "name": "TextBox48",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "Solid"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox48",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "=Sum(Fields!库存量.Value)&\" 件\"",
                                            "name": "TextBox50",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "Solid"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox50",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "再订购总量：",
                                            "name": "TextBox56",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "Solid"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox56",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "=Sum(Fields!再订购量.Value)&\" 件\"",
                                            "name": "TextBox58",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "Solid"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox58",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null
                                ]
                            },
                            {
                                "type": "tablerow",
                                "height": "0.75cm",
                                "tableCells": [
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "销售总金额(无税)：",
                                            "name": "TextBox64",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "None"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox64",
                                            "width": "c",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "=Sum(Fields!单价.Value* Fields!订购量.Value)",
                                            "name": "TextBox9",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "format": "c",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "None"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox15",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "销售总金额(含税)：",
                                            "name": "TextBox3",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "font-weight": "Bold",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "None"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox16",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "value": "=Sum(Fields!单价.Value* Fields!订购量.Value*1.17)",
                                            "name": "TextBox2",
                                            "style": {
                                                "font-family": "微软雅黑",
                                                "format": "c",
                                                "text-align": "Right",
                                                "vertical-align": "Middle",
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "border": {
                                                    "color": "#bfbfbf"
                                                },
                                                "top-border": {
                                                    "style": "None"
                                                },
                                                "bottom-border": {
                                                    "style": "Solid"
                                                },
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox17",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 2,
                                        "autoMergeMode": "Never"
                                    },
                                    null
                                ]
                            },
                            {
                                "type": "tablerow",
                                "height": "0.75cm",
                                "tableCells": [
                                    {
                                        "item": {
                                            "type": "textbox",
                                            "canGrow": true,
                                            "name": "TextBox4",
                                            "style": {
                                                "padding-left": "2pt",
                                                "padding-right": "2pt",
                                                "padding-top": "2pt",
                                                "padding-bottom": "2pt",
                                                "style-name": "=\"\""
                                            },
                                            "keepTogether": true,
                                            "dataElementName": "TextBox19",
                                            "width": "1in",
                                            "height": "0.25in"
                                        },
                                        "rowSpan": 1,
                                        "colSpan": 8,
                                        "autoMergeMode": "Never"
                                    },
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null
                                ]
                            }
                        ]
                    }
                }
            ],
            "detailDataElementOutput": "Output",
            "dataSetName": "DataSet1",
            "name": "Table1",
            "left": "0cm",
            "top": "2.705cm",
            "width": "17.30185cm",
            "height": "5.5cm",
            "style": {
                "style-name": "=\"\""
            }
        }
    ],
    "pageHeader": {
        "type": "pagesection",
        "name": "PageHeader",
        "height": "0.75cm",
        "style": {
            "style-name": "=\"\""
        }
    },
    "pageFooter": {
        "type": "pagesection",
        "name": "PageFooter",
        "height": "0.75cm",
        "reportItems": [
            {
                "type": "text",
                "canGrow": true,
                "value": "=\"第 \" & Globals!PageNumber & \" 页、共 \" & Globals!TotalPages &\" 页\"",
                "name": "TextBox8",
                "width": "18cm",
                "height": "0.75cm",
                "style": {
                    "font-family": "微软雅黑",
                    "text-align": "Center",
                    "vertical-align": "Middle",
                    "padding-left": "2pt",
                    "padding-right": "2pt",
                    "padding-top": "2pt",
                    "padding-bottom": "2pt",
                    "style-name": "=\"\""
                },
                "keepTogether": true,
                "dataElementName": "TextBox24"
            }
        ],
        "style": {
            "background-color": "White",
            "style-name": "=\"\""
        }
    },
    "page": {
        "pageWidth": "21cm",
        "pageHeight": "29.7cm",
        "rightMargin": "1.7cm",
        "leftMargin": "1.8cm",
        "topMargin": "1.5cm",
        "bottomMargin": "1cm",
        "columns": 1,
        "columnSpacing": "0in"
    },
    "width": "7.0866in",
    "dataSources": [
        {
            "name": "DataSource1",
            "connectionProperties": {
                "connectString": "",
                "dataProvider": "TESTING",
                "integratedSecurity": false,
                "prompt": ""
            },
            "transaction": false
        }
    ],
    "dataSets": [
        {
            "fields": [
                {
                    "name": "产品ID",
                    "dataField": "产品ID"
                },
                {
                    "name": "产品名称",
                    "dataField": "产品名称"
                },
                {
                    "name": "供应商ID",
                    "dataField": "供应商ID"
                },
                {
                    "name": "类别ID",
                    "dataField": "类别ID"
                },
                {
                    "name": "单位数量",
                    "dataField": "单位数量"
                },
                {
                    "name": "单价",
                    "dataField": "单价"
                },
                {
                    "name": "库存量",
                    "dataField": "库存量"
                },
                {
                    "name": "订购量",
                    "dataField": "订购量"
                },
                {
                    "name": "再订购量",
                    "dataField": "再订购量"
                },
                {
                    "name": "中止",
                    "dataField": "中止"
                },
                {
                    "name": "产品描述",
                    "dataField": "产品描述"
                },
                {
                    "name": "类别名称",
                    "dataField": "类别名称"
                },
                {
                    "name": "类别说明",
                    "dataField": "类别说明"
                },
                {
                    "name": "供应商",
                    "dataField": "供应商"
                },
                {
                    "name": "联系人姓名",
                    "dataField": "联系人姓名"
                },
                {
                    "name": "城市",
                    "dataField": "城市"
                },
                {
                    "name": "地址",
                    "dataField": "地址"
                }
            ],
            "query": {
                "dataSourceName": "DataSource1",
                "commandType": "Text",
                "timeout": 0
            },
            "caseSensitivity": "Auto",
            "accentSensitivity": "Auto",
            "kanatypeSensitivity": "Auto",
            "widthSensitivity": "Auto",
            "name": "DataSet1"
        }
    ],
    "embeddedImages": [
       
    ],
    "layers": [
        {
            "type": "layer",
            "name": "default"
        },
        {
            "type": "layer",
            "name": "Layer1",
            "designerVisible": false
        }
    ],
    "customProperties": [
        {
            "name": "DisplayType",
            "value": "Page"
        },
        {
            "name": "SizeType",
            "value": "Default"
        }
    ],
    "transformationInfo": []
}