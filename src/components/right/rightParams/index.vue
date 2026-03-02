<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-22 10:00:37
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-04 17:40:27
 * @description: 
-->
<script setup>
import { ref, computed } from "vue";
import { Plus, Coin, CirclePlus, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import deepClone from "@/utils/deepClone";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";

const { setSpecifiedData, getSpecifiedData } = useLowcodeEditor();

const datasourceList = ref([
  {
    name: "数据源1",
    type: "mysql",
    host: "localhost",
    port: 3306,
    database: "test",
    username: "root",
    password: "123456",
  },
  {
    name: "数据源2",
    type: "oracle",
    host: "localhost",
    port: 1521,
    database: "test",
    username: "root",
    password: "123456",
  },
]);

const parameters = computed(() => {
  return getSpecifiedData("reportParameters");
});

// const parameters = ref(parametersData.value || []);

const props = defineProps({
  dataSources: { type: Array, default: () => [] },
  dataSets: { type: Array, default: () => [] },
  // parameters: { type: Array, default: () => [] },
});

const emit = defineEmits(["handleAddDataset"]);

const form = ref({});

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

const addOpen = ref(false);
const openTitle = ref("添加数据源");
const openType = ref("add");
const fileInput = ref(null);
const editIndex = ref(-1);
const handleAdd = () => {
  addOpen.value = true;
  openTitle.value = "新增数据源";
  openType.value = "add";
  form.value = {
    name: parameters.value?.length ? `params${parameters.value.length + 1}` : "params",
    dataType: "String",
  };

  console.log(form.value);
};

const handleEdit = (item, index) => {
  addOpen.value = true;
  openTitle.value = "编辑数据源";
  form.value = deepClone(item);
  openType.value = "edit";
  editIndex.value = index;
};

const addHeader = () => {
  form.value.headers.push({
    key: "",
    value: "",
  });
};
const addQueryParam = () => {
  if (!form.value.queryParams) {
    form.value.queryParams = [];
  }
  form.value.queryParams.push({
    key: "",
    value: "",
  });
};

const handleDelete = (item, index) => {
  // props.parameters.splice(index, 1);
  parameters.value.splice(index, 1);
};






const saveParameter = () => {
  if (openType.value === "add") {
    parameters.value.push(form.value);
  } else if (openType.value === "edit") {
    parameters.value[editIndex.value] = form.value;
  }
  addOpen.value = false;
};

const handleAddDataset = (item) => {
  emit("handleAddDataset", item);
};
</script>
<template>
  <div class="right_data_datasource_container">
    <div class="flex align-center justify-between text-xs header">
      <div class="text-xs text-bold text-primary">报表参数</div>
      <el-button size="small" :icon="Plus" type="primary" link @click="handleAdd">
        新增
      </el-button>
    </div>
    <div class="datasource_list">
      <div
        class="datasource_item flex align-center justify-between"
        v-for="(item, index) in parameters"
        :key="item.name"
      >
        <div class="flex align-center text-cut padding-right">
          <div class="iconfont icon-canshu text-primary" style="font-size: 14px"></div>
          <div class="name margin-left-sm text-cut">
            <div class="title text-cut" :title="item.name">{{ item.name }}</div>
            <div class="text-gray" style="font-size: 10px; margin-top: 3px">
              {{ typeList.find((type) => type.value === item.dataType)?.label }}
            </div>
            <div class="text-gray" style="font-size: 10px; margin-top: 3px">
              {{ item.value }}
            </div>
          </div>
        </div>

        <div class="operations flex align-center">
          <div class="operations_item" title="编辑参数" @click="handleEdit(item, index)">
            <el-icon size="16"><Edit /></el-icon>
          </div>
          <div
            class="operations_item"
            title="删除参数"
            @click="handleDelete(item, index)"
          >
            <el-icon size="16"><Delete /></el-icon>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="addOpen"
      :title="openTitle"
      width="700"
      :before-close="handleClose"
      append-to-body
      body-class="dialog_body"
    >
      <div class="body_content">
        <el-form :model="form" label-width="auto">
          <div class="text-primary label_item margin-bottom-xs text-xs">
            <span class="label_text">参数名称</span>
          </div>
          <el-form-item label="">
            <el-input v-model="form.name" placeholder="请输入参数名称" />
          </el-form-item>
          <div class="text-primary label_item margin-bottom-xs text-xs">
            <span class="label_text">参数类型</span>
          </div>
          <el-form-item label="">
            <el-select v-model="form.dataType" placeholder="请输入参数类型">
              <el-option
                v-for="type in typeList"
                :key="type.value"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </el-form-item>
          <div class="text-primary label_item margin-bottom-xs text-xs">
            <span class="label_text">参数默认值</span>
          </div>
          <el-form-item label="">
            <el-input v-model="form.value" placeholder="请输入参数值" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="flex align-center justify-between">
          <div></div>
          <div class="dialog-footer">
            <el-button type="primary" @click="saveParameter"> 保存 </el-button>
            <el-button @click="addOpen = false">取消</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.right_data_datasource_container {
  //   border-bottom: 1px solid #dcdcdc;
  padding-bottom: 15px;
}
.header {
  //   padding-top: 15px;
}
.datasource_list {
  margin-top: 10px;
  .datasource_item {
    min-height: 40px;
    border-radius: 4px;
    padding: 5px 10px;
    margin-bottom: 5px;
    .title {
      font-size: 13px;
    }
    .operations_item {
      padding: 6px;
      display: flex;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
    }
    .operations_item:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: var(--el-color-primary);
    }
  }
  .datasource_item:hover {
    background-color: #f5f5f5;
  }
}
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
.counter {
  background-color: #e5e5e5;
  padding: 0px 10px;
  border-radius: 4px;
  width: 300px;
  margin-right: 20px;
  font-size: 12px;
}
.add_list {
  width: 100%;
  margin-top: 10px;
  background-color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 4px;
}
.file_box {
  width: 100%;
  margin-top: 10px;
  background-color: #f5f5f5;
  padding: 8px 10px;
  border-radius: 4px;
}
.file_box:hover {
  background-color: #ebebeb;
}
:deep(.el-input__wrapper) {
  // background-color: #e5e5e5;
}
.file_box {
  :deep(.el-textarea__inner) {
    height: 100%;
    box-shadow: none;
    background-color: transparent;
    min-height: 138px !important;
    font-family: monospace;
  }
}
</style>
<style lang="scss">
.dialog_body {
  padding: 0px;
  max-height: 500px;
  overflow: auto;
  .body_content {
    padding: 20px;
  }
}
</style>
