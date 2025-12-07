const { default: mongoose } = require("mongoose");



const classSchema = new mongoose.Schema({
    subject: { type: String, required: true, trim:true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


classSchema.index({ subject: 1, year: 1, semester: 1 }, { unique: true });
 const Class = mongoose.model('Class', classSchema);
module.exports = Class;