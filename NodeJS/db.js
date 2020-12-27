const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/CrudDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, (err) => {
    err ? console.log(err) : console.log("Connection Success");
})
module.exports = mongoose;