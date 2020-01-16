import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import requestValidator from '../middlewares/RequestValidator';
import AdminCrontroller from '../controllers/AdminController';


const adminRouter = Router();
adminRouter.patch('/admin/:party_uuid/status', authenticateUser, verifyRoles.verifyRequester, AdminCrontroller.approveVoterParty);
adminRouter.patch('/admin/:admin_uuid', authenticateUser, verifyRoles.verifyRequester, requestValidator.partyAdminValidation, AdminCrontroller.approvePartyAdmin);
adminRouter.patch('/admin', authenticateUser, verifyRoles.verifyRequester, requestValidator.approveCandidacyValidation, AdminCrontroller.approveCandidacy);
adminRouter.patch('/admin/:party_uuid', authenticateUser, verifyRoles.verifyRequester, requestValidator.partyAdminValidation, AdminCrontroller.approveParty);

export default adminRouter;
