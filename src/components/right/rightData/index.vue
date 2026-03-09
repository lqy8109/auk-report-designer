<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-22 09:58:01
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-06 09:23:54
 * @description: 
-->
<script setup>
import { ref,computed } from "vue";
import Datasource from "./datasource/index.vue";
import Dataset from "./dataset/index.vue";
import DatasetEdit from "./dataset/edit.vue";
import deepClone from "@/utils/deepClone";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

const { setSpecifiedData, getSpecifiedData } = useLowcodeEditor();

const props = defineProps({
  dataSources: { type: Array, default: () => [] },
  // dataSets: { type: Array, default: () => [] },
});

const dataSetsData = computed(() => {
  return getSpecifiedData("dataSets");
});

const dataSets = ref(dataSetsData.value || []);

const dataSetTree = ref([]);

/**
 * 解析数据集，构建树形结构
 * @param {Object} config 数据集配置
 * @returns {Array} 树形结构数据
 */
function buildDataSetTree(config) {
  const dataSets = config || [];
  const tree = [];
  const dataSetMap = new Map(); // 存储数据集名称到完整对象的映射

  // 第一步：初始化映射表，先把所有数据集存入Map
  dataSets.forEach((ds) => {
    dataSetMap.set(ds.name, {
      name: ds.name,
      fields: ds.fields.map((field) => field), // 提取字段名列表
      fieldCount: ds.fields.length, // 字段数量（便于展示）
      children: [], // 子数据集
      isRoot: false, // 是否根节点
      dataSourceType: ds.dataSourceType || "",
    });
  });

  // 第二步：识别根节点和子节点关系
  dataSets.forEach((ds) => {
    const query = ds.query || {};
    const dataSource = query.dataSourceName || "";

    // 判断是否为根节点（直接连接数据源，不是引用其他数据集）
    if (!dataSource.startsWith("$dataset:")) {
      const node = dataSetMap.get(ds.name);
      if (node) {
        node.isRoot = true;
        node.dataSourceName = dataSource;

        // 如果树中还没有这个根节点，添加进去
        if (!tree.some((item) => item.name === ds.name)) {
          tree.push(node);
        }
      }
    }
    // 判断是否为子节点（引用了其他数据集）
    else {
      // 解析父数据集名称：$dataset:父数据集/字段名 -> 提取父数据集名称
      const parentInfo = dataSource.replace("$dataset:", "");
      const parentName = parentInfo.split("/")[0];

      // 获取父节点和子节点
      const parentNode = dataSetMap.get(parentName);
      const childNode = dataSetMap.get(ds.name);

      // 如果父子节点都存在，建立关联
      if (parentNode && childNode) {
        parentNode.children.push(childNode);
      }
    }
  });

  return tree;
}
// dataSetTree.value = buildDataSetTree(deepClone(props.dataSets));

const datasetEditRef = ref(null);

const handleAddDataset = (sourceData) => {
  datasetEditRef.value.handleOpen(sourceData);
};

// 保存数据集
const handleSaveDataset = (dataSet) => {
//   props.dataSets.splice(0, props.dataSets.length);
    //  props.dataSets.push(dataSet);
     dataSets.value.push(dataSet);

//   dataSet.forEach((item) => {
//     props.dataSets.push(item);
//   });

//   dataSetTree.value = buildDataSetTree(props.dataSets);
};

const handleDeleteDataset = (index) => {
  props.dataSets.splice(index, 1);
//   dataSetTree.value = buildDataSetTree(props.dataSets);
};
const handleDeleteDataSource = (index) => {
  props.dataSources.splice(index, 1);
};
</script>
<template>
  <div class="right_data_container">
    <Datasource
      :dataSources="dataSources"
      @handleAddDataset="handleAddDataset"
      :originalDataSets="props.dataSets"
      :dataSets="dataSetTree"
      @delete="handleDeleteDataSource"
    />
    <Dataset
      :dataSources="dataSources"
      :originalDataSets="props.dataSets"
      :dataSets="props.dataSets"
      @delete="handleDeleteDataset"
    />
    <DatasetEdit
      ref="datasetEditRef"
      :originalDataSets="props.dataSets"
      @saveDataSet="handleSaveDataset"
    />
  </div>
</template>
<style lang="scss" scoped></style>
