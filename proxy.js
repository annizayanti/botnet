const axios = require('axios');
const fs = require('fs');

async function scrapeProxies() {
  const proxySources = [
    'https://raw.githubusercontent.com/annizayanti/proxy/refs/heads/main/proxy.txt',
'https://raw.githubusercontent.com/annizayanti/proxy/refs/heads/main/http_old.txt',
'https://raw.githubusercontent.com/annizayanti/proxy/refs/heads/main/http.txt',
'https://raw.githubusercontent.com/annizayanti/proxy/refs/heads/main/hproxy.txt',
'https://raw.githubusercontent.com/annizayanti/proxyyy/refs/heads/main/proxy.txt',
'https://raw.githubusercontent.com/annizayanti/proxyyy/refs/heads/main/proxyyy.txt',
'https://raw.githubusercontent.com/annizayanti/proxyyy/refs/heads/main/proxyyyy.txt'
  ];

  let proxies = [];

    // Hapus file proxy.txt lama
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
    console.log(`proxy.txt lama berhasil dihapus`);
  }
  
  for (const source of proxySources) {
    try {
      const response = await axios.get(source);
      proxies = proxies.concat(response.data.split('\n'));
    } catch (error) {
      console.log(`Error Scraping`);
    }
  }

  fs.writeFileSync('proxy.txt', proxies.join('\n'));
  console.log(`Proxies successfully scraped and saved to proxy.txt`);
}
module.exports = scrapeProxies;
