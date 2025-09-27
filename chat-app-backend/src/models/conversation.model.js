import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    name: {
      type: String,
    }, // Used for group chats
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Fields for group chat management
    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    mutedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
