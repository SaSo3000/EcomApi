const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Routes/user");
const userAuth = require("./Routes/auth");
const productRoute = require("./Routes/Product");
const cartRoute = require("./Routes/Cart");
const orderRoute = require("./Routes/Order");
const stripeRoute = require("./Routes/stripes");
const cors = require("cors");

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB Connection Successfull"))
.catch((err)=> console.log(err));

app.use(cors());

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", userAuth);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(5000, ()=>{
    console.log("backend is running!!");
})