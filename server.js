const http = require("http")

http.createServer(function(request, response){
    console.log("Url: " + request.url)
    console.log("GET" + request.method)
    console.log("User-Agent: " + request.headers["user-agent"])
    console.log("Все заголовки")
    console.log(request.headers)
     
    response.end()
}).listen(3000)

var t = new Date()
console.log(t.toTimeString())
