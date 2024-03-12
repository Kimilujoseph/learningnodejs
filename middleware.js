module.exports = {
    cors,
    errorHandling,
    errorhandler
}

function cors(req,res,next){
const origin = req.headers.origin
res.setHeader('Access-Control-Allow-Origin', origin || '*')
res.setHeader(
'Access-Control-Allow-Methods',
'POST, GET, PUT, DELETE, OPTIONS, XMODIFY'
)
res.setHeader('Access-Control-Allow-Credentials', 'true')
res.setHeader('Access-Control-Max-Age', '86400')
res.setHeader(
'Access-Control-Allow-Headers',
'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
)
next()
}

function errorHandling(err,req,res,next){
    console.error(err)
    if(res.headerSent) return next(err)
    res.status(500).json({error:'internal Error'})

}
function errorhandler(req,res){
    res.status(404).json({error:'404 Error file cannot see file'})
}