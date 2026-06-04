// ===== MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function () {
    // 1. Header scroll + Top bar
    const header = document.querySelector('.header-main');
    const topBar = document.querySelector('.top-bar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
            if (topBar) topBar.classList.add('hidden');
        } else {
            header.classList.remove('scrolled');
            if (topBar) topBar.classList.remove('hidden');
        }
    });

    // 2. Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMain = document.querySelector('.nav-main');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMain.classList.toggle('active');
            document.body.style.overflow = navMain.classList.contains('active') ? 'hidden' : '';
        });
    }

    // 3. Close Menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMain.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 4. back to up button
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<span class="top-icon">↑</span>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // WhatsApp floating widget
    const whatsappWidget = document.createElement('div');
    whatsappWidget.className = 'whatsapp-widget';

    const whatsappIcon = `<img class="wa-icon" src="assets/logo/whatsapp.png" alt="whatsapp" width="28" height="28" loading="eager">`;

    whatsappWidget.innerHTML = `
        <div class="whatsapp-notif">سلام!چطور میتونم کمکتون کنم؟</div>
        <button class="whatsapp-btn" aria-label="WhatsApp" type="button">
            <span class="wa-icon-wrap">
                ${whatsappIcon}
                <svg class="wa-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </span>
        </button>
        <div class="whatsapp-popup" role="dialog" aria-hidden="true">
            <div class="whatsapp-popup-inner">
                <div class="popup-header"><h4>شروع مشاوره آنلاین</h4></div>
                <div class="popup-message"><p>سلام! در واتس آپ با تیم پشتیبانی و فروش ما در ارتباط باشید</p></div>
                <div class="popup-actions"><a class="whatsapp-open btn-wa" href="https://web.whatsapp.com/send?phone=989129619035" target="_blank" rel="noopener">شروع گفتگو</a></div>
            </div>
        </div>
    `;

    document.body.appendChild(whatsappWidget);

    // trigger entrance animation
    setTimeout(() => { whatsappWidget.classList.add('ready'); }, 600);

    const whatsappBtn = whatsappWidget.querySelector('.whatsapp-btn');
    const whatsappNotif = whatsappWidget.querySelector('.whatsapp-notif');
    const whatsappPopup = whatsappWidget.querySelector('.whatsapp-popup');

    let popupOpen = false;

    // Show notif only on hover (mouseenter/mouseleave)
    let notifHideTimer = null;
    whatsappBtn.addEventListener('mouseenter', () => {
        clearTimeout(notifHideTimer);
        whatsappNotif.classList.add('show');
    });
    whatsappBtn.addEventListener('mouseleave', () => {
        notifHideTimer = setTimeout(() => { whatsappNotif.classList.remove('show'); }, 250);
    });

    // Toggle popup and animate icon -> close
    whatsappBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        popupOpen = !popupOpen;
        if (popupOpen) {
            whatsappPopup.classList.add('active');
            whatsappPopup.setAttribute('aria-hidden', 'false');
            whatsappBtn.classList.add('open');
            // ensure notif hidden
            whatsappNotif.classList.remove('show');
        } else {
            whatsappPopup.classList.remove('active');
            whatsappPopup.setAttribute('aria-hidden', 'true');
            whatsappBtn.classList.remove('open');
        }
    });

    // Close popup when clicking outside and restore icon state
    document.addEventListener('click', (ev) => {
        if (popupOpen && !whatsappWidget.contains(ev.target)) {
            popupOpen = false;
            whatsappPopup.classList.remove('active');
            whatsappPopup.setAttribute('aria-hidden', 'true');
            whatsappBtn.classList.remove('open');
        }
    });

    // Prevent clicks inside popup from closing
    whatsappPopup.addEventListener('click', (ev) => { ev.stopPropagation(); });

    // 5. Scroll Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 6. Products Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const isWindowCard = card.getAttribute('data-window-card') === 'true';
                let shouldShow = false;

                if (filterValue === 'all') {
                    shouldShow = !isWindowCard;
                } else if (filterValue === 'quality') {
                    shouldShow = category === 'quality';
                } else {
                    shouldShow = category === filterValue && isWindowCard;
                }

                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    const categoryDetailButtons = document.querySelectorAll('.btn-details[data-target]');
    categoryDetailButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const targetFilter = button.getAttribute('data-target');
            const targetButton = document.querySelector(`.filter-btn[data-filter="${targetFilter}"]`);

            if (targetButton) {
                targetButton.click();
            }

            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 7. Products Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 8. shomarande
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsContainer = document.querySelector('.hero-stats');

    // animateCounter
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        if (element.timer) {
            clearInterval(element.timer);
        }

        element.timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.getAttribute('data-suffix') || '');
                clearInterval(element.timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // Intersection Observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    setTimeout(() => {
                        animateCounter(stat);
                    }, 300);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    const servicesStats = document.querySelector('.services-stats');
    if (servicesStats) {
        const serviceStatsNumbers = servicesStats.querySelectorAll('.stats-number');

        const serviceStatsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    serviceStatsNumbers.forEach(stat => {
                        setTimeout(() => {
                            animateCounter(stat);
                        }, 500);
                    });
                    serviceStatsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        serviceStatsObserver.observe(servicesStats);
    }

    // 9. Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;

            const submitBtn = this.querySelector('.newsletter-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span class="loading-spinner"></span> در حال ارسال...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '✓ اشتراک با موفقیت انجام شد!';
                submitBtn.style.background = '#10b981';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 3000);
            }, 1500);
        });
    }

    // 10. Modal Products
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    if (quickViewBtns.length > 0) {
        const productModal = document.createElement('div');
        productModal.className = 'product-modal';
        productModal.innerHTML = `
        <div class="modal-overlay"></div>

    `;

        if (!document.querySelector('.product-modal')) {
            document.body.appendChild(productModal);

            const modalOverlay = productModal.querySelector('.modal-overlay');
            const modalClose = productModal.querySelector('.modal-close');

            if (modalOverlay) {
                modalOverlay.addEventListener('click', () => {
                    productModal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }

            if (modalClose) {
                modalClose.addEventListener('click', () => {
                    productModal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && productModal.classList.contains('active')) {
                    productModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            quickViewBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();

                    const productCard = btn.closest('.product-card');
                    const productTitle = productCard.querySelector('.product-title').textContent;
                    const productImage = productCard.querySelector('.product-img').src;
                    const productDescription = productCard.querySelector('.product-description').textContent;

                    productModal.querySelector('.modal-body').innerHTML = `
                    <div class="modal-product">
                        <img src="${productImage}" alt="${productTitle}" class="modal-product-img">
                        <h3 class="modal-product-title">${productTitle}</h3>
                        <p class="modal-product-description">${productDescription}</p>
                        <a href="#contact" class="btn btn-primary modal-product-btn">
                            <span>درخواست مشاوره</span>
                            <i class="ti ti-arrow-left"></i>
                        </a>
                    </div>
                `;

                    productModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
        }
    }

    // 11. Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.loading-overlay');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    });

    // 12. Typing Effect
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';

        setTimeout(() => {
            element.style.animation = `typing 3.5s steps(${text.length}, end), blink 0.75s step-end infinite`;
            element.textContent = text;
        }, 500);
    });

    // 13. Shamsi Date
    const dateElement = document.querySelector('.current-date');
    if (dateElement) {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        dateElement.textContent = now.toLocaleDateString('fa-IR', options);
    }

    // 14. Accessable
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-user');
        }
    });

    document.addEventListener('mousedown', () => {
        document.documentElement.classList.remove('keyboard-user');
    });

    // 15. Loading LazyLoad
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

