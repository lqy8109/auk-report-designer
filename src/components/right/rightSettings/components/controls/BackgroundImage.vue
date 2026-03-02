<!--
 * @Version: 1.0
 * @Autor: xwj
 * @Date: 2026-01-29 14:17:07
 * @LastEditors: xwj
 * @LastEditTime: 2026-02-04 15:57:04
 * @description: 
-->
<script setup>
import { ref, watch, computed } from "vue";
import { Rank, CirclePlus, Delete } from "@element-plus/icons-vue";
import { useLowcodeEditor } from "@/composables/useLowcodeEditor";
import { ElMessage } from "element-plus";
const props = defineProps({
  embeddedImages: { type: Array, default: () => [] },
  modelValue: { type: [String, Number, Boolean], required: true },
  type: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  updateType: { type: String, default: "" },
  form: { type: Object, default: () => ({}) },
  dataSources: {
    type: Array,
    default: () => [],
  },
  dataSets: {
    type: Array,
    default: () => [],
  },
});
const {
  // 选中状态
  selectedComp,
  hasSelectedComp,
  // 页面布局
  pageBase,
  pageHeaderLayout,
  pageFooterLayout,
  // 页面更新方法
  updatePageBase,
  updatePageHeaderLayout,
  updatePageFooterLayout,
  //数据更新方法
  updateCompProps,
  updateCanvasComp,
  updatePageHeaderComp,
  updatePageFooterComp,
  // 通用监听
  watchSelectedComp,
  // 获取当前组件所在区域
  getCurrentSection,
} = useLowcodeEditor();

const emit = defineEmits(["update:modelValue", "change"]);
const imgList = ref(props.embeddedImages);
const imgType = ref("1");
const fileImg = ref(null);
// const name = ref(selectedComp.value?.style?.["background-image-name"] || "");
// const repeat = ref(selectedComp.value?.style?.["background-repeat"] || "repeat");
const showMoreConfig = ref(false);
const name = computed(() => selectedComp.value?.style?.["background-image-name"] || "");
const repeat = computed(
  () => selectedComp.value?.style?.["background-repeat"] || "repeat"
);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 1. 文件基础校验（大小+类型）
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]; // 允许的图片类型
  // 大小校验
  if (file.size > maxSize) {
    ElMessage.error(`文件大小不能超过5MB`);
    e.target.value = ""; // 清空文件选择，避免重复选择同一文件不触发change
    return;
  }
  // 图片类型校验
  if (!allowTypes.includes(file.type)) {
    ElMessage.error(`仅支持JPG/PNG/GIF/WEBP格式的图片`);
    e.target.value = "";
    return;
  }

  // 2. 获取图片原始名称（直接从file对象获取）
  const imgName = file.name; // 例：test.png（含扩展名）
  // 如需纯名称（不含扩展名），可追加：
  // const pureImgName = imgName.substring(0, imgName.lastIndexOf('.'));

  // 3. 将图片文件转换为Base64编码
  const reader = new FileReader();
  // 读取文件为DataURL（即Base64格式）
  reader.readAsDataURL(file);
  // 读取完成的回调（异步）
  reader.onload = (event) => {
    // event.target.result 即为图片的Base64编码字符串
    const imgBase64 = event.target.result;
    // 此时可获取到 图片名称 + Base64，进行后续操作（如预览、上传、渲染等）
    console.log("图片名称：", imgName);
    console.log("图片Base64：", imgBase64);
    // 5. 图片添加到列表
    imgList.value.push({
      imageData: imgBase64, // 提取Base64编码部分（去掉"data:image/xxx;base64,"前缀）
      name: imgName,
    });
    // 示例：将Base64和名称传递给其他逻辑
    // handleImgSuccess(imgName, imgBase64);
  };

  // 4. 读取失败的异常处理
  reader.onerror = () => {
    ElMessage.error("图片解析失败，请选择有效图片文件");
    e.target.value = "";
  };
};

const uploadFile = () => {
  fileImg.value.click();
};

const backgroundImagePopoverRef = ref(null);
const handleSelect = (item) => {
  name.value = item.name;
  if (selectedComp.value.type == "page") {
    updatePageBase({
      style: {
        ...selectedComp.value.style,
        "background-image": item.imageData,
        "background-repeat": repeat.value,
        "background-image-name": item.name,
      },
    });
  } else {
    var style = selectedComp.value.style || {};
    const newStyle = {
      ...style,
    };
    newStyle["background-image"] = item.imageData;
    newStyle["background-repeat"] = repeat.value;
    newStyle["background-image-name"] = item.name;
    updateCompProps(selectedComp.value, { style: newStyle });
    // updateMethod && updateMethod(selectedComp.value, { style: newStyle });
  }
  backgroundImagePopoverRef.value.hide();
};

const handleSelectField = (item) => {
  if (selectedComp.value.type == "page") {
    updatePageBase({
      style: {
        ...selectedComp.value.style,
        "background-image": item.dataField,
        "background-repeat": repeat.value,
        "background-image-name": "",
      },
    });
  } else {
    var style = selectedComp.value.style || {};
    const newStyle = {
      ...style,
    };
    newStyle["background-image"] = item.dataField;
    newStyle["background-repeat"] = repeat.value;
    newStyle["background-image-name"] = "";
    updateCompProps(selectedComp.value, { style: newStyle });
  }

  backgroundImagePopoverRef.value.hide();
};

