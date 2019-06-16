<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items" style="width: 50%">
      <el-table-column prop="_id" label="地址"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    fetch() {
      this.$http.get("/category").then(res => {
        this.items=res.data
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
</style>