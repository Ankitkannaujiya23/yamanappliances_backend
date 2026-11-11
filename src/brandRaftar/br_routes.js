import brController from "./br_controller.js";


const router = express.Router();

router.post('/createEnquiry', brController.createEnquiry);

export default router;