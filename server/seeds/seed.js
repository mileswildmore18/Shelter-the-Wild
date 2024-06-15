const db = require("../config/connection");
const { User, Pet } = require("../models");
const petSeeds = require("./petSeeds.json");
const userSeeds = require("./userSeeds.json");
const shelterDB = require('./shelterDB');


db.once('open', async () => {
  try {
    await shelterDB('Pet', 'pets');
    await shelterDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < petSeeds.length; i++) {
      const { _id, petOwner } = await Pet.create(petSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: petOwner },
        {
          $addToSet: {
            pets: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('complete!');
  process.exit(0);
});
// const seedDatabase = async () => {
//   //await db.sync({ force: true });

//   // users
//   const users = await User.bulkCreate(userSeeds, {
//     individualHooks: true,
//     returning: true,
//   });

//   // pets
//   const pets = await Pet.bulkCreate(
//     petSeeds.map((pet) => ({
//       ...pet,
//       owner_id: users[Math.floor(Math.random() * users.length)].id,
//     })),
//     {
//       returning: true,
//     }
//   );

//   process.exit(0);
// };

// seedDatabase();
