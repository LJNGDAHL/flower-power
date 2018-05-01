var http = require('http')
var tessel = require('tessel')
var notify = require('./notify')

var gpio = tessel.port['GPIO']
var input = gpio.pin['A1']
var power = gpio.pin['G1']
var speaker = gpio.pin['G4']

setInterval(poll, 1000 * 60 * 60)

poll()

var server = http.createServer(function (req, res) {
  try {
    read(function (value) {
      res.statusCode = 200
      res.end(value)
    })
  } catch (err) {
    res.statusCode = 500
    res.end(err.message)
  }
})

// server.listen(8080)

function read (cb) {
  power.output(1)

  setTimeout(function () {
    var value = input.read()
    power.output(0)
    cb(value)
  }, 10)
}

function poll () {
  read(function (value) {
    if (value <= 0.2) {
      notify(speaker)
    }
  })
}
