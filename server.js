const http = require("http")

http.createServer(function(request, response){
    console.log("Url: " + request.url);
    console.log("GET" + request.method);
    console.log("User-Agent: " + request.headers["user-agent"]);
    console.log("Все заголовки");
    console.log(request.headers);
     
    response.end();
}).listen(3000);

var date = new Date(2020, 0, 19, 21, 30, 0)

var options = {
  era: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

var t = new Date()
console.log(t.toTimeString())

console.log(date.toLocaleString('ru', options))
console.log(date.toLocaleString('en-US', options))
