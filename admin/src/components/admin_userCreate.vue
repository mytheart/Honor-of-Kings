<template>
  <div>
    <h1>{{id?'编辑':'新增'}}管理员</h1>

    <el-form label-width="120px">
     

          <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="model.password"></el-input>
          </el-form-item>
       

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["id"],
  created() {
    this.id && this.fetch();
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    fetch() {
      this.$http.get(`/rest/adminUsers/${this.id}`).then(res => {
        this.model = res.data;
      });
    },

    async onSubmit() {
      let res;
      if (this.id) {
        // 编辑物品
        res = await this.$http.put(`/rest/adminUsers/${this.id}`, this.model);
      } else {
        // 新建物品
        res = await this.$http.post("/rest/adminUsers", this.model);
      }

      this.$message({
        message: "保存成功",
        type: "success"
      });

      this.$router.push("/admin_users/lists");
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