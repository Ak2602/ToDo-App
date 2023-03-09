import express from "express";
import { removeList, toDoDetails } from "../controllers/listController.js";

const listRouter = express.Router();

listRouter.post("/task", toDoDetails);
listRouter.post("/remove", removeList);

export default listRouter;
