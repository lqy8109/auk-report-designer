/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-02-05 17:10:30
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-05 17:47:07
 * @description: 
 */
export default {
    "name": "demo4",
    "type": "report",
    "reportItems": [
        {
            "type": "graphic",
            "shapeStyle": "RoundRect",
            "name": "Shape1",
            "width": "9.6cm",
            "height": "4.4cm",
            "zIndex": 1,
            "style": {
                "background-color": "#cbecf5",

                "border-width": "1px",
                "border-style": "solid",
                "border-color": "#96ddf1",
                "border-radius": "65px",
                "style-name": "=\"\""
            }
        },
        {
            "type": "qrcode",
            "symbology": "QRCode",
            "value": "=Fields!订单ID.Value",
            "name": "Barcode1",
            "top": "0.8cm",
            "left": "0.5820833cm",
            "width": "3.0692cm",
            "height": "2.9835cm",
            "zIndex": 2,
            "style": {
                "font-family": "Courier New",
                "font-size": "8pt",

                "style-name": "=\"\""
            },
            "keepTogether": false,
            "dataElementName": "Barcode1"
        },
        {
            "type": "text",
            "value": "订单编号：",
            "name": "TextBox1",
            "top": "0.784583cm",
            "left": "3.995208cm",
            "width": "2.5cm",
            "height": "0.75cm",
            "zIndex": 3,
            "style": {
                "background-color": "#00a8c6",
                "font-family": "微软雅黑",
                "font-weight": "Bold",
                "vertical-align": "Middle",
                "padding-left": "2pt",
                "padding-right": "2pt",
                "padding-top": "2pt",
                "padding-bottom": "2pt",
                "border-width": "1px",
                "border-style": "solid",

                "style-name": "=\"\""
            },
            "keepTogether": true,
            "dataElementName": "TextBox1"
        },
        {
            "type": "text",
            "value": "客户名称：",
            "name": "TextBox2",
            "top": "1.534583cm",
            "left": "3.995208cm",
            "width": "2.5cm",
            "height": "0.75cm",
            "zIndex": 4,
            "style": {
                "background-color": "#00a8c6",
                "font-family": "微软雅黑",
                "font-weight": "Bold",
                "vertical-align": "Middle",
                "padding-left": "2pt",
                "padding-right": "2pt",
                "padding-top": "2pt",
                "padding-bottom": "2pt",
                "border-width": "1px",
                "border-style": "solid",
                "style-name": "=\"\""
            },
            "keepTogether": true,
            "dataElementName": "TextBox2"
        },
        {
            "type": "text",
            "value": "运货商：",
            "name": "TextBox3",
            "top": "2.284583cm",
            "left": "3.995208cm",
            "width": "2.5cm",
            "height": "0.75cm",
            "zIndex": 5,
            "style": {
                "background-color": "#00a8c6",
                "font-family": "微软雅黑",
                "font-weight": "Bold",
                "vertical-align": "Middle",
                "padding-left": "2pt",
                "padding-right": "2pt",
                "padding-top": "2pt",
                "padding-bottom": "2pt",
                 "border-width": "1px",
                "border-style": "solid",
                "style-name": "=\"\""
            },
            "keepTogether": true,
            "dataElementName": "TextBox3"
        },
        {
            "type": "text",
            "value": "货主名称：",
            "name": "TextBox4",
            "top": "3.025cm",
            "left": "3.995208cm",
            "width": "2.5cm",
            "height": "0.75cm",
            "zIndex": 6,
            "style": {
                "background-color": "#00a8c6",
                "font-family": "微软雅黑",
                "font-weight": "Bold",
                "vertical-align": "Middle",
                "padding-left": "2pt",
                "padding-right": "2pt",
                "padding-top": "2pt",
                "padding-bottom": "2pt",
                "border-width": "1px",
                "border-style": "solid",
                "style-name": "=\"\""
            },
            "keepTogether": true,
            "dataElementName": "TextBox4"
        },
        {
            "type": "text",
            "value": "=Fields!订单ID.Value",
            "name": "TextBox5",
            "top": "0.784583cm",
            "left": "6.482292cm",
            "width": "2.5cm",
            "height": "0.75cm",
            "zIndex": 7,
            "style": {
                "background-color": "#69d2e7",
                "font-family": "微软雅黑",
                "text-align": "Center",
                "vertical-align": "Middle",
                "padding-left": "2pt",
                "padding-right": "2pt",
                "padding-top": "2pt",
                "padding-bottom": "2pt",
                "border-width": "1px",
                "border-style": "solid",
                "style-name": "=\"\""
            },
            "keepTogether": true,
            "dataElementName": "TextBox5"
        },
        {
            "type": "text",
            "value": "=Fields!客户ID.Value",
            "name": "TextBox6",
            "top": "1.534583cm",
            "left": "6.482292cm",
            "width": "2.5cm",
            "height": "0.75cm",
            "zIndex": 8,
            "style": {
                "background-color": "#a7dbd8",
                "font-family": "微软雅黑",
                "text-align": "Center",
                "vertical-align": "Middle",
                "padding-left": "2pt",
                "padding-right": "2pt",
                "padding-top": "2pt",
                "padding-bottom": "2pt",
                "border-width": "1px",
                "border-style": "solid",
                "style-name": "=\"\""
            },
            "keepTogether": true,
            "dataElementName": "TextBox6"
        },
        {
            "type": "text",
            "value": "=Fields!货主名称.Value",
            "name": "TextBox7",
            "top": "3.025cm",
            "left": "6.482292cm",
            "width": "2.5cm",
            "height": "0.75cm",
            "zIndex": 9,
            "style": {
                "background-color": "#a7dbd8",
                "font-family": "微软雅黑",
                "text-align": "Center",
                "vertical-align": "Middle",
                "padding-left": "2pt",
                "padding-right": "2pt",
                "padding-top": "2pt",
                "padding-bottom": "2pt",
                "border-width": "1px",
                "border-style": "solid",
                "style-name": "=\"\""
            },
            "keepTogether": true,
            "dataElementName": "TextBox7"
        },
        {
            "type": "text",
            "value": "=Fields!运货商.Value",
            "name": "TextBox8",
            "top": "2.284583cm",
            "left": "6.482292cm",
            "width": "2.5cm",
            "height": "0.75cm",
            "zIndex": 10,
            "style": {
                "background-color": "#69d2e7",
                "font-family": "微软雅黑",
                "text-align": "Center",
                "vertical-align": "Middle",
                "padding-left": "2pt",
                "padding-right": "2pt",
                "padding-top": "2pt",
                "padding-bottom": "2pt",
                 "border-width": "1px",
                "border-style": "solid",
                "style-name": "=\"\""
            },
            "keepTogether": true,
            "dataElementName": "TextBox8"
        }
    ],
    "pageHeader": {
        "type": "pagesection",
        "name": "PageHeader",
        "height": "0.9260417cm",
        "style": {
            "style-name": "=\"\""
        }
    },
    "page": {
        "pageWidth": "31cm",
        "pageHeight": "28cm",
        "pageOrientation": "Portrait",
        "columns": 3,
        "columnSpacing": "0.2cm",
        "bottomMargin": "0in",
        "leftMargin": "0in",
        "rightMargin": "0in",
        "topMargin": "0in"
    },
    "width": "9.8cm",
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
                    "name": "订单ID",
                    "dataField": "订单ID"
                },
                {
                    "name": "客户ID",
                    "dataField": "客户ID"
                },
                {
                    "name": "雇员ID",
                    "dataField": "雇员ID"
                },
                {
                    "name": "订购日期",
                    "dataField": "订购日期"
                },
                {
                    "name": "到货日期",
                    "dataField": "到货日期"
                },
                {
                    "name": "发货日期",
                    "dataField": "发货日期"
                },
                {
                    "name": "运货商",
                    "dataField": "运货商"
                },
                {
                    "name": "运货费",
                    "dataField": "运货费"
                },
                {
                    "name": "货主名称",
                    "dataField": "货主名称"
                },
                {
                    "name": "货主地址",
                    "dataField": "货主地址"
                },
                {
                    "name": "货主城市",
                    "dataField": "货主城市"
                },
                {
                    "name": "货主地区",
                    "dataField": "货主地区"
                },
                {
                    "name": "货主邮政编码",
                    "dataField": "货主邮政编码"
                },
                {
                    "name": "货主国家",
                    "dataField": "货主国家"
                }
            ],
            "caseSensitivity": "Auto",
            "accentSensitivity": "Auto",
            "kanatypeSensitivity": "Auto",
            "widthSensitivity": "Auto",
            "name": "DataSet1"
        }
    ],
    "embeddedImages": [],
    "layers": [
        {
            "type": "layer",
            "name": "default"
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