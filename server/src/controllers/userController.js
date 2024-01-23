const User = require('../model/user');

const userController = {
    //get all users
    getAllUsers: async(req,res)=>{
        try{
            const user = await User.find();
            res.status(200).json(user);

        }catch(err){
            res.status(500).json(err);
        }

    },

    //delete user
    deleteUser: async(req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            res.status(200).json("delete successfully");

        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = userController;