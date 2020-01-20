const http = require("http")

http.createServer(function (request, response) {
  var now = new Date()

  console.log(request.method)

  function callback () {

    console.log(now)
  }

  var interval = setInterval(callback, 1000)
  setTimeout(() => {
    clearInterval(interval) 
  }, 5000)
}).listen(4000)
