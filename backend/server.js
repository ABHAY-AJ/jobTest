const express = require('express');
const connectDB = require("./config/db")
require('dotenv').config();
const cors = require("cors");
const app = express();



app.use(cors());
connectDB();
app.use(express.json());

const jobRoutes = require('./routes/job');
const tpoJobRoutes = require('./routes/tpoJob');
const internshipRoutes = require('./routes/internship');
const tpoInternshipRoutes = require('./routes/tpoInternship');
const studentRoutes = require("./routes/student");
const userRoutes = require('./routes/user');
const hrRoute = require("./routes/hr");

app.use('/api/v1', jobRoutes);
app.use('/api/v1', tpoJobRoutes);
app.use('/api/v1', internshipRoutes);
app.use('/api/v1', tpoInternshipRoutes);
app.use('/api/v1', studentRoutes);
app.use('/api/v1', hrRoute);
app.use('/api/auth', userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
