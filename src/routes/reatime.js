import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
// import requestValidator from '../middlewares/RequestValidator';
import realTimeController from '../controllers/realTimeController';


const realtimeRouter = Router();
realtimeRouter.post('/chat', authenticateUser, verifyRoles.verifyRequester, realTimeController.addChat);

export default realtimeRouter;
