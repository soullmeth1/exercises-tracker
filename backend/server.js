const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
// app.use(express.urlencoded({extended: false}))
app.use(express.json());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection success"))
  .catch((err) => console.log("error ", err));
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log('sukses menyambung database')
// })

const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
