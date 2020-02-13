import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import requestValidator from '../middlewares/RequestValidator';
import AdminCrontroller from '../controllers/AdminController';


const adminRouter = Router();
adminRouter.patch('/party/:party_uuid/status', authenticateUser, verifyRoles.verifyELectionAdmin, requestValidator.partyAdminValidation, AdminCrontroller.approveParty);
adminRouter.patch('/user/:user_uuid/status', authenticateUser, verifyRoles.verifyPartyAdmin, requestValidator.approvePartyValidation, AdminCrontroller.approveVoterParty);
adminRouter.patch('/admin/:admin_uuid/status', authenticateUser, verifyRoles.verifyELectionAdmin, requestValidator.voterJoinValidation, AdminCrontroller.approvePartyAdmin);

export default adminRouter;
