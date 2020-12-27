const express = require("express");
const bodyParser = require("body-parser");
const { mongoose } = require("./db");
const cors = require("cors");
const employeeController = require("./controllers/employeeController");
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:4200" }));
app.use("/employees", employeeController);
app.listen(3000, () => {
    console.log("App Started at port:3000");
});