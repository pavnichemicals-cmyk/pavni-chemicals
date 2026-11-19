/**
 * Pavni Chemicals — Energetic Preloader
 * Pure CSS/JS — No external dependencies
 */
(function () {

    /* =============================================
       ENERGETIC PRELOADER
    ============================================= */
    function initPreloader() {
        var preloader = document.getElementById('preloader');
        var progress  = document.getElementById('load-progress');
        var pctEl     = document.getElementById('load-pct');
        var statusTxt = document.getElementById('preloader-text');
        
        if (!preloader) return;

        var statusMessages = [
            'Analyzing Chemical Structures...',
            'Calibrating Purity Levels...',
            'Loading Logistic Networks...',
            'Optimizing Sales Pipeline...',
            'Finalizing Authorized Systems...'
        ];

        var pct = 0;
        var iv = setInterval(function () {
            // Snappy, energetic progress jumps
            pct += Math.floor(Math.random() * 15) + 5;
            
            if (pct >= 100) {
                pct = 100;
                clearInterval(iv);
                if (statusTxt) statusTxt.textContent = 'Ready for Operations.';
            }

            if (progress) progress.style.width = pct + '%';
            if (pctEl) pctEl.textContent = pct + '%';
            
            // Randomly update status text for energy
            if (pct % 25 === 0 && statusTxt && pct < 100) {
                statusTxt.textContent = statusMessages[Math.floor(Math.random() * statusMessages.length)];
            }
        }, 120);

        function hide() {
            preloader.classList.add('loaded');
            // Re-enable scroll after preloader slides up
            setTimeout(function() {
                document.body.style.overflow = 'auto';
            }, 800);
        }

        // Wait a bit after 100% for the "impact"
        window.addEventListener('load', function () { 
            setTimeout(hide, 1200); 
        });
        
        // Safety timeout
        setTimeout(hide, 5000); 
    }

    /* =============================================
       BOOT
    ============================================= */
    function boot() {
        initPreloader();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();
