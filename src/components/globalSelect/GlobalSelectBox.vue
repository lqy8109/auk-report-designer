<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-27 11:15:26
 * @LastEditors: xwj
 * @LastEditTime: 2026-03-03 10:16:16
 * @description: 全局选择框（添加显示/隐藏动画 - 有效版）
-->
<template>
  <teleport to="body">
    <!-- 关键：用 Transition 包裹，指定过渡名称 -->
    <Transition name="select-box">
      <div
        v-if="store.visible"
        class="global-select-box"
        :style="store.position"
        @click.stop
      >
        <!-- 原有模板内容完全不变 -->
        <template v-if="store.selectType === 'bodySelect'">
          <div
            v-for="(item, groupIndex) in store.options"
            :key="item.label || groupIndex"
            class="option-group"
          >
            <div
              class="label"
              @click="handleLabelClick(groupIndex)"
              :class="{ disabled: store.options.length === 1 }"
            >
              <span>{{ item.label }}</span>
              <el-icon v-if="store.options.length > 1" class="expand-icon">
                <ArrowDown v-if="expandedGroup === groupIndex" />
                <ArrowRight v-else />
              </el-icon>
            </div>
            <div v-show="isGroupExpanded(groupIndex)" class="group-content">
              <div>
                <el-input
                  v-model="searchTexts[groupIndex]"
                  class="responsive-input"
                  placeholder="输入字段名称进行查找"
                  clearable
                  @input="() => handleGroupSearch(groupIndex)"
                  :input-style="{ fontSize: '12px' }"
                  :prefix-icon="Search"
                  size="small"
                />
              </div>
              <div class="select-option-box">
                <div
                  v-for="(option, index) in getFilteredOptions(groupIndex)"
                  :key="index"
                  class="select-option"
                  @click.stop="
                    store.handleSelect({
                      dataSet: item.label,
                      dataField: option.dataField,
                      type: 'dataSet',
                    })
                  "
                >
                  <span
                    v-html="
                      highlightMatchText(option.name || option.dataField, groupIndex)
                    "
                  ></span>
                </div>
                <div
                  v-if="
                    getFilteredOptions(groupIndex).length === 0 && searchTexts[groupIndex]
                  "
                  class="no-result"
                >
                  暂无匹配的字段
                </div>
                <div
                  v-if="item.fields?.length === 0 && !searchTexts[groupIndex]"
                  class="no-result"
                >
                  暂无可选字段
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="store.selectType === 'rightSetting'">
          <div
            class="reset_btn select-option flex align-center"
            @click.stop="
              store.handleSelect({
                dataSet: '',
                dataField: '',
                type: 'dataSet',
              })
            "
          >
            <el-icon color="#205f78" size="20px"><Close /></el-icon>
            <span class="margin-left-xs"> 重置</span>
          </div>

          <div class="exp_btn select-option flex align-center" @click="showExpression">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                class="wd-fill-expression"
                d="M21 5c0-.53-.211-1.039-.586-1.414S19.53 3 19 3H5c-.53 0-1.039.211-1.414.586S3 4.47 3 5v14c0 .53.211 1.039.586 1.414S4.47 21 5 21h14c.53 0 1.039-.211 1.414-.586S21 19.53 21 19V5z"
              ></path>
              <path
                fill="#333"
                fill-rule="nonzero"
                d="M9.667 6.75c-.64 0-1.167.527-1.167 1.167v2.333c0 .64-.527 1.167-1.167 1.167H6.75v1.166h.583c.64 0 1.167.527 1.167 1.167v2.333c0 .64.527 1.167 1.167 1.167h1.166v-1.167H9.667v-2.916C9.667 12.527 9.14 12 8.5 12c.64 0 1.167-.527 1.167-1.167V7.917h1.166V6.75m3.5 0c.64 0 1.167.527 1.167 1.167v2.333c0 .64.527 1.167 1.167 1.167h.583v1.166h-.583c-.64 0-1.167.527-1.167 1.167v2.333c0 .64-.527 1.167-1.167 1.167h-1.166v-1.167h1.166v-2.916c0-.64.527-1.167 1.167-1.167-.64 0-1.167-.527-1.167-1.167V7.917h-1.166V6.75h1.166z"
              ></path>
            </svg>
            <span class="margin-left-xs"> 表达式</span>
          </div>

          <div
            v-for="(item, groupIndex) in store.options"
            :key="item.label || groupIndex"
            class="option-group1"
          >
            <div  class="group-content">
              
              <div class="field_box_label">
                <span> {{ item.label }}</span>
              </div>

              <div class="select-option-box">
                <div
                  v-for="(option, index) in getFilteredOptions(groupIndex)"
                  :key="index"
                  class="select-option flex align-center"
                  @click.stop="
                    store.handleSelect({
                      dataSet: item.label,
                      dataField: option.dataField,
                      type: 'dataSet',
                    })
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="wd-fill-field"
                      fill="#205f78"
                      d="M21 5c0-.53-.211-1.039-.586-1.414S19.53 3 19 3H5c-.53 0-1.039.211-1.414.586S3 4.47 3 5v14c0 .53.211 1.039.586 1.414S4.47 21 5 21h14c.53 0 1.039-.211 1.414-.586S21 19.53 21 19V5z"
                    ></path>
                    <path
                      fill="#fff"
                      fill-rule="nonzero"
                      d="M12 5.875c-2.762 0-5 1.119-5 2.5s2.238 2.5 5 2.5c2.763 0 5-1.119 5-2.5s-2.237-2.5-5-2.5m-5 3.75V11.5c0 1.381 2.238 2.5 5 2.5 2.763 0 5-1.119 5-2.5V9.625c0 1.381-2.237 2.5-5 2.5-2.762 0-5-1.119-5-2.5m0 3.125v1.875c0 1.381 2.238 2.5 5 2.5 2.763 0 5-1.119 5-2.5V12.75c0 1.381-2.237 2.5-5 2.5-2.762 0-5-1.119-5-2.5z"
                    ></path>
                  </svg>
                  <span
                    class="margin-left-xs text-xs"
                    v-html="
                      highlightMatchText(option.name || option.dataField, groupIndex)
                    "
                  ></span>
                </div>
                <div
                  v-if="
                    getFilteredOptions(groupIndex).length === 0 && searchTexts[groupIndex]
                  "
                  class="no-result"
                >
                  暂无匹配的字段
                </div>
                <div
                  v-if="item.fields?.length === 0 && !searchTexts[groupIndex]"
                  class="no-result"
                >
                  暂无可选字段
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="store.selectType === 'dataSourceFilter'">
          <div
            class="reset_btn select-option flex align-center"
            @click.stop="
              store.handleSelect({
                dataSet: '',
                dataField: '',
                type: 'dataSet',
              })
            "
          >
            <el-icon color="#205f78" size="20px"><Close /></el-icon>
            <span class="margin-left-xs"> 重置</span>
          </div>
          <div
            v-for="(item, groupIndex) in store.options"
            :key="item.label || groupIndex"
            class="option-group"
          >
            <div v-show="isGroupExpanded(groupIndex)" class="group-content">
              <div>
                <el-input
                  v-model="searchTexts[groupIndex]"
                  class="responsive-input"
                  placeholder="输入字段名称进行查找"
                  clearable
                  @input="() => handleGroupSearch(groupIndex)"
                  :input-style="{ fontSize: '12px' }"
                  :prefix-icon="Search"
                  size="small"
                />
              </div>
              <div class="select-option-box">
                <div
                  v-for="(option, index) in getFilteredOptions(groupIndex)"
                  :key="index"
                  class="select-option flex align-center"
                  @click.stop="
                    store.handleSelect({
                      dataSet: item.label,
                      dataField: option.dataField,
                      type: 'dataSet',
                    })
                  "
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      class="wd-fill-field"
                      fill="#205f78"
                      d="M21 5c0-.53-.211-1.039-.586-1.414S19.53 3 19 3H5c-.53 0-1.039.211-1.414.586S3 4.47 3 5v14c0 .53.211 1.039.586 1.414S4.47 21 5 21h14c.53 0 1.039-.211 1.414-.586S21 19.53 21 19V5z"
                    ></path>
                    <path
                      fill="#fff"
                      fill-rule="nonzero"
                      d="M12 5.875c-2.762 0-5 1.119-5 2.5s2.238 2.5 5 2.5c2.763 0 5-1.119 5-2.5s-2.237-2.5-5-2.5m-5 3.75V11.5c0 1.381 2.238 2.5 5 2.5 2.763 0 5-1.119 5-2.5V9.625c0 1.381-2.237 2.5-5 2.5-2.762 0-5-1.119-5-2.5m0 3.125v1.875c0 1.381 2.238 2.5 5 2.5 2.763 0 5-1.119 5-2.5V12.75c0 1.381-2.237 2.5-5 2.5-2.762 0-5-1.119-5-2.5z"
                    ></path>
                  </svg>
                  <span
                    class="margin-left-xs text-xs"
                    v-html="
                      highlightMatchText(option.name || option.dataField, groupIndex)
                    "
                  ></span>
                </div>
                <div
                  v-if="
                    getFilteredOptions(groupIndex).length === 0 && searchTexts[groupIndex]
                  "
                  class="no-result"
                >
                  暂无匹配的字段
                </div>
                <div
                  v-if="item.fields?.length === 0 && !searchTexts[groupIndex]"
                  class="no-result"
                >
                  暂无可选字段
                </div>
              </div>
            </div>
          </div>
          <div class="exp_btn select-option flex align-center">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                class="wd-fill-expression"
                d="M21 5c0-.53-.211-1.039-.586-1.414S19.53 3 19 3H5c-.53 0-1.039.211-1.414.586S3 4.47 3 5v14c0 .53.211 1.039.586 1.414S4.47 21 5 21h14c.53 0 1.039-.211 1.414-.586S21 19.53 21 19V5z"
              ></path>
              <path
                fill="#333"
                fill-rule="nonzero"
                d="M9.667 6.75c-.64 0-1.167.527-1.167 1.167v2.333c0 .64-.527 1.167-1.167 1.167H6.75v1.166h.583c.64 0 1.167.527 1.167 1.167v2.333c0 .64.527 1.167 1.167 1.167h1.166v-1.167H9.667v-2.916C9.667 12.527 9.14 12 8.5 12c.64 0 1.167-.527 1.167-1.167V7.917h1.166V6.75m3.5 0c.64 0 1.167.527 1.167 1.167v2.333c0 .64.527 1.167 1.167 1.167h.583v1.166h-.583c-.64 0-1.167.527-1.167 1.167v2.333c0 .64-.527 1.167-1.167 1.167h-1.166v-1.167h1.166v-2.916c0-.64.527-1.167 1.167-1.167-.64 0-1.167-.527-1.167-1.167V7.917h-1.166V6.75h1.166z"
              ></path>
            </svg>
            <span class="margin-left-xs"> 表达式</span>
          </div>
        </template>
      </div>
    </Transition>
    <Expression ref="expressionRef" />
  </teleport>
