const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken')

module.exports =
{


  createUser: async args => {
    try {

      const existingUser = await User.findOne({ email: args.userInput.email })

      if (existingUser) {
        throw new Error('User exists already.');
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);


      const creator = new User({
        email: args.userInput.email,
        password: hashedPassword
      })

      const result = await creator.save();


      return { ...result._doc, password: null, _id: result.id };
    }
    catch (err) {
      throw err;
    };
  },
  //login: async ({email,password}) => {
  login: async args => {
    try {

      const user = await User.findOne({ email: args.email })

      if (!user) {
        throw new Error('User doesnt exist!');
      }

      const isEqual = await bcrypt.compare(args.password, user.password);


      if (!isEqual) {
        throw new Error('Password is incorrect');
      }
      const token = jwt.sign({ userId: user.id, email: user.email },
        process.env.jwtPassword, {
        expiresIn: '1h'
      }
      )
      console.log(`${user.email} : token...`)
      return { userId: user.id, token: token, tokenExpiration: 1 };
    }
    catch (err) {
      throw err;
    };
  }

}