import express from 'express';
import userController from '../controllers/userController';
import { jwtCheck, jwtParse } from '../middlewares/auth';
import { validateMyUserRequest } from '../middlewares/validation';

const router = express.Router();
// => api/user
router.get("/", jwtCheck, jwtParse, userController.getCurrentUser);
router.post("/", jwtCheck, userController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, userController.updateCurrentUser)

export default router;