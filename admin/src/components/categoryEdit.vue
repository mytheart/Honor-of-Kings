<template>
  <div>
    <h1>{{id?'编辑':'新建'}}分类</h1>

    <el-form label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item  label="分类名称">
        <el-input v-model="model.name"></el-input>
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

    this.fetchParents()

    this.id && this.fetch();

  },
  data() {
    return {
      model: {},
      parents:[]
    };
  },
  methods: {
    fetch() {
      this.$http.get(`/categories/${this.id}`).then(res => {

        this.model = res.data
      });
    },
    fetchParents(){
      this.$http.get('/categories').then(res=>{
        this.parents=res.data.filter(ele=>{
          if(!ele.parent){
            return true;
          }
        })
      })
    },
    async onSubmit() {
      let res;
      if (this.id) {
        // 编辑分类
        res = await this.$http.put(`/categories/${this.id}`, this.model);
      } else {
        // 新建分类
        res = await this.$http.post("/categories", this.model);
      }

      this.$message({
        message: "保存成功",
        type: "success"
      });

      this.$router.push("/categories/lists");
    }
  }
};
</script>

<style scoped>
</style>