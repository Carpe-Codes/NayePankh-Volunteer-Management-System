const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());

app.use(express.static("public"));

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/newUser", (req,res) => {
    res.render("newUser");
})

const authRoutes = require ("./routes/authRoutes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`);
});



