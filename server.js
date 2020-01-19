const http = require("http")

http.createServer (function(request, response) {
    
    console.log("Url: " + request.url)
    console.log("GET" + request.method)
    console.log("User-Agent: " + request.headers["user-agent"])
    console.log("Все заголовки")
    console.log(request.headers)
     
    response.end()
}).listen(3000)

const time = async (response) => {

    if (response.ok) { 
      let json = await response.time();
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }
}

var t = new Date()
console.log(t.toTimeString())
