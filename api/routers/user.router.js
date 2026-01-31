import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { isAuthed } from '../middlewares/is-authed.middleware.js';

const userRouter = Router();

/* =========================
   AUTH
========================= */
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);

/* =========================
   ME
========================= */
userRouter.get('/me', isAuthed, userController.getCurrentUserInfo);
userRouter.patch('/me', isAuthed, userController.updateMe);
userRouter.delete('/me', isAuthed, userController.deleteMe);

export default userRouter;
