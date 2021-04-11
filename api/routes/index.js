const express = require('express');
const router = express.Router();

// Import other routers
const usersRoute = require('./users');
const tasksRoute = require('./tasks');

// Separate the routes into seperate files for better modularity and readability
router.use('/users', usersRoute);
router.use('/tasks', tasksRoute);

// welcomes and redirects users
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to my API, please refer to "/api/users" for users and "/api/tasks" for tasks'});
});

module.exports = router;