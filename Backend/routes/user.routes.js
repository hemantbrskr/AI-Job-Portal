import express from 'express';
import { login, register, updateProfile } from '../controllers/user.controller.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(authenticateToken, updateProfile);

export default router;