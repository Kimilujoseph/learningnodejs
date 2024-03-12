const express = require("express")
const middleware = require('./middleware')
const app = express()
const api = require('./api')
const port = process.env.PORT || 3000
app.use(middleware.cors)
app.get('/products',api.listOfproducts)
app.get('/products/:id',api.productItems)
app.use(middleware.errorHandling)
app.use(middleware.errorhandler)

app.listen(port,()=>console.log(`The port is listening on port ${port}`))
