const express = require("express");
const app = express(); //rest object
const colors = require("colors");

//rest api
app.get("/", (req, res) => {
  res.send({ msg: "welcome" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}.bgCyan.white`);
});
