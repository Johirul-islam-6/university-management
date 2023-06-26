/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { IUser, UserModel } from './users.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// checked user Id matching
// userSchema.methods.isUserExist = async function(id: string): Promise<Partial<IUser> | null>{
//  return await User.findOne({id}, {id :1, password:1, needPasswordChange:1})
// }

userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<IUser, 'id' | 'password' | 'needPasswordChange'> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1 }
  );
};

// instance methods
userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};

//checked user password  user bcrypt # password security

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_numbers)
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
