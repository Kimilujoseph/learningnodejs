const express = require('express')
const app = express()
const EventEmmiters = require('events')
const fs = require('fs')
const textEmmission = new EventEmmiters()
app.get('/static/*',respondStatic)
function respondStatic(req,res){
    const filepath = `${__dirname}/${req.params[0]}`
    fs.createReadStream(filepath).on('error',() => respondFilenotFound(req,res))
    .pipe(res)
}
app.get('/chat',(req,res)=>{
    const { message } = req.query;
    textEmmission.emit('message',message)
    res.end()
})

app.get('/sse',(req,res)=>{
    res.writeHead(200,{
        'Content-Type':'text/event-stream',
        'Connection':'keep-alive'
    })
    const onmessage = msg => res.write(`data: ${msg}\n\n`)
    textEmmission.on('message',onmessage)
})
function respondFilenotFound(req,res){
    res.writeHead(404,{
        "Content-Type":"text/plai"
    })
    res.end('404: FILE NOT SEEN')
}
app.listen(3000,()=>console.log(`the server is running on port ${3000}`))