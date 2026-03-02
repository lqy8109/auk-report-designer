export default {
    "Name": "Report",
    "Width": "21cm",
    "Layers": [
        {
            "Name": "default"
        }
    ],
    "CustomProperties": [
        {
            "Name": "DisplayType",
            "Value": "Page"
        },
        {
            "Name": "SizeType",
            "Value": "Default"
        },
        {
            "Name": "PaperOrientation",
            "Value": "Portrait"
        }
    ],
    "Page": {
        "PageWidth": "21cm",
        "PageHeight": "29.7cm",
        "RightMargin": "1.7cm",
        "LeftMargin": "1.8cm",
        "TopMargin": "1.5cm",
        "BottomMargin": "1cm",
        "Columns": 1,
        "ColumnSpacing": "0in"
    },
    "DataSources": [
        {
            "Name": "DataSource",
            "ConnectionProperties": {
                "DataProvider": "JSONEMBED",
                "ConnectString": "jsondata={}"
            }
        }
    ],
    "ReportItems": [
        {
            "Type": "textbox",
            "Name": "文本框10",
            "ZIndex": 4,
            "KeepTogether": true,
            "Value": "记录编号：ZHJT2021J0TEST",
            "Style": {
                "FontFamily": "宋体",
                "FontSize": "9pt",
                "PaddingLeft": "2pt",
                "PaddingRight": "2pt",
                "PaddingTop": "2pt",
                "PaddingBottom": "2pt"
            },
            "Left": "0cm",
            "Top": "2.1cm",
            "Width": "4.8cm",
            "Height": "0.451cm"
        },
        {
            "Type": "textbox",
            "Name": "文本框11",
            "ZIndex": 5,
            "KeepTogether": true,
            "Value": "任务编号：ZHJT2021R00291",
            "Style": {
                "FontFamily": "宋体",
                "FontSize": "9pt",
                "PaddingLeft": "2pt",
                "PaddingRight": "2pt",
                "PaddingTop": "2pt",
                "PaddingBottom": "2pt"
            },
            "Left": "4.8cm",
            "Top": "2.1cm",
            "Width": "4.8cm",
            "Height": "0.451cm"
        },
        {
            "Type": "textbox",
            "Name": "文本框9",
            "ZIndex": 6,
            "KeepTogether": true,
            "Value": "第1页，共1页",
            "Style": {
                "FontFamily": "宋体",
                "FontSize": "9pt",
                "PaddingLeft": "2pt",
                "PaddingRight": "2pt",
                "PaddingTop": "2pt",
                "PaddingBottom": "2pt",
                "TextAlign": "Right"
            },
            "Left": "14.899cm",
            "Top": "2.1cm",
            "Width": "2.5cm",
            "Height": "0.451cm"
        },
        {
            "Type": "table",
            "Name": "表格2",
            "ZIndex": 7,
            "Style": {
                "Border": {
                    "Style": "Solid",
                    "Width": "2pt"
                },
                "FontFamily": "微软雅黑",
                "FontSize": "9pt"
            },
            "TableColumns": [
                {
                    "Width": "3.009cm"
                },
                {
                    "Width": "5.716cm"
                },
                {
                    "Width": "3.009cm"
                },
                {
                    "Width": "5.716cm"
                }
            ],
            "Header": {
                "TableRows": [
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框12",
                                    "KeepTogether": true,
                                    "Value": "样品名称",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.009cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框13",
                                    "KeepTogether": true,
                                    "Value": "砼立方体试件",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "5.716cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框14",
                                    "KeepTogether": true,
                                    "Value": "样品描述",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.009cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框6",
                                    "KeepTogether": true,
                                    "Value": "无蜂窝麻面，外观完好",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "5.716cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    }
                ],
                "RepeatOnNewPage": true
            },
            "Details": {
                "TableRows": [
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框15",
                                    "KeepTogether": true,
                                    "Value": "试验方法",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.009cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框16",
                                    "KeepTogether": true,
                                    "Value": "JTG E30-2005",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "5.716cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框17",
                                    "KeepTogether": true,
                                    "Value": "试验日期",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.009cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框7",
                                    "KeepTogether": true,
                                    "Value": "2021-01-17",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "5.716cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框3",
                                    "KeepTogether": true,
                                    "Value": "温度",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.009cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框4",
                                    "KeepTogether": true,
                                    "Value": "/",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "5.716cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框5",
                                    "KeepTogether": true,
                                    "Value": "相对湿度",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.009cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框8",
                                    "KeepTogether": true,
                                    "Value": "/",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "5.716cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    }
                ]
            },
            "Footer": {
                "TableRows": [
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框18",
                                    "KeepTogether": true,
                                    "Value": "仪器设备及编号",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid",
                                            // "Width": "10px"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#b1ffb1",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.009cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框19",
                                    "KeepTogether": true,
                                    "Value": "压力试验机 E2000075，钢直尺0~30cm LE120002",
                                    "Style": {
                                        "Border": {
                                            "Color": "red",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "14.441cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    }
                ]
            },
            "Left": "0cm",
            "Top": "2.705cm",
            "Width": "17.45cm",
            "Height": "3.02cm",
            "Id": '1234',
        },
        {
            "Type": "textbox",
            "Name": "文本框1",
            "ZIndex": 8,
            "KeepTogether": true,
            "Value": "XXXX 交通工程技术有限公司",
            "Style": {
                "FontFamily": "黑体",
                "FontSize": "11pt",
                "PaddingLeft": "2pt",
                "PaddingRight": "2pt",
                "PaddingTop": "2pt",
                "PaddingBottom": "2pt",
                "TextAlign": "Center"
            },
            "Left": "0cm",
            "Top": "0cm",
            "Width": "17.5cm",
            "Height": "0.6cm"
        },
        {
            "Type": "textbox",
            "Name": "文本框2",
            "ZIndex": 9,
            "KeepTogether": true,
            "Value": "砼立方体抗压强度试验检测记录表",
            "Style": {
                "FontFamily": "黑体",
                "FontSize": "18pt",
                "FontWeight": "Bold",
                "PaddingLeft": "2pt",
                "PaddingRight": "2pt",
                "PaddingTop": "2pt",
                "PaddingBottom": "2pt",
                "TextAlign": "Center"
            },
            "Left": "0cm",
            "Top": "0.598cm",
            "Width": "17.5cm",
            "Height": "0.902cm"
        },
        {
            "Type": "table",
            "Name": "表格1",
            "ZIndex": 10,
            "Style": {
                "Border": {
                    "Style": "Solid",
                    "Width": "2pt"
                },
                "FontFamily": "微软雅黑"
            },
            "TableColumns": [
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                },
                {
                    "Width": "1.25cm"
                }
            ],
            "Header": {
                "TableRows": [
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框70",
                                    "KeepTogether": true,
                                    "Value": "盲样编号",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#0cc0ed",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框20",
                                    "KeepTogether": true,
                                    "Value": "ZHJT2021Y00227",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框80",
                                    "KeepTogether": true,
                                    "Value": "以下空白",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框30",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框41",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    },
                    {
                        "Height": "1.5cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框117",
                                    "KeepTogether": true,
                                    "Value": "构件部位",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "1.5cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框119",
                                    "KeepTogether": true,
                                    "Value": "桥梁工程（双田小桥）1-7预制空心板桥梁工程（双田小桥）1-7预制空心板",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "1.5cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框122",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "1.5cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框125",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "1.5cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框128",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "1.5cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框22",
                                    "KeepTogether": true,
                                    "Value": "强度等级",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框31",
                                    "KeepTogether": true,
                                    "Value": "C40",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框47",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框85",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框100",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框32",
                                    "KeepTogether": true,
                                    "Value": "制件日期",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid",
                                            "Width": "4px"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框65",
                                    "KeepTogether": true,
                                    "Value": "2020-12-20",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框90",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框94",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框98",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框103",
                                    "KeepTogether": true,
                                    "Value": "龄期",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框105",
                                    "KeepTogether": true,
                                    "Value": "28",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框108",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框111",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框114",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框21",
                                    "KeepTogether": true,
                                    "Value": "破型日期",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框75",
                                    "KeepTogether": true,
                                    "Value": "2021-01-17",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框88",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框92",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框95",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框29",
                                    "KeepTogether": true,
                                    "Value": "试件尺寸",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框44",
                                    "KeepTogether": true,
                                    "Value": "150*150*150",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框66",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框69",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框78",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框51",
                                    "KeepTogether": true,
                                    "Value": "顶面边长\n(mm)",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "1.5cm"
                                },
                                "RowSpan": 2
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框84",
                                    "KeepTogether": true,
                                    "Value": "1",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框89",
                                    "KeepTogether": true,
                                    "Value": "150",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框102",
                                    "KeepTogether": true,
                                    "Value": "150",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框104",
                                    "KeepTogether": true,
                                    "Value": "150",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框106",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框107",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框109",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框110",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框112",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框113",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框115",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框116",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框118",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框121",
                                    "KeepTogether": true,
                                    "Value": "2",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框123",
                                    "KeepTogether": true,
                                    "Value": "151",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框124",
                                    "KeepTogether": true,
                                    "Value": "151",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框126",
                                    "KeepTogether": true,
                                    "Value": "151",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框127",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框129",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框130",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框131",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框132",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框133",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框134",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框135",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框136",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框137",
                                    "KeepTogether": true,
                                    "Value": "底面边长(mm)",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "1.5cm"
                                },
                                "RowSpan": 2
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框138",
                                    "KeepTogether": true,
                                    "Value": "1",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框139",
                                    "KeepTogether": true,
                                    "Value": "150",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框140",
                                    "KeepTogether": true,
                                    "Value": "150",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框141",
                                    "KeepTogether": true,
                                    "Value": "150",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框142",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框143",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框144",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框145",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框146",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框147",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框148",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框149",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框150",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框152",
                                    "KeepTogether": true,
                                    "Value": "2",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框153",
                                    "KeepTogether": true,
                                    "Value": "151",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框154",
                                    "KeepTogether": true,
                                    "Value": "151",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框155",
                                    "KeepTogether": true,
                                    "Value": "151",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框156",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框157",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框158",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框159",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框160",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框161",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框162",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框163",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框164",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框165",
                                    "KeepTogether": true,
                                    "Value": "破坏荷载",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框167",
                                    "KeepTogether": true,
                                    "Value": "1406.92",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框168",
                                    "KeepTogether": true,
                                    "Value": "1261.17",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框169",
                                    "KeepTogether": true,
                                    "Value": "1537.96",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框170",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框171",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框172",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框173",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框174",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框175",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框176",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框177",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框178",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框50",
                                    "KeepTogether": true,
                                    "Value": "抗压强度值",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框53",
                                    "KeepTogether": true,
                                    "Value": "62.1",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框54",
                                    "KeepTogether": true,
                                    "Value": "55.7",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框55",
                                    "KeepTogether": true,
                                    "Value": "67.9",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框56",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框57",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框58",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框59",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框60",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框61",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框62",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框63",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框64",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    }
                ],
                "RepeatOnNewPage": true
            },
            "Details": {
                "TableRows": [
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框71",
                                    "KeepTogether": true,
                                    "Value": "换算系数",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框23",
                                    "KeepTogether": true,
                                    "Value": "1.00",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框81",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框34",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框42",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框120",
                                    "KeepTogether": true,
                                    "Value": "换算抗压强度",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框180",
                                    "KeepTogether": true,
                                    "Value": "62.1",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框181",
                                    "KeepTogether": true,
                                    "Value": "55.7",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框182",
                                    "KeepTogether": true,
                                    "Value": "67.9",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框183",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框184",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框185",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框186",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框187",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框188",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框189",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框190",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            },
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框191",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "1.25cm",
                                    "Height": "0.75cm"
                                }
                            }
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框192",
                                    "KeepTogether": true,
                                    "Value": "强度测定值",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框194",
                                    "KeepTogether": true,
                                    "Value": "61.9",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框197",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框200",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框203",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "3.75cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 3
                            },
                            null,
                            null
                        ]
                    },
                    {
                        "Height": "0.75cm",
                        "TableCells": [
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框26",
                                    "KeepTogether": true,
                                    "Value": "备注",
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "BackgroundColor": "#ffffff",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "2.5cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 2
                            },
                            null,
                            {
                                "Item": {
                                    "Type": "textbox",
                                    "Name": "文本框28",
                                    "KeepTogether": true,
                                    "Style": {
                                        "Border": {
                                            "Color": "DimGray",
                                            "Style": "Solid"
                                        },
                                        "FontFamily": "宋体",

                                        "TextAlign": "Center",
                                        "VerticalAlign": "Middle",
                                        "ShrinkToFit": "=True"
                                    },
                                    "Left": "0cm",
                                    "Top": "0cm",
                                    "Width": "15cm",
                                    "Height": "0.75cm"
                                },
                                "ColSpan": 12
                            },
                            null,
                            null,
                            null,
                            null,
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
            },
            "Left": "0cm",
            "Top": "7.8cm",
            "Width": "17.5cm",
            "Height": "13.5cm",
            "Id": '123',
        },
        // {
        //     "Type": "textbox",
        //     "Name": "文本框24",
        //     "ZIndex": 11,
        //     "KeepTogether": true,
        //     "Value": "试验：张三",
        //     "Style": {
        //         "FontFamily": "宋体",
        //         "FontSize": "9pt",
        //         "PaddingLeft": "2pt",
        //         "PaddingRight": "2pt",
        //         "PaddingTop": "2pt",
        //         "PaddingBottom": "2pt"
        //     },
        //     "Left": "0cm",
        //     "Top": "19.481cm",
        //     "Width": "2.5cm",
        //     "Height": "0.75cm"
        // },
        // {
        //     "Type": "textbox",
        //     "Name": "文本框25",
        //     "ZIndex": 12,
        //     "KeepTogether": true,
        //     "Value": "复核：李四",
        //     "Style": {
        //         "FontFamily": "宋体",
        //         "FontSize": "9pt",
        //         "PaddingLeft": "2pt",
        //         "PaddingRight": "2pt",
        //         "PaddingTop": "2pt",
        //         "PaddingBottom": "2pt"
        //     },
        //     "Left": "9.944cm",
        //     "Top": "19.507cm",
        //     "Width": "2.5cm",
        //     "Height": "0.75cm"
        // }
    ],
    "DataSets": [
        {
            "Name": "DataSet",
            "Query": {
                "DataSourceName": "DataSource",
                "CommandText": "jpath=$"
            },
            "CaseSensitivity": "Auto",
            "KanatypeSensitivity": "Auto",
            "AccentSensitivity": "Auto",
            "WidthSensitivity": "Auto"
        }
    ]
};