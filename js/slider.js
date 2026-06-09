// Slider.js
class SimpleSlider {
    constructor() {
        this.slider = document.querySelector('.hero-slider');
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        this.typingTimeout = null;
        this.isTyping = false;

        if (this.slider && this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        this.storeOriginalContent();
        this.slides.forEach(slide => {
            const title = slide.querySelector('.slide-title');
            const desc = slide.querySelector('.slide-description');
            if (title) title.textContent = '';
            if (desc) desc.style.opacity = '0';
        });
        this.showSlide(this.currentIndex);
        this.addEventListeners();
        this.startAutoSlide();
    }

    storeOriginalContent() {
        this.slides.forEach(slide => {
            const title = slide.querySelector('.slide-title');
            const desc = slide.querySelector('.slide-description');
            if (title && !title.getAttribute('data-original')) {
                title.setAttribute('data-original', title.textContent);
            }
            if (desc && !desc.getAttribute('data-original')) {
                desc.setAttribute('data-original', desc.textContent);
            }
        });
    }

    stopTyping() {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = null;
        }
        this.isTyping = false;
    }

    startTypingEffect(slide) {
        this.stopTyping();

        const title = slide.querySelector('.slide-title');
        if (!title) return;

        const originalTitle = title.getAttribute('data-original') || '';
        if (!originalTitle) return;

        const currentWidth = getComputedStyle(title).width;
        title.style.minWidth = currentWidth;
        title.textContent = '';

        const words = originalTitle.split(' ');
        let wordIndex = 0;
        let charIndex = 0;
        let currentText = '';

        this.isTyping = true;

        const typeNext = () => {
            if (!this.isTyping) return;

            if (wordIndex >= words.length) {
                this.isTyping = false;
                this.typingTimeout = null;
                title.style.minWidth = '';
                return;
            }

            const currentWord = words[wordIndex];
            if (charIndex < currentWord.length) {
                currentText += currentWord[charIndex];
                title.textContent = currentText;
                charIndex += 1;
                const charDelay = 75 + Math.random() * 55;
                this.typingTimeout = setTimeout(typeNext, charDelay);
            } else {
                if (wordIndex < words.length - 1) {
                    currentText += ' ';
                }
                title.textContent = currentText;
                wordIndex += 1;
                charIndex = 0;
                const wordPause = 180 + Math.random() * 90;
                this.typingTimeout = setTimeout(typeNext, wordPause);
            }
        };

        typeNext();
    }

    showSlide(index) {
        this.stopTyping();
        
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            
            const panel = slide.querySelector('.slide-panel');
            if (panel) {
                panel.style.opacity = '0';
            }
            
            const title = slide.querySelector('.slide-title');
            if (title) {
                title.textContent = '';
                title.style.minWidth = '';
            }
            
            const desc = slide.querySelector('.slide-description');
            if (desc) {
                desc.style.opacity = '0';
            }
        });

        this.slides[index].classList.add('active');
        this.currentIndex = index;

        setTimeout(() => {
            const activeSlide = this.slides[index];
            const panel = activeSlide.querySelector('.slide-panel');
            const desc = activeSlide.querySelector('.slide-description');
            const originalDesc = desc ? desc.getAttribute('data-original') : '';
            
            if (panel) {
                panel.style.transition = 'opacity 0.3s ease';
                panel.style.opacity = '1';
            }
            
            if (desc) {
                desc.style.transition = 'opacity 0.3s ease';
                desc.style.opacity = '1';
                desc.textContent = originalDesc;
            }
            
            setTimeout(() => {
                this.startTypingEffect(activeSlide);
            }, 200);
        }, 50);
    }

    nextSlide() {
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.totalSlides) {
            nextIndex = 0;
        }
        this.showSlide(nextIndex);
    }

    prevSlide() {
        let prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = this.totalSlides - 1;
        }
        this.showSlide(prevIndex);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    resetAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
        this.startAutoSlide();
    }

    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoSlide();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoSlide();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoSlide();
            } else if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetAutoSlide();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SimpleSlider();
});

const servicesSlider = document.querySelector('.services-slider');
if (servicesSlider && document.querySelector('.services-nav.next')) {
    document.querySelector('.services-nav.next').onclick = () => {
        servicesSlider.scrollBy({ left: -350, behavior: 'smooth' });
    };
    document.querySelector('.services-nav.prev').onclick = () => {
        servicesSlider.scrollBy({ left: 350, behavior: 'smooth' });
    };
}