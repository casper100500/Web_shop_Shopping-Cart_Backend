const {buildSchema} = require('graphql')
module.exports = buildSchema(`
type Product {
  _id:ID!
  imagePath: String!
  title: String!
  description: String!
  price: Int!
}

type Products {
  Products:[Product]
  TotalCount:Int

}


type User {
  _id: ID!
  email: String!
  password: String
 
}

type AuthData {
  userId:ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    products(findStr:String, PageNum:Int, PageLimit:Int): [Product]
    productsALL(findStr:String, PageNum:Int, PageLimit:Int): Products
    login(email:String!,password: String!): AuthData!
}
type RootMutation {
    createUser(userInput: UserInput): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)