  (function() {
            'use strict';
            
            $(document).ready(function() {
             
                $('#day').inputmask('99', { placeholder: 'ДД' });
                $('#month').inputmask('99', { placeholder: 'ММ' });
                $('#year').inputmask('9999', { placeholder: 'ГГГГ' });
                
             
                const picker = new Pikaday({
                    field: document.getElementById('hiddenDate'),
                    trigger: document.getElementById('calendarButton'),
                    i18n: {
                        previousMonth: 'Предыдущий месяц',
                        nextMonth: 'Следующий месяц',
                        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                        weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
                    },
                    onSelect: function() {
                        const date = this.getDate();
                        if (date) {
                       
                            $('#day').val(date.getDate().toString().padStart(2, '0'));
                            $('#month').val((date.getMonth() + 1).toString().padStart(2, '0'));
                            $('#year').val(date.getFullYear());
                        }
                    }
                });
                
   
                $('#calendarButton').on('click', function() {
           
                    const day = $('#day').val();
                    const month = $('#month').val();
                    const year = $('#year').val();
                    
                
                    if (day && month && year) {
                        const date = new Date(year, month - 1, day);
                        if (!isNaN(date.getTime())) {
                            picker.setDate(date);
                        }
                    }
                    
                
                    picker.show();
                });
                
            

            });
        })();