</template>

<script setup>
// 原有脚本逻辑完全不变
import { ref, computed, onMounted, onUnmounted, watch, reactive } from "vue";
import { useSelectFieldStore } from "@/stores/selectField";
import { Search, ArrowDown, ArrowRight, Close } from "@element-plus/icons-vue";
import Expression from "@/components/expression/index.vue";

const store = useSelectFieldStore();
const hoverIndex = ref(-1);
const searchTexts = ref([]);
const expandedGroup = ref(0);
const expressionRef = ref(null);

const initGroupState = () => {
  const groupCount = store.options?.length || 0;
  searchTexts.value = Array.from({ length: groupCount }, () => "");
  expandedGroup.value = groupCount > 0 ? 0 : -1;
};

const showExpression = () => {
  // store.hide();
  var newOptions = store.options.map((item) => {
    return {
      name: item.label,
      list: item.fields.map((field) => {
        return {
          ...field,
          name: field.name,
          value: field.dataField,
        };
      }),
    };
  });
  expressionRef.value.handleOpen(store.value, newOptions);
};

watch(
  () => store.options,
  () => {
    initGroupState();
  },
  { deep: true, immediate: true }
);

const isGroupExpanded = (groupIndex) => {
  return store.options.length === 1 || expandedGroup.value === groupIndex;
};

