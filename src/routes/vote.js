import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import requestValidator from '../middlewares/RequestValidator';
import VoteController from '../controllers/VoteController';


const voteRouter = Router();

voteRouter.get('/vote/:time', authenticateUser, verifyRoles.verifyELectionAdmin, VoteController.setVotingDeadLine);
voteRouter.post('/vote/:candidateUuid', authenticateUser, verifyRoles.verifyVoter, VoteController.voteACandidate);

export default voteRouter;
