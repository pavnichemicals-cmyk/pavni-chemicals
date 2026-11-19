/**
 * Pavni Chemicals - Product Search Chatbot
 * Handles fuzzy search and instant navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and Inject Chatbot HTML
    const chatbotHTML = `
        <div class="chatbot-trigger" id="chat-trigger" title="Search Products">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
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
            <div class="chatbot-input-wrap">
                <input type="text" id="chat-input" class="chatbot-input" placeholder="Search 43+ products..." autocomplete="off">
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
        if (windowEl.classList.contains('active')) input.focus();
    });

    // 3. Search Logic
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        // Remove existing search results in view
        const oldResults = document.querySelector('.search-results-container');
        if (oldResults) oldResults.remove();

        if (query.length < 2) return;

        // 3a. Check for General FAQs (Expanded)
        const faqs = [
            { keywords: ['location', 'where', 'address', 'office'], answer: 'Pavni Chemicals is headquartered in Ankleshwar, Gujarat - the chemical hub of India. You can find our full contact details in the Contact section.' },
            { keywords: ['partner', 'dealer', 'grasim', 'authorized', 'epigral'], answer: 'We are an Authorized Dealer for Aditya Birla Grasim Industries and Epigral Limited. We guarantee 100% genuine products with manufacturer certification.' },
            { keywords: ['experience', 'years', 'old', 'history'], answer: 'Pavni Chemicals has over 25 years of experience in the chemical trading and distribution industry, serving clients across India.' },
            { keywords: ['contact', 'phone', 'call', 'email'], answer: 'You can reach our sales desk at +91 96873 70005 or email us at sales@pavni.com for immediate support.' },
            { keywords: ['delivery', 'fast', 'immediate', 'stock'], answer: 'We maintain a ready inventory of all 43 catalog products to ensure immediate dispatch and reliable supply chains for our industrial partners.' },
            { keywords: ['safety', 'precaution', 'handling', 'standards', 'iso', 'msds'], answer: 'Industrial chemicals require strict safety compliance. We provide full MSDS (Material Safety Data Sheets) for every product. Always use mandatory PPE (Gloves, Eye Protection) and store in designated ventilated areas.' },
            { keywords: ['importance', 'growth', 'trends', 'sector', 'industry', 'chemical'], answer: 'The chemical industry is the backbone of modern economy, vital for Healthcare (APIs), Agriculture (Fertilizers), and Infrastructure (Polymers). Gujarat accounts for over 35% of India\'s chemical output, with Ankleshwar being a global manufacturing hub.' }
        ];

        const faqMatch = faqs.find(f => f.keywords.some(k => query.includes(k)));
        
        if (faqMatch) {
            const faqBox = document.createElement('div');
            faqBox.className = 'search-results-container anim-fade-up';
            faqBox.innerHTML = `<div class="chat-msg bot" style="font-size:0.85rem; background:rgba(0,212,180,0.1); border:1px solid var(--teal); line-height:1.4;">${faqMatch.answer}</div>`;
            content.appendChild(faqBox);
            content.scrollTop = content.scrollHeight;
            return;
        }

        // 3b. Product Search (Enhanced)
        const matches = productsData.filter(p => {
            const name = p.name.toLowerCase();
            const formula = p.formula.replace(/<[^>]*>/g, '').toLowerCase(); 
            const cat = p.category.toLowerCase();
            const uses = (p.uses || []).join(' ').toLowerCase();

            return name.includes(query) || formula.includes(query) || cat.includes(query) || uses.includes(query);
        }).slice(0, 3); // Reduced limit for more detail

        if (matches.length > 0) {
            const resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results-container anim-fade-up';
            
            const title = document.createElement('p');
            title.style.fontSize = '0.7rem';
            title.style.color = 'var(--text-muted)';
            title.style.margin = '0.5rem 0';
            title.style.textTransform = 'uppercase';
            title.textContent = `Search Matches:`;
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
                        <span style="color:var(--teal); font-size:0.75rem; font-weight:700;">${m.formula}</span>
                    </div>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.5rem;">
                        <strong>Application:</strong> ${m.uses.slice(0, 2).join(', ')}...
                    </div>
                    <div style="font-size:0.7rem; color:#ffb347; margin-bottom:0.75rem;">
                        <strong>⚠️ Safety:</strong> ${m.precautions || 'Handle as per MSDS guidelines.'}
                    </div>
                    <a href="product-detail?id=${m.id}" class="action-link" style="font-size:0.75rem; color:var(--teal); text-decoration:none; display:inline-block; font-weight:700;">Full Spec & TDS →</a>
                `;
                resultsContainer.appendChild(item);
            });

            content.appendChild(resultsContainer);
            content.scrollTop = content.scrollHeight;
        }
    });

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
