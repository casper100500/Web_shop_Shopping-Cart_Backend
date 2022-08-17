const Product = require('../../models/product');
var ObjectId = require('mongodb').ObjectId;

const MongodbQueryParser = require('mongodb-query-parser');
module.exports =
{
  products: async args => {
    // try {

    console.log('Products!')
    console.log(args)

    if (args.PageNum === undefined || args.PageLimit === undefined) {
      PageNum = 1
      PageLimit = 1000
    }
    else {
      PageNum = args.PageNum
      PageLimit = args.PageLimit
    }

    console.log(PageNum)
    console.log(PageLimit)

    objStr = args.findStr.replace(/'/gi, '"')
    console.log(objStr)


    if (objStr.substr(0, 1) === "{") {
      console.log('Custom request detected')
      obj = JSON.parse(objStr)
      console.log(obj)

      if (objStr.substr(0, 7) === `{"_id":`) {
        console.log('by id...')
        return await Product.find(obj)
      }
      else
      {
      return await Product.find(obj).sort('title').skip(PageNum).limit(PageLimit)
      }

    }
    else {
      console.log('search filter')
      return await Product.find({
        $or: [
          { title: { $regex: objStr, $options: 'i' } },
          { description: { $regex: objStr, $options: 'i' } }
        ]
      }).sort('title').skip(PageNum).limit(PageLimit)
      //.skip(PageNum).limit(PageLimit)
      // ,
      //   $skip: PageNum,
      //   $limit: PageLimit
    }
    //obj = JSON.parse(objStr)
    // const parser = new MongodbQueryParser();
    //var obj=parser.detect(objStr)
    //{'title': 'new RegExp('.*Mortal.*')'}
    // console.log(obj)

    //const products = await Product.find(obj)
    //const filterWithQuotedDates = filter.replace(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}(\+\d{2}:\d{2})?)/g, '"$1"')
    //const search=new RegExp('.*Mortal.*')
    //const search = `{filter: {title: /Mortal$/i}}`
    //        const products = await Product.find( { title: { $regex: objStr, $options: 'i' }  })

    //console.log(products)

    // return products
    try {
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