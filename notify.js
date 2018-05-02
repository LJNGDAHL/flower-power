'use strict'

var series = require('async/series')
var tessel = require('tessel')
var gpio = tessel.port['GPIO']

var FREQUENCY = 500
var CYCLE = 0.7

module.exports = notify

function notify (speaker) {
  series([
    beep(70),
    wait(60),
    beep(70),
    wait(60),
    beep(70),
    wait(120),

    beep(180),
    wait(60),
    beep(180),
    wait(60),
    beep(180),
    wait(120),

    beep(70),
    wait(60),
    beep(70),
    wait(60),
    beep(70)
  ])

  function beep (delay) {
    return function (cb) {
      gpio.pwmFrequency(FREQUENCY)
      speaker.pwmDutyCycle(CYCLE)

      setTimeout(function () {
        speaker.pwmDutyCycle(0)
        cb()
      }, delay)
    }
  }

  function wait (delay) {
    return function (cb) {
      setTimeout(cb, delay)
    }
  }
}
