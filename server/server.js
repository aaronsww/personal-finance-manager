const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL || "mongodb://0.0.0.0:27017/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Express server running.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
