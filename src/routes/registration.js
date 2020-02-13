import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import requestValidator from '../middlewares/RequestValidator';
import registration from '../controllers/RegistrationController';


const registrationRouter = Router();

registrationRouter.put('/register_voter', authenticateUser, verifyRoles.verifyVoter, requestValidator.voterValidation, registration.voterRegistration);
registrationRouter.post('/register_party', authenticateUser, verifyRoles.verifyVoter, requestValidator.partyValidation, registration.partyRegistration);
registrationRouter.post('/register_candidate', authenticateUser, verifyRoles.verifyVoter, requestValidator.candidateValidation, registration.candidateRegistration);
registrationRouter.post('/join_party', authenticateUser, verifyRoles.verifyVoter, requestValidator.voterJoinValidation, registration.voterJoinParty);
registrationRouter.post('/register_office', authenticateUser, verifyRoles.verifyELectionAdmin, requestValidator.officeValidation, registration.createOffice);

export default registrationRouter;
