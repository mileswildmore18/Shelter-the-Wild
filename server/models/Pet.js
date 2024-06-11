const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    petName: {
      type: String,
      minlength: 1,
      maxlength: 280,
      trim: true,
      required: true,
    },
    animalType: {
      type: String,
      enum: [
        "DOG",
        "CAT",
        "BIRD",
        "FERRET",
        "FISH",
        "FROG",
        "GP",
        "HAMSTER",
        "HEDGEHOG",
        "RABBIT",
        "SNAKE",
        "OTHER",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    microchipRegistry: {
      type: String,
      required: true,
    },
    microchipNumber: {
      type: String,
      required: true,
    },
    petOwner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    petOwnerUsername: {
      type: String,
      ref: "User",
    },
    //  Create markers and add them to pets
    //  pets = markers and users = pets
    isMissing: {
      type: Boolean,
      required: true,
      default: false,
    },
    geometry: {
      type: String,
    },
    image: {
      type: String,
    },
    markers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Marker",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Pet = model("Pet", petSchema);

module.exports = Pet;
