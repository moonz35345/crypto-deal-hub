// Netlify Function: Capture lead without backend
// Endpoint: /.netlify/functions/capture-lead?email=...

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '8072925213';

exports.handler = async (event, context) => {
    const { email, source } = event.queryStringParameters || {};
    
    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Email required' })
        };
    }
    
    // For now, just return success - in production would save to DB
    // and notify via Telegram
    
    const leadData = {
        email,
        source: source || 'website',
        timestamp: new Date().toISOString()
    };
    
    // Send to Telegram if configured
    if (TELEGRAM_BOT_TOKEN) {
        try {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: `🎯 New Lead: ${email}\nSource: ${source}`,
                    parse_mode: 'Markdown'
                })
            });
        } catch (err) {
            console.log('Telegram notification failed:', err);
        }
    }
    
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, lead: leadData })
    };
};