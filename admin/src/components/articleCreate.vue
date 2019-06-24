<template>
  <div>
    <h1>{{id?'编辑':'新增'}}文章</h1>

    <el-form label-width="120px">
      <el-form-item label="类型">
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <el-option
            v-for="article in categories"
            :key="article._id"
            :label="article.name"
            :value="article._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <!-- 富文本编辑器 -->
        <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="model.content"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: ["id"],
  created() {
    this.fetchCategories();

    this.id && this.fetch();
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        categories: [],
        title: "",
        content: ""
      },
      categories: ""
    };
  },
  methods: {
    fetchCategories() {
      this.$http.get("/rest/categories/").then(res => {
        this.categories = res.data.filter(ele => {
          if (ele.parent && ele.parent.name === "新闻资讯") {
            return true;
          }
        });
      });
    },

    fetch() {
      this.$http.get(`/rest/articles/${this.id}`).then(res => {
        this.model = res.data;
      });
    },

    async onSubmit() {
      let res;
      if (this.id) {
        // 编辑物品
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model);
      } else {
        // 新建物品
        res = await this.$http.post("/rest/articles", this.model);
      }

      this.$message({
        message: "保存成功",
        type: "success"
      });

      this.$router.push("/articles/lists");
    },
    // 文章中的图片上传
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      this.$http
        .post("/upload", formData)
        .then(result => {
          const url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  border: 1px dashed #d9d9d9;
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>