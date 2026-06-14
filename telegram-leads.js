// Telegram Bot Lead Management for CryptoDealHub
// Hardy Bot integration

const BOT_TOKEN = localStorage.getItem('telegramBotToken') || 'configured';
const TELEGRAM_CHAT_ID = '8072925213'; // Gökhan's chat

// Command: /deals - Show today's best crypto deals via Telegram
async function sendDealsToTelegram() {
    const leadData = {
        message: `🚀 *CryptoDealHub Daily Deals*\n\n` +
                 `💰 *Today's Best Bonuses:*\n\n` +
                 `1️⃣ *Stake.com* - 100% up to $1000\n` +
                 `   Code: Playgood\n` +
                 `   ${'https://stake.bet/?c=Playgood'}\n\n` +
                 `2️⃣ *Kraken* - $100-300 bonus\n` +
                 `   ${'https://invite.kraken.com/JDNW/5tbq3odf'}\n\n` +
                 `3️⃣ *BC.Game* - Free spins + deposit match\n` +
                 `   ${'https://landingbc.com/bcfreespin/en?i=5rdwr628'}\n\n` +
                 `📊 Want the full guide? Visit: https://crypto-deal-hub.netlify.app`
    };
    
    // Store for cron job to pick up
    localStorage.setItem('telegramDealQueue', JSON.stringify(leadData));
    return leadData;
}

// Command: /leads - Show captured leads count
function getLeadStats() {
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    const count = leads.length;
    const sources = leads.reduce((acc, lead) => {
        acc[lead.source] = (acc[lead.source] || 0) + 1;
        return acc;
    }, {});
    
    return {
        total: count,
        sources: sources,
        recent: leads.slice(-5)
    };
}

// Export for use by other scripts
window.CryptoLeadHub = {
    sendDealsToTelegram,
    getLeadStats,
    BOT_TOKEN,
    TELEGRAM_CHAT_ID
};

// Add Telegram lead capture button to lead-magnet page
document.addEventListener('DOMContentLoaded', function() {
    const tmSection = document.querySelector('.magnet-page .magnet-content');
    if (tmSection) {
        const tmBtn = document.createElement('button');
        tmBtn.innerHTML = '📱 Get Deals on Telegram';
        tmBtn.style.cssText = 'background:#3b82f6;color:#fff;border:none;padding:12px 24px;border-radius:8px;margin-top:20px;cursor:pointer;';
        tmBtn.onclick = () => {
            const leads = JSON.parse(localStorage.getItem('leads') || '[]');
            // In production, this would send to Telegram bot
            alert('Join @Hardyyybot on Telegram for daily deals!');
        };
        tmSection.appendChild(tmBtn);
    }
});