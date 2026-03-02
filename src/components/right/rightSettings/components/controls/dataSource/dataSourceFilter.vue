<script setup>
import { ref, computed } from "vue";
import { EditPen, Plus } from "@element-plus/icons-vue";
import ConditionGroup from "./conditionGroup.vue";
import { ElMessage } from "element-plus";
import deepClone from "@/utils/deepClone.js";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
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

const { selectedComp, updateCompProps } = useLowcodeEditor();

console.log(props);
const emit = defineEmits(["update:modelValue", "change"]);

// 控制弹窗显示隐藏
const dialogVisible = ref(false);

const listModel = computed(() =>
  props.modelValue
    ? deepClone(props.modelValue)
    : [
        {
          id: 1,
          type: "and",
          list: [
            { id: 11, field: "", cond: "", value: "" },
            { id: 12, field: "", cond: "", value: "" },
          ],
          children: [
            {
              id: 2,
              type: "and",
              list: [
                { id: 21, field: "", cond: "", value: "" },
                { id: 22, field: "", cond: "", value: "" },
              ],
              children: [],
            },
          ],
        },
      ]
);
const list = ref(listModel.value);

const showDialog = () => {
  dialogVisible.value = true;
  list.value = listModel.value;
};

// 修改条件组的逻辑类型
const handleSelectType = (item, type) => {
  item.type = type;
};

const handleSelectField = (item, value) => {
  item.field = value;
};

// 添加条件行
const addCondition = (parentList) => {
  const newId = Date.now();
  parentList.push({
    id: newId,
    field: "",
    cond: "",
    value: "",
    list: [{}],
    type: "and",
  });
};

// 删除条件行
const deleteCondition = (parentList, index) => {
  parentList.splice(index, 1);
};

// 添加子条件组
const addChildGroup = (parentItem) => {
  const newId = Date.now();
  if (!parentItem.children) {
    parentItem.children = [];
  }
  parentItem.children.push({
    id: newId,
    type: "and",
    list: [{ id: newId + 1, field: "", cond: "", value: "" }],
    children: [],
  });
};

// 删除条件组
const deleteGroup = (parentArr, index) => {
  parentArr.splice(index, 1);
};

// 确定按钮回调（可在此处处理最终数据）
const handleConfirm = () => {
  updateCompProps(selectedComp.value, { dataSetFilter: list.value });
  dialogVisible.value = false;
};
</script>

<template>
  <div class="w-100">
    <!-- 编辑按钮 -->
    <div
      class="filter_item_total flex align-center padding-left-sm flex-sub"
      @click="showDialog"
    >
      <el-icon><EditPen /></el-icon>
      <span class="margin-left-sm">编辑</span>
    </div>

    <!-- 过滤条件弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      header-class="right_container"
      footer-class="right_container"
      body-class="right_container body_content"
      append-to-body
      title="数据过滤条件"
      width="700px"
      :z-index="1000"
    >
      <div @click.stop>
        <ConditionGroup
          v-for="(item, idx) in list"
          :key="item.id"
          :group="item"
          :index="idx"
          :parentList="list"
          :dataSources="dataSources"
          :dataSets="dataSets"
          :form="form"
          @change-field="handleSelectField"
          @change-type="handleSelectType"
          @add-condition="addCondition"
          @delete-condition="deleteCondition"
          @add-child="addChildGroup"
          @delete-group="deleteGroup"
        />
        <el-button
          v-if="list.length <= 0"
          size="small"
          @click.stop="addCondition(list)"
          type="primary"
          title="添加条件"
          >添加条件</el-button
        >
      </div>

      <!-- 弹窗底部按钮 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleConfirm">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.filter_item_total {
  height: 32px;
  border-radius: 4px;
  background-color: #e5e5e5;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
}

.dialog-footer {
  text-align: right;
}

// 布局工具类
.flex {
  display: flex;
}
.align-center {
  align-items: center;
}
.padding-left-sm {
  padding-left: 8px;
}
.margin-left-sm {
  margin-left: 8px;
}
.flex-sub {
  flex: 1;
}
</style>
<style>
.body_content {
  max-height: 60vh;
  overflow-y: auto;
}
</style>
