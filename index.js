const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require('./models/Users');
const Course = require('./models/Course.model');
const Class = require('./models/Class.model');
const Subject = require('./models/Subject.model');
const Faculty = require('./models/Faculty.model');
const Student = require('./models/Student.model');
const ClassperSub = require('./models/Class-persub');
const Attendance = require('./models/Atendence,model');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
// check atttendence

app.get("/check-atttendence", async (req, res) => {
  try {
    const [student, classpersub] = await Promise.all([
      Student.find(),
      ClassperSub.find()]);

    res.status(201).json({
      success: true,
      message: "2 combine data",
      data: {
        student, classpersub
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch combined data',
      error: error.message
    });
  }
})

// aAttendance
app.post('/attendance', async (req, res) => {
  try {

    const attendance = new Attendance(req.body);
    const saved = await attendance.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// app.get("/classpersubject", async (req, res) => {
//   try {
//     const [classes, subjects, faculties] = await Promise.all([
//       Class.find(),
//       Subject.find(),
//       Faculty.find()]);

//     res.status(201).json({
//       success: true,
//       message: "3 combine data",
//       data: {
//         classes,
//         subjects,
//         faculties
//       }
//     })

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch combined data',
//       error: error.message
//     });
//   }
// })
app.get('/attendance', async (req, res) => {
  const [attendance,student] = await Promise.all([
    Attendance.find(),
    Student.find(),
  ]);
  res.status(201).json({attendance,student});
});
// class persubject

app.post('/new-classpersubject', async (req, res) => {
  try {

    const classpersub = new ClassperSub(req.body);
    const saved = await classpersub.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.get('/new-classpersubject', async (req, res) => {
  const classperSub = await ClassperSub.find();
  res.json(classperSub);
});
app.delete("/new-classpersubject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ClassperSub.deleteOne({ _id: new Object(id) });
    res.status(201).send({
      message: "Class per Subject data deleted",
      result
    })
  } catch (error) {
    console.log("error ClassperSub data deleteing procces", error)
  }
})



app.get("/classpersubject", async (req, res) => {
  try {
    const [classes, subjects, faculties] = await Promise.all([
      Class.find(),
      Subject.find(),
      Faculty.find()]);

    res.status(201).json({
      success: true,
      message: "3 combine data",
      data: {
        classes,
        subjects,
        faculties
      }
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch combined data',
      error: error.message
    });
  }
})
// student

app.post('/student', async (req, res) => {
  try {
    const existing = await Student.findOne({ sid: req.body.sid });
    if (existing) {
      return res.status(400).json({ error: 'Student ID must be unique' });
    }
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/student', async (req, res) => {
  const student = await Student.find();
  res.json(student);
});

app.delete("/student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Student.deleteOne({ _id: new Object(id) });
    res.status(201).send({
      message: "student data deleted",
      result
    })
  } catch (error) {
    console.log("error student data deleteing procces", error)
  }
})



// faculty
app.post('/faculty', async (req, res) => {
  try {
    const existing = await Faculty.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ error: 'contact ID must be uniqe email' });
    }
    const existing2 = await Faculty.findOne({ contact: req.body.contact });
    if (existing2) {
      return res.status(400).json({ error: 'facutly contact must be email' });
    }
    const faculty = new Faculty(req.body);
    const saved = await faculty.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/faculty', async (req, res) => {
  const faculty = await Faculty.find();
  res.json(faculty);
});

app.delete("/faculty/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Faculty.deleteOne({ _id: new Object(id) });
    res.status(201).send({
      message: "Class data deleted",
      result
    })
  } catch (error) {
    console.log("error Class data deleteing procces", error)
  }
})

// class

app.post('/class', async (req, res) => {
  try {
    const clas = new Class(req.body);
    const saved = await clas.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/class', async (req, res) => {
  const classs = await Class.find();
  res.json(classs);
});

app.delete("/class/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Class.deleteOne({ _id: new Object(id) });
    res.status(201).send({
      message: "Class data deleted",
      result
    })
  } catch (error) {
    console.log("error Course data deleteing procces", error)
  }
})


// Subject

app.post('/subject', async (req, res) => {
  try {
    const subject = new Subject(req.body);
    const saved = await subject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/subject', async (req, res) => {
  const subject = await Subject.find();
  res.json(subject);
});

app.delete("/subject/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Subject.deleteOne({ _id: new Object(id) });
    res.status(201).send({
      message: "subject data deleted",
      result
    })
  } catch (error) {
    console.log("error subject data deleteing procces", error)
  }
})




// course]
app.post('/course', async (req, res) => {
  try {
    const user = new Course(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.get('/course', async (req, res) => {
  const course = await Course.find();
  res.json(course);
});

app.delete("/course/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Course.deleteOne({ _id: new Object(id) });
    res.status(201).send({
      message: "Course data deleted",
      result
    })
  } catch (error) {
    console.log("error Course data deleteing procces", error)
  }
})



// user data
app.post('/user', async (req, res) => {
  try {
    const user = new Users(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/user', async (req, res) => {
  const uers = await Users.find();
  res.json(uers);
});



app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Users.deleteOne({ _id: new Object(id) });
    res.status(201).send({
      message: "user data deleted",
      result
    })
  } catch (error) {
    console.log("error user data deleteing procces", error)
  }
})




app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id, role: user.role });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Import and use user routes (optional)
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);
// Example route
app.get('/', (req, res) => {
  res.send('Attendence Server is running!');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Attendence Server is running on port ${PORT}`);
});
