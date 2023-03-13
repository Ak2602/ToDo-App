import express from "express";
import {
  removeList,
  toDoDetails,
  flagTask,
} from "../controllers/listController.js";

const listRouter = express.Router();

listRouter.post("/task", toDoDetails);
listRouter.post("/remove", removeList);
listRouter.post("/success", flagTask);

export default listRouter;
