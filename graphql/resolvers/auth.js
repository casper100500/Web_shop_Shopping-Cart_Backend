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
        password: hashedPassword,
   
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
  },

  updateUser: async args => {
    

   console.log('updateUser')
  // console.log(args)
  // {'_id':'62eb91623ea009cf5d8e2a02'}
  //objStr={_id:args.userInput.userId}
 objStr=`{"_id":"${args.userInput.userId}"}`
 obj = JSON.parse(objStr)
  //    const user = await User.findOne({ "_id": args.userInput.userId })
  const user = await User.findOne(obj)

    //  console.log(user)

      if (!user) {
        throw new Error('User doesnt exist!');
      }

      // const isEqual = await bcrypt.compare(args.userInput.password, user.password);


      // if (!isEqual) {
      //   throw new Error('Password is incorrect');
      // }


      if (args.userInput.LastName)
      {user.LastName=args.userInput.LastName}
      if (args.userInput.FirstName)
      {user.FirstName=args.userInput.FirstName}
      if (args.userInput.MiddleName)
      {user.MiddleName=args.userInput.MiddleName}
      if (args.userInput.Sex)
      {user.Sex=args.userInput.Sex}
      if (args.userInput.Birthday)
      {user.Birthday=args.userInput.Birthday}
      if (args.userInput.Language)
      {user.Language=args.userInput.Language}
      if (args.userInput.Image)
      {user.Image=args.userInput.Image}


      const result = await user.save();
      try {

      return { ...result._doc, password: null};
    }
    catch (err) {
      throw err;
    };
  },

  getUserData: async args => {
    try {


   console.log('getUserData')
   console.log(args)
  // {'_id':'62eb91623ea009cf5d8e2a02'}
  //objStr={_id:args.userInput.userId}
 objStr=`{"_id":"${args.userId}"}`
 obj = JSON.parse(objStr)
  //    const user = await User.findOne({ "_id": args.userInput.userId })
  const user = await User.findOne(obj)

      console.log(user.email)

      if (!user) {
        throw new Error('User doesnt exist!');
      }

      // const isEqual = await bcrypt.compare(args.userInput.password, user.password);


      // if (!isEqual) {
      //   throw new Error('Password is incorrect');
      // }


    
    
      return { ...user._doc, password: null};
    }
    catch (err) {
      throw err;
    };
  }

}