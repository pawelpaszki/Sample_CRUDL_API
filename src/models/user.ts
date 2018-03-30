import * as mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  email: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
  registered: Date;
  dob: Date;
  phone: string;
  cell: string;
  PPS: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

const userSchema = new mongoose.Schema({
  cell: String,
  dob: Date,
  email: String,
  gender: String,
  location: {
    city: String,
    state: String,
    street: String,
    zip: String,
  },
  md5: String,
  name: {
    first: String,
    last: String,
    title: String,
  },
  password: String,
  phone: String,
  picture: {
    large: String,
    medium: String,
    thumbnail: String,
  },
  PPS: {type: String, unique: true},
  registered: { type: Date, default: Date.now },
  salt: String,
  sha1: String,
  sha256: String,
  username: {type: String, unique: true},

});

export const User = mongoose.model<IUser>(
  'User', userSchema);
