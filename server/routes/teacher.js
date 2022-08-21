import express from "express";

const router = express.Router();

import { createClass } from "../controllers/teacher";

router.post("/create-class", createClass);

module.exports = router;
