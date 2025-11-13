(function() {
    'use strict';

    function initYandexMap() {
        const mapContainer = document.getElementById('yandex-map');
        
        if (!mapContainer) return;
        
        if (typeof ymaps === 'undefined') {
            console.warn('Yandex Maps API not loaded');
            return;
        }

        ymaps.ready(function() {
            try {
                const map = new ymaps.Map('yandex-map', {
                    center: [55.76, 37.64], 
                    zoom: 10,
                    controls: ['zoomControl', 'fullscreenControl']
                });

             
                const placemark = new ymaps.Placemark([55.76, 37.64], {
                    hintContent: 'Наш магазин',
                    balloonContent: 'Мы находимся здесь!'
                }, {
                 
                    iconLayout: 'default#image',
                    iconImageHref: '../img/logo.svg',
                    iconImageSize: [40, 40],
                    iconImageOffset: [-20, -40] 
                });

                map.geoObjects.add(placemark);
                map.behaviors.disable('scrollZoom');
                
                console.log('Yandex Map initialized successfully with SVG marker');
                
            } catch (error) {
                console.error('Error initializing Yandex Map:', error);
                mapContainer.innerHTML = '<div class="map-error">Карта временно недоступна</div>';
            }
        });
    }

    function loadYandexMapsAPI() {
        const mapContainer = document.getElementById('yandex-map');
        
        if (!mapContainer) return;

      
        if (typeof ymaps !== 'undefined') {
            initYandexMap();
            return;
        }

      
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

   
    document.addEventListener('DOMContentLoaded', function() {
        loadYandexMapsAPI();
    });

})();