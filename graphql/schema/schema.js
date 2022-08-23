const { buildSchema } = require('graphql')

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


type Orders {
  Orders:[Order]
  TotalCount:Int
}

type Order {
  _id:ID!
  OrderCart: Items!
  User: String!
  PaymentID: String!
  PaymentStatus: String!
  SessionID: String!
}

type Item {
  product:Product
  ItmQty:Int
  ItmPrice:Int
}

type Items {
  Items:[Item]
  totalQty:Int
  totalPrice:Int
}


type OrderPayment {
  _id:ID!
  PaymentID: String
  PaymentStatus: String
  SessionID: String
  clientSecret: String
}


type User {
  _id: ID!
  email: String!
  password: String
  LastName: String
  FirstName: String
  MiddleName: String
  Sex:String
  Birthday:String
  Language:String
  Image:String
}


input UserInput {
  userId: String!
  token: String
  LastName: String
  FirstName: String
  MiddleName: String
  Sex:String
  Birthday:String
  Language:String
  Image:String

}

type UserData {
  userId:ID!
  email: String
  LastName: String
  FirstName: String
  MiddleName: String
  Sex:String
  Birthday:String
  Language:String
  Image:String

}

type AuthData {
  userId:ID!
  token: String!
  tokenExpiration: Int!
}


input OrderInput {
  orderCart: ProductsInput!
  email:String!
  PaymentID:String
  PaymentStatus:String
  SessionID:String
}

input ProductInput {
  _id:ID
  imagePath: String!
  title: String!
  description: String!
  price: Int!
}

input ProductsInput {
  Items:[productItemInput]
  totalQty:Int
  totalPrice:Int
}

input productItemInput{
 product: ProductDataInput
 ItmQty:Int
 ItmPrice:Int
}

input ProductDataInput {
  _id:ID!
  imagePath: String
  title: String!
  description: String!
  price: Int!
}

type RootQuery {
    productsALL(findStr:String, PageNum:Int, PageLimit:Int): Products
    ordersALL(findStr:String,email:String, PageNum:Int, PageLimit:Int): Orders
    getUserData(userId:String!,token:String!):UserData!
    login(email:String!,password: String!): AuthData!
}
type RootMutation {
    createUser(userInput: UserInput): User

    updateUser(userInput: UserInput): User
    createOrder(orderInput: OrderInput): OrderPayment
    createUpdateProduct(productInput: ProductInput): Product
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`)