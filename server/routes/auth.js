import express from "express";

const router = express.Router();

import { register, login, registerTeacher, loginTeacher } from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.post("/register/teacher", registerTeacher)
router.post('/login/teacher', loginTeacher)

module.exports = router;
