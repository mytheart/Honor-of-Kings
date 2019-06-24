<template>
  <div>
    <h1>{{id?'编辑':'新建'}}广告位</h1>

    <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
      </el-form-item>

      <el-row type="flex" style="flex-wrap:wrap">
        <el-col :md="12" v-for="(item,index) in model.items" :key="index">
          <el-form-item label="链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="(res)=>{$set(item,'image',res.url)}"
            >
              <img v-if="item.image" :src="item.image" class="icon">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button @click="model.items.splice(index,1)" type="danger" plain>删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

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
      model: {
        name: "",
        items: []
      }
    };
  },
  methods: {
    fetch() {
      this.$http.get(`/rest/ads/${this.id}`).then(res => {
        this.model = res.data;
      });
    },
    fetchParents() {
      this.$http.get("/rest/ads").then(res => {
        this.parents = res.data.filter(ele => {
          if (!ele.parent) {
            return true;
          }
        });
      });
    },
    async onSubmit() {
      let res;
      if (this.id) {
        // 编辑广告
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model);
      } else {
        // 新建广告
        res = await this.$http.post("/rest/ads", this.model);
      }

      this.$message({
        message: "保存成功",
        type: "success"
      });

      this.$router.push("/ads/lists");
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