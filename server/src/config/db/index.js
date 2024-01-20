
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://vanquangha5602:quang111@cluster0.yltox9v.mongodb.net/?retryWrites=true&w=majority',{
        

        });
        console.log('successfully');
        
    } catch (error) {
        console.log('fail');
    }
}

module.exports = { connect };