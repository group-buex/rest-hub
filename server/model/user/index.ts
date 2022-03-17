import mongoose, { Schema } from "mongoose";
import IUser from "../../interface/user";
import autoIncrement from "mongoose-auto-increment";
import crypto from "crypto";

autoIncrement.initialize(mongoose.connection);

const UserSchema: Schema<IUser> = new Schema(
  {
    seq: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 128, unique: true },
    email: { type: String, required: true, maxlength: 256, unique: true },
    hash_password: { type: String, required: true, maxlength: 256 },
    salt: { type: String, required: true },
    type: { type: String, required: true, default: "sign" },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    project: [
      {
        seq: { type: Number, required: true },
        projectId: { type: String, required: true, maxlength: 256 },
        role: { type: String, maxlength: 8, require: true, default: "admin" },
      },
    ],
    shared: [
      {
        seq: { type: Number, required: true },
        projectId: { type: String, required: true, maxlength: 256 },
        role: { type: String, maxlength: 8, require: true, default: "guset" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(autoIncrement.plugin, {
  model: "Users",
  field: "seq",
  startAt: 1,
  increment: 1,
});

// virtual
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hash_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// method
UserSchema.methods = {
  // check password
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hash_password;
  },

  // hash password
  encryptPassword: function (password) {
    if (password === undefined) return "";
    try {
      return crypto
        .createHmac(process.env.NEXT_PUBLIC_CRYPTO_ALGORITHM, this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
