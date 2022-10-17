# Shopping-Cart (NodeJS+ReactJS+MongoDB+GraphQL)
This code belongs to Mykola GORBAN.

Learn how to build Backend with a GraphQL API (Node.js) and frontend with a React.js from scratch.

# Usage
Install all dependencies
```sh
npm install
```
Create and configure your nodemon.json file:
```
{
    "env":
    { 
    "MONGO_DB": "dbname",
    "MONGO_USER":"username",
    "MONGO_PASSWORD":"password",
    "jwtPassword":"somesupersecretkey",
    "expressPort":"5000"

    }
}
...


Run the server
```sh
npm start