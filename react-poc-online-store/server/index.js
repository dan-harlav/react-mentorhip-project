const path = require("path");
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static('/'));


app.get("/products", async (req, res) => {
    res.sendFile(path.join(__dirname, "products.js"));
  });

const port = process.env.PORT || 8004;
app.listen(port, () => console.log(`Listening on Port: ${port}`));