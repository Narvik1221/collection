// Меню бургер
class Header {
    constructor() {
        this.burger = document.querySelector('.header__burger');
        this.nav = document.querySelector('.header__nav');
        this.body = document.body;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Клик по бургеру
        this.burger.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Клик по ссылке в меню (закрывает меню на мобильных)
        this.nav.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav__link')) {
                this.closeMenu();
            }
        });

        // Закрытие меню при клике вне области
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header') && this.nav.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // Закрытие меню при ресайзе окна (если перешли с мобильного на десктоп)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.burger.classList.toggle('active');
        this.nav.classList.toggle('active');
        this.body.classList.toggle('menu-open');
    }

    closeMenu() {
        this.burger.classList.remove('active');
        this.nav.classList.remove('active');
        this.body.classList.remove('menu-open');
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('Header initialized');
    new Header();
});