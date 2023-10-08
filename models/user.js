const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/dbname", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  mobile: String,
  email: String,
});

module.exports = mongoose.model("contact", contactSchema);
