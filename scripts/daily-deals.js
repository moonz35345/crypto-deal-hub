// Script: Daily Telegram crypto deals
// Called by cron job

const fs = require('fs');
const path = require('path');

// Read bot token - try multiple locations
let BOT_TOKEN='';
try {
    const tokenFile = fs.readFileSync(path.join(process.env.USERPROFILE || '', '.hermes', 'telegram_bot_token.txt'), 'utf-8');
    BOT_TOKEN = tokenFile.trim().split(':')[1] || '';
} catch(e) {
    // fallback - will still run but won't send
}

const CHAT_ID = '8072925213';

const deals = `🚀 *CryptoDealHub Daily Deals* ${new Date().toLocaleDateString('de-DE')}

💰 *Top Bonuses Heute:*

🔥 *Stake Casino* - 100% up to $1000
   → Code: Playgood
   → https://stake.bet/?c=Playgood

📊 *Kraken Exchange* - $100-300 Bonus  
   → https://invite.kraken.com/JDNW/5tbq3odf

🎰 *BC.Game* - Free Spins + Deposit Match
   → https://landingbc.com/bcfreespin/en?i=5rdwr628

📈 Aktuelle Crypto Charts:
• BTC: Watch 70k resistance
• ETH: Preparing for ETF news

📚 Mehr Deals: https://crypto-deal-hub.netlify.app

💡 Tipp: Kostenlose Crypto Starter Kit verfügbar!`;

async function sendTelegram() {
    if (!BOT_TOKEN) {
        console.log('No bot token configured, skipping send');
        return;
    }
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: deals,
                parse_mode: 'Markdown'
            })
        });
        
        const result = await response.json();
        console.log('Telegram sent:', result.ok ? 'OK' : JSON.stringify(result));
    } catch (error) {
        console.error('Telegram error:', error.message);
    }
}

sendTelegram();