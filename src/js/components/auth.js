(function() {
    'use strict';
    
    // Инициализация при загрузке DOM
    document.addEventListener('DOMContentLoaded', function() {
        // Инициализация маски для телефона
        $('#phone').inputmask({
            mask: '+7 (999) 999-99-99',
            placeholder: '_',
            showMaskOnHover: false,
            showMaskOnFocus: true
        });
        
        // Инициализация выбора страны
        $('#country').select2({
            language: 'ru',
            placeholder: 'Россия',
            allowClear: true,
            width: '100%'
        });
        

        
        const monthPicker = new Pikaday({
            field: document.getElementById('birth-month'),
            format: 'MM',
            onSelect: function() {
                // Ограничиваем ввод только месяцами
                const month = this.getDate().getMonth() + 1;
                document.getElementById('birth-month').value = month < 10 ? '0' + month : month;
            }
        });
        
        const yearPicker = new Pikaday({
            field: document.getElementById('birth-year'),
            format: 'YYYY',
            yearRange: [1900, new Date().getFullYear()],
            onSelect: function() {
                // Ограничиваем ввод только годами
                document.getElementById('birth-year').value = this.getDate().getFullYear();
            }
        });
        
        // Настройка валидации формы
        $('#registration-form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true,
                    minlength: 2
                },
                password: {
                    required: true,
                    minlength: 6
                },
                'confirm-password': {
                    required: true,
                    equalTo: '#password'
                },
                agree: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: "Это поле обязательно",
                    email: "Пожалуйста, введите корректный email"
                },
                name: {
                    required: "Это поле обязательно",
                    minlength: "Имя должно содержать не менее 2 символов"
                },
                password: {
                    required: "Это поле обязательно",
                    minlength: "Пароль должен содержать не менее 6 символов"
                },
                'confirm-password': {
                    required: "Это поле обязательно",
                    equalTo: "Пароли не совпадают"
                },

            },
            errorPlacement: function(error, element) {
                if (element.attr('name') === 'agree') {
                    error.insertAfter(element.closest('.checkbox-group'));
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).addClass('error');
            },
            unhighlight: function(element) {
                $(element).removeClass('error');
            },
            submitHandler: function(form) {
                // В реальном приложении здесь будет отправка формы
                alert('Форма успешно отправлена!');
                return false; // Запрещаем реальную отправку для демо
            }
        });
        

    });
})();