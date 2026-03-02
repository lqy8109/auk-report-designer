<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-22 10:00:37
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-04 17:40:08
 * @description: 
-->
<script setup>
import { ref, computed, watch } from "vue";
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

const props = defineProps({
  // dataSources: { type: Array, default: () => [] },
  dataSets: { type: Array, default: () => [] },
  originalDataSets: { type: Array, default: () => [] },
});

const emit = defineEmits(["handleAddDataset", "delete"]);

const dataSources = computed(() => {
  return getSpecifiedData("dataSources");
});

// const dataSources = ref(dataSourcesData.value || []);

watch(
  () => dataSourcesData.value,
  (newV) => {
    console.log(newV);
  },
  {
    deep: true,
  }
);
const form = ref({});

const typeList = ref([
  {
    label: "数据库链接",
    value: "database",
  },
  {
    label: "URL",
    value: "url",
  },
  {
    label: "文件",
    value: "file",
  },
  {
    label: "内置数据集",
    value: "builtin",
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
    name: dataSources.value?.length
      ? `DataSource${dataSources.value.length + 1}`
      : "DataSource",
    type: "database",
  };

  console.log(form.value);
};

const handleEdit = (item, index) => {
  console.log(item);
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
  form.value.queryParams.push({
    key: "",
    value: "",
  });
};

const uploadFile = () => {
  fileInput.value.click();
};

// 文件大小格式化
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
  return (bytes / 1048576).toFixed(2) + " MB";
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 文件校验
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    ElMessage.error(`文件大小不能超过5MB`);
    return;
  }

  // 2. 校验文件类型（双重校验：扩展名 + MIME类型）
  const isJsonFile = file.name.endsWith(".json") || file.type === "application/json";
  if (!isJsonFile) {
    ElMessage.error(`请选择有效的JSON文件`);
    return;
  }

  // 3. 读取并解析JSON文件内容
  const reader = new FileReader();

  // 读取成功回调
  reader.onload = (event) => {
    try {
      // 解析JSON字符串
      const content = JSON.parse(event.target.result);
      console.log(content);
      form.value.json = JSON.stringify(content, null, 2);
      fileInput.value.value = "";
    } catch (error) {
      // JSON解析失败
      ElMessage.error(`JSON格式错误：${error.message}`);
      fileInput.value.value = "";
    }
  };

  // 读取失败回调
  reader.onerror = () => {
    ElMessage.error(`文件读取失败，请重试`);
  };

  // 以文本形式读取文件
  reader.readAsText(file, "UTF-8");
};

const saveDataSource = () => {
  if (openType.value === "add") {
    dataSources.value.push(form.value);
  } else if (openType.value === "edit") {
    dataSources.value[editIndex.value] = form.value;
  }

  addOpen.value = false;
};

const handleAddDataset = (item) => {
  emit("handleAddDataset", item);
};

