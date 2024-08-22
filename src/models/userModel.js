import mongoose, { Schema } from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "First Name is Required!"],
      },
      email: {
        type: String,
        required: [true, " Email is Required!"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
      password: {
        type: String,
        required: [true, "Password is Required!"],
        minlength: [6, "Password length should be greater than 6 character"],
        select: false,
      },
      isVerified: { type: Boolean, default: false },
      
    }
    
  );
  const User = mongoose.models.User||mongoose.model("User", userSchema);

  
export default User;