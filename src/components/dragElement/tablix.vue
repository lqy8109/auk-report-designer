<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2025-12-18 15:54:41
 * @LastEditors: xwj
 * @LastEditTime: 2026-01-28 09:23:02
 * @description: 
-->

<template>
  <table border="1" cellspacing="0" >
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  currentDragItem: {
    type: Object,
    default: () => ({
      type: "table",
    }),
  },
});
</script>
<style lang="scss" scoped>
td {
  width: 94px;
  height: 30px;
  color: black;
  background-color: white;
}
</style>
