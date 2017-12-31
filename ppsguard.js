#!/usr/bin/env node

var Measured = require('measured');
var stats_rx = new Measured.Meter('rx');
var stats_cpu = new Measured.Gauge(function(){ return os.loadavg(); }); 

var os = require("os"), fs = require('fs');

var argv = require('minimist')(process.argv.slice(2));
var interface = argv.interface || "eth0";

var warning = argv.message || "WARNING!";
var max_pps = argv.max_pps || 1000;
var max_cpu = argv.max_cpu || 2;

var lastR = 0;
var getPPS = function(){
	var RX1 = fs.readFileSync('/sys/class/net/'+interface+'/statistics/rx_packets','utf8');
		stats_rx.mark((RX1||0)-(lastR||0));
		lastR = RX1 || 0;
}

setInterval(function () {
  getPPS();
  var pps = stats_rx.toJSON().currentRate;
  var cpu = stats_cpu.toJSON()[0]
  if (cpu > max_cpu || pps > max_pps) {
	console.log( new Date(), warning, 'PPS:', pps,'CPU:', cpu);
  }

}, argv.interval || 1000);

console.log('PPS/CPU Counter started...',argv)
