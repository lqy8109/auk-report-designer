<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-27 10:21:26
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-04 16:27:59
 * @description: 
-->
<script setup>
import { ref,computed } from "vue";
import { Plus, More, Close, SortUp, SortDown } from "@element-plus/icons-vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
// 解构状态和方法
const {
  selectedComp,
  updateCompProps
} = useLowcodeEditor();
const props = defineProps({
  dataSources: {
    type: Array,
    default: () => [],
  },
  dataSets: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Object],
    required: false,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  type: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  form: {
    type: Object,
    default: () => {},
  },
  updateType: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue", "change"]);

const value = computed(() => props.modelValue || "");

console.log(props);

// const handleChange = (value) => {
//   emit("update:modelValue", value);
//   emit("change", { type: 'dataSetName', value: value, updateType: props.updateType });
// };
const showContent = ref(false);
const handleShowSortContent = () => {
  showContent.value = !showContent.value;
};

const handleSort = (index, direction) => {
  value.value[index].sortDirection = direction;
 updateCompProps(selectedComp.value, { dataSetSort: value.value });


  // emit("update:modelValue", value);
  // emit("change", {
  //   type: "dataSetSort",
  //   value: value.value,
  //   updateType: props.updateType,
  // });
};

const handleDeleteSort = (index) => {
  value.value.splice(index, 1);
  updateCompProps(selectedComp.value, { dataSetSort: value.value });
  // emit("update:modelValue", value);
  // emit("change", {
  //   type: "dataSetSort",
  //   value: value.value,
  //   updateType: props.updateType,
  // });
};

const handleAddSort = () => {
  value.value.push({ sortField: "", sortDirection: "asc" });
  updateCompProps(selectedComp.value, { dataSetSort: value.value });
  // emit("update:modelValue", value);
  // emit("change", {
  //   type: "dataSetSort",
  //   value: value.value,
  //   updateType: props.updateType,
  // });
};

</script>
<template>
  <div class="sort_item flex align-center flex-direction right_container">
    <div class="sort_item_box flex align-center justify-between">
      <div class="sort_item_total flex align-center padding-left-sm flex-sub">
        [ {{ value.length }} 个项目 ]
      </div>
      <div class="sort_item_action margin-left">
        <el-button-group :direction="direction">
          <el-button :icon="Plus" @click.stop="handleAddSort" />
          <el-button
            :icon="More"
            v-if="!showContent"
            @click.stop="handleShowSortContent"
          />
          <el-button
            :icon="Close"
            v-if="showContent"
            @click.stop="handleShowSortContent"
          />
        </el-button-group>
      </div>
    </div>
    <div class="sort_item_content" v-show="showContent">
      <div
        v-for="(item, index) in value"
        class="flex align-center"
        style="margin-top: 10px"
        :key="index"
      >
        <el-input v-model="item.sortField" placeholder="排序字段">
          <template #append>
            <el-button
              :icon="SortUp"
              @click.stop="handleSort(index, 'desc')"
              v-if="item.sortDirection === 'asc'"
            />
            <el-button :icon="SortDown" @click.stop="handleSort(index, 'asc')" v-else />
          </template>
        </el-input>
        <div class="margin-left-sm">
          <el-button :icon="Close" @click.stop="handleDeleteSort(index)" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.sort_item {
  width: 100%;
}
.sort_item_box {
  width: 100%;
  height: 100%;
  .sort_item_total {
    height: 100%;
    border-radius: 4px;
    background-color: #e5e5e5;
    font-size: 13px;
  }
  .sort_item_action {
    :deep(.el-button) {
      background-color: #e5e5e5;
      padding: 7px 10px;
    }
  }
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  background-color: #e5e5e5;
  padding: 0 15px;
  .el-button {
    padding: 0 5px;
  }
}
.sort_item_content {
  :deep(.el-button) {
    padding: 8px;
  }
}
</style>
