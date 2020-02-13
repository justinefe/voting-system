import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import CandidateController from '../controllers/CandidateController';
import requestValidator from '../middlewares/RequestValidator';


const candidateRouter = Router();

candidateRouter.get('/candidate/:candidateUuid', authenticateUser, verifyRoles.verifyRequester, CandidateController.viewACandidate);
candidateRouter.get('/candidate', authenticateUser, verifyRoles.verifyRequester, CandidateController.viewAllCandidate);
candidateRouter.delete('/candidate/:candidateUuid', authenticateUser, verifyRoles.verifyELectionAdmin, CandidateController.deleteACandidate);
candidateRouter.patch('/candidate/:candidate_uuid/status', authenticateUser, verifyRoles.verifyPartyAdmin, requestValidator.approveCandidacyValidation, CandidateController.approveCandidacy);

export default candidateRouter;
