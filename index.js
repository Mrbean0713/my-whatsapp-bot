const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session");

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        browser: ["Chrome", "Desktop", "22.04"]
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "open") {
            console.log("✅ Bot connecté WhatsApp");
        }

        if (connection === "close") {
            const code = lastDisconnect?.error?.output?.statusCode;

            console.log("Connexion fermée:", code);

            if (code !== DisconnectReason.loggedOut) {
                console.log("🔁 Reconnexion dans 5 secondes...");
                setTimeout(startBot, 5000);
            } else {
                console.log("❌ Déconnecté définitivement");
            }
        }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text;

        const jid = msg.key.remoteJid;

        if (text === ".menu") {
            await sock.sendMessage(jid, {
                text: "🤖 MENU\n.menu\n.alive"
            });
        }

        if (text === ".alive") {
            await sock.sendMessage(jid, {
                text: "✅ Bot OK"
            });
        }
    });

    console.log("🚀 Bot lancé");
}

startBot();
