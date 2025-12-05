const { readData, writeData } = require('../utils/fileHelper.js');
const { v4: uuidv4 } = require('uuid');

class TaskModel {
  static async findAll() {
    const tasks = await readData();
    return tasks;
  }

  static async findById(id) {
    const tasks = await readData();
    return tasks.find(t => t.id === id);
  }

  static async create(taskData) {
    const tasks = await readData();
    const newTask = {
      id: uuidv4(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    await writeData(tasks);
    return newTask;
  }

  static async update(id, taskData){
    const tasks = await readData();
    const index = tasks.findIndex(t => t.id === id);

    if(index == -1) {
      tasks[index] = {...tasks[index], ...tasksData};
      await writeData();
      return tasks[index];
    }

    return null;
  }

  static async remove(id) {
    const tasks = await readData();
    const filteredTasks = tasks.filter(t => t.id != id);

    if(filteredTasks.length != tasks.length) {
      await writeData(filteredTasks);
      return true;
    }

    return false;
  }
}

module.exports = TaskModel;