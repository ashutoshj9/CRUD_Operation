const Emp = require("../models/emp");
const mongoose = require("mongoose");

//For Creating a Json
function create(req, res, next) {
  let empName = req.body.empName;
  let empEmail = req.body.empEmail;
  let empMobile = req.body.empMobile;
  let emp = new Emp({
    empName,
    empEmail,
    empMobile,
  });
  emp.save().then((data) => {
    const keypair = crypto.generateKeyPairSync("ed25519", {
      privateKeyEncoding: { format: "pem", type: "pkcs8" },
      publicKeyEncoding: { format: "pem", type: "spki" },
    });
    res.send(data);
  });
}

//For Displaying a Json
function view(req, res, next) {
  Emp.find({}).then((data) => {
    res.send(data);
  });
}

//For Updation in Json
function update(req, res, next) {
  Emp.findByIdAndUpdate(req.params.id, req.body, (err, emp) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Problem with Updating the   Employee recored " });
    }
    res.send({ success: "Updation successfull" });
  });
}

//For Deletion in Json
function remove(req, res, next) {
  Emp.findByIdAndDelete(req.params.id, (err, emp) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Problem with Deleting the Employee recorded" });
    }
    res.send({ success: "Employee deleted successfully" });
  });
}

module.exports.create = create;
module.exports.view = view;
module.exports.update = update;
module.exports.remove = remove;
