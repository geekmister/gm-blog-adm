<template>
  <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode"/>
  <div class="content-container space-top-20 space-bottom-20">
    <a-input placeholder="请输入标题" :bordered="false" style="height: 64px"></a-input>
    <a-divider class="content-divider"/>
    <Editor
        class="content-editor" v-model="valueHtml"
        :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated"/>
    <a-divider class="content-divider"/>
    <span class="space-top-20">发布设置</span>
    <a-form :model="rsFormState" name="rsForm" class="space-left-20 space-top-10"
            :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="添加封面" name="cover">
        <a-upload
            v-model:file-list="rsFormState.cover.fileList" name="cover" list-type="picture-card"
            class="content-rsform-upload-container space-left-10"
            :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :before-upload="rsFormState.cover.beforeUpload" @change="rsFormState.cover.handleChange">
          <img v-if="rsFormState.cover.imageUrl" :src="rsFormState.cover.imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="rsFormState.cover.loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item label="投稿专栏" name="sc">
        <a-select class="space-left-10"></a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {defineComponent, onBeforeUnmount, ref, shallowRef, onMounted} from "vue";

import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: "Add",
  components: { Editor, Toolbar, LoadingOutlined, PlusOutlined },
  setup(props, ctx) {

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    // 发布设置表单state
    const rsFormState = ref({
      cover: {
        fileList: [],
        loading: false,
        imageUrl: "",
        handleChange: (info) => {
          if (info.file.status === 'uploading') {
            rsFormState.value.cover.loading = true;
            return;
          }

          if (info.file.status === 'done') {
            // Get this url from response in real world.
            rsFormState.value.cover.getBase64(info.file.originFileObj, base64Url => {
              rsFormState.value.cover.imageUrl.value = base64Url;
              rsFormState.value.cover.loading = false;
            });
          }

          if (info.file.status === 'error') {
            rsFormState.value.cover.loading = false;
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
      },

    })

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      rsFormState
    }
  }
})
</script>

<style scoped>
.content-container {
  display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;
  width: 840px; height: 100%; background-color: #FFFFFF; margin-left: calc(50% - 420px); padding: 20px 20px;
}
.content-divider {
  margin: 0 0;
}
.content-editor {
  width: 100%; height: 100%; overflow-y: hidden;
}
.content-rsform-upload-container {
  display: flex; flex-direction: row; justify-content: center; align-items: center;
  width: 235px; height: 100px;
}
</style>