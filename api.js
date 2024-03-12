const products = require('./productmodule')

module.exports={
    listOfproducts,
    productItems
}

async function listOfproducts(req,res){
    const { offset = 0 , limit=25} = req.query;
    let files= await products.productlist({
        offset:parseInt(req.query.offset),
        limit:parseInt(req.query.limit)
    })
    let resources = {}
    resources.resources = files;
    resources.previous={
        page:parseInt(req.query.offset) - 1,
        limit:limit
    }
    resources.next={
        offset:parseInt(req.query.offset) + 1,
        limit:limit
    }
    res.json(resources)

}

async function productItems(req,res,next){
    const {id} = req.params
    let productitems= await products.filterdItem(id)
    if(!productItems) return next()
    res.json(productitems)

}