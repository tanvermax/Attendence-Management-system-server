const { default: mongoose } = require("mongoose");



const subjectSchema = new mongoose.Schema({
    subject: { type: String, required: true, trim:true },
    description: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})



 const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;