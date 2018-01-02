#!/usr/bin/env node

var Measured = require('measured')
var stats_rx = new Measured.Meter('rx')
var stats_cpu = new Measured.Gauge(function () { return os.loadavg() })

var os = require('os'), fs = require('fs')

var argv = require('minimist')(process.argv.slice(2))
var rxinterface = argv.interface || 'eth0'

var warning = argv.message || 'WARNING!'
var max_pps = argv.max_pps || 500
var max_mean = argv.max_mean || 1000
var max_cpu = argv.max_cpu || 2
var json = argv.json || false

var lastR = 0
var getPPS = function () {
  var RX1 = fs.readFileSync('/sys/class/net/' + rxinterface + '/statistics/rx_packets', 'utf8')
  if (lastR != 0) stats_rx.mark((RX1 || 0) - (lastR))
  lastR = RX1 || 0
}

setInterval(function () {
  getPPS()
  var pps = stats_rx.toJSON()
  var cpu = stats_cpu.toJSON()
  var res = {
    message: warning,
    pps: pps.currentRate,
    mean: pps.mean,
    cpu: cpu[0]
  }
  if (cpu > max_cpu || pps.mean > max_mean || pps.currentRate > max_pps) {
    if (!json) { console.log(new Date(), JSON.stringify(res))
    } else { res.timestamp = new Date(); console.log(res); }
  }
}, argv.interval || 1000)

console.log('PPS/CPU Counter started...', argv)
