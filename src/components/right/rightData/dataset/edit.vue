<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-22 16:59:08
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-06 09:24:21
 * @description: 
-->
<script setup>
import { ref } from "vue";
import {
  Plus,
  Coin,
  CirclePlus,
  Edit,
  Delete,
  ArrowDown,
  ArrowUp,
} from "@element-plus/icons-vue";
import axios from "axios";
import deepClone from "@/utils/deepClone";

const emit = defineEmits(["saveDataSet"]);
const form = ref({});
const addOpen = ref(false);
const sourceData = ref({});
const openTitle = ref("");
const isEdit = ref(false);
const typeList = ref([
  {
    label: "字符串",
    value: "String",
  },
  {
    label: "整数",
    value: "Integer",
  },
  {
    label: "浮点数",
    value: "Float",
  },
  {
    label: "布尔值",
    value: "Boolean",
  },
  {
    label: "日期",
    value: "Date",
  },
  {
    label: "列表",
    value: "List",
  },
]);
const props = defineProps({
  originalDataSets: { type: Array, default: () => [] },
});
const dataSourceType = ref("");
const dataSourceName = ref("");
const loading = ref(false);
const handleOpen = (sourceData1, data = {}, title = "添加数据集", edit = false) => {
  addOpen.value = true;
  form.value = { ...data };
  sourceData.value = { ...sourceData1 };
  if (!edit) {
    form.value.name = props.originalDataSets
      ? `Dataset${props.originalDataSets.length + 1}`
      : "Dataset";
    if (sourceData.value.type == "database") {
      form.value.sql = "";
    } else if (sourceData.value.type == "url") {
      form.value.method = "get";
      form.value.uri = "https://jsonplaceholder.typicode.com/users/1";
    }
    dataSourceType.value = sourceData1.type || "";
    dataSourceName.value = sourceData1.name || "";
  } else {
    dataSourceType.value = data.dataSourceType;
    dataSourceName.value = data.dataSourceName || "";
  }
  openTitle.value = title;
  isEdit.value = edit;
};
const handleClose = () => {
  addOpen.value = false;
};

const addQueryParam = () => {
  if (!form.value.queryParams) {
    form.value.queryParams = [];
  }

  form.value.queryParams.push({
    name: "",
    value: "",
  });
};

const addHeader = () => {
  if (!form.value.headers) {
    form.value.headers = [];
  }
  form.value.headers.push({
    name: "",
    value: "",
  });
};

const saveDataSet = () => {
  var data={
    dataSourceType: dataSourceType.value,
    dataSourceName: dataSourceName.value,
    ...form.value
  }
  emit("saveDataSet", data);
  handleClose();
};

const addField = () => {
  form.value.fields.push({
    name: "",
    dataField: "",
  });
};

const addCalculatedField = () => {
  if (!form.value.calculatedFields) {
    form.value.calculatedFields = [];
  }
  form.value.calculatedFields.push({
    name: "",
    value: "",
  });
};
const showFields = ref(false);
const newDataset = ref([]);

const showCalculatedFields = ref(false);

const getFields = async () => {
  if (dataSourceType.value == "database") {
  } else if (dataSourceType.value == "url") {
    loading.value = true;
    var params = {};
    if (form.value.queryParams) {
      form.value.queryParams.forEach((item) => {
        params[item.name] = item.value;
      });
    }

    var headers = {};
    if (form.value.headers) {
      form.value.headers.forEach((item) => {
        headers[item.name] = item.value;
      });
    }
    const response = await axios({
      url: form.value.uri, // 替换为你的接口地址
      method: form.value.method || "get",

      params: params,
      headers: headers,
      timeout: 10000, // 超时时间 10 秒
    });
    var data = response.data;
    const keys = getAllKeys(data);

    var datasetConfig = generateDatasetConfig(data, form, dataSourceName);
    loading.value = false;
    var newDatasetConfig = deepClone(props.originalDataSets);

    datasetConfig.map((item) => {
      newDatasetConfig.push(item);
    });
    newDataset.value = newDatasetConfig;
    form.value.fields = keys.map((item) => {
      return {
        name: item,
        dataField: item,
      };
    });
  } else if (dataSourceType.value == "file") {
    var data = JSON.parse(sourceData.value.json);
    const keys = getAllKeys(data);

    newDataset.value = {
      name: form.value.name,
      dataSourceType: dataSourceType.value,
      dataSourceName: dataSourceName.value,
      fields: keys.map((item) => {
        return {
          name: item,
          dataField: item,
        };
      }),
    };

    form.value.fields = keys.map((item) => {
      return {
        name: item,
        dataField: item,
      };
    });
  }
};

