import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import requestValidator from '../middlewares/RequestValidator';
import AdminCrontroller from '../controllers/AdminController';


const adminRouter = Router();
adminRouter.patch('/candidate/:candidate_uuid/status', authenticateUser, verifyRoles.verifyRequester, requestValidator.approveCandidacyValidation, AdminCrontroller.approveCandidacy);
adminRouter.patch('/party/:party_uuid/status', authenticateUser, verifyRoles.verifyRequester, requestValidator.partyAdminValidation, AdminCrontroller.approveParty);
adminRouter.patch('/user/:user_uuid/status', authenticateUser, verifyRoles.verifyRequester, requestValidator.approveCandidacyValidation, AdminCrontroller.approveVoterParty);
adminRouter.patch('/admin/:admin_uuid/status', authenticateUser, verifyRoles.verifyRequester, requestValidator.voterJoinValidation, AdminCrontroller.approvePartyAdmin);

export default adminRouter;
