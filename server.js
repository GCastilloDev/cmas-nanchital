const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");

const port = process.env.PORT || 8088;
const app = express();

app.use("/", servestatic(path.join(path.resolve(), "dist")));

app.listen(port);
console.log(`app is listening on port: ${port}`);
