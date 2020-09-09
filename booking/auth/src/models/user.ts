import mongoose from "mongoose";
import { Password } from "../services/password";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
},{
  toJSON:{
    transform(doc,ref){
      ref.id = ref._id;
      delete ref._id;
      delete ref.password;
      delete ref.__v;
    }    
  }
});

//input properties required to create a new user
interface UserAttrs {
  email: string;
  password: String;
}

//properties of user model

interface UserModel extends mongoose.Model<UserDocument> {
  build(attr: UserAttrs): UserDocument;
}

//properties of user document

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

//extends the model and add additional methods
userSchema.statics.build = (attr: UserAttrs) => {
  return new User(attr);
};

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { User };
