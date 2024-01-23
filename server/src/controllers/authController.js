const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const   authController = {
    //REGISTER
    registerUser: async(req, res) => {
        try{
            // const salt = await bcrypt.genSalt(10);
            // const hashed = await bcrypt.hash(res.body.password, salt);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

            //save to database
            const user = await newUser.save();  
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
    }

    },

    // generate access token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        "secretkey",{expiresIn: "1d" }
        );
    },

    // generate refresh token
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        "secretkey",{expiresIn: "365d" }
        );
    },

    //login 
    loginUser: async(req, res)=>{
        try{
            const user = await User.findOne({username: req.body.username});
            if(!user){
                res.status(404).json("wrong username");

            }
            // const validPassword = await bcrypt.compare(
            //     req.body.password,
            //     user.password
            // );
            const validPassword = await User.findOne({password: req.body.password});
            if(!validPassword) {
                res.status(404).json("wrong password");

            }
            
            if(user && validPassword){
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                const {password, ...others} = user._doc;

                res.status(200).json({...others,accessToken,refreshToken});
            }


        }catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = authController;