<template>
  <div>
    <h1>新建分类</h1>

    <el-form>
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  methods: {
    async onSubmit() {
      const result = await this.$http.post("/category", this.form);

      if (!result) {
        return;
      }

     this.$message({
          message: '保存成功',
          type: 'success'
        });

      this.$router.push("/category/lists");
    }
  }
};
</script>

<style scoped>
</style>