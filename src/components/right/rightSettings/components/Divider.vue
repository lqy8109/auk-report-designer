<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-04 09:46:58
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-26 17:50:01
 * @description: 
-->
<script setup>
import { ref } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div class="divider"> 
    <div class="text">{{ title }}</div>
  </div>
</template>
<style lang="scss" scoped>
.divider {
  color: var(--el-color-primary);
  position: relative;
  display: flex;
  overflow: hidden;
  flex: 1 1 auto;
  height: 30px;
  margin: 0;
  padding: 0;
  margin-bottom: 5px;
  user-select: none;
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  line-height: 30px;
}
.text {
  background-color: #ffffff;
  padding-right: 10px;
  z-index:2;
} 
.divider::after {
  position: absolute;
  top: 50%;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 1px;
  margin-left: 10px;
  content: "";
  background-color: var(--el-color-primary);
}
</style>
