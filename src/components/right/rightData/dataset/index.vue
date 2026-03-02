<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-22 10:00:41
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-04 17:40:17
 * @description: 
-->
<script setup>
import { ref,computed,watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import DatasourceItem from "./item.vue";
import DatasetEdit from "./edit.vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

const { setSpecifiedData, getSpecifiedData } = useLowcodeEditor();

const props = defineProps({
  // dataSources: { type: Array, default: () => [] },
  // dataSets: { type: Array, default: () => [] },
  // originalDataSets: { type: Array, default: () => [] },
});

const dataSets = computed(() => {
  return getSpecifiedData("dataSets");
});

// const dataSets = ref(dataSetsData.value || []);




const emit = defineEmits(["delete"]);

const openType = ref('add');
const editIndex = ref(-1);
// 维护所有层级数据集的展开状态（key: 数据集name，value: 是否展开）
const expandedNames = ref({});
const datasetEditRef = ref(null);

// 切换任意层级项的展开状态
const handleExpand = (name) => {
  expandedNames.value[name] = !expandedNames.value[name];
};

const handleEdit = (item, index) => {
  console.log("编辑：", item, index);
  openType.value='edit';
  editIndex.value = index;
  datasetEditRef.value.handleOpen({}, item, "编辑数据集", true);
};

const handleDelete = (dataItem) => {
  var index = dataSets.value.findIndex((item) => item.name == dataItem.name);
  dataSets.value.splice(index, 1);

};

const handleSaveDataset = (item) => {
  if (openType.value === "add") {
    dataSets.value.push(item);
  } else if (openType.value === "edit") {
    dataSets.value[editIndex.value] = item;
  }

  datasetEditRef.value.handleClose();
};

</script>

<template>
  <div class="right_data_datasource_container">
    <div class="flex align-center justify-between text-xs" style="margin-top: 15px">
      <div class="text-xs text-bold text-primary">数据集</div>
    </div>

    <div class="datasource_list" style="margin-top: 10px">
      <DatasourceItem
        v-for="(item, index) in dataSets"
        :key="`root-${item.name}`"
        :item="item"
        :level="0"
        :expanded="expandedNames[item.name] || false"
        :expanded-names="expandedNames"
        @expand="handleExpand"
        @edit="(dataItem) => handleEdit(dataItem, index)"
        @delete="(dataItem) => handleDelete(dataItem)"
      />
    </div>
    <DatasetEdit ref="datasetEditRef" @saveDataSet="handleSaveDataset" />
  </div>
</template>

<style lang="scss" scoped>
.right_data_datasource_container {
  width: 100%;
  box-sizing: border-box;
}
.datasource_list {
  width: 100%;
}
</style>
