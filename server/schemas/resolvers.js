
const Pet = require("../models/Pet");
const User = require("../models/User");
const { signToken, AuthenticationError } = require("../utils/auth");


// Creates the functions that fulfill the queries defined in typeDefs
const resolvers = {
  Query: {
    // Get current User
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'pets',
          populate: 'pet'
        })

        user
      }
    },
    // Get single pet
    pet: async (parent, { id }) => {
      return await Pet.findById(_id).populate('Pet')
    },
    // Get all pets
    pets: async () => {
      return await Pet.find();

    },
  },

  Mutation: {
    // Login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Error! User not found!");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Error! Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    // Add user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    // Create pet
    createPet: async (parent, { _id }, context) => {
      console.log(context)
      console.log(context.user)
      if (context.user) {
        const pet = new Pet({ _id });

        await User.findByIdAndUpdate(context.user._id, { $push: { pets: pet} });

        return pet;
      }

      throw AuthenticationError;
    },
    // Update pet
    updatePet: async (parent, { _id }, context) => {
      if (context.user) {
      return await User.findByIdAndUpdate(context.user._id, _id, { new: true });
    }

    throw AuthenticationError;
  },
    // Delete pet
    removePet: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findByIdAndDelete(context.user._id, _id)
      }

      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
