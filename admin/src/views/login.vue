<template>
  <el-card style="width:30%;margin:100px auto;">
    <el-form>
      <el-form-item label="用户名" prop="pass">
        <el-input v-model="model.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    login() {
      this.$http.post("login", this.model).then(res => {
        localStorage.token = res.data.token;
        this.$router.push("/");
        this.$message({
          type: "success",
          message: "登录成功"
        });
      });
    }
  }
};
</script>

<style scoped>
</style>