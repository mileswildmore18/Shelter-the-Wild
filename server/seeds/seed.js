const db = require("../config/connection");
const { User, Pet, Marker, Post } = require("../models");
const petSeeds = require("./petSeeds.json");
const userSeeds = require("./userSeeds.json");
const markerSeeds = require("./markerSeeds.json");
const postSeeds = require("./postSeeds.json");

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
  for (const marker of markerSeeds) {
    await Marker.create({
      ...marker,
      pet_id: pets[Math.floor(Math.random() * pets.length)].id,
      created_by: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // posts
  for (const post of postSeeds) {
    await Post.create({
      ...post,
      pet_id: pets[Math.floor(Math.random() * pets.length)].id,
      created_by: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
