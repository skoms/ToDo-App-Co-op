const express = require('express');
const router = express.Router();

// Import middlewares
const asyncHandler = require('../middleware/async-handler');
const authenticateLogin = require('../middleware/user-auth');

// Import Task Model
const { Task, User } = require('../models');

// GET finds and displays all the tasks and basic info on their owners
router.get('/', asyncHandler(async (req, res) => {
  const tasks = await Task.findAll(({
    attributes: ['id', 'title', 'description', 'deadline'], 
    include: [ { model: User, attributes: ['firstName', 'lastName', 'emailAddress'] } ] }));

  res.status(200).json(tasks);
}));

// GET finds specified Task and basic info on its owner
router.get('/:id', asyncHandler(async (req, res) => {
  const Task = await Task.findByPk(req.params.id, { 
    attributes: ['id', 'title', 'description', 'deadline'] });

  res.status(200).json(Task);
}));

// POST creates a new Task and assigns the logged authenticated user as its owner
router.post('/', authenticateLogin, asyncHandler(async (req, res) => {
  req.body.userId = req.currentUser.id;
  const Task = await Task.create(req.body);

  res.location(`/api/tasks/${Task.id}`).status(201).end();
}));

// PUT updates the chosen Task if the user is authenticated to do so
router.put('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const Task = await Task.findOne({ where: { id: req.params.id } });
  const owner = await User.findOne({ where: { id: Task.userId }});

  if (owner.emailAddress === req.currentUser.emailAddress) {
    await Task.update(req.body, { where: { id: req.params.id } });
    res.status(204).end();
  } else {
    res.status(403).end();
  }
}));

// DELETE deletes the chosen Task if the user is authenticated to do so
router.delete('/:id', authenticateLogin, asyncHandler(async (req, res) => {
  const Task = await Task.findOne({ where: { id: req.params.id } });
  const owner = await User.findOne({ where: { id: Task.userId }});
  
  if (owner.emailAddress === req.currentUser.emailAddress) {
    await Task.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } else {
    res.status(403).end();
  }
}));

module.exports = router;