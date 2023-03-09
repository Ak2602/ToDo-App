import express from 'express';
import { getLogin, valLogin } from '../controllers/logController.js';

const logRouter = express.Router();

logRouter.get('/login', getLogin);
logRouter.post('/user', valLogin);

export default logRouter;