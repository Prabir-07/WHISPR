import mongoose, { Schema } from "mongoose";

const reactionSchema = new Schema({
  emoji: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    attachments: [
      {
        url: String,
        public_id: String,
        fileType: String, // e.g., 'image', 'video', 'doc'
      },
    ],

    // New fields for advanced message features
    isEdited: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    reactions: [reactionSchema],
    parentMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    starredBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
