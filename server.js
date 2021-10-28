const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`server running at http://127.0.0.1:${PORT}`);
});
