<script setup>
import { Edit, Delete, ArrowDown, ArrowUp } from "@element-plus/icons-vue";

// 声明组件名，用于递归
defineOptions({
  name: "DatasourceItem",
});

const props = defineProps({
  // 当前数据集项
  item: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  // 层级（用于缩进）
  level: {
    type: Number,
    required: true,
    default: 0,
  },
  // 当前项是否展开
  expanded: {
    type: Boolean,
    default: false,
  },
  // 所有层级的展开状态（用于递归子级）
  expandedNames: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const emit = defineEmits(["expand", "edit", "delete"]);

// 切换当前项展开状态（传递自身name给父组件）
const handleToggleExpand = () => {
  emit("expand", props.item.name);
};

const handleEdit = (dataItem) => {
  emit("edit", dataItem);
};

const handleDelete = (dataItem) => {
  emit("delete",dataItem);
};
</script>

<template>
  <div class="datasource_item" :style="{ 'padding-left': `${level * 20}px` }">
    <!-- 数据集头部 -->
    <div
      class="datasource_item_header flex align-center justify-between"
      style="width: 100%; border-radius: 4px; padding: 5px 10px; cursor: pointer"
      @mouseenter="style = { backgroundColor: '#f5f5f5' }"
      @mouseleave="style = { backgroundColor: 'transparent' }"
    >
      <div class="flex align-center text-cut padding-right">
        <div class="iconfont icon-shujuji1 text-primary" style="font-size: 20px"></div>
        <div class="name margin-left-sm text-cut">
          <div class="title text-cut" :title="item.name">{{ item.name }}</div>
          <div
            class="text-gray text-cut"
            style="font-size: 12px"
            v-if="item.dataSourceName"
          >
            数据源：{{ item.dataSourceName }}
          </div>
          <div class="text-gray text-cut" style="font-size: 12px">
            {{ item.fields?.length || 0 }}个字段
          </div>
        </div>
      </div>

      <div class="operations flex align-center">
        <div class="operations_item" title="展开/收起" @click.stop="handleToggleExpand">
          <el-icon size="16">
            <ArrowDown v-if="!expanded" />
            <ArrowUp v-if="expanded" />
          </el-icon>
        </div>
        <div class="operations_item" title="编辑" @click.stop="handleEdit(props.item)">
          <el-icon size="16"><Edit /></el-icon>
        </div>
        <div class="operations_item" title="删除" @click.stop="handleDelete(props.item)">
          <el-icon size="16"><Delete /></el-icon>
        </div>
      </div>
    </div>

    <!-- 字段列表（当前项展开时显示） -->
    <div
      v-if="expanded"
      class="field_list margin-top-xs"
      style="width: 100%; padding-left: 30px"
    >
      <div
        class="field_item flex align-center text-cut padding-right"
        v-for="(field, fieldIndex) in item.fields"
        :key="`field-${item.name}-${fieldIndex}`"
        style="padding: 6px; border-radius: 4px; font-size: 12px"
      >
        <div class="iconfont icon-field_line text-primary" style="font-size: 16px"></div>
        <div class="name margin-left-sm text-cut" :title="field.name">
          {{ field.name }}
        </div>
      </div>
    </div>

    <!-- 递归渲染子级（所有子级都能独立展开） -->
    <div v-if="item.children && item.children.length" class="children_list margin-top-xs">
      <DatasourceItem
        v-for="(child, childIndex) in item.children"
        :key="`child-${item.name}-${childIndex}`"
        :item="child"
        :level="level + 1"
        :expanded="props.expandedNames[child.name] || false"
        :expanded-names="props.expandedNames"
        @expand="emit('expand', $event)"
        @edit="(dataItem) => emit('edit', dataItem)"
        @delete="(dataItem) => emit('delete', dataItem)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.datasource_item {
  width: 100%;
  margin-bottom: 5px;
  box-sizing: border-box;

  .operations_item {
    padding: 6px;
    display: flex;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 4px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: var(--el-color-primary);
    }
  }

  .title {
    font-size: 13px;
  }

  .children_list {
    margin-top: 5px;
  }
}
</style>
<style>
.field_item:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--el-color-primary);
}
.datasource_item_header:hover {
  background-color: rgba(0, 0, 0, 0.1);

}
</style>
