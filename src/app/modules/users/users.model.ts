import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    role: {
      type: String,
      enum: ['admin', 'editor'],
      default: 'editor',
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const isAdminExist = await User.findOne({ role: 'admin' });
  if (isAdminExist && this.role === 'admin') {
    throw new Error('admin is already exist!');
  }
  const isUserExist = await User.findOne({ email: this.email });
  if (isUserExist) {
    throw new Error('Users is already exist');
  }
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_solt));
  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

UserSchema.statics.isJWTIssuedBeforePasswordChange = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<IUser, UserModel>('User', UserSchema);
