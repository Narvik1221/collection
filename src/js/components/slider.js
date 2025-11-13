(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const sliderElement = document.querySelector('.main-slider');
        
        if (!sliderElement) return;
        
        if (typeof Swiper === 'undefined') {
            console.error('Swiper is not loaded');
            return;
        }

        try {
            const mainSlider = new Swiper('.main-slider', {
                slidesPerView: 'auto',
                centeredSlides: true,
                loop: true,
                
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                effect: 'slide',
                speed: 600,
                
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
            });

        } catch (error) {
            console.error('Error initializing slider:', error);
        }
    });

})();