import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './users.interface';
import { User } from './users.model';

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (id: string, payload: JwtPayload) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('user does not exist');
  }
  if (!(payload?.role === 'admin') && user?.email !== payload?.email) {
    throw new Error('You are not authorized!');
  }

  return user;
};

const updateUserProfileFromDB = async (
  id: string,
  updateData: Partial<IUser>,
  payload: JwtPayload,
) => {
  const isUserExist = await User.findById(id);

  if (!isUserExist) {
    throw new Error('Users does not exist');
  }

  if (!(payload?.role === 'admin') && isUserExist.email !== payload?.email) {
    throw new Error('You are not authorized!');
  }

  if (
    updateData?.status &&
    isUserExist.role === 'editor' &&
    payload?.role === 'admin'
  ) {
    await User.findByIdAndUpdate(
      id,
      {
        $set: {
          status: updateData?.status,
        },
      },
      { new: true },
    );
  }

  const isNewEmailExist = await User.findOne({ email: updateData?.email });

  if (isNewEmailExist && !(isUserExist.email === updateData.email)) {
    throw new Error('This email is already exist! please try another');
  }

  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        name: updateData?.name || isUserExist?.name,
        email: updateData?.email || isUserExist?.email,
        imageUrl: updateData?.imageUrl || isUserExist?.imageUrl,
      },
    },
    { new: true },
  );

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserProfileFromDB,
  deleteUserFromDB,
};
