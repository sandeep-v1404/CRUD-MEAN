const express = require('express');
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { Employee } = require("../models/employee");
router.get("/", (req, res) => {
    Employee.find((err, docs) => {
        err ? console.log("Error in Retreiving :" + err) : res.send(docs);
    });
});
router.get("/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.find({ _id: req.params.id }, (err, docs) => {
            if (err) {
                console.log(err);
            }
            res.send(docs);
        });
    } else
        res.status(400).send("No record" + req.params.id)
});
router.post("/", (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    employee.save((err, doc) => {
        err ? "Error while Saving" : res.send(doc);
    });
});
router.put("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("No record: " + req.params.id);
    }
    var employee = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Employee.findOneAndUpdate({ _id: req.params.id }, { $set: employee }, { new: true, useFindAndModify: false }, (err, doc) => {
        err ? console.log(err) : res.send(doc);
    });
});
router.delete("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("No record" + req.params.id);
    }
    Employee.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
        err ? console.log(err) : res.send(doc);
    });
})
module.exports = router;