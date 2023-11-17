import express from "express";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controller/taskController.js";

const router = express.Router();

router.route("/").post(createNewTask).get(getAllTasks);
router.route("/:id").get(getTaskById).delete(deleteTask).put(updateTask);

export default router;
