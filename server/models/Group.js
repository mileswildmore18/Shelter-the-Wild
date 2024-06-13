const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groupNumber",
    },
    groupName: {
      type: String,
    },
   details: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Group = model("Group", groupSchema);

module.exports = Group;
