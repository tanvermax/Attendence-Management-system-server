const { default: mongoose } = require("mongoose");



const courseSchema = new mongoose.Schema({
    subject: { type: String, required: true, trim:true },
    description: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})



 const Course = mongoose.model('Course', courseSchema);
module.exports = Course;