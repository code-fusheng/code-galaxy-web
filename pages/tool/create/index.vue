<template>
  <div>
    <div class="tools-bar">
      <a-col :span="2">
        <a-button type="link" @click="goBack()">
          <a-icon type="left" />返回
        </a-button>
      </a-col>
      <a-col :span="14">
        <a-input class="input-semicircle" v-model="article.articleTitle" placeholder="文章标题" />
      </a-col>
      <a-col :span="2">
        <a-button type="link">0/100</a-button>
      </a-col>
      <a-col :span="3">
        <a-button class="input-semicircle" type="danger" @click="saveDraft()">
          <a-icon type="folder" />保存草稿
        </a-button>
      </a-col>
      <a-col :span="3">
        <a-button class="input-semicircle" type="primary">
          <a-icon type="cloud-upload" />发布文章
        </a-button>
      </a-col>
    </div>
    <client-only>
      <mavon-editor
        ref="md"
        v-model="markdownContent"
        code-style="monokai"
        :ishljs="true"
        :style="{height: carouselStyle.height + 'px', zIndex: 1, marginBottom: 3 + 'px'}"
        @save="saveMavon"
      />
    </client-only>
    <div class="statistics-bar">
      <span class="ml10 statistics-item">编辑模式: {{ editModel }}</span>
      <span class="ml10 statistics-item">用时: {{ useTime }} s</span>
      <span class="ml10 statistics-item">字数: {{ wordCount }}</span>
    </div>

    <a-modal
      title="文章信息"
      :dialog-style="{ top: '20px' }"
      :visible="modalVisible"
      @ok="() => onSubmit()"
      @cancel="() => close()"
    >
      <a-form-model :model="article" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="文章分类">
          <a-select
            v-model="article.articleCategory"
            placeholder="请选择您的文章分类"
            @change="autoSetImage(article.articleCategory)"
          >
            <a-select-option
              v-for="category in categoryList"
              :value="category.categoryId"
              :key="category.categoryId"
            >{{ category.categoryName }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="文章封面">
          <a-upload name="file" class="avatar-uploader" :action="uploadUrl" @change="uploadSuccess">
            <img v-if="imageUrl || article.articleImage" :src="imageUrl" class="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import env from "@/env";
export default {
  data() {
    return {
      // 文章内容主体对象
      article: {},
      // 文章可用分类列表
      categoryList: [],
      markdownContent: "",
      carouselStyle: {
        widht: "",
        height: "",
      },
      editModel: "markdown",
      startTime: null,
      useTime: 0,
      wordCount: 0,
      // 组件控制
      loading: false,
      modalVisible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      uploadUrl: "http://localhost:9999/sys-server/api/upload/uploadImage",
      imageUrl: null, // 上传图片回显
      headers: {
        // 上传文件的请求头
        Authorization: "Bearer " + this.$store.state.accessToken,
      },
      currentCategory: {},
    };
  },
  watch: {
    markdownContent: function () {
      this.wordCount = this.$refs.md.d_value.length;
    },
  },
  mounted() {
    document.getElementById("top").style.display = "none";
    document.getElementById("bottom").style.display = "none";
    this.carouselStyle.height = document.body.clientHeight - 68;
    this.carouselStyle.widht = document.body.clientWidth - 68;
    window.onresize = () => {
      return (() => {
        this.carouselStyle.height = document.body.clientHeight - 68;
        this.carouselStyle.widht = document.body.clientWidth - 68;
        console.log(
          "高度" +
            document.body.clientHeight +
            "宽度" +
            document.body.clientWidth
        );
      })();
    };
  },
  created() {
    this.timeTask();
    this.init();
    for (const envItem of Object.values(env)) {
      if (envItem.NODE_ENV === process.env.NODE_ENV) {
        this.uploadUrl = envItem.uploadUrl;
      }
    }
  },
  methods: {
    async init() {
      const { data } = await this.$listAllCategory();
      this.categoryList = data;
    },
    // saveDraft 保存草稿
    async saveDraft() {
      this.modalVisible = true;
    },
    async onSubmit() {
      this.article.articleImage = this.imageUrl;
      this.article.articleContent = this.$refs.md.d_value;
      this.article.editContent = this.$refs.md.d_render;
      this.article.useTime = this.useTime;
      this.article.editModel = this.editModel;
      const { data } = await this.$saveDraft(this.article);
      this.modalVisible = false;
    },
    close() {
      this.modalVisible = false;
    },
    setModal1Visible(modalVisible) {
      this.modalVisible = modalVisible;
    },
    saveMavon(value, render) {
      console.log("this is render" + render);
      console.log("this is value" + value);
    },
    goBack() {
      this.$router.go(-1);
      document.getElementById("top").style.display = "";
      document.getElementById("bottom").style.display = "";
    },
    timeTask() {
      var _this = this;
      setInterval(function () {
        _this.useTimeCount();
      }, 1000);
    },
    useTimeCount() {
      this.useTime = this.useTime + 1;
    },
    // 文件上传
    uploadSuccess(res, file) {
      this.loading = true;
      console.log(res);
      this.imageUrl = res.data;
      this.loading = false;
    },
    autoSetImage(val) {
      console.log(val);
      this.currentCategory = this.categoryList.filter(function (
        value,
        index,
        arr
      ) {
        return value.categoryId === val;
      });
      this.imageUrl = this.currentCategory[0].categoryImage;
    },
  },
};
</script>

<style>
.tools-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 5px;
  line-height: 45px;
  height: 45px;
}
.statistics-bar {
  margin: 0 10px;
  line-height: 20px;
  height: 20px;
}
.statistics-item {
  cursor: pointer; /* 聚焦样式*/
  color: rgb(255, 0, 13);
  margin-right: 20px;
}

/*  */
.avatar {
  width: 300px;
  height: 150px;
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
