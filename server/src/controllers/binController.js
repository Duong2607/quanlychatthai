import binService from "../services/binService"
let handleGetBin = async(req, res) => {
  
    let bins = await binService.getAllBin();
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        bins
    })
}

let handleAddBin = async(req, res) => {

    let data = await binService.addBin(req.body);

    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
        bin: data.bin
    })
}

let handleUpdateBin = async(req,res) => {
    let data = await binService.updateBin(req.body);

    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
        ubBin: data.ubBin
    })
}

let handleDeleteBin = async(req, res) => {

    let data = await binService.deleteBin(req.body.id);

    return res.status(200).json({
        errCode: data.errCode,
        errMessage: data.errMessage,
    })
}

module.exports = {
    handleGetBin: handleGetBin,
    handleAddBin: handleAddBin,
    handleUpdateBin: handleUpdateBin,
    handleDeleteBin: handleDeleteBin
  
}