const Product = require('../../models/product');
var ObjectId = require('mongodb').ObjectId;

const MongodbQueryParser = require('mongodb-query-parser');


module.exports =
{
  

  productsALL: async args => {
    // try {

    console.log('ProductsALL!')
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

    objStr = args.findStr.replace(/'/gi, '"')
    console.log(objStr)

    var products = new Product
    
    var TotalCount=1

    if (objStr.substr(0, 1) === "{") {
      console.log('Custom request detected')
      obj = JSON.parse(objStr)
      console.log(obj)

      if (objStr.substr(0, 7) === `{"_id":`) {
        console.log('by id...')
        products = Product.find(obj)

      }
      else {
        products = Product.find(obj).sort('title').skip(PageNum).limit(PageLimit)
      }
      
    
      await Product.find().count().then((count) => {
        TotalCount=count
      })
    }
    else {
      console.log('search filter')
      products = await Product.find({
        $or: [
          { title: { $regex: objStr, $options: 'i' } },
          { description: { $regex: objStr, $options: 'i' } }
        ]
      }).sort('title').skip(PageNum).limit(PageLimit)
      
      await Product.find({
        $or: [
          { title: { $regex: objStr, $options: 'i' } },
          { description: { $regex: objStr, $options: 'i' } }
        ]
      }).sort('title').count().then((count) => {
        //console.log(count)
        TotalCount=count
      })
 
    }

    
    


    return { Products:products,
      TotalCount:TotalCount
     }





    }
    
  
  }