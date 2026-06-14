// Lead Capture System for CryptoDealHub

// Exit-intent popup
(function() {
    let exitIntentShown = sessionStorage.getItem('exitIntentShown');
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            showExitIntent();
            sessionStorage.setItem('exitIntentShown', 'true');
        }
    });
    
    function showExitIntent() {
        const popup = document.createElement('div');
        popup.id = 'exit-intent-popup';
        popup.innerHTML = `
            <div class="popup-overlay" onclick="closePopup()"></div>
            <div class="popup-content">
                <button class="popup-close" onclick="closePopup()">×</button>
                <div class="popup-icon">🎁</div>
                <h3>Wait! Get Your Free Crypto Starter Kit</h3>
                <p>Get our exclusive checklist + bonus finder guide — instantly sent to your inbox.</p>
                <form class="popup-form" onsubmit="handleLeadCapture(event)">
                    <input type="email" name="email" placeholder="your@email.com" required>
                    <button type="submit">Download Free Guide</button>
                </form>
                <div class="popup-success" style="display:none;">
                    <p style="color:var(--green);margin-top:16px;">✓ Check your inbox! Guide sent.</p>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        document.body.style.overflow = 'hidden';
    }
    
    window.closePopup = function() {
        const popup = document.getElementById('exit-intent-popup');
        if (popup) popup.remove();
        document.body.style.overflow = '';
    };
    
    window.handleLeadCapture = function(e) {
        e.preventDefault();
        const email = e.target.email.value;
        
        // Store lead locally (works without backend)
        const leads = JSON.parse(localStorage.getItem('leads') || '[]');
        leads.push({ email, timestamp: new Date().toISOString(), source: 'exit-intent' });
        localStorage.setItem('leads', JSON.stringify(leads));
        
        // Show success
        const form = e.target;
        form.style.display = 'none';
        form.parentElement.querySelector('.popup-success').style.display = 'block';
        
        // Trigger download
        downloadLeadMagnet();
    };
    
    // Handle inline newsletter signup
    window.handleNewsletterSignup = function(e) {
        e.preventDefault();
        const email = e.target.email.value;
        
        const leads = JSON.parse(localStorage.getItem('leads') || '[]');
        leads.push({ email, timestamp: new Date().toISOString(), source: 'newsletter' });
        localStorage.setItem('leads', JSON.stringify(leads));
        
        // Show success
        e.target.innerHTML = '<p style="color:var(--green);margin:0;">✓ Check your inbox! Guide sent.</p>';
    };
})();

// Lead magnet downloads - navigate to HTML pages (printable as PDF)
function downloadLeadMagnet(type = 'starter') {
    if (!confirm('Email captured! Click OK to open the guide. Use Ctrl+P to save as PDF.')) return;
    window.location.href = type === 'starter' ? '/pdfs/crypto-starter-kit.html' : '/pdfs/bonus-hunter-guide.html';
}

// Lead magnet button handlers
document.addEventListener('DOMContentLoaded', function() {
    // Add lead magnet buttons to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const leadBanner = document.createElement('div');
        leadBanner.className = 'lead-banner';
        leadBanner.innerHTML = `
            <div class="lead-banner-inner">
                <span>🎁 Free: Crypto Starter Kit + Bonus Guide</span>
                <button onclick="downloadLeadMagnet('starter')" class="btn btn-sm btn-primary">Download Now</button>
            </div>
        `;
        heroSection.appendChild(leadBanner);
    }
    
    // Add CSS for popup and banner
    const style = document.createElement('style');
    style.textContent = `
        /* Exit Intent Popup */
        #exit-intent-popup {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .popup-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
        }
        .popup-content {
            position: relative;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            padding: 40px;
            max-width: 440px;
            text-align: center;
            z-index: 1;
        }
        .popup-close {
            position: absolute;
            top: 16px;
            right: 20px;
            background: none;
            border: none;
            color: var(--text-dim);
            font-size: 1.8rem;
            cursor: pointer;
        }
        .popup-close:hover { color: var(--text); }
        .popup-icon { font-size: 3rem; margin-bottom: 16px; }
        .popup-content h3 { font-size: 1.3rem; margin-bottom: 12px; }
        .popup-content p { color: var(--text-secondary); margin-bottom: 24px; }
        .popup-form { display: flex; flex-direction: column; gap: 12px; }
        .popup-form input {
            padding: 14px 18px;
            border-radius: var(--radius);
            border: 1px solid var(--border);
            background: var(--bg);
            color: var(--text);
            font-size: 0.95rem;
        }
        .popup-form button {
            padding: 14px;
            background: linear-gradient(135deg, var(--accent), var(--accent-dark));
            color: #000;
            border: none;
            border-radius: var(--radius);
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }
        .popup-form button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(245,158,11,0.35);
        }
        
        /* Lead Banner */
        .lead-banner {
            background: linear-gradient(90deg, rgba(245,158,11,0.1), rgba(16,185,129,0.1));
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 20px;
            margin-top: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
        }
        .lead-banner-inner {
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .lead-banner-inner span {
            font-weight: 600;
            color: var(--text);
        }
        
        /* Lead Magnet Cards */
        .lead-magnet-card {
            background: linear-gradient(135deg, var(--card), var(--bg-elevated));
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            padding: 32px;
            text-align: center;
            margin: 40px 0;
        }
        .lead-magnet-card h3 {
            font-size: 1.25rem;
            margin-bottom: 12px;
        }
        .lead-magnet-card p {
            color: var(--text-secondary);
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);
});