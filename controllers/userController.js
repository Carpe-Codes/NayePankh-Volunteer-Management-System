const User = require("../models/User");

exports.getDashboard = async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.send("User not found");
        }

        res.render("dashboard", { user });
    } 
    catch (err) {
        console.log(err);
        res.send("Error loading dashboard");
    }
};

exports.getEditProfile = async (req,res) => {

    try{
        const user = await User.findById(req.user.id);

        res.render( "editProfile", { user });
    }
    catch(err){
        console.log(err);
        res.send("Error loading profile");
    }
};

exports.updateProfile = async (req,res)=>{

    try{
        const {name, phone, college, skills} = req.body;

        await User.findByIdAndUpdate(
            req.user.id,
            {name, phone, college, skills},
            {new:true}
        );
        res.redirect("/dashboard");
    }

    catch(err){
        console.log(err);
        res.send( "Profile Update Failed");
    }
};