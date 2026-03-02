<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2025-12-18 15:21:19
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-30 16:03:46
 * @description: 
-->
<template>
  <div class="temp-element-richText"></div>
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
.temp-element-richText {
  width: 120px;
  height: 60px;
  border: 1px solid #000;
}
</style>
