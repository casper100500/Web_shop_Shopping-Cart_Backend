
const Order = require('../../models/order');
var ObjectId = require('mongodb').ObjectId;
const stripe = require("stripe")("sk_test_51LGe7YGUvmt8rPeQ8q2gvYL4SIP25obw5Oj7IwVkqjs00xWDBOvfIyCh10kur6gMgRMV2rV4DgjGceWL4SXLKLuD00yCXXOQ1P");

const MongodbQueryParser = require('mongodb-query-parser');

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log(items)
  if (items.totalPrice > 0) {//console.log('my Stripe - totalPrice!!!!')
    return items.totalPrice * 100;
  }
  else {
    return 100;
  }
};

module.exports =
{



  createOrder: async args => {
    console.log(args)
    try {

      const order = new Order({
        OrderCart: args.orderInput.orderCart,
        User: args.orderInput.email,
        PaymentID: args.orderInput.PaymentID,
        PaymentStatus: args.orderInput.PaymentStatus,
        SessionID: args.orderInput.SessionID
      })

      const result = await order.save();

      const description = `Order ${order.id}`

      const paymentIntent = await stripe.paymentIntents.create(
        {
          description: description,
          amount: calculateOrderAmount(args.orderInput.orderCart),
          currency: "eur"
        });

      const clientSecret = paymentIntent.client_secret
      console.log('clientSecret')

      console.log(clientSecret)


      return { ...order._doc, clientSecret: clientSecret };
    }
    catch (err) {
      throw err;
    };
  },

  ordersALL: async args => {
    console.log(args)

    if (args.PageNum === undefined || args.PageLimit === undefined) {
      PageNum = 1
      PageLimit = 1000
    }
    else {
      PageNum = args.PageNum
      PageLimit = args.PageLimit
    }

    console.log('PageNum:' + PageNum)
    console.log('PageLimit:' + PageLimit)


    try {
      var TotalCount = 0
      var objStr = ''

      //findStr....
      if (args.findStr!==undefined)
      {
      objStr = args.findStr.replace(/'/gi, '"')
      console.log(objStr)
      

      
        console.log('Custom request detected')
        obj = JSON.parse(objStr)
        console.log(obj)
  
        if (objStr.substr(0, 7) === `{"_id":`) {
          console.log('by id...')
          const   order = Order.find(obj)

         return { ...order._doc,Orders:order, TotalCount: 1 };
        }
        else {
          return
        }
      }
console.log('Orders ALL:')
      const order =  await Order.find({ User: args.email }
        //  ,
        //  function(err,docs){
        //    console.log(docs)
        //  }
        
        ).sort('email').skip(PageNum).limit(PageLimit)

      
      
      
         await Order.find({ User: args.email }).count().then((count) => {
           TotalCount = count
           console.log(count)
         })
         
      //return {...order._doc};
      console.log('Orders alll....')
      return { ...order._doc,Orders:order, TotalCount: TotalCount };
    }
    catch (err) {
      throw err;
    };
  }

}