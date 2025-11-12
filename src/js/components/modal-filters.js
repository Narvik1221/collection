'use strict';

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.filters-mobile-toggle');
    const filtersModal = document.querySelector('.catalog__modal');
    
    if (!mobileToggle || !filtersModal) return;
    
    // Открытие/закрытие модалки
    mobileToggle.addEventListener('click', function() {
      filtersModal.classList.add('active');
    });
    
    // Закрытие по клику на крестик
    filtersModal.addEventListener('click', function(e) {
      if (e.target === filtersModal || e.target.classList.contains('filters__actions_button')) {
        filtersModal.classList.remove('active');
      }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        filtersModal.classList.remove('active');
      }
    });
  });
})();