const { Schema, model } = require("mongoose");

const markerSchema = new Schema(
  {
    petId: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
    markerName: {
      type: String,
    },
    markerDescription: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    coordinates: {
      type: [Number],
    },
    image: {
      type: String,
    },
    goemetry: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Marker = model("Marker", markerSchema);

module.exports = Marker;
