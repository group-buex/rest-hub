import mongoose, { Schema } from "mongoose";
import IProject from "../../interface/project";
import autoIncrement from "mongoose-auto-increment";

autoIncrement.initialize(mongoose.connection);

const ProjectSchema: Schema<IProject> = new Schema(
  {
    seq: { type: Number, required: true },
    authorId: { type: String, required: true, maxlength: 128 },
    title: { type: String, required: true, maxlength: 256 },
    description: { type: String, required: true, maxlength: 512 },
    baseUrl: { type: String, required: true, maxlength: 256 },
    webUrl: { type: String, required: true, maxlength: 256 },
    member: [
      {
        seq: { type: Number, require: true },
        email: { type: String, maxlength: 128 },
        role: { type: String, maxlength: 8, default: "guest" },
      },
    ],
    api: {
      seq: { type: Number, required: true },
      order: { type: Number, required: true },
      projectId: { type: String, required: true },
      title: { type: String, required: true, maxlength: 256 },
      description: { type: String, required: true, maxlength: 512 },
      list: [
        {
          seq: { type: Number, required: true },
          order: { type: Number, required: true },
          method: { type: String, required: true, maxlength: 10 },
          url: { type: String, required: true, maxlength: 256 },
          description: { type: String, required: true, maxlength: 512 },
          notice: { type: String, maxlength: 512 },
          mockData: { type: Object, default: null },
          request: [
            {
              seq: { type: Number, required: true },
              order: { type: Number, required: true },
              isRequired: { type: Boolean, required: true, default: false },
              name: { type: String, required: true, maxlength: 128 },
              type: { type: String, required: true, maxlength: 128 },
              description: { type: String, required: true, maxlength: 512 },
            },
          ],
          response: [
            {
              seq: { type: Number, required: true },
              order: { type: Number, required: true },
              code: { type: Number, required: true },
              message: { type: String, required: true, maxlength: 512 },
              data: { type: Object, required: true },
            },
          ],
        },
      ],
      models: [
        {
          seq: { type: Number, required: true },
          order: { type: Number, required: true },
          name: { type: String, required: true, maxlength: 128 },
          model: { type: Object, required: true },
        },
      ],
    },
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
