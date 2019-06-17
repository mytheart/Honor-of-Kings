<template>
  <div>
    <h1>{{id?'编辑':'新建'}}物品</h1>

    <el-form label-width="120px">

      <el-form-item  label="物品名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item  label="物品图标">
        <el-input v-model="model.icon"></el-input>
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
      model: {},
    };
  },
  methods: {
    fetch() {
      this.$http.get(`/items/${this.id}`).then(res => {

        this.model = res.data
      });
    },
    async onSubmit() {
      let res;
      if (this.id) {
        // 编辑分类
        res = await this.$http.put(`/items/${this.id}`, this.model);
      } else {
        // 新建分类
        res = await this.$http.post("/items", this.model);
      }

      this.$message({
        message: "保存成功",
        type: "success"
      });

      this.$router.push("/items/lists");
    }
  }
};
</script>

<style scoped>
</style>