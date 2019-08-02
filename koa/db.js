const mongoose = require('mongoose');
var CONN_DB_STR = "mongodb://localhost:27017/m6-3";
mongoose.connect(CONN_DB_STR, { useNewUrlParser: true });
module.exports = mongoose