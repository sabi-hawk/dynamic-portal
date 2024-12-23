import { Schema, model, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
  name: {
    first: { type: String, trim: true },
    last: { type: String, trim: true },
  },
  email: { type: String, trim: true, lowercase: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  dob: { type: String },
  role: { type: String, default: "user" },
  loggedInAt: { type: Date },
  lastLoggedInAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export type UserType = InferSchemaType<typeof UserSchema>;

const User = model<UserType>("user", UserSchema);

export default User;
