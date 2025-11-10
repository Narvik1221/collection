// Основная инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('Магазин инициализирован');
    
    // Инициализируем слайдер, если он есть на странице
    if (typeof initSlider === 'function') {
        initSlider();
    }
});