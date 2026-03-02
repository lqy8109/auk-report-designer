<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2025-12-18 15:21:19
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-28 09:22:57
 * @description: 
-->
<template>
  <div class="temp-element-text" ></div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  currentDragItem: {
    type: Object,
    default: () => ({}),
  },
});
</script>
<style lang="scss" scoped>
.temp-element-text {
  left: 1.499cm;
  top: 22.751cm;
  width: 2.5cm;
  height: 0.75cm;
  background-color: white;
  pointer-events: all;
  opacity: 1;
  border: 1px solid var(--el-color-primary);
}
</style>
