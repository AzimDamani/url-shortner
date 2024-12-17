const express = require("express");
const urlRoute = require("./routes/url");
const app = express();
const PORT = 8001;
const { connectToMongoDb } = require("./connections");
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use("/url", urlRoute);


connectToMongoDb(
  "mongodb+srv://azimd:azimadamani.01@cluster0.dhq8c.mongodb.net/url-shortner"
).then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log("Error", err));


app.listen(PORT, '0.0.0.0', () => {
  console.log("Server running on PORT: ", PORT);
});
