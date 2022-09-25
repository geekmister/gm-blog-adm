<template>
  <a-drawer title="添加专栏" :placement="'right'"
            :visible="componentState.drawer.visible" @close="componentState.drawer.onClose">
    <template #extra>
      <a-button>保存</a-button>
      <a-button class="space-left-10" type="primary">发布</a-button>
    </template>
    <a-form :model="formState" name="form" :label-col="{span: 6}" :wrapper-col="{span: 18}">
      <a-form-item label="添加图标" name="icon">
        <a-upload
            v-model:file-list="componentState.upload.fileList"
            name="icon"
            list-type="picture-card"
            class="avatar-uploader" :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="componentState.upload.beforeUpload"
            @change="componentState.upload.handleChange">
          <img v-if="componentState.upload.imageUrl" :src="componentState.upload.imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="componentState.upload.loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="专栏名称" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入专栏名称"></a-input>
      </a-form-item>
      <a-form-item label="专栏描述" name="desc">
        <a-input v-model:value="formState.desc" placeholder="请输入专栏描述"></a-input>
      </a-form-item>
    </a-form>
    <div class="form-item-container space-top-20 space-left-20">

    </div>
  </a-drawer>
</template>

<script>
import {defineComponent, onBeforeUpdate, ref} from "vue";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default defineComponent({
  name: "AddDrawer",
  props: {
    visible: Boolean
  },
  emits: ["closeDrawer"],
  components: {PlusOutlined, LoadingOutlined},
  setup(props, ctx) {

    const componentState = ref({
      drawer: {
        visible: props.visible,
        onClose: () => {
          componentState.value.drawer.visible = false;
          ctx.emit("closeDrawer", componentState.value.drawer.visible);
        }
      },
      upload: {
        fileList: [],
        loading: false,
        imageUrl: "",
        handleChange: (info) => {
          if (info.file.status === 'uploading') {
            componentState.value.upload.loading = true;
            return;
          }

          if (info.file.status === 'done') {
            // Get this url from response in real world.
            componentState.value.upload.getBase64(info.file.originFileObj, base64Url => {
              componentState.value.upload.imageUrl = base64Url;
              componentState.value.upload.loading = false;
            });
          }

          if (info.file.status === 'error') {
            componentState.value.upload.loading = false;
            // message.error('upload error');
          }
        },
        beforeUpload: (file) => {
          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

          if (!isJpgOrPng) {
            // message.error('You can only upload JPG file!');
          }

          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isLt2M) {
            // message.error('Image must smaller than 2MB!');
          }

          return isJpgOrPng && isLt2M;
        },
        getBase64: (img, callback) => {
          const reader = new FileReader();
          reader.addEventListener('load', () => callback(reader.result));
          reader.readAsDataURL(img);
        }
      }
    })

    const formState = ref({
      name: "", desc: ""
    })

    onBeforeUpdate(() => {
      componentState.value.drawer.visible = props.visible;
    })

    return {
      componentState,
      formState
    }
  }
})
</script>

<style scoped>
.form-item-container {
  display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;
}
</style>