const typeDefs = `

  scalar GeoJSON
  scalar Date

  type User {
    _id: ID
    username: String
    email: String
    pets: [Pet]
  }

  type Pet {
    _id: ID
    petName: String
    description: String
    microchipRegistry: String
    microchipNumber: String
    petOwner: User
    petOwnerUsername: String
    animalType: AnimalType
    isMissing: Boolean
    geometry: GeoJSON
    image: String
    markers: [Marker]
    posts: [Post]
  }

  type Group {
    _id: ID
    groupId: [groupNumber]
    groupName: String
    details: String
    
  }

  type Breed {
    _id: ID
    animal: String
    breed: String
    description: String
    image: String
    group: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  }

  input PetData {
    id: Int!
    petName: String
    breeds: [breedData]
  }

  enum AnimalType {
    DOG
    CAT
    OTHER
  }

  type Query {
    users: [User]
    me: User
    user(userId: ID!): User
    pets: [Pet]
    pet(petId: ID!): Pet
    Breeds: [Breed]
    Group(groupId: ID!): Post
    postsByPet(petId: ID!): [Post]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createBreed(breed: BreedData): Breed
    addGroup(groupId: ID!, postContent: String!): Post
    createPet(pet: PetData): Post
    updatePet(postContent: String!): Post
    removePet(postId: ID!): Post
  }
`;

module.exports = typeDefs;
