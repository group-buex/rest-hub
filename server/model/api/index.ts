import mongoose, { Schema } from "mongoose";
import IApi from "../../interface/api";
import autoIncrement from "mongoose-auto-increment";

autoIncrement.initialize(mongoose.connection);

const ApiSchema: Schema<IApi> = new Schema(
  {
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
        request: [
          {
            seq: { type: Number, required: true },
            order: { type: Number, required: true },
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
  {
    timestamps: true,
  }
);

ApiSchema.plugin(autoIncrement.plugin, {
  model: "Apis",
  field: "seq",
  startAt: 1,
  increment: 1,
});

export default mongoose.models.Api || mongoose.model<IApi>("Api", ApiSchema);
