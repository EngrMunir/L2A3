import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const userSchema = new Schema<TUser>(
  {
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: false },
      lastName: { type: String, required: true },
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin','user'],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save',async function(next){
  const user=this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
})

userSchema.post('save', async function(doc, next){
  doc.password='';
  next()
})

export const User = model<TUser>('User', userSchema);