const express = require("express");
const routes = require("./routes");
const session = require("express-session");
const cors = require("cors");

require("dotenv").config({ path: ".env.vars" });
const db = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // backend
app.use("/", routes());

db.sync()
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

app.use(
  session({
    secret: "Wizardjj",
    resave: false,
    saveUninitialized: false,
  })
);

// Server and port
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 5000;

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});