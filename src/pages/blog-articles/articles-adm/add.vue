<template>
  <t-space direction="vertical">
    <t-input size="large" placeholder="请输入文章标题"/>
    <div>
      <Toolbar
          style="border-bottom: 1px solid #ccc;"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"/>
      <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"/>
    </div>
    <div class="setting-container">
      <t-space direction="vertical">
        <h1>文章设置</h1>
        <t-upload
            v-model="files"
            :auto-upload="autoUpload"
            :theme="display"
            :data="{ extra_data: 123, file_name: 'certificate' }"
            :abridge-name="[10, 8]"
            :format-response="formatResponse"
            draggable
            action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        />
        <t-select
            v-model="value1"
            :options="optionsData"
            :popup-props="{ overlayClassName: 'tdesign-demo-select__overlay-option' }"
            placeholder="请选择"
        />
      </t-space>
      <t-divider/>
      <div class="btn-container">
        <t-space>
          <t-button>保存</t-button>
          <t-button>发布</t-button>
        </t-space>
      </div>
    </div>
  </t-space>
</template>

<script setup lang="jsx">
  import '@wangeditor/editor/dist/css/style.css' // 引入 css

  import { onBeforeUnmount, ref, shallowRef, onMounted, computed } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

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

  const mode = "default";


  function getCurrentDate(needTime = false) {
    const d = new Date();
    let month = d.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    const date = `${d.getFullYear()}-${month}-${d.getDate()}`;
    const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    if (needTime) return [date, time].join(' ');
    return date;
  }

  const autoUpload = ref(true);
  const files = ref([]);
  const display = ref('file');

  // res.url 图片地址；res.uploadTime 文件上传时间；res.error 上传失败的原因
  function formatResponse(res) {
    // 响应结果添加上传时间字段，用于 UI 显示
    res.uploadTime = getCurrentDate();
    return res;
  }

  const options = [
    { label: '用户一', value: '1', description: '这是一段用户描述信息，可自定义内容' },
    { label: '用户二', value: '2', description: '这是一段用户描述信息，可自定义内容' },
    { label: '用户三', value: '3', description: '这是一段用户描述信息，可自定义内容' },
    { label: '用户四', value: '4', description: '这是一段用户描述信息，可自定义内容' },
    { label: '用户五', value: '5', description: '这是一段用户描述信息，可自定义内容' },
    { label: '用户六', value: '6', description: '这是一段用户描述信息，可自定义内容' },
    { label: '用户七', value: '7', description: '这是一段用户描述信息，可自定义内容' },
    { label: '用户八', value: '8', description: '这是一段用户描述信息，可自定义内容' },
    { label: '用户九', value: '9', description: '这是一段用户描述信息，可自定义内容' },
  ];
  const value1 = ref('');
  const optionRender = (h, option) => (
      <div class="tdesign-demo__user-option">
        <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
        <div class="tdesign-demo__user-option-info">
          <div>{option.label}</div>
          <div class="tdesign-demo__user-option-desc">{option.description}</div>
        </div>
      </div>
  );
  const optionsData = computed(() =>
      options.map((item) => ({
        ...item,
        // options 自定义下拉选项关键代码
        content: (h) => optionRender(h, item),
      })),
  );


</script>

<style scoped>
  .setting-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    padding: 20px 20px;
    background-color: var(--td-bg-color-container);
  }
  .btn-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .tdesign-demo__user-option {
    display: flex;
  }

  .tdesign-demo__user-option > img {
    max-width: 40px;
    max-height: 40px;
    border-radius: 50%;
  }

  .tdesign-demo__user-option-desc {
    font-size: 14px;
    color: var(--td-text-color-secondary);
  }

  .tdesign-demo__user-option-info {
    margin-left: 16px;
  }

  .tdesign-demo-select__overlay-option .t-select-option {
    height: 100%;
    padding: 8px;
  }
</style>