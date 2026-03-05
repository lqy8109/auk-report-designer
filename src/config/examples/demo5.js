export default {
    "name": "demo5",
    "type": "report",
    "reportItems": [{
        "type": "tablix",
        "rowHierarchy": {
            "levelSizes": ["2.5cm", "3cm"],
            "members": [{
                "type": "tablixmember",
                "group": {
                    "Name": "Tablix1_XDM1",
                    "GroupExpressions": ["=Fields!XDM.Value"],
                    "PageBreakDisabled": "false"
                },
                "bodyIndex": -1,
                "bodyCount": 3,
                "children": [{
                    "type": "tablixmember",
                    "header": {
                        "item": {
                            "type": "textbox",
                            "canGrow": true,
                            "value": "=Fields!XMC.Value",
                            "name": "TextBox7",
                            "style": {
                                "backgroundColor": "#aedac8",
                                "fontFamily": "微软雅黑",
                                "fontSize": "11pt",
                                "textAlign": "Center",
                                "verticalAlign": "Middle",
                                "color": "#1b4931",
                                "paddingLeft": "2pt",
                                "paddingRight": "2pt",
                                "paddingTop": "2pt",
                                "paddingBottom": "2pt",
                                "border": {
                                    "style": "Solid",
                                    "color": "#bfbfbf"
                                },
                                "styleName": "=\"\""
                            },
                            "keepTogether": true,
                            "dataElementName": "TextBox1",
                            "width": "1in",
                            "height": "0.25in"
                        },
                        "levelCount": 1
                    },
                    "bodyIndex": -1,
                    "bodyCount": 1,
                    "children": [{
                        "type": "tablixmember",
                        "header": {
                            "item": {
                                "type": "textbox",
                                "value": "=Fields!XDM.Value",
                                "name": "TextBox20",
                                "style": {
                                    "backgroundColor": "#aedac8",
                                    "fontFamily": "微软雅黑",
                                    "fontSize": "11pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "color": "#1b4931",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "border": {
                                        "style": "Solid",
                                        "color": "#bfbfbf"
                                    },
                                    "styleName": "=\"\""
                                },
                                "keepTogether": true,
                                "dataElementName": "TextBox16",
                                "width": "1in",
                                "height": "0.25in"
                            },
                            "levelCount": 1
                        },
                        "bodyIndex": 0,
                        "bodyCount": 1
                    }]
                }, {
                    "type": "tablixmember",
                    "group": {
                        "name": "Tablix1_XZDM1",
                        "groupExpressions": ["=Fields!XZDM.Value"],
                        "pageBreakDisabled": "false"
                    },
                    "sortExpressions": [{
                        "value": "=Fields!XZDM.Value",
                        "direction": "Ascending"
                    }],
                    "bodyIndex": -1,
                    "bodyCount": 2,
                    "children": [{
                        "type": "tablixmember",
                        "header": {
                            "item": {
                                "type": "textbox",
                                "canGrow": true,
                                "value": "=Fields!XZMC.Value",
                                "name": "TextBox3",
                                "style": {
                                    "backgroundColor": "#f1f9f6",
                                    "fontFamily": "微软雅黑",
                                    "fontSize": "11pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "color": "#1b4931",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "border": {
                                        "style": "Solid",
                                        "color": "#bfbfbf"
                                    },
                                    "styleName": "=\"\""
                                },
                                "keepTogether": true,
                                "dataElementName": "TextBox3",
                                "width": "1in",
                                "height": "0.25in"
                            },
                            "levelCount": 1
                        },
                        "bodyIndex": -1,
                        "bodyCount": 1,
                        "children": [{
                            "type": "tablixmember",
                            "header": {
                                "item": {
                                    "type": "textbox",
                                    "value": "=Fields!XZDM.Value",
                                    "name": "TextBox22",
                                    "style": {
                                        "backgroundColor": "#f1f9f6",
                                        "fontFamily": "微软雅黑",
                                        "textAlign": "Center",
                                        "verticalAlign": "Middle",
                                        "color": "#1b4931",
                                        "paddingLeft": "2pt",
                                        "paddingRight": "2pt",
                                        "paddingTop": "2pt",
                                        "paddingBottom": "2pt",
                                        "border": {
                                            "style": "Solid",
                                            "color": "#bfbfbf"
                                        },
                                        "styleName": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox13",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "levelCount": 1
                            },
                            "bodyIndex": 1,
                            "bodyCount": 1
                        }]
                    }, {
                        "type": "tablixmember",
                        "group": {
                            "name": "Tablix1_ZLDWDM1",
                            "groupExpressions": ["=Fields!ZLDWDM.Value"],
                            "pageBreakDisabled": "false"
                        },
                        "sortExpressions": [{
                            "value": "=Fields!ZLDWDM.Value",
                            "direction": "Ascending"
                        }],
                        "bodyIndex": -1,
                        "bodyCount": 1,
                        "children": [{
                            "Type": "tablixmember",
                            "header": {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "value": "=Fields!ZLDWMC.Value",
                                    "name": "TextBox5",
                                    "style": {
                                        "backgroundColor": "White",
                                        "fontFamily": "微软雅黑",
                                        "textAlign": "Center",
                                        "verticalAlign": "Middle",
                                        "color": "#404040",
                                        "paddingLeft": "2pt",
                                        "paddingRight": "2pt",
                                        "paddingTop": "2pt",
                                        "paddingBottom": "2pt",
                                        "border": {
                                            "style": "Solid",
                                            "color": "#bfbfbf"
                                        },
                                        "styleName": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox5",
                                    "width": "1in",
                                    "Height": "0.25in"
                                },
                                "levelCount": 1
                            },
                            "bodyIndex": -1,
                            "bodyCount": 1,
                            "children": [{
                                "type": "tablixmember",
                                "header": {
                                    "item": {
                                        "type": "textbox",
                                        "canGrow": true,
                                        "value": "=Fields!ZLDWDM.Value",
                                        "name": "TextBox26",
                                        "style": {
                                            "backgroundColor": "White",
                                            "fontFamily": "微软雅黑",
                                            "textAlign": "Center",
                                            "verticalAlign": "Middle",
                                            "color": "#404040",
                                            "paddingLeft": "2pt",
                                            "paddingRight": "2pt",
                                            "paddingTop": "2pt",
                                            "paddingBottom": "2pt",
                                            "border": {
                                                "style": "Solid",
                                                "color": "#bfbfbf"
                                            },
                                            "styleName": "=\"\""
                                        },
                                        "keepTogether": true,
                                        "dataElementName": "TextBox7",
                                        "width": "1in",
                                        "height": "0.25in"
                                    },
                                    "levelCount": 1
                                },
                                "bodyIndex": 2,
                                "bodyCount": 1
                            }]
                        }],
                        "keepWithGroup": "None",
                        "repeatOnNewPage": false
                    }],
                    "keepWithGroup": "None",
                    "repeatOnNewPage": false
                }],
                "keepWithGroup": "None",
                "repeatOnNewPage": false
            }]
        },
        "columnHierarchy": {
            "levelSizes": ["0.8cm", "0.75cm", "0.75cm"],
            "members": [{
                "type": "tablixmember",
                "group": {
                    "name": "Tablix1_DLBM11",
                    "groupExpressions": ["=Fields!DLBM1.Value"],
                    "PageBreakDisabled": "false"
                },
                "sortExpressions": [{
                    "value": "=Fields!DLBM1.Value",
                    "direction": "Ascending"
                }],
                "bodyIndex": -1,
                "bodyCount": 2,
                "children": [{
                    "type": "tablixmember",
                    "sortExpressions": [{
                        "value": "=Fields!DLBM1.Value",
                        "direction": "Ascending"
                    }],
                    "header": {
                        "item": {
                            "type": "textbox",
                            "canGrow": true,
                            "value": "=Fields!DLBM1.Value",
                            "name": "TextBox2",
                            "style": {
                                "backgroundColor": "#aedac8",
                                "fontFamily": "微软雅黑",
                                "fontSize": "11pt",
                                "textAlign": "Center",
                                "verticalAlign": "Middle",
                                "color": "White",
                                "paddingLeft": "2pt",
                                "paddingRight": "2pt",
                                "paddingTop": "2pt",
                                "paddingBottom": "2pt",
                                "border": {
                                    "style": "Solid",
                                    "color": "#bfbfbf"
                                },
                                "StyleName": "=\"\""
                            },
                            "keepTogether": true,
                            "dataElementName": "TextBox2",
                            "width": "1in",
                            "height": "0.25in"
                        },
                        "levelCount": 2
                    },
                    "bodyIndex": -1,
                    "bodyCount": 1,
                    "children": [{
                        "type": "tablixmember",
                        "header": {
                            "item": {
                                "type": "textbox",
                                "canGrow": true,
                                "value": "=Fields!DLMC1.Value",
                                "name": "TextBox11",
                                "style": {
                                    "backgroundColor": "#ddefe8",
                                    "fontFamily": "微软雅黑",
                                    "fontSize": "11pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "color": "#1b4931",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "border": {
                                        "style": "Solid",
                                        "color": "#bfbfbf"
                                    },
                                    "styleName": "=\"\""
                                },
                                "keepTogether": true,
                                "dataElementName": "TextBox11",
                                "width": "1in",
                                "height": "0.25in"
                            },
                            "levelCount": 1
                        },
                        "bodyIndex": 0,
                        "bodyCount": 1
                    }]
                }, {
                    "type": "tablixmember",
                    "header": {
                        "item": {
                            "type": "textbox",
                            "value": "其中",
                            "name": "TextBox25",
                            "style": {
                                "backgroundColor": "#02a274",
                                "fontFamily": "微软雅黑",
                                "fontSize": "11pt",
                                "textAlign": "Center",
                                "verticalAlign": "Middle",
                                "color": "White",
                                "paddingLeft": "2pt",
                                "paddingRight": "2pt",
                                "paddingTop": "2pt",
                                "paddingBottom": "2pt",
                                "border": {
                                    "style": "Solid",
                                    "color": "#bfbfbf"
                                },
                                "styleName": "=\"\""
                            },
                            "keepTogether": true,
                            "dataElementName": "TextBox25",
                            "width": "1in",
                            "height": "0.25in"
                        },
                        "levelCount": 1
                    },
                    "bodyIndex": -1,
                    "bodyCount": 1,
                    "children": [{
                        "type": "tablixmember",
                        "group": {
                            "name": "Tablix1_DLBM1",
                            "groupExpressions": ["=Fields!DLBM.Value"],
                            "pageBreakDisabled": "false"
                        },
                        "sortExpressions": [{
                            "value": "=Fields!DLBM.Value",
                            "Direction": "Ascending"
                        }],
                        "header": {
                            "item": {
                                "type": "textbox",
                                "canGrow": true,
                                "value": "=Fields!DLBM.Value",
                                "name": "TextBox8",
                                "style": {
                                    "backgroundColor": "#ddefe8",
                                    "fontFamily": "微软雅黑",
                                    "fontSize": "11pt",
                                    "textAlign": "Center",
                                    "verticalAlign": "Middle",
                                    "color": "#1b4931",
                                    "paddingLeft": "2pt",
                                    "paddingRight": "2pt",
                                    "paddingTop": "2pt",
                                    "paddingBottom": "2pt",
                                    "border": {
                                        "style": "Solid",
                                        "color": "#bfbfbf"
                                    },
                                    "styleName": "=\"\""
                                },
                                "keepTogether": true,
                                "dataElementName": "TextBox9",
                                "width": "1in",
                                "height": "0.25in"
                            },
                            "levelCount": 1
                        },
                        "bodyIndex": -1,
                        "bodyCount": 1,
                        "children": [{
                            "type": "tablixmember",
                            "header": {
                                "item": {
                                    "type": "textbox",
                                    "canGrow": true,
                                    "value": "=Fields!DLMC.Value",
                                    "name": "TextBox15",
                                    "style": {
                                        "backgroundColor": "#ddefe8",
                                        "fontFamily": "微软雅黑",
                                        "fontSize": "11pt",
                                        "textAlign": "Center",
                                        "verticalAlign": "Middle",
                                        "color": "#1b4931",
                                        "paddingLeft": "2pt",
                                        "paddingRight": "2pt",
                                        "paddingTop": "2pt",
                                        "paddingBottom": "2pt",
                                        "border": {
                                            "style": "Solid",
                                            "color": "#bfbfbf"
                                        },
                                        "styleName": "=\"\""
                                    },
                                    "keepTogether": true,
                                    "dataElementName": "TextBox15",
                                    "width": "1in",
                                    "height": "0.25in"
                                },
                                "levelCount": 1
                            },
                            "bodyIndex": 1,
                            "bodyCount": 1
                        }],
                        "keepWithGroup": "None",
                        "repeatOnNewPage": false
                    }]
                }],
                "keepWithGroup": "None",
                "repeatOnNewPage": false
            }]
        },
        "corner": [
            [{
                "rowSpan": 1,
                "colSpan": 2,
                "item": {
                    "type": "textbox",
                    "canGrow": true,
                    "value": "行政区域",
                    "name": "TextBox6",
                    "style": {
                        "backgroundColor": "#02a274",
                        "fontFamily": "微软雅黑",
                        "fontSize": "12pt",
                        "textAlign": "Center",
                        "verticalAlign": "Middle",
                        "color": "White",
                        "paddingLeft": "2pt",
                        "paddingRight": "2pt",
                        "paddingTop": "2pt",
                        "paddingBottom": "2pt",
                        "border": {
                            "style": "Solid",
                            "color": "#bfbfbf"
                        },
                        "styleName": "=\"\""
                    },
                    "keepTogether": true,
                    "dataElementName": "TextBox6",
                    "width": "1in",
                    "height": "0.25in"
                },
                "autoMergeMode": "Never"
            },
                null
            ],
            [{
                "rowSpan": 2,
                "colSpan": 1,
                "item": {
                    "type": "textbox",
                    "canGrow": true,
                    "value": "名称",
                    "name": "TextBox10",
                    "style": {
                        "backgroundColor": "#ddefe8",
                        "fontFamily": "微软雅黑",
                        "fontSize": "11pt",
                        "textAlign": "Center",
                        "verticalAlign": "Middle",
                        "color": "#1b4931",
                        "paddingLeft": "2pt",
                        "paddingRight": "2pt",
                        "paddingTop": "2pt",
                        "paddingBottom": "2pt",
                        "border": {
                            "style": "Solid",
                            "color": "#bfbfbf"
                        },
                        "styleName": "=\"\""
                    },
                    "keepTogether": true,
                    "dataElementName": "TextBox10",
                    "Width": "1in",
                    "height": "0.25in"
                },
                "autoMergeMode": "Never"
            }, {
                "rowSpan": 2,
                "colSpan": 1,
                "item": {
                    "type": "textbox",
                    "canGrow": true,
                    "value": "代码",
                    "name": "TextBox28",
                    "style": {
                        "backgroundColor": "#ddefe8",
                        "fontFamily": "微软雅黑",
                        "fontSize": "11pt",
                        "textAlign": "Center",
                        "verticalAlign": "Middle",
                        "color": "#1b4931",
                        "paddingLeft": "2pt",
                        "paddingRight": "2pt",
                        "paddingTop": "2pt",
                        "paddingBottom": "2pt",
                        "border": {
                            "style": "Solid",
                            "color": "#bfbfbf"
                        },
                        "styleName": "=\"\""
                    },
                    "keepTogether": true,
                    "dataElementName": "TextBox28",
                    "width": "1in",
                    "Height": "0.25in"
                },
                "autoMergeMode": "Never"
            }],
            [null, null]
        ],
        "body": {
            "columns": ["2cm", "2.5cm"],
            "rows": [{
                "height": "0.75cm",
                "cells": [{
                    "rowSpan": 1,
                    "colSpan": 1,
                    "item": {
                        "type": "textbox",
                        "value": "=Sum(Fields!NEWMJ.Value)",
                        "name": "TextBox21",
                        "style": {
                            "backgroundColor": "#aedac8",
                            "fontFamily": "微软雅黑",
                            "fontSize": "11pt",
                            "format": "n",
                            "textAlign": "Center",
                            "verticalAlign": "Middle",
                            "color": "#1b4931",
                            "paddingLeft": "2pt",
                            "paddingRight": "2pt",
                            "paddingTop": "2pt",
                            "paddingBottom": "2pt",
                            "border": {
                                "style": "Solid",
                                "color": "#bfbfbf"
                            },
                            "styleName": "=\"\""
                        },
                        "keepTogether": true,
                        "dataElementName": "TextBox21",
                        "width": "1in",
                        "height": "0.25in"
                    },
                    "autoMergeMode": "Never"
                }, {
                    "rowSpan": 1,
                    "colSpan": 1,
                    "item": {
                        "type": "textbox",
                        "value": "=Sum(Fields!NEWMJ.Value)",
                        "name": "TextBox18",
                        "style": {
                            "backgroundColor": "#aedac8",
                            "fontFamily": "微软雅黑",
                            "fontSize": "11pt",
                            "format": "n",
                            "textAlign": "Center",
                            "verticalAlign": "Middle",
                            "color": "#1b4931",
                            "paddingLeft": "2pt",
                            "paddingRight": "2pt",
                            "paddingTop": "2pt",
                            "paddingBottom": "2pt",
                            "border": {
                                "style": "Solid",
                                "color": "#bfbfbf"
                            },
                            "styleName": "=\"\""
                        },
                        "keepTogether": true,
                        "dataElementName": "TextBox18",
                        "width": "1in",
                        "height": "0.25in"
                    },
                    "autoMergeMode": "Never"
                }]
            }, {
                "height": "0.75cm",
                "cells": [{
                    "rowSpan": 1,
                    "colSpan": 1,
                    "item": {
                        "type": "textbox",
                        "value": "=Sum(Fields!NEWMJ.Value)",
                        "name": "TextBox23",
                        "style": {
                            "backgroundColor": "#f1f9f6",
                            "fontFamily": "微软雅黑",
                            "format": "n",
                            "textAlign": "Center",
                            "verticalAlign": "Middle",
                            "color": "#1b4931",
                            "paddingLeft": "2pt",
                            "paddingRight": "2pt",
                            "paddingTop": "2pt",
                            "paddingBottom": "2pt",
                            "border": {
                                "style": "Solid",
                                "color": "#bfbfbf"
                            },
                            "styleName": "=\"\""
                        },
                        "keepTogether": true,
                        "dataElementName": "TextBox23",
                        "width": "1in",
                        "height": "0.25in"
                    },
                    "autoMergeMode": "Never"
                }, {
                    "rowSpan": 1,
                    "colSpan": 1,
                    "item": {
                        "type": "textbox",
                        "value": "=Sum(Fields!NEWMJ.Value)",
                        "name": "TextBox14",
                        "style": {
                            "backgroundColor": "#f1f9f6",
                            "fontFamily": "微软雅黑",
                            "format": "n",
                            "textAlign": "Center",
                            "verticalAlign": "Middle",
                            "color": "#1b4931",
                            "paddingLeft": "2pt",
                            "paddingRight": "2pt",
                            "paddingTop": "2pt",
                            "paddingBottom": "2pt",
                            "border": {
                                "style": "Solid",
                                "color": "#bfbfbf"
                            },
                            "styleName": "=\"\""
                        },
                        "keepTogether": true,
                        "dataElementName": "TextBox14",
                        "width": "1in",
                        "height": "0.25in"
                    },
                    "autoMergeMode": "Never"
                }]
            }, {
                "height": "1cm",
                "cells": [{
                    "rowSpan": 1,
                    "colSpan": 1,
                    "item": {
                        "type": "textbox",
                        "value": "=Sum(Fields!NEWMJ.Value)",
                        "name": "TextBox24",
                        "style": {
                            "backgroundColor": "White",
                            "fontFamily": "微软雅黑",
                            "format": "n",
                            "textAlign": "Center",
                            "verticalAlign": "Middle",
                            "color": "#404040",
                            "paddingLeft": "2pt",
                            "paddingRight": "2pt",
                            "paddingTop": "2pt",
                            "paddingBottom": "2pt",
                            "border": {
                                "style": "Solid",
                                "color": "#bfbfbf"
                            },
                            "styleName": "=\"\""
                        },
                        "keepTogether": true,
                        "dataElementName": "TextBox24",
                        "width": "1in",
                        "height": "0.25in"
                    },
                    "autoMergeMode": "Never"
                }, {
                    "rowSpan": 1,
                    "colSpan": 1,
                    "item": {
                        "type": "textbox",
                        "canGrow": true,
                        "value": "=Sum(Fields!NEWMJ.Value)",
                        "name": "TextBox4",
                        "style": {
                            "backgroundColor": "White",
                            "fontFamily": "微软雅黑",
                            "format": "n",
                            "textAlign": "Center",
                            "verticalAlign": "Middle",
                            "color": "#404040",
                            "paddingLeft": "2pt",
                            "paddingRight": "2pt",
                            "paddingTop": "2pt",
                            "paddingBottom": "2pt",
                            "border": {
                                "style": "Solid",
                                "color": "#bfbfbf"
                            },
                            "styleName": "=\"\""
                        },
                        "keepTogether": true,
                        "dataElementName": "TextBox4",
                        "width": "1in",
                        "height": "0.25in"
                    },
                    "autoMergeMode": "Never"
                }]
            }]
        },
        "repeatToFill": false,
        "dataSetName": "T_HZMJ",
        "name": "Tablix1",
        "top": "1cm",
        "left": "0.5cm",
        "width": "10cm",
        "height": "4.8cm",
        "style": {
            "styleName": "=\"\""
        }
    }],
     "page": {
        "pageWidth": "49cm",
        "pageHeight": "25cm",
        "pageOrientation": "Portrait",
        "columnSpacing": "0.5in",
        "bottomMargin": "0in",
        "leftMargin": "0in",
        "rightMargin": "0in",
        "topMargin": "0in",
        "columns": 1
    }
}