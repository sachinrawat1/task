import Task from "../models/taskModel.js";

const createNewTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });
    if (task) {
      res.status(201).send({
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
      });
    } else {
      res.status(400).send("Something Went Wrong");
    }
  } catch (error) {
    res.status(500).send(`Error:${error.message}`);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(`Error:${error.message}`);
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(`Error:${error.message}`);
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id });
    console.log(deletedTask);
    if (!deletedTask) {
      return res.status(404).send("Task not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(`Error:${error.message}`);
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log(taskId);
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).send("Task not found");
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export { createNewTask, getAllTasks, getTaskById, deleteTask, updateTask };
