// js/slider.js - اسلایدر ساده
class SimpleSlider {
    constructor() {
        this.slider = document.querySelector('.hero-slider');
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;

        // اگر اسلایدر وجود داشت، مقداردهی کن
        if (this.slider && this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        // نمایش اولین اسلاید
        this.showSlide(this.currentIndex);

        // اضافه کردن رویدادها
        this.addEventListeners();
    }

    showSlide(index) {
        // پنهان کردن همه اسلایدها
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // نمایش اسلاید فعلی
        this.slides[index].classList.add('active');
        this.currentIndex = index;
    }

    nextSlide() {
        let nextIndex = this.currentIndex + 1;

        // اگر به انتها رسیدیم، به ابتدا برگرد
        if (nextIndex >= this.totalSlides) {
            nextIndex = 0;
        }

        this.showSlide(nextIndex);
    }

    prevSlide() {
        let prevIndex = this.currentIndex - 1;

        // اگر به ابتدا رسیدیم، به انتها برو
        if (prevIndex < 0) {
            prevIndex = this.totalSlides - 1;
        }

        this.showSlide(prevIndex);
    }

    addEventListeners() {
        // دکمه قبلی
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }

        // دکمه بعدی
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // کلیدهای کیبورد
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                this.prevSlide();
            }
        });
    }
}

// راه‌اندازی اسلایدر وقتی DOM آماده شد
document.addEventListener('DOMContentLoaded', () => {
    new SimpleSlider();
});

const slider = document.querySelector('.services-slider');
document.querySelector('.services-nav.next').onclick = () => {
    slider.scrollBy({ left: -350, behavior: 'smooth' });
};
document.querySelector('.services-nav.prev').onclick = () => {
    slider.scrollBy({ left: 350, behavior: 'smooth' });
};
