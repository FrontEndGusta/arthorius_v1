import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String },
    department: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    code: { type: String },
    codeExpiration: { type: Date },
    avatar: { type: String },
    avatarContentType: { type: String },
    calls: [
      {
        name: { type: String },
        telephone: { type: String },
        locale: {type: String}, 
        department: {type: String},
        summary: {type: String},
        category: {type: String},
        item: {type: String},
        type: {type: String},
        ticketNumber: { type: String },
        createdAt: { type: Date, default: Date.now }
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
