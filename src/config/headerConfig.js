/*
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-02-05 15:35:58
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-05 15:53:36
 * @description: 
 */

// 撤销重做菜单
const UNDO_REDO_MENU_LIST = [
    {
        name: "undo",
        title: "撤销",
        key: "font-weight",
        value: "bold",
        noValue: "",
    },
    {
        name: "redo",
        title: "恢复",
        key: "font-style",
        value: "italic",
        noValue: "",
    },
];

// 样式菜单
const STYLE_MENU_LIST = [
    {
        name: "bold",
        title: "加粗",
        key: "font-weight",
        value: "bold",
        noValue: "",
    },
    {
        name: "italic",
        title: "斜体",
        key: "font-style",
        value: "italic",
        noValue: "",
    },
    {
        name: "underline",
        title: "下划线",
        key: "text-decoration",
        value: "underline",
    },
    {
        name: "strikeout",
        title: "删除线",
        key: "text-decoration",
        value: "line-through",
    },
    {
        key: "splitter",
    },
    {
        name: "left",
        title: "左对齐",
        key: "text-align",
        value: "left",
    },
    {
        name: "center",
        title: "居中对齐",
        key: "text-align",
        value: "center",
    },
    {
        name: "right",
        title: "右对齐",
        key: "text-align",
        value: "right",
    },
    {
        name: "justify",
        title: "两端对齐",
        key: "text-align",
        value: "justify",
        otherKeyValue: {
            "text-align-last": "justify",
        },
    },
    {
        key: "splitter",
    },
    {
        name: "verticalTop",
        title: "顶部对齐",
        width: "26px",
        height: "26px",
        key: "vertical-align",
        value: "top",
    },
    {
        name: "verticalMiddle",
        title: "垂直居中对齐",
        width: "26px",
        height: "26px",
        key: "vertical-align",
        value: "middle",
    },
    {
        name: "verticalBottom",
        title: "底部对齐",
        width: "26px",
        height: "26px",
        key: "vertical-align",
        value: "bottom",
    },
    {
        key: "splitter",
    },
];


// 颜色选择项
const COLOR_MENU_LIST = [
    {
        name: "color",
        title: "字体颜色",
        key: "color",
        defaultColor: "#000000",
    },
    {
        name: "backgroundColor",
        title: "背景颜色",
        key: "background-color",
        defaultColor: "#ffffff",
    },
];

// 预定义颜色
const PREDEFINE_COLORS = [
    "#145da2",
    "#ff4500",
    "#ff8c00",
    "#ffd700",
    "#90ee90",
    "#00ced1",
    "#1e90ff",
    "#c71585",
    "rgba(255, 69, 0, 0.68)",
    "rgb(255, 120, 0)",
    "hsv(51, 100, 98)",
    "hsva(120, 40, 94, 0.5)",
    "hsl(181, 100%, 37%)",
    "hsla(209, 100%, 56%, 0.73)",
    "#c7158577",
];




export { UNDO_REDO_MENU_LIST, STYLE_MENU_LIST, COLOR_MENU_LIST, PREDEFINE_COLORS };
