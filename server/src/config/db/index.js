
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/quan_ly_chat_thai',{
        

        });
        console.log('successfully');
        
    } catch (error) {
        console.log('fail');
    }
}

module.exports = { connect };