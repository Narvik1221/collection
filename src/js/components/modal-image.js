// Добавьте этот код в ваш скрипт
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('imageModal');
  const modalImage = modal.querySelector('.modal__image');
  const closeButton = modal.querySelector('.modal__close');
  const cardModal = document.querySelector('.card__modal');
  
  // Открытие модалки
  cardModal.addEventListener('click', function() {
    const originalImageSrc = this.querySelector('.card__image').src;
    modalImage.src = originalImageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  });
  
  // Закрытие модалки по кнопке
  closeButton.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Восстанавливаем скролл
  });
  
  // Закрытие модалки по клику на оверлей
  modal.addEventListener('click', function(e) {
    if (e.target === modal || e.target.classList.contains('modal__overlay')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Закрытие по ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});