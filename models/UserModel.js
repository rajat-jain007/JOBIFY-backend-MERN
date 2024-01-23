import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    lastName: {
      type: String,
      default: "lastName",
      required: true,
    },
    location: {
      type: String,
      default: "my city",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  let obj = this.toObject(); // toObject()=  mongoose method
  delete obj.password; // deleting the returned password from mongoDb in the obj(object)
  return obj;
};

export default mongoose.model("User", UserSchema);