const handleLabelClick = (groupIndex) => {
  if (store.options.length === 1) return;
  expandedGroup.value = expandedGroup.value === groupIndex ? -1 : groupIndex;
  if (expandedGroup.value === groupIndex) {
    searchTexts.value[groupIndex] = "";
  }
};

const getFilteredOptions = (groupIndex) => {
  const group = store.options[groupIndex] || {};
  const fields = group.fields || [];
  const keyword = searchTexts.value[groupIndex]?.trim().toLowerCase() || "";
  if (!keyword) return fields;
  
  return fields.filter((option) => {
    const name = (option.name || "").toLowerCase();
    const dataField = (option.dataField || "").toLowerCase();
    return name.includes(keyword) || dataField.includes(keyword);
  });
};

const handleGroupSearch = (groupIndex) => {};

const highlightMatchText = (text, groupIndex) => {
  const keyword = searchTexts.value[groupIndex]?.trim() || "";
  if (!keyword || !text) return text;
  const escapeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const reg = new RegExp(`(${escapeKeyword})`, "gi");
  return text.replace(reg, '<span class="highlight">$1</span>');
};

const handleOutsideClick = (e) => {
  if (!store.visible) return;
  const selectBox = document.querySelector(".global-select-box");
  if (
    store.triggerEl &&
    !store.triggerEl.contains(e.target) &&
    selectBox &&
    !selectBox.contains(e.target)
  ) {
    store.hide();
    initGroupState();
  }
};

