//taskmodel for task structure
const Task = require('./Task');

class TaskModel {
  static async findAll() {
    const tasks = await Task.find(); 
    return tasks;
  }

  static async findById(id) {
    return Task.findById(id);
  }

  static async create(taskData) {
    const newTask = await Task.create(taskData); 
    return newTask;
  }

  static async update(id, taskData) {
    const updatedTask = await Task.findByIdAndUpdate(
        id, 
        taskData, 
        { new: true, runValidators: true }
    );
    return updatedTask; 
  }

  static async remove(id) {
    const result = await Task.findByIdAndDelete(id); 
    return !!result; 
  }
}

module.exports = TaskModel;