import express from 'express';
import { toDoDetails, myList, displayData } from '../controllers/listController.js';

const listRouter = express.Router();

listRouter.get('/list', myList);
listRouter.post('/enter', toDoDetails, displayData);

export default listRouter;