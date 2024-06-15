const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    petName: {
      type: String,
    },

    petAge: {
      type: String,
    },

    crossing: {
      type: String,
    },

    inDate: {
      type: String,
    },

    color: {
      type: String,
    },

    sex: {
      type: String,
    },

    petSize: {
      type: String,
    },

    intakeType: {
      type: String,
    },

    urlLink: {
      type: String,
    },

    animalId: {
      type: String,
    },

    animalType: {
      type: String,
    },
    breed: {
      type: String,
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;
