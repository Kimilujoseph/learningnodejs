let source = new EventSource('/sse')

source.onmessage = function(evt){
    document.getElementById('messages').innerHTML += `<p>${evt.data}</p>`
}

let form = document.getElementById('forms');
form.addEventListener('submit',(evt)=>{
    evt.preventDefault()
    var input = document.getElementById('input');
    makerequest(`/chat?message=${input.value}`)
    input.value= ''
})

const makerequest = (routerw)=>{
   return new Promise((resolve,reject)=>{
    var request = new XMLHttpRequest()
    request.addEventListener('readystatechange',()=>{
        if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText)
            resolve(data)
        }
        else if(request.readyState == 4){
            let error= new Error(`404: ERROR FILE CANNOT BE FOUND`)
            reject(error)
        }
    })
    request.open("GET",routerw)
    request.send()
   })
}