<template>
  <div class="condition-group">
    <!-- 逻辑类型选择 + 组操作按钮 -->
    <div class="group-header flex align-center justify-between">
      <el-button-group>
        <el-button
          @click.stop="$emit('change-type', group, 'and')"
          :type="group.type === 'and' ? 'primary' : ''"
          size="small"
        >
          与
        </el-button>
        <el-button
          @click.stop="$emit('change-type', group, 'or')"
          :type="group.type === 'or' ? 'primary' : ''"
          size="small"
        >
          或
        </el-button>
      </el-button-group>

      <!-- 组操作按钮 -->
      <div class="group-actions margin-left-sm">
        <el-button
          size="small"
          @click.stop="$emit('add-condition', group.list)"
          type="primary"
          title="添加条件"
          >添加条件</el-button
        >
        <el-button
          size="small"
          @click.stop="$emit('add-child', group)"
          type="primary"
          title="添加子条件组"
          >添加子条件组</el-button
        >
        <el-button
          size="small"
          @click.stop="$emit('delete-group', parentList, index)"
          type="primary"
          title="删除条件组"
          >删除条件组</el-button
        >
      </div>
    </div>

    <!-- 条件行列表 -->
    <div class="filter_item_list margin-left-md margin-top-sm">
      <div
        v-for="(ite, ind) in group.list"
        :key="ite.id"
        class="flex align-center margin-top-sm"
      >
        <!-- 字段选择 -->
        <div
          class="field_box flex align-center justify-between flex-sub padding-lr-sm filter_item"
          @click.stop="showSelectBox(ind)"
          ref="btnRef"
        >
          <div class="field_name flex-sub flex align-center margin-right-sm h-100">
            {{ ite.field }}
          </div>
          <el-icon><MoreFilled /></el-icon>
        </div>

        <!-- 条件运算符 -->
        <div class="cond margin-left filter_item justify-center text-primary">
          <el-select
            v-model="ite.cond"
            placeholder="运算符"
            size="small"
            style="width: 100px; background: #e5e5e5"
          >
            <el-option
              :label="_ite.mark"
              :value="_ite.value"
              v-for="_ite in group.type === 'and' ? condList : orCondList"
              :key="_ite.value"
            >
              <div class="flex align-center wh-100">
                <span class="margin-top-sm" v-html="_ite.mark"></span>
                <span
                  class="margin-left"
                  style="color: var(--el-text-color-secondary); font-size: 12px"
                >
                  {{ _ite.label }}
                </span>
              </div>
            </el-option>
            <template #label="{ label, value }">
              <span v-html="label" style="display: flex"></span>
            </template>
          </el-select>
        </div>

        <!-- 值输入 -->
        <div
          class="value margin-left justify-between flex-sub padding-right-sm filter_item"
          style="width: 180px"
        >
          <div class="field_value flex align-center flex-sub margin-right-sm h-100">
            <el-input v-model="ite.value" placeholder="请输入值" size="small" />
          </div>
          <el-icon><MoreFilled /></el-icon>
        </div>

        <!-- 删除按钮 -->
        <div
          class="delete margin-left justify-center filter_item"
          @click.stop="$emit('delete-condition', group.list, ind)"
        >
          <el-icon color="#ff4d4f"><Delete /></el-icon>
        </div>
      </div>
    </div>

    <!-- 递归渲染子条件组 -->
    <div
      v-for="(child, childIdx) in group.children"
      :key="child.id"
      class="child-group margin-left-lg margin-top-sm"
    >
      <ConditionGroup
        :group="child"
        :index="childIdx"
        :parentList="group.children"
        :dataSources="dataSources"
        :dataSets="dataSets"
        :form="form"
        @change-field="(group, field) => $emit('change-field', group, field)"
        @change-type="(group, type) => $emit('change-type', group, type)"
        @add-condition="(list) => $emit('add-condition', list)"
        @delete-condition="(list, ind) => $emit('delete-condition', list, ind)"
        @add-child="(group) => $emit('add-child', group)"
        @delete-group="(list, ind) => $emit('delete-group', list, ind)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { MoreFilled, Delete, Plus } from "@element-plus/icons-vue";
import { condList, orCondList } from "./cond.js";
import { useSelectFieldStore } from "@/stores/selectField";
const store = useSelectFieldStore();
const { proxy } = getCurrentInstance();
const props = defineProps({
  dataSources: {
    type: Array,
    default: () => [],
  },
  dataSets: {
    type: Array,
    default: () => [],
  },
  // 当前条件组数据
  group: {
    type: Object,
    required: true,
    default: () => ({ type: "and", list: [], children: [] }),
  },
  // 当前组在父数组中的索引
  index: {
    type: Number,
    required: true,
  },
  // 当前组的父数组（用于删除组）
  parentList: {
    type: Array,
    required: true,
  },
  form: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits([
  "change-type",
  "add-condition",
  "delete-condition",
  "add-child",
  "delete-group",
  "change-field",
]);

const btnRef = ref(null);

const showSelectBox = (ind) => {
  // 准备数据集选项
  if (store.visible) {
     proxy.$hideSelectBox();
     return
  }

  var dataSetName = props.form.dataSetName;
  var currentDataSet = props.dataSets.find((item) => item.name === dataSetName);
  console.log("当前数据集：", currentDataSet);

  var newDataSets = [
    {
      label: dataSetName,
      fields: currentDataSet && currentDataSet.fields ? currentDataSet.fields : [],
    },
  ];
  console.log(proxy);
 

  proxy.$showSelectBox({
    triggerEl: btnRef.value[ind], // 触发元素（DOM）
    selectType: "dataSourceFilter", // 选择类型
    options: newDataSets,
    onSelect: (value) => {
      // 选择后的回调
      console.log("选中的值：", value);
      emit("change-field", props.group.list[ind], value.dataField);
      //   emit("setValueByPath", `{${value.dataField}}`, "value");
      //   emit("setValueByPath", `{${value.dataSet}}`, "dataSetName");
    },
  });
};
</script>

<style lang="scss" scoped>
.group-header {
  .group-actions {
  }
}

.child-group {
  border-left: 1px dashed #bbb;
  padding-left: 16px;
}

.delete {
  width: 32px;
  cursor: pointer;
}

.field_box {
  width: 140px;
}

.cond {
  font-size: 14px;
  :deep(.el-select__wrapper) {
    background-color: #e5e5e5;
    box-shadow: none;
  }
}

.value {
  .field_value {
    :deep(.el-input__wrapper) {
      box-shadow: none;
      background-color: #e5e5e5;
      font-size: 12px;
    }
  }
}

.filter_item {
  height: 28px;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
}
.field_name {
  font-size: 12px;
}

// 布局工具类
.flex {
  display: flex;
}
.align-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.margin-left-sm {
  margin-left: 8px;
}
.margin-left-md {
  margin-left: 16px;
}
.margin-left-lg {
  margin-left: 24px;
}
.margin-top-sm {
  margin-top: 8px;
}
.flex-sub {
  flex: 1;
}
.padding-lr-sm {
  padding: 0 8px;
}
.padding-right-sm {
  padding-right: 8px;
}
</style>
