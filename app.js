const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
//const graphqlHttp = require('express-graphql')
const isAuth = require('./middleware/is-auth')
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/schema')
const graphQlResolvers = require('./graphql/resolvers/index')

const app = express();

app.use(bodyParser.json());
app.use((req,res,next)=>{ //Grend access for using API from the browser
res.setHeader
  //every host/client can send request to this server
  res.setHeader('Access-Control-Allow-Origin','*')

  //every host/client can send request with following methods only
  //OPTIONS will be send by browser automaticly to get the list of methods can be used
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS')

  //every host/client can send request with following methods only
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  
  if (req.method==='OPTIONS')
  {
    return res.sendStatus(200)
  }
  next()
})
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({schema: graphQlSchema
   ,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
const connectMongoDB=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}
@cluster0.rwg46sl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
//console.log(connectMongoDB)

mongoose.connect(connectMongoDB).then(()=>{
    app.listen(5000);
}).catch(err=>{
    console.log(err);
})