/**
 * 递归提取JSON对象中的所有字段路径（全局所有层级）
 * @param {Object|Array} obj - 要解析的JSON数据
 * @param {string} parentPath - 父字段路径
 * @param {Set} fieldSet - 存储字段路径的集合
 * @returns {string[]} 全局所有字段路径的数组（绝对路径）
 */
function extractAllFields(obj, parentPath = "", fieldSet = new Set()) {
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      if (typeof item === "object" && item !== null) {
        extractAllFields(item, parentPath, fieldSet);
      }
    });
    return Array.from(fieldSet).sort();
  }

  if (typeof obj === "object" && obj !== null) {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;
      fieldSet.add(currentPath);

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        extractAllFields(value, currentPath, fieldSet);
      }
    });
  }

  return Array.from(fieldSet).sort();
}

/**
 * 提取指定子路径的字段（相对路径），不足3个则从全局字段池补充
 * @param {Object} originalData - 原始JSON数据
 * @param {string} targetSubPath - 目标子路径（如 "address.geo"）
 * @param {string[]} globalFields - 全局所有字段路径（绝对路径）
 * @returns {string[]} 子数据集的字段数组（相对路径，至少3个）
 */
function extractSubFields(originalData, targetSubPath, globalFields) {
  // 解析目标子路径的层级
  const subPathLevels = targetSubPath.split(".");

  // 递归找到目标子数据的根节点
  function findTargetNode(currentObj, levels, currentLevel = 0) {
    if (!currentObj || typeof currentObj !== "object" || currentLevel >= levels.length) {
      return currentObj;
    }
    return findTargetNode(currentObj[levels[currentLevel]], levels, currentLevel + 1);
  }

  // 获取目标子数据对象
  const targetNode = findTargetNode(originalData, subPathLevels);
  const subFieldSet = new Set();

  // 提取子节点的相对字段
  function extractRelativeFields(node, path = "") {
    if (!node || typeof node !== "object") return;

    if (Array.isArray(node)) {
      node.forEach((item) => extractRelativeFields(item, path));
      return;
    }

    Object.entries(node).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      subFieldSet.add(currentPath);
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        subFieldSet.delete(currentPath);
        // extractRelativeFields(value, currentPath);
      }
    });
  }

  extractRelativeFields(targetNode);
  let subFields = Array.from(subFieldSet).sort();

  // 补充字段规则：从全局字段中提取当前子路径的绝对字段 → 转相对路径补充

  // 筛选全局字段中属于当前子路径的绝对字段（如 "address.geo.lat"）
  const subGlobalFields = globalFields
    .filter((field) => field.startsWith(`${targetSubPath}.`))
    // 转相对路径（去掉 "address.geo." 前缀）
    .map((field) => field.replace(`${targetSubPath}.`, ""));

  return subFields;
}

/**
 * 递归识别所有层级的嵌套对象路径（支持深层如 address.geo）
 * @param {Object} originalData - 原始JSON数据
 * @param {string} parentPath - 父路径（用于拼接深层路径）
 * @param {Set} subPathSet - 存储所有嵌套对象路径的集合
 * @returns {string[]} 所有层级嵌套对象的路径数组（如 ["address", "address.geo", "company"]）
 */
