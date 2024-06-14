const typeDefs = `

  type User {
    _id: ID
    username: String
    email: String
    pets: [Pet]
  }

  type petName {
    _id: ID
    petName: String
  }

  type petAge {
    _id: ID
    petAge: String
  }

type crossing {
    _id: ID
    crossing: String
  }
type inDate {
    _id: ID
    inDate: String
  }

type color {
    _id: ID
    color: String
  }

type sex {
    _id: ID
    sex: String
  }

type petSize {
    _id: ID
    petSize: String
  }

type intakeType {
    _id: ID
    intakeType: String
  }

type urlLink {
    _id: ID
    urlLink: String
  }

type animalId {
    _id: ID
    animalId: String
  }

type image {
    _id: ID
    image: String
  }

type breed {
    _id: ID
    breed: String
  }

  type Breed {
    _id: ID
    animal: String
    breed: String
    description: String
    image: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    me: User
    user(userId: ID!): User
    pets: [Pet]
    pet(petId: ID!): Pet
    breeds: [Breed]
    breed(breedId: ID!): Breed
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createPet(petId: ID!, petName: String, animalType: String, description: String, image, String): Pet
    updatePet(petId: ID!, petName: String, animalType: String, description: String, image, String): Pet
    removePet(petId: ID!): Pet
    
  }
`;

module.exports = typeDefs;
