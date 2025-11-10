// Инициализация слайдера
function initSlider() {
    const sliderElement = document.querySelector('.main-slider');
    
    // Проверяем, есть ли слайдер на странице
    if (!sliderElement) return;
    
    const mainSlider = new Swiper('.main-slider', {
        // Динамическое количество слайдов
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        
        // Навигация стрелками
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Адаптивность
        breakpoints: {
            // 320px и выше
            320: {
                spaceBetween: 15,
                centeredSlides: true,
            },
            // 768px и выше
            768: {
                spaceBetween: 20,
                centeredSlides: true,
            },
            // 1340px и выше
            1340: {
                spaceBetween: 25,
                centeredSlides: true,
            },
            // 1920px и выше
            1920: {
                spaceBetween: 30,
                centeredSlides: true,
            }
        },
        
        // Эффекты
        effect: 'slide',
        speed: 600,
        
        // Автопрокрутка (опционально)
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    console.log('Слайдер инициализирован');
}

// Экспортируем функцию для использования в других местах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initSlider };
}