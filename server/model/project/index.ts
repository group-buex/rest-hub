import mongoose, { Schema } from "mongoose";
import IProject from "../../interface/project";
import autoIncrement from "mongoose-auto-increment";

autoIncrement.initialize(mongoose.connection);

const ProjectSchema: Schema<IProject> = new Schema(
  {
    seq: { type: Number, required: true },
    title: { type: String, required: true, maxlength: 256 },
    description: { type: String, required: true, maxlength: 512 },
    baseUrl: { type: String, required: true, maxlength: 256 },
    admin: { type: String, required: true, maxlength: 128 },
    webUrl: { type: String, required: true, maxlength: 256 },
    member: [
      {
        seq: { type: Number, require: true },
        userEmail: { type: String, maxlength: 128 },
        role: { type: String, maxlength: 8, default: "guest" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

ProjectSchema.plugin(autoIncrement.plugin, {
  model: "Projects",
  field: "seq",
  startAt: 1,
  increment: 1,
});

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
