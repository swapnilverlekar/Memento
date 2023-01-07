import express from 'express';
import { signin, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin); //send data to backend, call signin controller
router.post('/signup', signup); //send data to backend, call signup controller


export default router;