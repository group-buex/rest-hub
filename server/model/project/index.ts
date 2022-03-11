import mongoose, { Schema } from "mongoose";
import IProject from "../../interface/project";
import autoIncrement from "mongoose-auto-increment";

autoIncrement.initialize(mongoose.connection);

const ProjectSchema: Schema<IProject> = new Schema(
  {
    seq: { type: Number, required: true },
    name: { type: String, required: true, maxlength: 128 },
    title: { type: String, required: true, maxlength: 128 },
    description: { type: String, required: true, maxlength: 128 },
    baseUrl: { type: String, required: true, maxlength: 128 },
    adminName: { type: String, required: true, maxlength: 128 },
    webUrl: { type: String, required: true, maxlength: 128 },
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
