const express = require("express");
const router = express.Router();
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/").get(getTasks).post(setTask);
router.put("/update", updateTask);
router.delete("/delete", deleteTask);
// router.route("/:id").delete(deleteTask).put(updateTask);

module.exports = router;
