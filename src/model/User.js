const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.encryptPassword = async (password)=>{
  const   salt = await bcrypt.genSalt(10);
  return  await bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}


module.exports = model("User", userSchema);