const handleDelete = (item) => {
  var index = dataSources.value.findIndex((ds) => ds.name === item.name);
  dataSources.value.splice(index, 1);
};
</script>
<template>
  <div class="right_data_datasource_container">
    <div class="flex align-center justify-between text-xs header">
      <div class="text-xs text-bold text-primary">数据源</div>
      <el-button size="small" :icon="Plus" type="primary" link @click="handleAdd">
        新增
      </el-button>
    </div>
    <div class="datasource_list">
      <div
        class="datasource_item flex align-center justify-between"
        v-for="(item, index) in dataSources"
        :key="item.name"
      >
        <div class="flex align-center text-cut padding-right">
          <!-- <el-icon size="20" color="#205f78"><Coin /></el-icon> -->
          <div class="iconfont icon-shujuku text-primary" style="font-size: 20px"></div>
          <div class="name margin-left-sm text-cut">
            <div class="title text-cut" :title="item.name">{{ item.name }}</div>
            <div class="text-gray" style="font-size: 10px; margin-top: 3px">
              {{ typeList.find((type) => type.value === item.type)?.label }}
            </div>
          </div>
        </div>

        <div class="operations flex align-center">
          <div class="operations_item" title="添加数据集" @click="handleAddDataset(item)">
            <el-icon size="16"><CirclePlus /></el-icon>
          </div>
          <div
            class="operations_item"
            title="编辑数据源"
            @click="handleEdit(item, index)"
          >
            <el-icon size="16"><Edit /></el-icon>
          </div>
          <div class="operations_item" title="删除数据源" @click="handleDelete(item)">
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
            <span class="label_text">名称</span>
          </div>
          <el-form-item label="">
            <el-input v-model="form.name" placeholder="请输入数据源名称" />
          </el-form-item>
          <div class="text-primary label_item margin-bottom-xs text-xs">
            <span class="label_text">数据源提供器</span>
          </div>

          <el-form-item label="">
            <el-select v-model="form.type" placeholder="请选择数据源类型">
              <el-option label="数据库链接" value="database" />
              <el-option label="URL" value="url" />
              <el-option label="文件" value="file" />
              <el-option label="内置数据集" value="builtin" />
            </el-select>
          </el-form-item>
          <template v-if="form.type === 'database'">
            <div class="text-primary label_item margin-bottom-xs text-xs">
              <span class="label_text">数据源名称</span>
            </div>
            <el-form-item label="">
              <el-input v-model="form.url" placeholder="数据源名称" />
            </el-form-item>
            <div class="text-primary label_item margin-bottom-xs text-xs">
              <span class="label_text">连接用户名</span>
            </div>
            <el-form-item label="">
              <el-input v-model="form.url" placeholder="连接用户名" />
            </el-form-item>
            <div class="text-primary label_item margin-bottom-xs text-xs">
              <span class="label_text">连接密码</span>
            </div>
            <el-form-item label="">
              <el-input v-model="form.url" placeholder="连接密码" />
            </el-form-item>
            <div class="text-primary label_item margin-bottom-xs text-xs">
              <span class="label_text">驱动名称</span>
            </div>
            <el-form-item label="">
              <el-input v-model="form.url" placeholder="驱动名称" />
            </el-form-item>
            <div class="text-primary label_item margin-bottom-xs text-xs">
              <span class="label_text">连接URL</span>
            </div>
            <el-form-item label="">
              <el-input v-model="form.url" placeholder="连接URL" />
            </el-form-item>
          </template>
          <template v-if="form.type === 'url'">
            <div class="text-primary label_item margin-bottom-xs text-xs">
              <span class="label_text">请求地址</span>
            </div>
            <el-form-item label="">
              <el-input v-model="form.url" placeholder="请输入请求地址" />
            </el-form-item>

            <div class="text-primary label_item margin-bottom-xs text-xs">
              <span class="label_text">查询参数</span>
            </div>

            <el-form-item label="">
              <div class="flex justify-between" style="width: 100%">
                <div class="text-xs">HTTP请求头</div>
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
                    <el-col :span="9"> <div>请求头</div></el-col>
                    <el-col :span="9" :offset="2">
                      <div>值</div>
                    </el-col>
                    <el-col :span="2" :offset="2"> <div>操作</div></el-col>
                  </el-row>
                </div>
                <div>
                  <el-row
                    :gutter="24"
                    style="width: 100%"
                    v-for="item in form.headers"
                    :key="item.key"
                    class="margin-bottom-xs"
                  >
                    <el-col :span="9">
                      <el-input
                        v-model="input"
                        style="width: 240px"
                        placeholder="请输入请求头"
                    /></el-col>
                    <el-col :span="9" :offset="2">
                      <el-input
                        v-model="input"
                        style="width: 240px"
                        placeholder="请输入值"
                      />
                    </el-col>
                    <el-col :span="2" :offset="2">
                      <el-button type="primary" size="small" :icon="Delete" circle
                    /></el-col>
                  </el-row>
                </div>
              </div>
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
                    <el-col :span="9"> <div>参数</div></el-col>
                    <el-col :span="9" :offset="2">
                      <div>值</div>
                    </el-col>
                    <el-col :span="2" :offset="2"> <div>操作</div></el-col>
                  </el-row>
                </div>
                <div>
                  <el-row
                    :gutter="24"
                    style="width: 100%"
                    v-for="item in form.queryParams"
                    :key="item.key"
                    class="margin-bottom-xs"
                  >
                    <el-col :span="9">
                      <el-input
                        v-model="input"
                        style="width: 240px"
                        placeholder="请输入参数"
                    /></el-col>
                    <el-col :span="9" :offset="2">
                      <el-input
                        v-model="input"
                        style="width: 240px"
                        placeholder="请输入值"
                      />
                    </el-col>
                    <el-col :span="2" :offset="2">
                      <el-button type="primary" size="small" :icon="Delete" circle
                    /></el-col>
                  </el-row>
                </div>
              </div>
            </el-form-item>
          </template>
          <template v-if="form.type === 'file'">
            <div class="text-primary label_item margin-bottom-xs text-xs">
              <span class="label_text">JSON 数据</span>
            </div>
            <input
              ref="fileInput"
              style="display: none"
              @change="handleFileChange"
              type="file"
              accept=".json"
            />
            <div class="file_box" @click="uploadFile">打开文件</div>
            <div class="file_box" style="min-height: 138px; padding: 5px 0">
              <el-input
                :readonly="true"
                v-model="form.json"
                :resize="false"
                style="width: 100%; height: 100%"
                type="textarea"
              />
            </div>
          </template>
        </el-form>
      </div>
      <template #footer>
        <div class="flex align-center justify-between">
          <div>
            <el-button type="primary" @click="addOpen = false"> 验证 </el-button>
          </div>
          <div class="dialog-footer">
            <el-button type="primary" @click="saveDataSource"> 保存 </el-button>
            <el-button @click="addOpen = false">取消</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.right_data_datasource_container {
  border-bottom: 1px solid #dcdcdc;
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