function autoDetectAllSubPaths(originalData, parentPath = "", subPathSet = new Set()) {
  if (!originalData || typeof originalData !== "object" || Array.isArray(originalData)) {
    return Array.from(subPathSet).sort();
  }

  Object.entries(originalData).forEach(([key, value]) => {
    // 拼接当前层级的完整路径（如 "address" → "address.geo"）
    const currentPath = parentPath ? `${parentPath}.${key}` : key;

    // 如果当前值是对象，加入子路径集合，并递归识别其内部嵌套
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      subPathSet.add(currentPath);
      autoDetectAllSubPaths(value, currentPath, subPathSet);
    }
  });

  return Array.from(subPathSet).sort();
}

/**
 * 生成动态数据集配置（支持深层子路径、动态dataSourceName）
 * @param {Object} originalData - 原始JSON数据
 * @param {Object} form - 包含name的表单对象（{ value: { name: 'DataSet' } }）
 * @param {Object} dataSourceName - 包含value的数据源名称对象（{ value: 'DataSource' }）
 * @param {string[]} [customSubPaths] - 自定义子路径（可选）
 * @returns {Object[]} 最终配置数组
 */
function generateDatasetConfig(originalData, form, dataSourceName, customSubPaths) {
  // 1. 提取全局所有字段（用于补充不足的字段）
  const globalFields = extractAllFields(originalData);

  // 2. 确定子路径：自定义 > 自动识别所有层级（包含geo等深层路径）
  const subPaths = customSubPaths || autoDetectAllSubPaths(originalData);
  // 3. 生成主数据集字段（顶层非对象字段，不足则从全局补充）
  const mainRawFields = Object.keys(originalData).filter((key) => {
    const value = originalData[key];
    return typeof value !== "object" || value === null || Array.isArray(value);
  });
  let mainFields = [...new Set(mainRawFields)].sort();

  // 主字段不足3个则从全局补充
  // if (mainFields.length < 3) {
  //   globalFields.forEach((field) => {
  //     if (mainFields.length >= 3) return;
  //     const simpleField = field.split(".").pop();
  //     if (!mainFields.includes(simpleField)) {
  //       mainFields.push(simpleField);
  //     }
  //   });
  //   // 兜底
  //   while (mainFields.length < 3) {
  //     mainFields.push(`main_field_${mainFields.length + 1}`);
  //   }
  // }

  // 构建fields的通用方法
  const buildFields = (fields) =>
    fields.map((field) => ({
      name: field,
      dataField: field,
    }));

  // 4. 主数据集配置（使用form.value.name和dataSourceName.value）
  const mainConfig = {
    name: form.value.name,
    fields: buildFields(mainFields),
    query: {
      dataSourceName: dataSourceName.value,
      commandText: "jpath=$.data",
    },
    dataSourceType: "url",
    caseSensitivity: "Auto",
    kanatypeSensitivity: "Auto",
    accentSensitivity: "Auto",
    widthSensitivity: "Auto",
  };

  // 5. 动态子数据集配置（支持深层路径，如address.geo）
  const subConfigs = subPaths.map((subPath) => {
    const subFields = extractSubFields(originalData, subPath, globalFields);
    // 将子路径的点分隔转为斜杠分隔（address.geo → address/geo）
    const subPathForDataSource = subPath.replace(/\./g, "/");
    var name = subPath.split(".").pop();
    return {
      name: name, // 子数据集名称保留点分隔（如address.geo），也可改为斜杠
      fields: buildFields(subFields),
      query: {
        dataSourceName: `$dataset:${form.value.name}/${subPathForDataSource}`,
      },
      dataSourceType: "url",
      caseSensitivity: "Auto",
      kanatypeSensitivity: "Auto",
      accentSensitivity: "Auto",
      widthSensitivity: "Auto",
    };
  });

  return [mainConfig, ...subConfigs];
}

/**
 * 递归获取嵌套对象的所有键（支持多层嵌套）
 * @param {Object} obj - 要遍历的对象
 * @param {string} prefix - 键的前缀（用于拼接嵌套键，如 "user.info.age"）
 * @returns {Array} 所有层级的键数组
 */
