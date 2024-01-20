const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://sarkarjii534:" + encodeURIComponent("@sarkarop09") + "@cluster0.kazdxwe.mongodb.net/appuserplus");

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post('/signup', async (req, res) => {
  const username = req.body.username;
  const names = req.body.email;
  const password = req.body.password;

  try {
    const userExist = await User.findOne({ email: username }).exec();
    if (userExist) {
      return res.status(400).send("User already exists");
    }

    const user = new User({
      name: names,
      email: username,
      password: password,
    });

    await user.save();
    console.log("User saved successfully");

    res.json("User created successfully");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the MongoDB connection here, if needed.
    mongoose.connection.close();
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
