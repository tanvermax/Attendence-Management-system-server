const { default: mongoose } = require("mongoose");



const classpersubSchema = new mongoose.Schema({
    class: { type: String, required: true, trim:true },
    subject: { type: String, required: true },
    faculty: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})



 const ClassperSub = mongoose.model('ClassperSub', classpersubSchema);
module.exports = ClassperSub;