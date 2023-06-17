import bin from '../../model/bin';

const mqtt = require('mqtt');

async function mqttconnect(io) {
    try {

        var options = { clientId: 'ESP32', port: 1883, keepalive : 60};
        const client = mqtt.connect('mqtt://localhost',options);
        const topic = "dulieu";
        client.on('connect', async () => {
            console.log('MQTT Connected');
    
            client.subscribe(topic);
            client.subscribe('changedb');
        })

         io.on("connection", (socket) => {
            console.log(`Có người vừa kết nối, socketID: ${socket.id}`);
           
        // lang nghe du lieu tu topic
        client.on('message', async (topic, data)=> {
            console.log("MQTT Received Topic:", topic.toString(), ", Message:", data.toString())

            if(data) {
                
                let stringData = data.toString();
                let arrayData=stringData.split("#");
                let myPromise =  new Promise(async(resolve, reject)=> {
                    try {
                        await bin.findOne({ip: arrayData[0]})
                                    .then(async bin => {
                                        if(bin) {
                                           //kiểm tra thung rac day hay chua
                                            if(parseFloat(arrayData[1])<20) {
                                                bin.status = true;
                                                bin.save();
                                                
                                                
                                            } else {
                                                bin.status = false;
                                                bin.save();
                                                
                                            }

                                            resolve(bin.status);
                                        } else {
                                            resolve(false);
                                        }
                                    })
                                    .catch(err => {
                                        reject(err);
                                    })
                    } catch (error) {
                        reject(error);
                    }
                })

                if(myPromise) {
                    //server thong bao cho client cap nhat lại giao dien
                    socket.emit("updatebin")
            
                }

            }
        })
    })

    } catch (error) {
        console.log('fail');
    }


}

module.exports = {mqttconnect};
