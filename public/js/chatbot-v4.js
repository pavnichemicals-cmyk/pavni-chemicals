/**
 * Pavni Chemicals - Catalog Assistant Chatbot v4
 * Bulletproof version: self-contained, no external dependencies required at load time.
 */

(function () {
    // Wait for the DOM to be fully ready
    function init() {

        // ── 1. Inject HTML ──────────────────────────────────────────────────────
        const chatbotHTML = `
        <div class="chatbot-trigger" id="chat-trigger" title="Ask Pavni Assistant">
            <svg id="chat-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <svg id="chat-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
        <div class="chatbot-window" id="chat-window">
            <div class="chatbot-header">
                <div class="chatbot-avatar">⚗️</div>
                <div>
                    <h3 style="color:var(--white); font-size:1rem; margin:0;">Pavni Chemicals AI</h3>
                    <p style="color:var(--teal); font-size:0.7rem; margin:0; text-transform:uppercase; letter-spacing:0.05em;">Chemical Expert • Online</p>
                </div>
            </div>
            <div class="chatbot-content" id="chat-content">
                <div class="chat-msg bot">Hello! Pavni Chemicals AI Assistant at your service.<br>• Industrial chemical expert<br>• Authorized Grasim & Epigral Dealer<br>• Technical specs & business support</div>
            </div>
            <div class="chatbot-input-wrap" style="position:relative; display:flex; gap:0.5rem; align-items:center;">
                <input type="text" id="chat-input" class="chatbot-input" placeholder="Search chemicals or ask a question..." autocomplete="off" style="flex:1; padding-right: 2.5rem;">
                <button id="chat-send-btn" style="position:absolute; right:1.5rem; background:none; border:none; color:var(--teal); cursor:pointer; display:flex; align-items:center; justify-content:center; padding:0.5rem;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
            <div style="padding: 0.5rem 1rem; font-size: 0.65rem; color: var(--text-muted); border-top: 1px solid var(--navy-border); text-align: center;">*Focused on Pavni Chemicals & industrial portfolio.</div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        // ── 2. Get references ───────────────────────────────────────────────────
        var trigger   = document.getElementById('chat-trigger');
        var windowEl  = document.getElementById('chat-window');
        var input     = document.getElementById('chat-input');
        var content   = document.getElementById('chat-content');
        var sendBtn   = document.getElementById('chat-send-btn');
        var iconOpen  = document.getElementById('chat-icon-open');
        var iconClose = document.getElementById('chat-icon-close');

        // ── 3. Toggle open/close ────────────────────────────────────────────────
        trigger.addEventListener('click', function () {
            windowEl.classList.toggle('active');
            var isActive = windowEl.classList.contains('active');
            iconOpen.style.display  = isActive ? 'none'  : 'block';
            iconClose.style.display = isActive ? 'block' : 'none';
            if (isActive) input.focus();
        });

        window.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') windowEl.classList.remove('active');
        });

        // ── 4. FAQ Knowledge Base ───────────────────────────────────────────────
        var qaDB = [
            { keywords: ['quote', 'price', 'pricing', 'buy', 'cost', 'rate'],
              answer: 'For accurate pricing and bulk quotations, please <a href="contact.html#quote" style="color:var(--teal);font-weight:bold;text-decoration:underline;">request a quote here</a> or call +91 96873 70005.' },
            { keywords: ['partner', 'dealer', 'grasim', 'authorized', 'aditya', 'birla', 'epigral'],
              answer: 'We are an Authorized Dealer for Aditya Birla Grasim Industries and Epigral Limited. We guarantee 100% genuine products with manufacturer certification. <a href="about.html" style="color:var(--teal);font-weight:bold;text-decoration:underline;">Read about us</a>.' },
            { keywords: ['supplier', 'brand', 'manufacturer', 'nirma', 'reliance', 'tata', 'dcm', 'gacl', 'gnfc'],
              answer: 'We distribute premium chemicals from top manufacturers including Grasim, DCM, GACL, GNFC, Reliance, Epigral, GFL, Tata, Nirma, GHCL, DCW, Deepak Nitrite, and Deepak.' },
            { keywords: ['experience', 'years', 'history', 'since', 'established'],
              answer: 'Pavni Chemicals has over 12+ years of uninterrupted supply experience in the chemical distribution industry. <a href="about.html" style="color:var(--teal);font-weight:bold;text-decoration:underline;">Learn more</a>.' },
            { keywords: ['contact', 'phone', 'call', 'number', 'mobile', 'reach'],
              answer: '• Sales Desk: +91 96873 70005\n• Web: <a href="contact.html" style="color:var(--teal);font-weight:bold;">Contact Page</a>' },
            { keywords: ['email', 'mail'],
              answer: '• Inquiry: sales@pavnichemicals.com\n• Form: <a href="contact.html" style="color:var(--teal);font-weight:bold;">Contact Form</a>' },
            { keywords: ['location', 'where', 'office', 'godown', 'factory', 'address', 'ankleshwar'],
              answer: '• Address: Godown No 1, Plot No 43, Shree Ram Estate, Ankleshwar, Gujarat\n• Map: <a href="https://maps.app.goo.gl/aLiC9WwcdXXxN3w66" target="_blank" style="color:var(--teal);font-weight:bold;">View on Google Maps</a>' },
            { keywords: ['delivery', 'dispatch', 'stock', 'inventory', 'available', 'immediate'],
              answer: '• Ready Inventory: All 53 catalog products\n• Dispatch: Immediate dispatch capability\n• Supply: Reliable industrial chain' },
            { keywords: ['product', 'list', 'catalog', 'items', 'chemical', 'all'],
              answer: '• Portfolio: 53+ Premium chemicals\n• View: <a href="products.html" style="color:var(--teal);font-weight:bold;">Full Catalog</a>' },
            { keywords: ['textile', 'pharma', 'water', 'paper', 'agriculture', 'petrochemical', 'industry', 'industries', 'application'],
              answer: '• Sectors: Textiles, Pharma, Water Treatment\n• Other: Paper, Agriculture, Petrochemicals\n• Full List: <a href="industries.html" style="color:var(--teal);font-weight:bold;">Industries Served</a>' },
            { keywords: ['safety', 'precaution', 'handling', 'msds', 'sds', 'hazard'],
              answer: '• Document: Full MSDS/SDS provided\n• Requirement: Mandatory PPE usage\n• Storage: Designated ventilated areas' },
            { keywords: ['gst', 'tax', 'registration', 'gstin'],
              answer: '• GSTIN: 24ABEFP4368B1ZG' },
            { keywords: ['brochure', 'catalogue', 'pdf', 'download'],
              answer: '• Brochure: <a href="docs/PAVNI CHEMICALS BROCHURE.pdf" download style="color:var(--teal);font-weight:bold;">📥 Download PDF</a>' },
            { keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon'],
              answer: '• Hello: Pavni Chemicals Assistant at your service\n• Support: Products, Pricing, Location, Delivery' }
        ];

        // ── 5. Add a chat message bubble ────────────────────────────────────────
        function addMessage(html, who) {
            var el = document.createElement('div');
            el.className = 'chat-msg ' + who + ' anim-fade-up';
            el.innerHTML = html;
            content.appendChild(el);
            content.scrollTop = content.scrollHeight;
        }

        // ── 6. Process a user query ─────────────────────────────────────────────
        function processQuery(rawQuery) {
            var query = rawQuery.trim();
            if (!query) return;

            // Show user message
            addMessage(escapeHtml(query), 'user');
            input.value = '';

            var queryLow = query.toLowerCase();

            // Bot responds after short delay (feels natural)
            setTimeout(function () {

                var responded = false;

                // Check FAQ first
                for (var i = 0; i < qaDB.length; i++) {
                    var entry = qaDB[i];
                    var matched = entry.keywords.some(function (k) {
                        return queryLow.indexOf(k) !== -1;
                    });
                    if (matched) {
                        addMessage(entry.answer, 'bot');
                        responded = true;
                        break;
                    }
                }

                // Search product catalog
                var catalog = (typeof productsData !== 'undefined') ? productsData : (window.productsData || []);
                var matches = catalog.filter(function (p) {
                    var name    = (p.name    || '').toLowerCase();
                    var formula = (p.formula || '').replace(/<[^>]*>/g, '').toLowerCase();
                    var cat     = (p.category|| '').toLowerCase();
                    var uses    = (p.uses    || []).join(' ').toLowerCase();
                    var desc    = (p.description || '').toLowerCase();
                    return name.indexOf(queryLow) !== -1 ||
                           formula.indexOf(queryLow) !== -1 ||
                           cat.indexOf(queryLow) !== -1 ||
                           uses.indexOf(queryLow) !== -1 ||
                           desc.indexOf(queryLow) !== -1;
                }).slice(0, 3);

                if (matches.length > 0) {
                    var html = '<div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;margin-bottom:0.75rem;">Found ' + matches.length + ' matching product(s):</div>';
                    matches.forEach(function (m) {
                        html += '<div style="margin-bottom:0.75rem;padding:0.65rem 0.8rem;background:rgba(255,255,255,0.04);border-radius:6px;border-left:3px solid var(--teal);">' +
                            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">' +
                            '<strong style="color:var(--white);font-size:0.88rem;">' + m.name + '</strong>' +
                            '<span style="color:var(--teal);font-size:0.75rem;font-weight:700;">' + (m.formula || '').replace(/<[^>]*>/g,'') + '</span>' +
                            '</div>' +
                            '<div style="font-size:0.73rem;color:var(--text-muted);margin-bottom:0.4rem;">' + (m.uses||[]).slice(0,2).join(', ') + '</div>' +
                            '<a href="product-detail.html?id=' + m.id + '" style="font-size:0.73rem;color:var(--teal);text-decoration:none;font-weight:700;">Full Spec & MSDS →</a>' +
                            '</div>';
                    });
                    var box = document.createElement('div');
                    box.className = 'search-results-container anim-fade-up';
                    box.style.cssText = 'background:rgba(0,212,180,0.04);border:1px solid var(--navy-border);padding:0.9rem;border-radius:8px;margin-top:0.4rem;';
                    box.innerHTML = html;
                    content.appendChild(box);
                    content.scrollTop = content.scrollHeight;
                    responded = true;
                }

                if (!responded) {
                    // FALLBACK: Call our secure Node.js AI backend
                    addMessage('<div class="typing-indicator"><span></span><span></span><span></span></div>', 'bot typing');
                    
                    fetch('http://localhost:5000/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: query })
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Remove typing indicator
                        var typing = document.querySelector('.chat-msg.bot.typing');
                        if (typing) typing.remove();
                        
                        if (data.response) {
                            addMessage(data.response, 'bot');
                        } else {
                            addMessage('I\'m having trouble connecting to my AI brain. Please try again later or contact us at <a href="contact.html" style="color:var(--teal);">sales@pavnichemicals.com</a>.', 'bot');
                        }
                    })
                    .catch(err => {
                        console.error('AI Error:', err);
                        var typing = document.querySelector('.chat-msg.bot.typing');
                        if (typing) typing.remove();
                        addMessage('I couldn\'t find a direct answer. Please contact our sales desk at <strong>+91 96873 70005</strong> for assistance.', 'bot');
                    });
                }

            }, 320);
        }

        // ── 7. Simple HTML escape helper ────────────────────────────────────────
        function escapeHtml(str) {
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        }

        // ── 8. Event listeners ──────────────────────────────────────────────────
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') processQuery(input.value);
        });

        sendBtn.addEventListener('click', function () {
            processQuery(input.value);
        });
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
