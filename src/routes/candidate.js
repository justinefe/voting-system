import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import CandidateController from '../controllers/CandidateController';


const candidateRouter = Router();

candidateRouter.get('/candidate/:candidateUuid', authenticateUser, verifyRoles.verifyRequester, CandidateController.viewACandidate);
candidateRouter.get('/candidate', authenticateUser, verifyRoles.verifyRequester, CandidateController.viewAllCandidate);
candidateRouter.delete('/candidate/:candidateUuid', authenticateUser, verifyRoles.verifyELectionAdmin, CandidateController.deleteACandidate);

export default candidateRouter;
