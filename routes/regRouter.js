import express from 'express';
import { getRegister, newUser } from '../controllers/regController.js';

const regRouter = express.Router();

regRouter.get('/register', getRegister);
regRouter.post('/save', newUser);

export default regRouter;