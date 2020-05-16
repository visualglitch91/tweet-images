const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("client"));

app.post("/get-images", require("./get-images"));

app.listen(port, () => {
  console.log("server listening at port", port);
});
