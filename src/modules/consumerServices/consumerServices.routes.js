
import express from 'express';
import { getAllServices, getCommonIssues, getServiceType } from './consumerServices.controller.js';

const router = express.Router();

router.get('/getallservices', getAllServices);
router.get('/servicetypes/:serviceId', getServiceType);
router.get('/commonissues/:serviceId', getCommonIssues);

export default router;