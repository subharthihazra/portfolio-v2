import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
    default: "",
  },
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
});

export const messageModel = mongoose.model("DirectMessage", messageSchema);

