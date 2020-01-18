import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import requestValidator from '../middlewares/RequestValidator';
import registration from '../controllers/RegistrationController';
import CandidateController from '../controllers/CandidateController';


const candidateRouter = Router();

candidateRouter.get('/candidate/:candidateUuid', authenticateUser, verifyRoles.verifyRequester, CandidateController.viewACandidate);
candidateRouter.get('/candidate', authenticateUser, verifyRoles.verifyRequester, CandidateController.viewAllCandidate);
candidateRouter.delete('/candidate/:candidateUuid', authenticateUser, verifyRoles.verifyRequester, CandidateController.deleteACandidate);

export default candidateRouter;
