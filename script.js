const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const userdata = require("./models/user");
const bodyParser = require('body-parser');
const PORT = 1001;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/userdata", function (req, res) {
  const user = new userdata({
    name: req.body.username,
    dob: req.body.dob,
    mobile: req.body.mob,
    email: req.body.email,
  });

  user.save()
    .then(saved => {
      console.log('Contact successfully saved :', saved);
      let data = `Name : ${saved.name}\nDOB : ${saved.dob}\nMobile : ${saved.mobile}\nE-mail : ${saved.email}\n\n`;
      fs.appendFile("./data.txt", data, function (err) {
        if (err) throw err;
        res.render("submitted", { name: saved.name });
      });
    })
    .catch(error => {
      console.error('Error while saving contact:', error);
      res.status(500).json({ error: 'Failed to save contact' });
    });
});

app.listen(PORT, function () {
  console.log("SJ's Server started...");
  console.log(`Running on http://localhost:${PORT}`)
});