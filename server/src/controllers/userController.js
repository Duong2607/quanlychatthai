const User = require('../model/user');

const userController = {
    //get all users
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }

    },

    //get user by id
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send({ message: "User not found" });
            }
        } catch (err) {
            res.status(500).json(err.message);
        }

    },

    //delete user
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                // await user.remove();
                await User.deleteOne({ _id: req.params.id });
                res.status(200).json("delete successfully");
            } else {
                res.status(404).send({ message: "User not found" });
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    //update user
    updateUser: async (req, res) => {
        try {
            const { username, email, password, admin } = req.body;
            const user = await User.findById(req.params.id);
            if (user) {
                user.username = username || user.username;
                user.email = email || user.email;
                user.password = password || user.password;
                user.admin = admin || user.admin;

                const updatedUser = await user.save();
                res.json(updatedUser);
            } else {
                res.status(404);
                throw new Error("User not found");
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}

module.exports = userController;