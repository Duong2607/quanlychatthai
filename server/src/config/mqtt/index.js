import bin from '../../model/bin';

const mqtt = require('mqtt');

async function mqttconnect(io) {
    try {

        var options = {
            host: 'broker.hivemq.com',
            port: 1883
        }
        // var options = { clientId: 'ESP32', port: 1883, keepalive : 60};
        // const client = mqtt.connect('mqtt://localhost',options);
        const client = mqtt.connect(options);
        const topic = "dulieu";


        io.on("connection", (socket) => {

            console.log(`Có người vừa kết nối, socketID: ${socket.id}`);
            client.on('connect', async () => {
                console.log('MQTT Connected');
                const message = 'check';

                setInterval(() => {
                    let checknPromise = new Promise(async (resolve, reject) => {
                        try {
                            await bin.find({})
                                .then((bins) => {
                                    if (bins[0]) {
                                        for (let i = 0; i < bins.length; i++) {

                                            bins[i].connect = false;
                                            bins[i].save();
                                        }
                                        resolve(true);
                                    }
                                    resolve(false);
                                })
                        } catch (error) {
                            reject(false)
                            console.log(error);
                        }
                    })
                    checknPromise.then((check) => {
                        if (check) {
                            socket.emit("updatebin");
                            client.publish("CheckConnect", message);
                            console.log(`Sent MQTT check message: ${message}`);
                        }
                    }).catch((err) => {
                        console.log('err', err);
                    })
                }, 60000 * 10); // 30 seconds
                client.subscribe("connecting")
                client.subscribe(topic);
                client.subscribe('changedb');
            })
            // lang nghe du lieu tu topic
            client.on('message', async (topic, data) => {
                console.log("MQTT Received Topic:", topic.toString(), ", Message:", data.toString())
                if (topic == "connecting") {
                    let checkPromise = new Promise(async (resolve, reject) => {
                        try {
                            await bin.find({})
                                .then((bins) => {
                                    if (bins[0]) {
                                        for (let i = 0; i < bins.length; i++) {
                                            if (bins[i].ip == data.toString()) {
                                                bins[i].connect = true;
                                                bins[i].save();
                                            }
                                        }
                                        resolve(true);
                                    }
                                    resolve(false);
                                })
                        } catch (error) {
                            reject(false)
                            console.log(error);
                        }
                    })
                    checkPromise.then((check) => {
                        if (check) {
                            socket.emit("updatebin")
                        }
                    }).catch((err) => {
                        console.log('err', err);
                    })

                }
                if (topic == "dulieu") {
                    if (data) {

                        let stringData = data.toString();
                        let arrayData = stringData.split("#");
                        let myPromise = new Promise(async (resolve, reject) => {
                            try {
                                await bin.findOne({ ip: arrayData[0] })
                                    .then(async bin => {
                                        if (bin) {
                                            //kiểm tra thung rac day hay chua
                                            if (parseFloat(arrayData[1]) < 20) {
                                                bin.status = true;
                                                bin.save();


                                            } else {
                                                bin.status = false;
                                                bin.save();

                                            }

                                            resolve(true);
                                        } else {
                                            resolve(false);
                                            console.log('bin', bin);
                                        }
                                    })
                                    .catch(err => {
                                        reject(err);
                                    })
                            } catch (error) {
                                reject(error);
                            }
                        })
                        myPromise.then((status) => {
                            if (status) {
                                socket.emit("updatebin")
                            }
                        })
                            .catch((err) => {
                                console.log('err', err);
                            })

                    }
                }

            })
        })

    } catch (error) {
        console.log('fail');
    }


}

module.exports = { mqttconnect };