const handleResize = () => {
  if (store.visible && store.triggerEl) {
    if (store.reCalculatePosition) {
      store.reCalculatePosition();
    } else {
      const rect = store.triggerEl.getBoundingClientRect();
      store.position = {
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
      };
    }
  }
};

onMounted(() => {
  document.addEventListener("contextmenu", handleOutsideClick);
  document.addEventListener("click", handleOutsideClick);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  document.removeEventListener("contextmenu", handleOutsideClick);
  document.removeEventListener("click", handleOutsideClick);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.global-select-box {
  position: absolute;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  overflow: hidden;
  box-sizing: border-box;
  max-height: 300px;
  min-width: 200px;
  overflow-y: auto;
  /* 移除原有的 opacity 和 transform，交给过渡类控制 */
}

/* ========== 新增 Vue 过渡动画类 ========== */
/* 进入动画的起始状态 */
.select-box-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.98); /* 加一点缩放，动画更细腻 */
}
/* 进入动画的生效状态 */
.select-box-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); /* 更丝滑的曲线 */
}
/* 进入动画的结束状态 */
.select-box-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 原有样式全部保留 */
.option-group {
  border-bottom: 1px solid #f5f5f5;
  &:last-child {
    border-bottom: none;
  }
}

.label {
  background-color: #e5e5e5;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.disabled {
    cursor: default;
    opacity: 0.8;
  }
}

.expand-icon {
  font-size: 10px;
  transition: transform 0.2s;
}

.group-content {
  display: flex;
  flex-direction: column;
}

:deep(.responsive-input) {
  .el-input__wrapper {
    border-radius: 0;
    box-shadow: none;
    border: none;
    padding: 5px 12px;
    font-size: 12px;
  }
}

.select-option-box {
}

.select-option {
  padding: 5px 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
  font-size: 12px;
  &:hover {
    background-color: #f3f4f6;
  }
}

.no-result {
  padding: 8px;
  text-align: center;
  font-size: 12px;
  color: #999;
}

:deep(.highlight) {
  color: var(--el-color-primary);
  font-weight: 500;
}
:deep(.responsive-input) {
  border-bottom: 1px solid #e5e7eb;
  .el-input__wrapper {
    border-radius: 0;
    box-shadow: none;
  }
}
.reset_btn {
  padding: 8px 12px;
  border-bottom: 1px solid #e5e7eb;
}
.wd-fill-expression {
  fill: #dfc40f;
}
.exp_btn {
  padding: 8px 12px;
  svg {
    width: 24px;
    height: 24px;
  }
}

.field_box_label {
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: relative;
  background-color: #fff;

  span {
    background-color: #fff;
    position: relative;
    z-index: 1;
    padding: 0 10px;
    color: #3333339e;
    font-size: 12px;
  }
}

.field_box_label::after {
  position: absolute;
  top: 50%;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 1px;
  margin-right: 10px;
  content: "";
  background-color: #f2f2f2;
}
.field_box_label::before {
  position: absolute;
  top: 50%;
  right: 0;
  display: inline-block;
  width: 100%;
  height: 1px;
  margin-right: 10px;
  content: "";
  background-color: #f2f2f2;
}
</style>