const handleChangeReport = (value) => {
  if (selectedComp.value.type == "page") {
    updatePageBase({
      style: {
        ...selectedComp.value.style,
        "background-repeat": value,
      },
    });
  }
};
</script>
<template>
  <div
    class="wh-100"
    :class="{ 'show-more-config': showMoreConfig }"
    style="position: relative"
  >
    <el-popover
      placement="bottom"
      width="300"
      trigger="click"
      popper-class="right_container"
      ref="backgroundImagePopoverRef"
    >
      <template #default>
        <el-radio-group v-model="imgType" class="radio-group">
          <el-radio-button label="内嵌图片" value="1" />
          <el-radio-button label="数据库图片" value="2" />
        </el-radio-group>

        <template v-if="imgType === '1'">
          <input
            ref="fileImg"
            style="display: none"
            @change="handleFileChange"
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.svg"
          />

          <div class="upload_img_box flex align-center" @click.stop="uploadFile">
            <el-icon color="var(--el-color-primary)" style="font-weight: bold"
              ><CirclePlus
            /></el-icon>
            <div class="margin-left-sm text-xs">上传图片</div>
          </div>

          <div class="img_box flex flex-wrap">
            <li
              class="img_box_item"
              v-for="(item, index) in imgList"
              @click.stop="handleSelect(item)"
              :key="index"
              :class="{ selected: item.name == name }"
            >
              <img :src="item.imageData" :alt="item.name" />
              <el-button
                class="delete-btn"
                size="small"
                @click.stop="imgList.splice(index, 1)"
                type="primary"
                :icon="Delete"
                circle
              />
            </li>
          </div>
        </template>
        <template v-else>
          <div class="field_box_container">
            <div class="field_box" v-for="item in props.dataSets" :key="item">
              <div class="field_box_label">
                <span> {{ item.name }}</span>
              </div>
              <div
                class="field_box_item flex align-center"
                v-for="ite in item.fields"
                :key="ite"
                @click.stop="handleSelectField(ite)"
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
                <span class="margin-left-xs text-xs">{{ ite.name }}</span>
              </div>
            </div>
          </div>
        </template>
      </template>
      <template #reference>
        <div
          class="popover_box flex align-center justify-between"
          :style="{ width: showMoreConfig ? 'calc(100% - 90px)' : '100%' }"
        >
          <div class="flex-sub" style="padding: 1px 11px; font-size: 13px">
            {{ name }}
          </div>
          <el-button
            :icon="Rank"
            @click.stop="showMoreConfig = !showMoreConfig"
            style="padding: 8px 8px 8px 7px"
          >
          </el-button>
        </div>
      </template>
    </el-popover>
    <div class="more_config" v-show="showMoreConfig">
      <div class="flex align-center">
        <div class="label">图片重复</div>
        <el-select
          v-model="repeat"
          @change="handleChangeReport"
          popper-class="right_container"
        >
          <el-option label="不重复" value="no-repeat" />
          <el-option label="重复" value="repeat" />
          <el-option label="横向重复" value="repeat-x" />
          <el-option label="纵向重复" value="repeat-y" />
        </el-select>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.popover_box {
  height: 32px;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  border-radius: 4px;
  :deep(.el-button) {
    border-radius: 0 4px 4px 0;
    font-size: 16px;
    cursor: pointer;
    svg {
      transform: rotate(45deg);
    }
  }
}
.show-more-config::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -106px;
  width: 111%;
  height: 106%;
  background-color: rgba(0, 0, 0, 0.05);
  pointer-events: none;
}
.more_config {
  position: relative;
  top: 0px;
  left: -90px;
  width: 300px;
  margin-top: 5px;

  .label {
    width: 90px;
    min-width: 90px;
    max-height: 30px;
    vertical-align: middle;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 30px;
  }
}
.upload_img_box {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 32px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  cursor: pointer;
  padding: 0 12px;
}
.upload_img_box:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.field_box {
  //   margin-top: 10px;
}
.img_box {
  min-height: 0;
  max-height: 300px;
  overflow-y: auto;
}
.img_box_item {
  position: relative;
  display: flex;
  overflow: hidden;
  flex: 0 0 auto;
  width: calc((100% - 15px) / 3);
  height: 80px;
  margin-right: 5px;
  transition: background-color 0.2s ease-in-out;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  padding: 2px;
  box-sizing: border-box;
  img {
    display: block;
    flex: 0 0 auto;
    height: 100%;
    background-color:#f1f1f1;
  }
}
.img_box_item:hover:after {
  box-shadow: inset 0 0 0 2px var(--el-color-primary), inset 0 0 0 3px #fff;
}
.img_box_item:after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  transition: box-shadow 0.2s ease-in-out;
  pointer-events: none;
}
.img_box_item .delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
}
.img_box_item:hover .delete-btn {
  opacity: 1;
}
.selected {
  background-color: var(--el-color-primary);
}
:deep(.el-select__wrapper) {
  font-size: 12px;
}
.field_box_label {
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: relative;
  background-color: #fff;
  margin-top: 5px;
  span {
    background-color: #fff;
    position: relative;
    z-index: 1;
    padding: 0 10px;
    color: #3333339e;
    font-size: 12px;
  }
}
.field_box_container {
  min-height: 0;
  max-height: 300px;
  overflow-y: auto;
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
.field_box_item {
  padding: 5px 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
  font-size: 12px;
  &:hover {
    background-color: #f3f4f6;
  }
}
</style>
<style lang="scss">
.background-image-tabs {
  .el-tabs__item {
    height: 32px;
  }
}
.radio-group {
  .el-radio-button__inner {
    padding: 8px 12px;
  }
  .el-radio-button__inner::nth-of-type(1) {
    border-radius: 2px 0 0 2px !important;
  }
}
</style>
