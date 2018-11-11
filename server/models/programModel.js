'user strict';

const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
    category: {type: String},
    title: {type: String},
    summary: { type: String },
    price: {type: Number, default: 0},
    currencyCode: {type: String},
    dateCreated: {type: Date, default: Date.now, required: false}
});

// programSchema.methods.toBusinessModel = function() {
//     return {
//         programId: this._id,
//         category: this.category,
//         title: this.title,
//         summary: this.summary,
//         price: this.price,
//         currency: this.currencyCode,
//         dateCreated: this.dateCreated,
//     };
// }
programSchema.set('toJSON', {
    transform: function (doc, record, options) {
        record.programId = record._id;
        delete record.__v;
    }
})

//listen for index events and handle errors
// revokedAccessTokenSchema.on('index', (err)=>{
//     if(err){
//         console.error(`Index Error: ${err.message}`);
//     }
// })

module.exports = {
    Program: mongoose.model('TrainingProgram', programSchema)
}

