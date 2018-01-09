# ppsGuard
Barebone PPS/CPU Rate Watcher for console and UDP loggers. Useful for measuring bottlenecking events into [paStash](https://github.com/sipcapture/pastash) or other tools.

### Install
```
sudo npm install -g ppsguard
```

### Usage
```
ppsguard --max_pps=300 --max_cpu=3
```

### Usage w/ limited UDP output
```
ppsguard --max_pps=300 --max_cpu=3 --limit_amount=1 --limit_every 'minute' --udp 127.0.0.1:1234
```

#### Output
```
2017-12-31T00:29:13.405Z 'WARNING!' 'PPS:' 1493.2018766312679 'CPU:' 2.55712890625
2017-12-31T00:29:33.439Z 'WARNING!' 'PPS:' 1374.6596774790248 'CPU:' 1.89306640625
2017-12-31T00:29:43.454Z 'WARNING!' 'PPS:' 349.478350046417 'CPU:' 1.67529296875
```

### Options
* ``--interface``    : Ethernet Interface. _(default: eth0)_
* ``--max_pps``      : PPS Current Treshold. _(default: 500)_
* ``--max_mean``     : PPS Mean Treshold. _(default: 1000)_
* ``--max_cpu``      : CPU Treshold, _(default: 2)_
* ``--message``      : Warning Message _(default: "WARNING!")_
* ``--json``         : Output raw JSON  _(default: false)_
* ``--udp``          : Output to UDP socket, Example: 127.0.0.1:1234 _(default: false)_
* ``--limit_amount`` : Allowed hits per interval, _(default: 1)_
* ``--limit_every``  : Interval. Accepts 'second', 'minute', 'hour' or value in ms, _(default: 'second')_
