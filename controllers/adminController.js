const User = require("../models/User");

exports.adminDashboard =
async(req,res)=>{

    try{
        const volunteers =
        await User.find({
            role:"user"
        });

        res.render("adminDashboard",{volunteers} );
    }

    catch(err){
        console.log(err);
        res.send("Error Loading Dashboard");
    }
};

exports.deleteVolunteer = async(req,res)=>{

    try{
        await User.findByIdAndDelete(
            req.params.id
        );
        
        res.redirect("/admin/dashboard");
    }

    catch(err){
        console.log(err);
        res.send("Delete Failed");
    }

};
