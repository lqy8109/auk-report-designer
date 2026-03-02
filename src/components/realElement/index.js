/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2025-12-18 16:36:02
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-26 15:03:00
 * @description: 
 */
import Text from "./text.vue";
import Table from "./table.vue";
import Line from './line.vue';
import Graphic from './graphic.vue';
import Qrcode from './qrcode.vue';
import Image from './image.vue';
import Label from './label.vue';
import RichText from './richText.vue';
import Charts from './charts.vue';


// 组件类型常量
export const ComponentWH = {
    input: {
        width: 94.49,
        height: 28.35,
    },
    table: {
        width: 298.45,
        height: 99.03,
    },
}


export {
    Text,
    Table,
    Line,
    Graphic,
    Qrcode,
    Image,
    Label,
    RichText,
    Charts,
}

export const ComponentJson = {
    table: {
        "type": "table",
        "name": "表格1",
        "zIndex": 10,
        "style": {
            "border": {
                "style": "Solid",
                "width": "1px"
            },
            "fontFamily": "微软雅黑"
        },
        "tableColumns": [
            {
                "width": "94px"
            },
            {
                "width": "94px"
            },
            {
                "width": "94px"
            },
        ],
        "header": {
            "tableRows": [
                {
                    "height": "28.34px",
                    "tableCells": [
                        {
                            "item": {
                                "type": "textbox",
                                "name": "文本框70",
                                "keepTogether": true,
                                "value": "",
                                "style": {
                                    "border": {
                                        "color": "DimGray",
                                        "style": "Solid"
                                    },
                                    "fontFamily": "宋体",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "backgroundColor": "#ffffff",
                                    "shrinkToFit": "=True"
                                },
                                "left": "0cm",
                                "top": "0cm",
                                "width": "2.5cm",
                                "height": "28.34px"
                            },
                            "colSpan": 1
                        },
                        {
                            "item": {
                                "type": "textbox",
                                "name": "文本框70",
                                "keepTogether": true,
                                "value": "",
                                "style": {
                                    "border": {
                                        "color": "DimGray",
                                        "style": "Solid"
                                    },
                                    "fontFamily": "宋体",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "backgroundColor": "#ffffff",
                                    "shrinkToFit": "=True"
                                },
                                "left": "0cm",
                                "top": "0cm",
                                "width": "2.5cm",
                                "height": "28.34px"
                            },
                            "colSpan": 1
                        },
                        {
                            "item": {
                                "type": "textbox",
                                "name": "文本框70",
                                "keepTogether": true,
                                "value": "",
                                "style": {
                                    "border": {
                                        "color": "DimGray",
                                        "style": "Solid"
                                    },
                                    "fontFamily": "宋体",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "backgroundColor": "#ffffff",
                                    "shrinkToFit": "=True"
                                },
                                "left": "0cm",
                                "top": "0cm",
                                "width": "2.5cm",
                                "height": "28.34px"
                            },
                            "colSpan": 1
                        }
                    ]
                }
            ],
            "repeatOnNewPage": true
        },
        "details": {
            "tableRows": [
                {
                    "height": "28.34px",
                    "tableCells": [
                        {
                            "item": {
                                "type": "textbox",
                                "name": "文本框71",
                                "keepTogether": true,
                                "value": "",
                                "style": {
                                    "border": {
                                        "color": "DimGray",
                                        "style": "Solid"
                                    },
                                    "fontFamily": "宋体",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "backgroundColor": "#ffffff",
                                    "shrinkToFit": "=True"
                                },
                                "left": "0cm",
                                "top": "0cm",
                                "width": "2.5cm",
                                "height": "28.34px"
                            },
                            "colSpan": 1
                        },
                        {
                            "item": {
                                "type": "textbox",
                                "name": "文本框71",
                                "keepTogether": true,
                                "value": "",
                                "style": {
                                    "border": {
                                        "color": "DimGray",
                                        "style": "Solid"
                                    },
                                    "fontFamily": "宋体",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "backgroundColor": "#ffffff",
                                    "shrinkToFit": "=True"
                                },
                                "left": "0cm",
                                "top": "0cm",
                                "width": "2.5cm",
                                "height": "28.34px"
                            },
                            "colSpan": 1
                        },
                        {
                            "item": {
                                "type": "textbox",
                                "name": "文本框71",
                                "keepTogether": true,
                                "value": "",
                                "style": {
                                    "border": {
                                        "color": "DimGray",
                                        "style": "Solid"
                                    },
                                    "fontFamily": "宋体",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "backgroundColor": "#ffffff",
                                    "shrinkToFit": "=True"
                                },
                                "left": "0cm",
                                "top": "0cm",
                                "width": "2.5cm",
                                "height": "28.34px"
                            },
                            "colSpan": 1
                        }
                    ]
                }
            ]
        },
        "footer": {
            "tableRows": [
                {
                    "height": "28.34px",
                    "tableCells": [
                        {
                            "item": {
                                "type": "textbox",
                                "name": "文本框71",
                                "keepTogether": true,
                                "value": "",
                                "style": {
                                    "border": {
                                        "color": "DimGray",
                                        "style": "Solid"
                                    },
                                    "fontFamily": "宋体",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "backgroundColor": "#ffffff",
                                    "shrinkToFit": "=True"
                                },
                                "left": "0cm",
                                "top": "0cm",
                                "width": "2.5cm",
                                "height": "28.34px"
                            },
                            "colSpan": 1
                        },
                        {
                            "item": {
                                "type": "textbox",
                                "name": "文本框71",
                                "keepTogether": true,
                                "value": "",
                                "style": {
                                    "border": {
                                        "color": "DimGray",
                                        "style": "Solid"
                                    },
                                    "fontFamily": "宋体",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "backgroundColor": "#ffffff",
                                    "shrinkToFit": "=True"
                                },
                                "left": "0cm",
                                "top": "0cm",
                                "width": "2.5cm",
                                "height": "28.34px"
                            },
                            "colSpan": 1
                        },
                        {
                            "item": {
                                "type": "textbox",
                                "name": "文本框71",
                                "keepTogether": true,
                                "value": "",
                                "style": {
                                    "border": {
                                        "color": "DimGray",
                                        "style": "Solid"
                                    },
                                    "fontFamily": "宋体",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "backgroundColor": "#ffffff",
                                    "shrinkToFit": "=True"
                                },
                                "left": "0cm",
                                "top": "0cm",
                                "width": "2.5cm",
                                "height": "28.34px"
                            },
                            "colSpan": 1
                        }
                    ]
                }
            ]
        },
        "left": "0cm",
        "top": "5.8cm",
        "width": "283",
        "height": "88"
    },
    text: {
        "type": "text",
        "value": "",
        "name": "TextBox17",
        "width": "100",
        "height": "28",
        "style": {
            "font-family": "微软雅黑",
            "font-size": "14",
            "text-align": "left",

        },
    },
    line: {
        "type": "line",
        "name": "Line1",
        "zIndex": 4,
        "startPoint": {
            "x": "",
            "y": ""
        },
        "endPoint": {
            "x": "",
            "y": ""
        },
        "style": {
            "border": {
                "style": "solid",
                "color": "#000000"
            },
            backgroundColor: "#ffffff",
        },
        "width": 50,
    },
    graphic: {
        "type": "graphic",
        "name": "graphic1",
        "zIndex": 5,
        "style": {
            "border": {
                "style": "Solid",
                "color": "#000000"
            },
            "border-radius": "5pt",
            "backgroundColor": "#ffffff"
        },
        "width": 180,
        "height": 100,

    },
    qrcode: {
        "type": "qrcode",
        "name": "qrcode1",
        "zIndex": 5,
        "width": 90,
        "height": 90,
        "qrcodeType": "qrcode",
        "style": {},
        "value": "",
    },
    image: {
        "type": "image",
        "name": "image1",
        "zIndex": 5,
        "width": 90,
        "height": 90,
        "style": {},
        "value": "",
    },
    label: {
        "type": "label",
        "value": "",
        "name": "TextBox17",
        "width": "100",
        "height": "28",
        "style": {
            "font-family": "微软雅黑",
            "font-size": "14",
            "text-align": "left",
        },
    },
    richText: {
        "type": "richText",
        "value": "",
        "name": "TextBox17",
        "width": "120",
        "height": "60",
        "style": {
            "font-family": "微软雅黑",
            "font-size": "14",
            "text-align": "left",
        },
    },
}


