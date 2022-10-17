# Shopping-Cart (Backend)
# (NodeJS+ReactJS+MongoDB+GraphQL)
This code belongs to Mykola GORBAN.

Web shop draft from scratch:
- Backend GraphQL API + MongoDB (Node.js)
- Frontend React.js

Main futures:

- Shopping cart
- Sessions
- User login
- User profile
- User orders
- Product catalog
- Product search
- Stripe payments
- Admin mode (add/edit products)

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
```

Run the server
```sh
npm start
```