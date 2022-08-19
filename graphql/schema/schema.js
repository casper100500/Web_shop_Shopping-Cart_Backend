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


type Order {
  _id:ID!
  OrderCart: Products!
  User: String!
  PaymentID: String!
  PaymentStatus: String!
  SessionID: String!
}

type OrderPayment {
  _id:ID!
  PaymentID: String
  PaymentStatus: String
  SessionID: String
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

input OrderInput {
  orderCart: ProductsInput!
  email:String!
  PaymentID:String
  PaymentStatus:String
  SessionID:String
}

input ProductsInput {
  Items:[productItemInput]
  totalQty:Int
  totalPrice:Int
}

input productItemInput{
 product: ProductInput
 ItmQty:Int
 ItmPrice:Int
}

input ProductInput {
  _id:ID!
  imagePath: String
  title: String!
  price: Int!
}

type RootQuery {
    products(findStr:String, PageNum:Int, PageLimit:Int): [Product]
    productsALL(findStr:String, PageNum:Int, PageLimit:Int): Products
    login(email:String!,password: String!): AuthData!
}
type RootMutation {
    createUser(userInput: UserInput): User
    createOrder(orderInput: OrderInput): OrderPayment
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)