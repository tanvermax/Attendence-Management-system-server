const { default: mongoose } = require("mongoose");



const studentSchema = new mongoose.Schema({
    sid: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    class: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;