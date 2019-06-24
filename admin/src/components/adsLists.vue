<template>
  <div>
    <h1>广告列表</h1>
    <el-table :data="ads" style="width: 50%">
      <el-table-column prop="_id" label="id"></el-table-column>
      <el-table-column prop="name" label="首页幻灯片广告"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/ads/create/${scope.row._id}`)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ads: []
    };
  },

  methods: {
    fetch() {
      this.$http.get("/rest/ads").then(res => {
        this.ads = res.data;
      });
    },

   remove(row) {
      this.$confirm(`是否确认删除 ${row.name}`, "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/rest/ads/${row._id}`).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetch();
          });
        })
        .catch(err => {});
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
</style>