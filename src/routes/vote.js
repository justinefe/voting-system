import { Router } from 'express';
import authenticateUser from '../middlewares/AuthenticateUser';
import verifyRoles from '../middlewares/VerifyRoles';
import requestValidator from '../middlewares/RequestValidator';
import VoteController from '../controllers/VoteController';


const voteRouter = Router();

voteRouter.post('/voter/:candidateUuid', authenticateUser, verifyRoles.verifyVoter, VoteController.voteACandidate);
voteRouter.post('/vote/start', authenticateUser, verifyRoles.verifyELectionAdmin, VoteController.startVote);
voteRouter.get('/vote/end', authenticateUser, verifyRoles.verifyELectionAdmin, VoteController.endVote);

export default voteRouter;
