<template>
  <div>
    <h1>{{id?'编辑':'新增'}}英雄</h1>

    <el-form label-width="120px">
      <el-tabs value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avator" :src="model.avator" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" placeholder="请选择" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate
              style="margin-top:0.6rem"
              v-model="model.scores.difficult"
              show-score
              text-color="#ff9900"
              :max="10"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top:0.6rem"
              v-model="model.scores.skills"
              show-score
              text-color="#ff9900"
              :max="10"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top:0.6rem"
              v-model="model.scores.attack"
              show-score
              text-color="#ff9900"
              :max="10"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top:0.6rem"
              v-model="model.scores.survive"
              show-score
              text-color="#ff9900"
              :max="10"
            ></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.item1" placeholder="请选择" multiple>
              <el-option v-for="item in item1" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.item2" placeholder="请选择" multiple>
              <el-option v-for="item in item1" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTigs" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTigs" type="textarea"></el-input>
          </el-form-item>

          <el-form-item label="团战技巧">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" type="text" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="(res)=>{$set(item,'icon',res.url)}"
                >
                  <img v-if="item.icon" :src="item.icon" class="icon">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button @click="model.skills.splice(index,1)" type="danger" plain>删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <!-- <el-form-item label="最佳搭档">
        <el-select v-model="model.partnes" placeholder="请选择" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>-->

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

    // 获得英雄类型
    this.fetchCategories();

    //获取所有装备
    this.fetchItems();
  },
  data() {
    return {
      model: {
        name: "",
        avator: "",
        title: "",
        scores: {},
        item1: [],
        skills: []
      },
      categories: [],
      item1: []
    };
  },
  methods: {
    // 获取装备
    fetchItems() {
      this.$http.get("/rest/items").then(res => {
        this.item1 = res.data;
      });
    },
    // 获取英雄类型
    fetchCategories() {
      this.$http.get("/rest/categories").then(res => {
        this.categories = res.data.filter(ele => {
          if (ele.parent && ele.parent.name == "英雄类型") {
            return true;
          }
        });
      });
    },
    afterUpload(res) {
      this.model.avator = res.url;
    },

    fetch() {
      this.$http.get(`/rest/heros/${this.id}`).then(res => {
        this.model = Object.assign(this.model, res.data);
      });
    },

    async onSubmit() {
      let res;
      if (this.id) {
        // 编辑英雄
        res = await this.$http.put(`/rest/heros/${this.id}`, this.model);
      } else {
        // 新建英雄
        res = await this.$http.post("/rest/heros", this.model);
      }

      this.$message({
        message: "保存成功",
        type: "success"
      });

      this.$router.push("/heros/lists");
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