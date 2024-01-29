const User = require('../model/user');
const jwt = require('jsonwebtoken');


const middlewareController = {
    // verifytoken
    verifyToken: (req,res,next) => {
        const token = req.headers.token;
        if (token) {
            
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken,"secretkey",(err,user)=>{
                if(err){
                    res.status(403).json("token is not valid");

                }
                req.user = user;
                next();
            });

        }
        else{
            res.status(401).json("you are not authenticated");
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) =>{
        middlewareController.verifyToken(req, res, ()=>{
            if(req.user.id== req.params.id || req.user.admin){
                next();
            }
            else{
                res.status(403).json("you are not allowed to delete other");
            }
        });
    }

}

module.exports = middlewareController;