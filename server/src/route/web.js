import express from "express";
import binController from "../controllers/binController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/api/get-all-bin',binController.handleGetBin);
    router.post('/api/add-new-bin',binController.handleAddBin);
    router.put('/api/update-bin',binController.handleUpdateBin);
    router.delete('/api/delete-bin',binController.handleDeleteBin);
    router.get('/', (req, res) => {
        
        return res.send('hello');
    })
    return app.use("/",router);
}

module.exports = initWebRoutes;