document.addEventListener('DOMContentLoaded', function () {
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) el.classList.add('active');
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>در حال ارسال...</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';

            setTimeout(() => {
                statusDiv.innerHTML = '<div class="success-message">✔ درخواست شما با موفقیت ثبت شد. کارشناسان ما به زودی با شما تماس می‌گیرند.</div>';
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                setTimeout(() => statusDiv.innerHTML = '', 5000);
            }, 1500);
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const mapImage = document.getElementById('mapImage');
    const mapOverlay = document.getElementById('mapOverlay');
    const openMapBtn = document.getElementById('openMapBtn');

    if (mapImage && mapOverlay) {
        mapImage.addEventListener('click', function (e) {
            e.stopPropagation();
            mapOverlay.classList.add('active');
        });

        if (openMapBtn) {
            openMapBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                setTimeout(() => {
                    mapOverlay.classList.remove('active');
                }, 300);
            });
        }

        mapOverlay.addEventListener('click', function (e) {
            if (e.target === mapOverlay) {
                mapOverlay.classList.remove('active');
            }
        });
    }
});