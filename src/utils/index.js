// eslint-disable-next-line arrow-parens
import models from '../models';
import UserRepository from '../repositories/UserRepository';
import NotificationRepository from '../repositories/NotificationRepository';

export const getMIlliSeconds = date => (date ? new Date(date).getTime() : new Date().getTime());

const getStopageTime = (date) => {
  const stopageTimeInMillisecode = getMIlliSeconds(date);
  console.log('stopageTimeInMillisecode', stopageTimeInMillisecode);
  const todayDateMilliSec = getMIlliSeconds();
  console.log('todayDateMilliSec', todayDateMilliSec);
  if (stopageTimeInMillisecode <= todayDateMilliSec) return false;
  return stopageTimeInMillisecode;
};

const { BlackListedToken } = models;

/**
 *
 * @param {string} token it acepts a valid token
 * @returns {boolean} returns true when token is found otherwise false
 */

const isBlackListed = async (token) => {
  const blockedToken = await UserRepository.findToken({ token });
  return !!blockedToken;
};

/**
 * @param {text} token accepts token
 *
 * @returns {string} returns error when it could not create a user
 */
const blackListThisToken = async (token) => {
  await BlackListedToken.create({
    token,
  });
};
const createMessage = async (message, status, notificationType, userUuid) => {
  const data = {
    message,
    status,
    notification_type: notificationType,
    user_uuid: userUuid,
  };
  NotificationRepository.create(data);
};
// const updateMessage = async (changes, tripUuid) => {
//   TripRequestRepository.update(changes, tripUuid); 
// };
export {
  blackListThisToken, isBlackListed, createMessage, getStopageTime
};
/*
try {
  const checkOffice = await OfficeRepository.findAllOffice(); 
  const candidates = checkOffice.map(candidate => {
    const { dataValues } = candidate;
    const { uuid: officeUuid } = dataValues;
    return officeUuid;        
  });

  const checkVote = candidates.map(async office => {
    const result = await VoteRepository.findMaxmum({ office_uuid: office });
    const Total_Votes = await VoteRepository.findSum({ office_uuid: office });
    
    if (!isNaN(result)) {
      const { dataValues } = await VoteRepository.getOneAll({ votes: result, office_uuid: office }); 
      const { votes: Votes, candidate } = dataValues;
      const { officeContesting, user } = candidate;
      const { first_name: firstName, last_name: lastName } = user;

      return {
        Name: `${firstName} ${lastName}`, Votes, Total_Votes,
        OfficeContested: officeContesting, Election_Name: 'National Election'  
      };
    }
    return result;
  });
  const getData = async () => Promise.all(checkVote);      
  getData().then(data => {
    const newData = data.filter(arr => {
      if (isNaN(arr) === true) return arr;
    }); 
    return sendSuccessResponse(res, 400, newData);
  });
} catch (error) {
  next(error);
}
}
*/