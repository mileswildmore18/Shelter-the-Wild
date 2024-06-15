const db = require("../config/connection");
const { User, Pet } = require("../models");
const petSeeds = require("./petSeeds.json");
const userSeeds = require("./userSeeds.json");

const seedDatabase = async () => {
  await db.sync({ force: true });

  // users
  const users = await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  // pets
  const pets = await Pet.bulkCreate(
    petSeeds.map((pet) => ({
      ...pet,
      owner_id: users[Math.floor(Math.random() * users.length)].id,
    })),
    {
      returning: true,
    }
  );

  process.exit(0);
};

seedDatabase();
