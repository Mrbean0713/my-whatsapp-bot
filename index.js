const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        const jid = msg.key.remoteJid;

        if (text === ".menu") {
            await sock.sendMessage(jid, {
                text: "🤖 MENU\n\n.menu\n.alive"
            });
        }

        if (text === ".alive") {
            await sock.sendMessage(jid, {
                text: "✅ Bot en ligne"
            });
        }
    });

    console.log("Bot lancé");
}

startBot();
