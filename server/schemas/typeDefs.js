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
    image: String
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

  type Query {
    users: [User]
    me: User
    user(userId: ID!): User
    pets: [Pet]
    pet(petId: ID!): Pet
    breeds: [Breed]
    breed(breedId: ID!): Breed
    groups: [Group]
    group(groupId: ID!): Group
    postsByPet(petId: ID!): [Post]
  }

mutation AddBreed($breed: BreedInput!) {
  addBreed(breed: $breed): Breed
}

input BreedInput {
  _id: ID
  animal: String
  breed: String
  description: String
  image: String
  group: ID!
}

mutation UpdateBreed($breedId: ID!, $breed: BreedInput) {
  updateBreed(breedId: $breedId, breed: $breed): Breed
}

mutation RemoveBreed($breedId: ID!) {
  removeBreed(breedId: $breedId): Boolean
}

mutation AddGroup($group: GroupInput!) {
  addGroup(group: $group): Group
}

input GroupInput {
  _id: ID
  groupId: [String]
  groupName: String
  details: String
}

mutation UpdateGroup($groupId: ID!, $group: GroupInput) {
  updateGroup(groupId: $groupId, group: $group): Group
}

mutation RemoveGroup($groupId: ID!) {
  removeGroup(groupId: $groupId): Boolean
}

  input BreedInput {
  _id: ID
  animal: String
  breed: String
  description: String
  image: String
  group: ID!
  }

  input GroupInput {
  _id: ID
  groupId: [String]
  groupName: String
  details: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createBreed(breed: BreedData): Breed
    addGroup(groupId: ID!, postContent: String!): Post
    addBreed(breed: BreedInput): Breed
    updateBreed)breedId: ID!, breed: BreedInput): Breed
    removeBreed(breedId: ID): Boolean
    addGroup(group: GroupInput): Group
    updateGroup(groupId: ID!, group: GroupInput): Group
    removeGroup(groupId: ID): Boolean

  }
`;

module.exports = typeDefs;
