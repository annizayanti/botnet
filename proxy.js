const fs = require('fs');

const proxies = [];
const output_file = 'proxy.txt';



const raw_proxy_sites = [
"https://raw.githubusercontent.com/annizayanti/proxy/refs/heads/main/proxy.txt",
"https://raw.githubusercontent.com/annizayanti/proxy/refs/heads/main/http_old.txt",
"https://raw.githubusercontent.com/annizayanti/proxy/refs/heads/main/http.txt",
"https://raw.githubusercontent.com/annizayanti/proxy/refs/heads/main/hproxy.txt",
"https://raw.githubusercontent.com/annizayanti/proxyyy/refs/heads/main/proxy.txt",
"https://raw.githubusercontent.com/annizayanti/proxyyy/refs/heads/main/proxyyy.txt",
"https://raw.githubusercontent.com/annizayanti/proxyyy/refs/heads/main/proxyyyy.txt"
];

async function fetchProxies() {
  for (const site of raw_proxy_sites) {
    try {
      const response = await fetch(site);
      if (response.ok) {
//console.log(`success: ${site}`);
        const data = await response.text();
        const lines = data.split('\n');
        for (const line of lines) {
          if (line.includes(':')) {
            const [ip, port] = line.split(':', 2);
            proxies.push(`${ip}:${port}`);
          }
        }
      } else {
//console.log(`skip: ${site}`);
      }
    } catch (error) {
//console.error(`skip: ${site}`);
    }
  }
if (fs.existsSync(output_file)) {
  fs.unlinkSync(output_file);
  console.log(`'${output_file}' telah dihapus.`);
}

  fs.writeFileSync(output_file, proxies.join('\n'));
  fs.readFile(output_file, 'utf8', (err, data) => {
    if (err) {
      console.error('Gagal membaca file:', err);
      return;
    }
    const proxies = data.trim().split('\n');
    const totalProxies = proxies.length;
    console.log(`success scraping ${totalProxies} proxy`);
  });
}
fetchProxies();
