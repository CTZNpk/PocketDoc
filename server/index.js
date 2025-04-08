const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/routes");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

const port = 3000;
dotenv.config();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.100.54:5173"],
    credentials: true, // <-- allow cookies!
  }),
);

app.use(cookieParser());

app.use(express.json());
app.use("/pocketdoc", router);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("MONGODB CONNECTION SUCCESSFULL");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(port, "0.0.0.0", () => {
  console.log(`CONNECTED AT PORT ${port}`);
});
