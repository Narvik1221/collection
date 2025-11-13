(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('imageModal');
        const cardModal = document.querySelector('.card__modal');
        
        // Проверяем существование необходимых элементов
        if (!modal || !cardModal) {
            console.warn('Modal elements not found');
            return;
        }
        
        const modalImage = modal.querySelector('.modal__image');
        const closeButton = modal.querySelector('.modal__close');
        
        if (!modalImage || !closeButton) {
            console.warn('Modal sub-elements not found');
            return;
        }

        // Открытие модального окна
        cardModal.addEventListener('click', function() {
            const cardImage = this.querySelector('.card__image');
            if (!cardImage) return;
            
            const originalImageSrc = cardImage.src;
            modalImage.src = originalImageSrc;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Закрытие модального окна по кнопке
        closeButton.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Закрытие модального окна по клику вне изображения
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.classList.contains('modal__overlay')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Закрытие модального окна по клавише Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

})();