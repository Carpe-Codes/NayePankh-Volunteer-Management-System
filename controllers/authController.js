const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.registerUser = async (req,res)=>{

    try{
        const errors = validationResult(req);     
        if (!errors.isEmpty()) {                 
            return res.send(
                "Validation failed. Please check the field requirements."
            );
        }
        
        const {name, email, password, phone, college, skills} = req.body;
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.send("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            college,
            skills
        });

        res.redirect("/newUser");

    }
    catch(err){
        console.log(err);
        res.send("Something went wrong");
    }

};

const jwt = require("jsonwebtoken");

exports.loginUser = async(req,res)=>{

    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.send("Invalid Email or password");
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.send("Invalid Email or password");
        }

        const token = jwt.sign({
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        res.cookie("token", token, {httpOnly:true} );

        if(user.role === "admin"){
            return res.redirect("/admin/dashboard");
        }

        res.redirect("/dashboard");
    }
    
    catch(err){
        console.log(err);
        res.send("Login Failed" );
    }

};

