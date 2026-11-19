/**
 * Pavni Chemicals - Product Search Chatbot
 * Handles fuzzy search and instant navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and Inject Chatbot HTML
    const chatbotHTML = `
        <div class="chatbot-trigger" id="chat-trigger" title="Search Products">
            <svg id="chat-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <svg id="chat-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
        <div class="chatbot-window" id="chat-window">
            <div class="chatbot-header">
                <div class="chatbot-avatar">⚗️</div>
                <div>
                    <h3 style="color:var(--white); font-size:1rem; margin:0;">Pavni Catalog Assistant</h3>
                    <p style="color:var(--teal); font-size:0.7rem; margin:0; text-transform:uppercase; letter-spacing:0.05em;">Online • Ready to Search</p>
                </div>
            </div>
            <div class="chatbot-content" id="chat-content">
                <div class="chat-msg bot">Hello! I'm your Pavni Assistant. Type any chemical name, formula (like NaOH), or industry use to find exactly what you need.</div>

            </div>
            <div class="chatbot-input-wrap" style="position:relative; display:flex; gap:0.5rem; align-items:center;">
                <input type="text" id="chat-input" class="chatbot-input" placeholder="Ask a question..." autocomplete="off" style="flex:1; padding-right: 2.5rem;">
                <button id="chat-send-btn" style="position:absolute; right:1.5rem; background:none; border:none; color:var(--teal); cursor:pointer; display:flex; align-items:center; justify-content:center; padding:0.5rem;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const trigger = document.getElementById('chat-trigger');
    const windowEl = document.getElementById('chat-window');
    const input = document.getElementById('chat-input');
    const content = document.getElementById('chat-content');

    // 2. Toggle Window
    trigger.addEventListener('click', () => {
        windowEl.classList.toggle('active');
        const isActive = windowEl.classList.contains('active');
        
        document.getElementById('chat-icon-open').style.display = isActive ? 'none' : 'block';
        document.getElementById('chat-icon-close').style.display = isActive ? 'block' : 'none';
        
        if (isActive) input.focus();
    });

    // 3. Conversational Chat Logic
    const qaDB = [
        { keywords: ['quote', 'price', 'pricing', 'buy', 'cost'], answer: 'For accurate pricing and bulk quotations, please <a href="contact.html#quote" style="color:var(--teal); font-weight:bold; text-decoration:underline;">request a quote here</a> or call +91 96873 70005.' },
        { keywords: ['partner', 'dealer', 'grasim', 'authorized', 'epigral'], answer: 'We are an Authorized Dealer for Aditya Birla Grasim Industries and Epigral Limited. We guarantee 100% genuine products. <a href="about.html" style="color:var(--teal); font-weight:bold; text-decoration:underline;">Read about us</a>.' },
        { keywords: ['supplier', 'brand', 'manufacturers', 'nirma', 'reliance', 'tata', 'dcm', 'gacl', 'gnfc'], answer: 'Aside from Grasim, we distribute premium chemicals from top manufacturers including DCM, GACL, GNFC, Reliance, Epigral, GFL, Tata, Nirma, GHCL, DCW, Deepak Nitrite, and Deepak.' },
        { keywords: ['experience', 'years', 'old', 'history'], answer: 'Pavni Chemicals has over 12+ years of uninterrupted supply experience in the chemical distribution industry. <a href="about.html" style="color:var(--teal); font-weight:bold; text-decoration:underline;">Learn more</a>.' },
        { keywords: ['contact', 'phone', 'call', 'number', 'mobile'], answer: 'Reach our sales desk directly at +91 96873 70005, or <a href="contact.html" style="color:var(--teal); font-weight:bold; text-decoration:underline;">visit our Contact Page</a>.' },
        { keywords: ['email', 'mail', 'id', 'address'], answer: 'For inquiries, quotes, or support, please email us at sales@pavnichemicals.com or <a href="contact.html" style="color:var(--teal); font-weight:bold; text-decoration:underline;">use our contact form</a>.' },
        { keywords: ['location', 'where', 'office', 'godown', 'factory'], answer: 'Our primary facility is located at: Godown No 1, Plot No 43, Shree Ram Estate, Ankleshwar, Gujarat – 393002. <a href="https://maps.app.goo.gl/aLiC9WwcdXXxN3w66" target="_blank" style="color:var(--teal); font-weight:bold; text-decoration:underline;">View on Map</a>.' },
        { keywords: ['delivery', 'fast', 'immediate', 'stock', 'inventory'], answer: 'We maintain a ready inventory of all 52 catalog products to ensure immediate dispatch and reliable supply chains for our industrial partners.' },
        { keywords: ['product', 'list', 'catalog', 'items', 'chemicals'], answer: 'We offer a catalog of 52 premium chemicals across 5 categories. <a href="products.html" style="color:var(--teal); font-weight:bold; text-decoration:underline;">View Full Catalog</a>.' },
        { keywords: ['use', 'application', 'industry', 'purpose'], answer: 'Our chemicals are widely used across Textiles, Pharmaceuticals, Water Treatment, Paper & Pulp, Agriculture, and Petrochemical industries. <a href="industries.html" style="color:var(--teal); font-weight:bold; text-decoration:underline;">See Industries Served</a>.' },
        { keywords: ['safety', 'precaution', 'handling', 'msds'], answer: 'Safety is paramount. We provide full MSDS for every product. Always use mandatory PPE and store chemicals in designated, ventilated areas.' },
        { keywords: ['gst', 'tax', 'registration'], answer: 'Our official GST registration number is: 24ABEFP4368B1ZG.' }
    ];

    function processQuery(rawQuery, showUserBubble = true) {
        const query = rawQuery.toLowerCase().trim();
        if (query.length < 1) return;



        if (showUserBubble) {
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user anim-fade-up';
            userMsg.textContent = rawQuery;
            content.appendChild(userMsg);
            content.scrollTop = content.scrollHeight;
            input.value = ''; // clear input
        }

        // Simulate typing delay
        setTimeout(() => {
            const faqMatch = qaDB.find(f => f.keywords.some(k => new RegExp('\\b' + k + '(s|es)?\\b', 'i').test(query)));
            
            let hasBotResponse = false;

            if (faqMatch) {
                const faqBox = document.createElement('div');
                faqBox.className = 'chat-msg bot anim-fade-up';
                faqBox.innerHTML = faqMatch.answer;
                content.appendChild(faqBox);
                hasBotResponse = true;
            }

            // Product Search
            const matches = productsData.filter(p => {
                const name = p.name.toLowerCase();
                const formula = (p.formula || '').replace(/<[^>]*>/g, '').toLowerCase(); 
                const cat = (p.category || '').toLowerCase();
                const uses = (p.uses || []).join(' ').toLowerCase();

                return name.includes(query) || formula.includes(query) || cat.includes(query) || uses.includes(query);
            }).slice(0, 3);

            if (matches.length > 0) {
                const resultsContainer = document.createElement('div');
                resultsContainer.className = 'search-results-container anim-fade-up';
                resultsContainer.style.background = 'rgba(0,212,180,0.05)';
                resultsContainer.style.border = '1px solid var(--navy-border)';
                resultsContainer.style.padding = '1rem';
                resultsContainer.style.borderRadius = '8px';
                resultsContainer.style.marginTop = '0.5rem';
                
                const title = document.createElement('p');
                title.style.fontSize = '0.7rem';
                title.style.color = 'var(--text-muted)';
                title.style.margin = '0 0 0.75rem 0';
                title.style.textTransform = 'uppercase';
                title.textContent = `Found ${matches.length} matching product(s):`;
                resultsContainer.appendChild(title);

                matches.forEach(m => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item enhanced';
                    item.style.marginBottom = '1rem';
                    item.style.padding = '0.75rem';
                    item.style.background = 'rgba(255,255,255,0.03)';
                    item.style.borderRadius = '6px';
                    item.style.borderLeft = '3px solid var(--teal)';

                    item.innerHTML = `
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                            <strong style="color:var(--white); font-size:0.9rem;">${m.name}</strong>
                            <span style="color:var(--teal); font-size:0.75rem; font-weight:700;">${m.formula || ''}</span>
                        </div>
                        <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.5rem;">
                            <strong>Application:</strong> ${(m.uses || []).slice(0, 2).join(', ')}...
                        </div>
                        <a href="product-detail.html?id=${m.id}" style="font-size:0.75rem; color:var(--teal); text-decoration:none; display:inline-block; font-weight:700;">Full Spec & TDS →</a>
                    `;
                    resultsContainer.appendChild(item);
                });

                content.appendChild(resultsContainer);
                hasBotResponse = true;
            }

            if (!hasBotResponse) {
                const fallback = document.createElement('div');
                fallback.className = 'chat-msg bot anim-fade-up';
                fallback.innerHTML = `I couldn't find a direct answer for "${rawQuery}". You can try searching a chemical formula, or contact us at <a href="contact.html" style="color:var(--teal);">sales@pavnichemicals.com</a> for assistance.`;
                content.appendChild(fallback);
            }

            content.scrollTop = content.scrollHeight;
        }, 300);
    }

    // Handle Enter Key for submission
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = input.value;
            if (val.trim()) processQuery(val);
        }
    });

    // Handle Send Button Click
    const sendBtn = document.getElementById('chat-send-btn');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const val = input.value;
            if (val.trim()) processQuery(val);
        });
    }



    // 4. Add Disclaimer Footer
    const disclaimer = document.createElement('div');
    disclaimer.style.cssText = 'padding: 0.5rem 1rem; font-size: 0.65rem; color: var(--text-muted); border-top: 1px solid var(--navy-border); text-align: center;';
    disclaimer.innerHTML = '*Chatbot answer may be wrong.';
    windowEl.appendChild(disclaimer);

    // Close on escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') windowEl.classList.remove('active');
    });
});
