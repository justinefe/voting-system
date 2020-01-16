import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import requestValidator from '../middlewares/RequestValidator';
import registration from '../controllers/RegistrationController';


const registrationRouter = Router();

registrationRouter.put('/register_voter', authenticateUser, verifyRoles.verifyRequester, requestValidator.voterValidation, registration.voterRegistration);
registrationRouter.post('/register_party', authenticateUser, verifyRoles.verifyRequester, requestValidator.partyValidation, registration.partyRegistration);
registrationRouter.post('/register_candidate', authenticateUser, verifyRoles.verifyRequester, requestValidator.candidateValidation, registration.candidateRegistration);
registrationRouter.post('/join_party', authenticateUser, verifyRoles.verifyRequester, requestValidator.voterJoinValidation, registration.voterJoinParty);

export default registrationRouter;
