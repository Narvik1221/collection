// Инициализация Яндекс Карты
function initYandexMap() {
    const mapContainer = document.getElementById('yandex-map');
    
    // Проверяем что контейнер существует
    if (!mapContainer) return;
    
    // Ждем загрузки API Яндекс Карт
    if (typeof ymaps === 'undefined') {
        console.warn('Yandex Maps API not loaded');
        return;
    }

    // Инициализируем карту когда API готово
    ymaps.ready(function() {
        try {
            // Создаем карту
            const map = new ymaps.Map('yandex-map', {
                center: [55.76, 37.64], // Москва
                zoom: 10,
                controls: ['zoomControl', 'fullscreenControl']
            });

            // Добавляем метку
            const placemark = new ymaps.Placemark([55.76, 37.64], {
                hintContent: 'Наш магазин',
                balloonContent: 'Мы находимся здесь!'
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            });

            map.geoObjects.add(placemark);

            // Оптимизация для мобильных устройств
            map.behaviors.disable('scrollZoom');
            
            console.log('Yandex Map initialized successfully');
            
        } catch (error) {
            console.error('Error initializing Yandex Map:', error);
            mapContainer.innerHTML = '<div class="map-error">Карта временно недоступна</div>';
        }
    });
}

// Функция для загрузки API Яндекс Карт
function loadYandexMapsAPI() {
    const mapContainer = document.getElementById('yandex-map');
    
    if (!mapContainer) return;
    
    // Проверяем не загружен ли API уже
    if (typeof ymaps !== 'undefined') {
        initYandexMap();
        return;
    }

    // Создаем script элемент для загрузки API
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_api_ключ&lang=ru_RU';
    script.onload = function() {
        console.log('Yandex Maps API loaded');
        initYandexMap();
    };
    script.onerror = function() {
        console.error('Failed to load Yandex Maps API');
        mapContainer.innerHTML = '<div class="map-error">Не удалось загрузить карту</div>';
    };
    
    document.head.appendChild(script);
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    loadYandexMapsAPI();
});