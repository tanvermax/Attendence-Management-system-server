const { default: mongoose } = require("mongoose");



const facultySchema = new mongoose.Schema({
    name: { type: String, required: true, trim:true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
})



 const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;