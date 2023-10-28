const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      enum:["user", "admin"],
      default:"user",
      required:true
    }
  },
  { timestamps: true }
);

// Static sign up method
userSchema.statics.signup = async function (name, email, location, password) {
  // validation
  if (!name || !email || !location || !password) {
    throw new Error("All fields are required");
  }

  // Check email
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  // Check password
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must contain 6+ character uppercase lowercase number and symbol"
    );
  }

  const existedEmail = await this.findOne({ email });

  if (existedEmail) {
    throw new Error("Email already in use");
  }

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Creating user
  const user = await this.create({
    name,
    email,
    location,
    password: hashPassword,
  });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  // Comparing password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
