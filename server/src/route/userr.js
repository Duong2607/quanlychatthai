const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();

//get all users
router.get('/',middlewareController.verifyToken, userController.getAllUsers);

// delete users
router.delete('/:id',middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

//put users
router.put('/:id',middlewareController.verifyTokenAndAdminAuth, userController.updateUser);

module.exports = router;middlewareController;