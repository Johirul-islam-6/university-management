import { User } from './users.model';

// find database last User Id serial
export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id;
};

// create a user serial Id number generate
export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0'); // 00000
  //incementUserId

  const incementuserId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incementuserId;
};
