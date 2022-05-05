const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");

// @desc    Get Tasks
// @route   GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json(tasks);
});

// @desc    Set task
// @route   POST /api/tasks
const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a Task field");
  }

  const task = await Task.create({
    text: req.body.text,
  });

  res.status(200).json(task);
});

// @desc    Delete task
// @route   DELETE /api/task/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.body.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  await task.remove();

  res.status(200).json({ id: req.body.id });
});

// @desc    Update task
// @route   PUT /api/task/:id
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.body.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
