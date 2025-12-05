const TaskModel = require('../models/taskModel');

const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({message: 'Server Error', error: err.message });
  }
}

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);

    if(!task){
      return res.status(404).json({message: "Task not found"});
    }
    res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({message: 'Server error', error: err.message});
  }
}

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if(!title) {
      return res.status(400).json({message: 'Please provide a task title'});
    }

    const newTask = await TaskModel.create({ title, description });
    res.status(201).json(newTask);
  } catch (err) {
    return res.status(500).json({message: 'Failed to create Task', error: err.message});
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await TaskModel.update(id, req.body);

    if(!updatedTask) {
      return res.status(404).json({message: "Task not found"});
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    return res.status(500).json({message: 'Failed to update Task', error: err.message});
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await TaskModel.remove(id);

    if(!isDeleted) {
      return res.status(404).json({message: 'Task not found'});
    }

    res.status(200).json({message: `Task ${id} removed`});
  } catch (err) {
    return res.status(500).json({message: 'Failed to delete Task', error: err.message});
  }
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};