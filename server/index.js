const express = require("express");

const app = express();

app.set('secret', 'i2u34y12oi3u4y8'); // 密钥应该保存到环境变量里，而不是放到代码里

app.use(require('cors')()); // 允许跨域
app.use(express.json()); // 接续传来的json数据
app.use('/uploads', express.static(__dirname + '/uploads')); // 上传的静态资源的路径

require('./plugins/db')(app); // model层：连接数据库，建表
require('./routes/admin')(app); // 业务层：后台接口
// require('./routes/web')(app); // 业务层：前台接口

app.listen(3000, () => {
  console.log('server running in localhost:3000');
});