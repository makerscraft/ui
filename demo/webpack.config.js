var options = {
  __dirname: __dirname,
  displayName: 'Thinkful UI',
  hotloadPort: process.env.PORT ? Number(process.env.PORT) + 3000 : 8888
}

module.exports = require('./../webpack.defaults')(options);
