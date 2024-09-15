const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

let users = [];
const JWT_SECRET = "loks";

app.use(express.json());
app.use(express.static("public"));

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let newUser = { username: username, password: password };
  users.push(newUser);
  res.status(200).send({
    message: "User signed up successfully",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let foundUser = users.find((i) => i.username == username);
  if (foundUser) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    res.status(200).json({
      token: token,
    });
    return;
  }
  res.send("Invalid User");
  return;
});

app.get("/me", (req, res) => {
  console.log(req.headers);
  const token = req.headers.token;
  const username = jwt.verify(token, JWT_SECRET);
  res.send({ username: username.username });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000);
