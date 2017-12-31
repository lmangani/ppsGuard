# ppsGuard
Barebone PPS/CPU Rate Watcher for console

### Install
```
sudo npm install -g ppsguard
```

### Usage
```
ppsguard --max_pps=1000
```

### Options
* ``--max_pps``: PPS Treshold. _(default: 1000)_
* ``--max_cpu``: CPU Treshold, _(default: 2)_
* ``--message``: Warning Message _(default: "WARNING!")_
