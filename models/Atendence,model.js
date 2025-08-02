const { default: mongoose } = require("mongoose");



const attendanceSchema = new mongoose.Schema({
    date: {
        type: String, // or Date if you prefer
        required: true,
    },
    classname: {
        type: String,
      // your class model
        required: true,
    },
    attendance: {
        type: Map,
        of: {
            type: String,
            enum: ['Present', 'Absent', 'Late'],
        },
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})



const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;