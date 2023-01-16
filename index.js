const express = require("express");
const { connection } = require("./config/db");
const { authenticate } = require("./middleware/authenticate.middeware");
const { noteRouter } = require("./routes/note.route");
// const { UserModel } = require("./model/user.model");
const { userRouter } = require("./routes/user.route");
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to home page");
});

// app.use("/user",userRouter);
app.use("/user",userRouter);
app.use(authenticate);
app.use("/note",noteRouter);
app.listen(4500, async()=>{
    try {
        await connection
        console.log("connected to DB");
    } catch (error) {
        console.log("note able to connect DB");
    }
    console.log("Running port 4500");
})