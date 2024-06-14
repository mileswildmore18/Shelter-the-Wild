const typeDefs = `

  type User {
    _id: ID
    username: String
    email: String
    pets: [Pet]
  }

  
  type Pet {
    _id: ID
    petName: String
    petAge: String
    crossing: String    
    inDate: String
    color: String
    sex: String
    petSize: String
    intakeType: String
    urlLink: String
    animalId: String
    image: String
    breed: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    pets: [Pet]
    pet(petId: ID!): Pet
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createPet(petId: ID!, petName: String, petAge: String, crossing: String, inDate: String, color: String, sex: String, petSize: String, intakeType: String, urlLink: String, animalId: String, image: String, breed: String): Pet
    updatePet(petId: ID!, petName: String, petAge: String, crossing: String, inDate: String, color: String, sex: String, petSize: String, intakeType: String, urlLink: String, animalId: String, image: String, breed: String): Pet
    removePet(petId: ID!): Pet
    
  }
`;

module.exports = typeDefs;
