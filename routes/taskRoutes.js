const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET home page with all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort('dueDate');
    res.render('index', { 
      title: 'HMCTS Task Manager',
      tasks,
      currentPage: 'home'
    });
  } catch (err) {
    console.error(err);
    res.render('index', { 
      title: 'HMCTS Task Manager',
      tasks: [],
      error: 'Could not fetch tasks. Please try again later.',
      currentPage: 'home'
    });
  }
});

// GET create task form
router.get('/create', (req, res) => {
  res.render('create', { 
    title: 'Create New Task',
    currentPage: 'create' 
  });
});

// POST new task
router.post('/create', async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate
    });
    
    await task.save();
    req.flash('success', 'Task created successfully');
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    res.render('create', {
      title: 'Create New Task',
      error: 'Error creating task. Please try again.',
      task: req.body,
      currentPage: 'create'
    });
  }
});

// GET view single task
router.get('/view/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      req.flash('error', 'Task not found');
      return res.redirect('/tasks');
    }
    res.render('view', { 
      title: task.title,
      task,
      currentPage: 'view'
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not retrieve task');
    res.redirect('/tasks');
  }
});

// GET edit task form
router.get('/edit/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      req.flash('error', 'Task not found');
      return res.redirect('/tasks');
    }
    
    // Format date for the input field (YYYY-MM-DD)
    const formattedTask = {
      ...task.toObject(),
      dueDate: task.dueDate.toISOString().split('T')[0]
    };
    
    res.render('edit', { 
      title: 'Edit Task',
      task: formattedTask,
      currentPage: 'edit'
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not retrieve task for editing');
    res.redirect('/tasks');
  }
});

// POST update task
router.post('/edit/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      req.flash('error', 'Task not found');
      return res.redirect('/tasks');
    }
    
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    task.dueDate = req.body.dueDate;
    
    await task.save();
    req.flash('success', 'Task updated successfully');
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    
    // Format date for the input field on error
    const formattedTask = {
      ...req.body,
      _id: req.params.id
    };
    
    res.render('edit', {
      title: 'Edit Task',
      task: formattedTask,
      error: 'Error updating task. Please try again.',
      currentPage: 'edit'
    });
  }
});

// POST delete task
router.post('/delete/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      req.flash('error', 'Task not found');
      return res.redirect('/tasks');
    }
    
    await Task.deleteOne({ _id: req.params.id });
    req.flash('success', 'Task deleted successfully');
    res.redirect('/tasks');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not delete task');
    res.redirect('/tasks');
  }
});

module.exports = router;
