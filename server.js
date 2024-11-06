const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require('path')

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Set a larger limit for headers
app.use((req, res, next) => {
    req.headers['max-http-header-size'] = 8192; // set limit to 8 KB (adjust as needed)
    next();
});

// Routes
app.use('/', require('./routes/testRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/inventory', require('./routes/inventoryRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));
app.use('/admin',require('./routes/adminRoutes'))

//static folder

app.use(express.static(path.join(__dirname,'./client/build')))

//static routes
app.get('*',function(req,res){
    res.sendFile(path.json(__dirname,'./client/build/index.html'))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Node server is running in ${process.env.DEV_MODE} on port ${PORT}`.bgMagenta.white);
});