const sliderLoading = document.createElement('div');
sliderLoading.className = 'slider-loading';
sliderLoading.innerHTML = '<div class="slider-loader"></div>';

const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.appendChild(sliderLoading);

    setTimeout(() => {
        sliderLoading.style.opacity = '0';
        setTimeout(() => {
            sliderLoading.style.display = 'none';
        }, 500);
    }, 1500);
}

// // اضافه کردن افکت پارالاکس روی اسلایدها
// document.addEventListener('mousemove', (e) => {
//     const slider = document.querySelector('.hero-slider');
//     if (!slider) return;

//     const rect = slider.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) - 0.5;
//     const y = ((e.clientY - rect.top) / rect.height) - 0.5;

//     const activeSlide = slider.querySelector('.slide.active .slide-image');
//     if (activeSlide) {
//         activeSlide.style.transform = `
//             scale(1.1) 
//             translateX(${x * 20}px) 
//             translateY(${y * 20}px)
//         `;
//     }
// });

// بازنشانی موقعیت پارالاکس هنگام تغییر اسلاید
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const slide = mutation.target;
            if (slide.classList.contains('active')) {
                const image = slide.querySelector('.slide-image');
                if (image) {
                    image.style.transform = 'scale(1.1) translateX(0) translateY(0)';
                }
            }
        }
    });

    // 11. Software Download Notifications
    const softstartBtn = document.getElementById('softstarter-btn');
    if (softstartBtn) {
        softstartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('لینک دانلود بزودی قرار میگیرد', 'info');
        });
    }

    // 12. Copy Password Button
    const copyPasswordBtn = document.querySelector('.copy-password-btn');
    if (copyPasswordBtn) {
        copyPasswordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const password = copyPasswordBtn.getAttribute('data-password');
            
            navigator.clipboard.writeText(password).then(() => {
                showNotification('پسورد کپی شد!', 'success');
            }).catch(() => {
                showNotification('خطا در کپی کردن', 'error');
            });
        });
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});

document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide, { attributes: true });
});