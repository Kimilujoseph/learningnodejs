const fs = require('fs').promises;
const path = require('path')

module.exports = {
    productlist,
    filterdItem
}

async function productlist(pagination={}){
    const files = path.join(__dirname,'/product.json')
    let products = await fs.readFile(files)
    const {offset = 0,limit = 25} = pagination;
    let startIndex = (offset -1) * limit;
    let endIndex = offset * limit;
    return JSON.parse(products).slice(startIndex,endIndex)
}

async function filterdItem(id){
    const identification = id;
    //console.log(identification)
    const files = path.join(__dirname,'/product.json')
    let products = await fs.readFile(files)
    return JSON.parse(products).filter((p,i)=>p.id.indexOf(identification)>=0);
}