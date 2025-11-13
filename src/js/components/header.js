// Меню бургер
(function() {
    'use strict';

    let headerInstance = null;

    const Header = function() {
        if (headerInstance) {
            return headerInstance;
        }

        this.burger = document.querySelector('.header__burger');
        this.nav = document.querySelector('.header__nav');
        this.body = document.body;
        
        if (this.burger && this.nav) {
            this.init();
            headerInstance = this;
        }
        
        return this;
    };

    Header.prototype.init = function() {
        this.bindEvents();
    };

    Header.prototype.bindEvents = function() {
        const self = this;

        this.burger.addEventListener('click', function() {
            self.toggleMenu();
        });

        this.nav.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav__link')) {
                self.closeMenu();
            }
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.header') && self.nav.classList.contains('active')) {
                self.closeMenu();
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && self.nav.classList.contains('active')) {
                self.closeMenu();
            }
        });
    };

    Header.prototype.toggleMenu = function() {
        this.burger.classList.toggle('active');
        this.nav.classList.toggle('active');
        this.body.classList.toggle('menu-open');
    };

    Header.prototype.closeMenu = function() {
        this.burger.classList.remove('active');
        this.nav.classList.remove('active');
        this.body.classList.remove('menu-open');
    };

    // Инициализация при загрузке DOM
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Header initialized');
        new Header();
    });

})();