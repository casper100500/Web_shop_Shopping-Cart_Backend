const Product = require('../../models/product');
var ObjectId = require('mongodb').ObjectId;

module.exports =
{
  products: async args => {
    // try {

    console.log('Products!')
    console.log(args)

    try {
   

      if (args.ObjectId) {
        console.log('Found!!!')
 
        obj = args.ObjectId
        console.log( args.ObjectId)
        obj={_id:args.ObjectId}
      }
      else {
        console.log('Not found!!!')
        objStr = args.findStr.replace(/'/gi, '"')
        obj = JSON.parse(objStr)
        console.log(obj)
      }
      const products = await Product.find(obj )
      

      return products
    }
    catch (err) {
      throw err;
    };

    // products.map(product => {
    //   console.log(product.id)

    //   return {
    //     ...product._doc,
    //     _id: product.id
    //   }

    // })

    // return {
    //   id: product.id,
    //   imagePath: product.imagePath,
    //   title: product.title,
    //   description: product.description
    // }

    // return {
    //   ...product._doc, 
    //   _id:product.id
    //   }


    //console.log(products)

    // console.log(...products._doc)
    //...products._doc
    //_id:products.id


    // id:products.id,
    // imagePath:products.imagePath,
    // title:products.title,
    // description:products.description

    // return { ...products._doc, _id: products.id, };
    // }
    // catch (err) {
    //   throw err;
    // };
  }
}