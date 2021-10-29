const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 5000;
app.use(require("./router/auth"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post("/hash", async (req, res) => {
  const secPass = await bcrypt.hash(req.body.password, 10);
  res.json({ secPass });
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const userPass = req.body.userPass;
  const correctPass = req.body.correctPass;
  const token = jwt.sign({ email }, "jwtSecret", {
    expiresIn: "10d",
  });
  if (await bcrypt.compare(userPass, correctPass)) {
    res.json({ auth: true, token: token });
  } else {
    res.json({ auth: false });
  }
});

app.listen(PORT, () => {
  console.log(`server running at http://127.0.0.1:${PORT}`);
});
