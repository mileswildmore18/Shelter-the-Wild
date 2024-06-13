const db = require("../config/connection");
const { User, Pet, Group , Breed } = require("../models");
const petSeeds = require("./petSeeds.json");
const userSeeds = require("./userSeeds.json");
const breedSeeds = require("./breedSeeds.json");
const groupSeeds = require("./groupSeeds.json");

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

  // markers
  for (const breed of breedSeeds) {
    await Breed.create({
      ...breed,
      pet_id: pets[Math.floor(Math.random() * pets.length)].id,
      created_by: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // posts
  for (const group of groupSeeds) {
    await Group.create({
      ...group,
      pet_id: pets[Math.floor(Math.random() * pets.length)].id,
      created_by: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
