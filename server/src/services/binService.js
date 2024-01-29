import e from "express";

import bin from "../model/bin";
let getAllBin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let bins = ''
            bins = await bin.find({})
            resolve(bins)
        } catch (e) {
            reject(e);
        }
    })
}



let addBin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let existBin = await checkBinIp(data.ip);
            if (!existBin) {
                if (data.ip && data.lat && data.lng) {
                    const newBin = new bin({
                        ip: data.ip,
                        lat: data.lat,
                        lng: data.lng,
                        address: data.address
                    });
                    await newBin.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Tạo thành công',
                        bin: newBin
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Miss Data'
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'IP da ton tai'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let checkBinIp = (ip) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bin.findOne({ ip })
                .then(doc => {
                    if (doc) {

                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
                .catch(err => {
                    reject(err)
                })


        } catch (e) {
            reject(e);
            console.log('fail');

        }
    })
}

let updateBin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {


            if (data.idBin && data.ip && data.lat && data.lng) {
                await bin.findOne({
                    _id: data.idBin
                })
                    .then(async (udBin) => {
                        udBin.ip = data.ip;

                        udBin.lat = data.lat;
                        udBin.lng = data.lng;
                        udBin.address = data.address
                        await udBin.save();
                        resolve({
                            errCode: 0,
                            errMessage: 'Cập nhật thành công',
                            udBin: udBin
                        })

                    })
                    .catch(() => {
                        resolve({
                            errCode: 1,
                            errMessage: 'Not Found Bin',
                        })
                    })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Miss Data',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteBin = (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            await bin.deleteOne({
                _id: id
            })
                .then(() => {
                    resolve({
                        errCode: 0,
                        errMessage: 'Xóa thành công'
                    })
                })
                .catch(() => {
                    resolve({
                        errCode: 1,
                        errMessage: 'Fail'
                    })
                })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllBin: getAllBin,
    addBin: addBin,
    updateBin: updateBin,
    deleteBin: deleteBin,
}