const bcrypt = require('bcrypt');
const User = require('../model/user');


const   authController = {
    //REGISTER
    registerUser: async(req, res) => {
        try{
            const salt = await bscript.genSalt(10);
            const hashed = await bscript.hash(res.body.password, salt);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            //save to database
            const user = await newUser.save();  
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
    }

    }
}

module.exports = authController;