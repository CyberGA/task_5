//#region dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//#endregion

//#region application
// determine the port on which to run
const port = process.env.PORT || 8000;
// const port = 8000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connection to database
const connectionString =
  process.env.connectionString || "mongodb://127.0.0.1/user_db";
// const connectionString = "mongodb://localhost:27017/datacollect";

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("database connected");
  }
);

// create schema
const appSchema = new mongoose.Schema({
  date: String,
  timeStamp: String,
  message: String,
  updated: Boolean,
  data: {
    name: String,
    email: String,
    country: String,
  },
});

// create collection from the Schema
const User = mongoose.model("USER", appSchema);

//create user
app.post("/create/user/:name/:email/:country", (req, res) => {
  let date = new Date();
  try {
    // check if name exist
    User.findOne({ "data.name": req.params.name }, (err, data) => {
      if (data == null) {
        User.findOne({ "data.email": req.params.email }, (err, data) => {
          if (data == null) {
            User.create(
              {
                date: `${date.getFullYear()}/${
                  date.getMonth() + 1
                }/${date.getDate()}`,
                timeStamp: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                message: "successful",
                data: {
                  name: req.params.name,
                  email: req.params.email,
                  country: req.params.country,
                },
              },
              (err, data) =>
                err ? console.log(err) : res.status(200).send(data.message)
            );
          } else {
            alert("Email already exist");
            res.json({
              message: "Email already exist",
            });
          }
        });
      } else {
        alert("User exists, try another name");
        res.json({ message: "User exists, try another name" });
      }
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// load landing page
app.get("/", (req, res) => {
  res.send(`<div style="text-align:center">
  <h1 style="font-size: 36px"> Welcome </h1>
 <a style="color: green; font-size: 24px"  href="https://user-server-app.herokuapp.com/users">Click here to see all users data in json format</a> 
 </div>
 `);
});

// gets all user
app.get("/users", (req, res) => {
  User.find({}, (err, data) => (err ? console.log(err) : res.send(data)));
});

// update user
app.put("/update/user/:newName/:oldName", (req, res) => {
  User.findOneAndUpdate(
    { "data.name": req.params.oldName },
    { $set: { "data.name": req.params.newName } }
  )
    .then(() => {
      res.status(200).json({
        message: "successfully updated",
      });
    })
    .catch((err) => {
      res.status(400).json({ error: error });
    });
});

// delete user
app.delete("/delete/user/:name", (req, res) => {
  User.deleteOne({ "data.name": req.params.name }, function (err) {
    err ? console.log(err) : res.status(200).send("deleted");
  });
});
// delete all users
app.delete("/delete/users", (req, res) => {
  User.deleteMany({}, function (err) {
    err ? console.log(err) : res.status(200).send("deleted");
  });
});

app.listen(port, () => console.log("Server running at port:" + port));
//#endregion
