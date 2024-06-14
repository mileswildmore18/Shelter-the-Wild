const { Schema, model } = require("mongoose");

const breedSchema = new Schema(
  {
    animal: {
        type: String,
        enum: [
            "DOG",
            "OTHER"
        ],
        required: true,
    },

    breed: {
        type: String,
        description: true
    },
    petName: {
      type: String,
      minlength: 1,
      maxlength: 280,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
        type: String
    },
    
    group: [
        {
        type: Schema.Types.ObjectId,
        ref: "Group"
        }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Breed = model("Breed", breedSchema);

module.exports = Breed;