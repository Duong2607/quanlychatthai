const User = require('../model/user');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let refreshTokens = [];

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
        "secretkey",{expiresIn: "10d" }
        );
    },

    // generate refresh token
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        "secretkeynew",{expiresIn: "365d" }
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
                refreshTokens.push(refreshToken);

                res.cookie("refreshToken", refreshToken,{
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });

                const {password, ...others} = user._doc;

                res.status(200).json({...others,accessToken});
            }


        }catch(err){
            res.status(500).json(err);
        }
    },
    requestRefreshToken: async(req, res) => {
        // take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("you are not authenticated");
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("Refresh token is not valid");
        }

        jwt.verify(refreshToken,"secretkeynew",(err,user)=>{
            if(err){
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token)=>token !== refreshToken);
            // create new access token and refresh token
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshtoken", newRefreshToken,{
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({accessToken: newAccessToken});
        } );
    },
    // log out
    userLogout: async(req, res) =>{
        res.clearCookie("refreshtoken");
        refreshTokens = refreshTokens.filter((token)=>token !== req.cookies.refreshToken);
        res.status(200).json("logged out");
    }
};

module.exports = authController;