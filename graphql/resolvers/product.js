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

    var TotalCount = 1

    if (objStr.substr(0, 1) === "{") {
      console.log('Custom request detected')

      obj = JSON.parse(objStr)
      console.log(obj)

      if (objStr.substr(0, 7) === `{"_id":`) {
        console.log('by id...')
     
        products = Product.find(obj)

      }

            else {
        
//correct me !!!!!!!!! *********************

//console.log('work?')
console.log(obj)
        products = Product.find(obj).sort('title').skip(PageNum).limit(PageLimit)
      }


      await Product.find().count().then((count) => {
        TotalCount = count
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
        TotalCount = count
      })

    }





    return {
      Products: products,
      TotalCount: TotalCount
    }





  },
  createUpdateProduct: async args => {
    console.log('createUpdateProduct')

    console.log(args)

    if (!args.productInput._id) {
      try {

        const product = new Product({
          imagePath: args.productInput.imagePath,
          title: args.productInput.title,
          description: args.productInput.description,
          price: args.productInput.price,
          catalogID: args.productInput.catalogID

        })

        const result = await product.save();



        return { ...result._doc };
      }
      catch (err) {
        throw err;
      };
    }
    else {
      console.log('Update product detected')


      console.log('by id...')
      const objStr = `{"_id":"${args.productInput._id}"}`
      console.log(objStr)
      obj = JSON.parse(objStr)
      const product = await Product.findOne(obj)
      // console.log(product)
      product.imagePath = args.productInput.imagePath
      product.title = args.productInput.title
      product.description = args.productInput.description
      product.price = args.productInput.price
      product.catalogID = args.productInput.catalogID



      const result = await product.save();



      return { ...result._doc };
    }
  }


}