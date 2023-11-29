import { Router } from "express";

import { AllUsers, Login, SignUp } from '../controller/user.js';


const router = Router();

router.post('/signup', SignUp);
router.get('/users', AllUsers);
router.post('/login', Login);
export default router;