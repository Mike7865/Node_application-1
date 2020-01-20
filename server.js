const http = require("http")

http.createServer (function(request, response) {
    
  import http from 'http';

  http.get('http', res => {
    console.log(res.statusCode);
  });

    console.log("Url: " + request.url)
    console.log("GET" + request.method)
    console.log("User-Agent: " + request.headers["user-agent"])
    console.log("Все заголовки")
    console.log(request.headers)
     
    response.end()
}).listen(3000)

request.send();

const time = async (response) => {

    if (response.ok) { 
      let json = await response.time();
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }
}

var t = new Date()
console.log(t.toTimeString())