function getAllKeys(obj, parentKey = "", result = []) {
  // 遍历对象的每个键
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 拼接当前层级的字段名（如 "glyphs" + "." + "icon_id"）
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      // 判断当前值的类型
      const value = obj[key];
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        // 如果是对象（非数组、非null），递归解析
        getAllKeys(value, currentKey, result);
      } else if (Array.isArray(value) && value.length > 0) {
        // 处理数组：遍历所有元素，确保捕获所有字段（解决数组元素字段不一致问题）
        const allFields = new Set(); // 用Set去重
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            getAllKeys(item, currentKey, Array.from(allFields));
            // 收集当前元素的所有字段
            for (const k in item) {
              if (item.hasOwnProperty(k)) {
                allFields.add(`${currentKey}.${k}`);
              }
            }
          }
        });
        // 将去重后的字段加入结果
        allFields.forEach((field) => result.push(field));
      } else {
        // 基础类型（字符串、数字等），直接加入结果数组
        result.push(currentKey);
      }
    }
  }
  // 最终去重并返回
  return [...new Set(result)];
}

defineExpose({
  handleOpen,
  handleClose,
});
</script>
<template>
  <el-dialog
    v-model="addOpen"
    :title="openTitle"
    width="700"
    :before-close="handleClose"
    append-to-body
    body-class="dialog_body1"
  >
    <div class="body_content" v-loading="loading">
      <el-form :model="form" label-width="auto">
        <div class="text-primary label_item margin-bottom-xs text-xs">
          <span class="label_text">数据集名称</span>
        </div>
        <el-form-item label="">
          <el-input v-model="form.name" placeholder="请输入数据集名称" />
        </el-form-item>
        <template v-if="dataSourceType == 'database' || dataSourceType == 'builtin'">
          <div class="text-primary label_item margin-bottom-xs text-xs">
            <span class="label_text">SQL语句</span>
          </div>
          <el-form-item label="">
            <el-input type="textarea" v-model="form.sql" placeholder="请输入SQL语句" />
          </el-form-item>
          <div class="text-primary label_item margin-bottom-xs text-xs">
            <span class="label_text">参数</span>
          </div>
          <el-form-item label="">
            <div class="flex justify-between" style="width: 100%">
              <div class="text-xs">查询参数</div>
              <div class="flex align-center">
                <el-button
                  style="padding: 5px"
                  size="small"
                  @click="addQueryParam"
                  :icon="Plus"
                />
              </div>
            </div>
            <div class="add_list">
              <div class="flex align-center text-sm">
                <el-row :gutter="24" style="width: 100%">
                  <el-col :span="7"> <div>参数名</div></el-col>
                  <el-col :span="7"> <div>数据类型</div></el-col>
                  <el-col :span="7">
                    <div>默认值</div>
                  </el-col>
                  <el-col :span="3"> <div>操作</div></el-col>
                </el-row>
              </div>
              <div>
                <el-row
                  :gutter="24"
                  style="width: 100%"
                  v-for="(item, index) in form.queryParams"
                  :key="item.key"
                  class="margin-bottom-xs"
                >
                  <el-col :span="7">
                    <el-input v-model="item.name" placeholder="请输入参数"
                  /></el-col>
                  <el-col :span="7">
                    <el-select v-model="item.dataType" placeholder="请选择数据类型">
                      <el-option
                        v-for="type in typeList"
                        :key="type.value"
                        :label="type.label"
                        :value="type.value"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    <el-input v-model="item.value" placeholder="请输入值" />
                  </el-col>
                  <el-col :span="3">
                    <el-button
                      type="primary"
                      size="small"
                      @click="form.queryParams.splice(index, 1)"
                      :icon="Delete"
                      circle
                  /></el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
        </template>
        <template v-else-if="dataSourceType == 'url'">
          <div class="text-primary label_item margin-bottom-xs text-xs">
            <span class="label_text">查询</span>
          </div>
          <div class="http_setting">
            <el-form-item label="Uri/路径">
              <el-input v-model="form.uri" placeholder="Uri/路径" />
            </el-form-item>
            <el-form-item label="方法">
              <el-select v-model="form.method" placeholder="方法">
                <el-option label="GET" value="get" />
                <el-option label="POST" value="post" />
              </el-select>
            </el-form-item>
            <el-form-item label="body" v-if="form.method == 'post'">
              <el-input v-model="form.body" type="textarea" placeholder="请输入body" />
            </el-form-item>
            <el-form-item label="">
              <div class="flex justify-between" style="width: 100%">
                <div class="text-xs">查询参数</div>
                <div class="flex align-center">
                  <!-- <div class="counter">[ 0 数据项 ]</div> -->
                  <el-button
                    style="padding: 5px"
                    size="small"
                    @click="addQueryParam"
                    :icon="Plus"
                  />
                </div>
              </div>
              <div class="add_list">
                <div class="flex align-center text-sm">
                  <el-row :gutter="24" style="width: 100%">
                    <el-col :span="10"> <div>参数</div></el-col>
                    <el-col :span="10"><div>值</div></el-col>
                    <el-col :span="4"> <div>操作</div></el-col>
                  </el-row>
                </div>
                <div>
                  <el-row
                    :gutter="24"
                    style="width: 100%"
                    v-for="(item, index) in form.queryParams"
                    :key="item.key"
                    class="margin-bottom-xs"
                  >
                    <el-col :span="10">
                      <el-input v-model="item.name" placeholder="请输入参数"
                    /></el-col>

                    <el-col :span="10">
                      <el-input v-model="item.value" placeholder="请输入值" />
                    </el-col>
                    <el-col :span="4">
                      <el-button
                        type="primary"
                        size="small"
                        @click="form.queryParams.splice(index, 1)"
                        :icon="Delete"
                        circle
                    /></el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="">
              <div class="flex justify-between" style="width: 100%">
                <div class="text-xs">请求头</div>
                <div class="flex align-center">
                  <!-- <div class="counter">[ 0 数据项 ]</div> -->
                  <el-button
                    style="padding: 5px"
                    size="small"
                    @click="addHeader"
                    :icon="Plus"
                  />
                </div>
              </div>
              <div class="add_list">
                <div class="flex align-center text-sm">
                  <el-row :gutter="24" style="width: 100%">
                    <el-col :span="10"> <div>请求头</div></el-col>
                    <el-col :span="10"><div>值</div></el-col>
                    <el-col :span="4"> <div>操作</div></el-col>
                  </el-row>
                </div>
                <div>
                  <el-row
                    :gutter="24"
                    style="width: 100%"
                    v-for="(item, index) in form.headers"
                    :key="item.key"
                    class="margin-bottom-xs"
                  >
                    <el-col :span="10">
                      <el-input v-model="item.name" placeholder="请输入请求头"
                    /></el-col>
                    <el-col :span="10">
                      <el-input v-model="item.value" placeholder="请输入值" />
                    </el-col>
                    <el-col :span="4">
                      <el-button
                        type="primary"
                        size="small"
                        @click="form.headers.splice(index, 1)"
                        :icon="Delete"
                        circle
                    /></el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </div>
        </template>
        <div class="text-primary label_item margin-bottom-xs text-xs">
          <span class="label_text">字段</span>
        </div>
        <el-form-item label="" class="add_list">
          <div class="flex justify-between" style="width: 100%">
            <div class="text-xs">
              查询字段 （{{ form.fields ? form.fields.length : 0 }}个字段）
            </div>

            <div class="flex align-center">
              <el-button
                style="padding: 5px"
                size="small"
                @click="showFields = !showFields"
                :icon="showFields ? ArrowUp : ArrowDown"
              />
              <!-- <el-button
                style="padding: 5px"
                size="small"
                @click="addField"
                :icon="Plus"
              /> -->
            </div>
          </div>
          <div style="width: 100%" class="margin-top-xs" v-if="showFields">
            <div class="flex align-center text-sm">
              <el-row :gutter="24" style="width: 100%">
                <el-col :span="10"> <div>字段名称</div></el-col>
                <el-col :span="10"> <div>数据字段</div></el-col>
                <el-col :span="4"> <div>操作</div></el-col>
              </el-row>
            </div>
            <div>
              <el-row
                :gutter="24"
                style="width: 100%"
                v-for="(item, index) in form.fields"
                :key="item.key"
                class="margin-bottom-xs"
              >
                <el-col :span="10">
                  <el-input v-model="item.name" placeholder="请输入字段名称"
                /></el-col>

                <el-col :span="10">
                  <el-input v-model="item.dataField" placeholder="请输入数据字段" />
                </el-col>
                <el-col :span="4">
                  <el-button
                    type="primary"
                    size="small"
                    @click="form.fields.splice(index, 1)"
                    :icon="Delete"
                    circle
                /></el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>

        <!-- <div class="text-primary label_item margin-bottom-xs text-xs">
          <span class="label_text">计算字段</span>
        </div> -->
        <el-form-item label="" class="add_list">
          <div class="flex justify-between" style="width: 100%">
            <div class="text-xs">
              计算字段 （{{
                form.calculatedFields ? form.calculatedFields.length : 0
              }}个字段）
            </div>

            <div class="flex align-center">
              <el-button
                style="padding: 5px"
                size="small"
                @click="showCalculatedFields = !showCalculatedFields"
                :icon="showCalculatedFields ? ArrowUp : ArrowDown"
              />
              <el-button
                style="padding: 5px"
                size="small"
                @click="addCalculatedField"
                :icon="Plus"
              />
            </div>
          </div>
          <div style="width: 100%" class="margin-top-xs" v-if="showCalculatedFields">
            <div class="flex align-center text-sm">
              <el-row :gutter="24" style="width: 100%">
                <el-col :span="10"> <div>字段名称</div></el-col>
                <el-col :span="10"> <div>字段值</div></el-col>
                <el-col :span="4"> <div>操作</div></el-col>
              </el-row>
            </div>
            <div>
              <el-row
                :gutter="24"
                style="width: 100%"
                v-for="(item, index) in form.calculatedFields"
                :key="item.key"
                class="margin-bottom-xs"
              >
                <el-col :span="10">
                  <el-input v-model="item.name" placeholder="请输入字段名称"
                /></el-col>
                <el-col :span="10">
                  <el-input v-model="item.value" placeholder="请输入字段值" />
                </el-col>
                <el-col :span="4">
                  <el-button
                    type="primary"
                    size="small"
                    @click="form.calculatedFields.splice(index, 1)"
                    :icon="Delete"
                    circle
                /></el-col>
              </el-row>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="flex align-center justify-between">
        <div><el-button type="primary" @click="getFields"> 验证 </el-button></div>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveDataSet"> 保存 </el-button>
          <el-button @click="addOpen = false">取消</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.label_item {
  position: relative;
}
.label_text {
  background: #fff;
  position: relative;
  z-index: 2;
  padding-right: 10px;
}
.label_item::after {
  content: "";
  position: absolute;
  right: 0;
  top: 7px;
  width: 100%;
  height: 1px;
  background-color: var(--el-color-primary);
}
:deep(.el-input) {
  font-size: 12px;
}
:deep(.el-select__wrapper) {
  font-size: 12px;
}
.add_list {
  width: 100%;
  margin-top: 10px;
  background-color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 4px;
}
.http_setting {
  :deep(.el-form-item) {
    margin-bottom: 5px;
  }
  :deep(.el-form-item__label) {
    font-size: 12px;
  }
}
</style>
<style lang="scss">
.dialog_body1 {
  padding: 0px;
  max-height: 500px;
  overflow: auto;
  .body_content {
    padding: 20px;
  }
}
</style>
