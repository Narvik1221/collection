function initSlider() {
    const sliderElement = document.querySelector('.main-slider');
    
    if (!sliderElement) return;
    
    const mainSlider = new Swiper('.main-slider', {
        // Автоматическое количество слайдов
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
      
        
        // Навигация стрелками
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Эффекты
        effect: 'slide',
        speed: 600,
        
        // Автопрокрутка
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
    });

    console.log('Слайдер инициализирован');
}