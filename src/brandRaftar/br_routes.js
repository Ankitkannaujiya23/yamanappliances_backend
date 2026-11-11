import brController from "./br_controller.js";
import express from "express";


const router = express.Router();

router.post('/createEnquiry', brController.createEnquiry);

export default router;