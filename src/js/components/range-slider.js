'use strict';

(function() {
  const rangeSliders = document.querySelectorAll('.filters__range');
  
  rangeSliders.forEach(slider => {
    const track = slider.querySelector('.filters__range-track');
    const minInput = slider.querySelector('.filters__range-input--min');
    const maxInput = slider.querySelector('.filters__range-input--max');
    const priceTextLeft = slider.closest('.filters__price').querySelector('.filters__price-text-left');
      const priceTextRight = slider.closest('.filters__price').querySelector('.filters__price-text-right');
    if (!minInput || !maxInput || !track) return;
    
    function updateTrack() {
      const min = parseInt(minInput.value);
      const max = parseInt(maxInput.value);
      const minVal = parseInt(minInput.min);
      const maxVal = parseInt(maxInput.max);
      

      const start = ((min - minVal) / (maxVal - minVal)) * 100;
      const width = ((max - min) / (maxVal - minVal)) * 100;
      
      track.style.left = start + '%';
      track.style.width = width + '%';
      
 
      if (priceTextLeft) {
        priceTextLeft.textContent = `от ${min}`;
      }
         if (priceTextRight) {
        priceTextRight.textContent = `до ${max}`;
      }
    }
    

    minInput.addEventListener('input', function() {
      const minVal = parseInt(this.value);
      const maxVal = parseInt(maxInput.value);
      
      if (minVal > maxVal) {
        maxInput.value = minVal;
      }
      
      updateTrack();
    });
    
    maxInput.addEventListener('input', function() {
      const maxVal = parseInt(this.value);
      const minVal = parseInt(minInput.value);
      
      if (maxVal < minVal) {
        minInput.value = maxVal;
      }
      
      updateTrack();
    });
    
    // Инициализация
    updateTrack();
  });
})();