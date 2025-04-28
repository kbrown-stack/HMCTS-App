// This file shows 
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4002;

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session and flash setup
app.use(session({
  secret: 'hmcts_task_manager_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/tasks', taskRoutes);

// Redirect root to tasks
app.get('/', (req, res) => {
  res.redirect('/tasks');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));