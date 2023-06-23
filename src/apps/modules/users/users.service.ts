import config from '../../../config/index';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateUserId } from './users.utils';

const createdUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId();
  user.id = id;
  // auto genarate password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createAuser = await User.create(user);

  if (!createAuser) {
    throw new Error('Faild to Create A user');
  }
  return createAuser;
};

// get alll users
const getAllUserServec = async (): Promise<IUser[] | null> => {
  const result = await User.find({});
  return result.length > 0 ? result : null;
};

// export file
export const UserServices = {
  createdUser,
  getAllUserServec,
};
