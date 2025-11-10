(function() {
    'use strict';

    // Каталог товаров с пагинацией
    class Catalog {
        constructor() {
            this.products = [];
            this.currentPage = 1;
            this.productsPerPage = 6;
            this.init();
        }

        async init() {
            console.log('Catalog init started');
            await this.loadProducts();
            console.log('Products loaded:', this.products.length);
            this.renderProducts();
            this.renderPagination();
            this.bindEvents();
        }

        // Загрузка товаров из JSON
        async loadProducts() {
            try {
                console.log('Loading products from data/products.json');
                const response = await fetch('/data/products.json');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Products data:', data);
                this.products = data.products || [];
                
                if (this.products.length === 0) {
                    console.warn('No products found in JSON file');
                }
            } catch (error) {
                console.error('Ошибка загрузки товаров:', error);
                this.products = this.getFallbackProducts();
            }
        }

        // Fallback данные если JSON не загрузился
        getFallbackProducts() {
            return [
                {
                    id: 1,
                    name: "Тестовый товар 1",
                    price: 1000,
                    image: "img/products/test1.jpg",
                    description: "Описание тестового товара 1"
                },
                {
                    id: 2,
                    name: "Тестовый товар 2", 
                    price: 2000,
                    image: "img/products/test2.jpg",
                    description: "Описание тестового товара 2"
                },
                {
                    id: 3,
                    name: "Тестовый товар 3",
                    price: 3000,
                    image: "img/products/test3.jpg", 
                    description: "Описание тестового товара 3"
                }
            ];
        }

        // Рендер товаров
        renderProducts() {
            const grid = document.getElementById('products-grid');
            if (!grid) {
                console.error('Element #products-grid not found');
                return;
            }

            if (this.products.length === 0) {
                grid.innerHTML = '<div class="no-products">Товары не найдены</div>';
                return;
            }

            const startIndex = (this.currentPage - 1) * this.productsPerPage;
            const endIndex = startIndex + this.productsPerPage;
            const productsToShow = this.products.slice(startIndex, endIndex);

            console.log('Rendering products:', productsToShow.length);

            grid.innerHTML = productsToShow.map(product => `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-card__image">
                        ${product.name}
                    </div>
                    <h3 class="product-card__name">${product.name}</h3>
                    <p class="product-card__description">${product.description}</p>
                    <div class="product-card__price">${this.formatPrice(product.price)} ₽</div>
                    <div class="product-card__actions">
                        <button class="product-card__button product-card__button--cart" aria-label="Добавить в корзину">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                            </svg>
                        </button>
                        <button class="product-card__button product-card__button--favorite" aria-label="Добавить в избранное">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // ... остальные методы без изменений (formatPrice, renderPagination, bindEvents и т.д.)
        // Форматирование цены
        formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }

        // Рендер пагинации
        renderPagination() {
            const pagination = document.getElementById('pagination');
            if (!pagination) return;

            const totalPages = Math.ceil(this.products.length / this.productsPerPage);
            
            let paginationHTML = '';
            
            // Кнопка "Назад"
            paginationHTML += `
                <button class="pagination__button ${this.currentPage === 1 ? 'pagination__button--disabled' : ''}" 
                        data-page="${this.currentPage - 1}">
                    Назад
                </button>
            `;

            // Номера страниц
            paginationHTML += '<div class="pagination__pages">';
            
            for (let i = 1; i <= totalPages; i++) {
                paginationHTML += `
                    <button class="pagination__button ${i === this.currentPage ? 'pagination__button--active' : ''}" 
                            data-page="${i}">
                        ${i}
                    </button>
                `;
            }
            
            paginationHTML += '</div>';

            // Кнопка "Вперед"
            paginationHTML += `
                <button class="pagination__button ${this.currentPage === totalPages ? 'pagination__button--disabled' : ''}" 
                        data-page="${this.currentPage + 1}">
                    Вперед
                </button>
            `;

            pagination.innerHTML = paginationHTML;
        }

        // Обработка событий
        bindEvents() {
            // Пагинация
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('pagination__button') && 
                    !e.target.classList.contains('pagination__button--disabled')) {
                    const page = parseInt(e.target.dataset.page);
                    if (page && page !== this.currentPage) {
                        this.currentPage = page;
                        this.renderProducts();
                        this.renderPagination();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }

                // Клик по карточке товара
                if (e.target.closest('.product-card')) {
                    const card = e.target.closest('.product-card');
                    const productId = card.dataset.productId;
                    this.openProductPage(productId);
                }

                // Добавление в корзину
                if (e.target.closest('.product-card__button--cart')) {
                    e.stopPropagation();
                    const card = e.target.closest('.product-card');
                    const productId = card.dataset.productId;
                    this.addToCart(productId);
                }

                // Добавление в избранное
                if (e.target.closest('.product-card__button--favorite')) {
                    e.stopPropagation();
                    const card = e.target.closest('.product-card');
                    const productId = card.dataset.productId;
                    this.addToFavorite(productId);
                }
            });

            // Обработка фильтров (только UI)
            document.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox' || e.target.type === 'range') {
                    console.log('Фильтр изменен:', e.target);
                }
            });
        }

        // Открытие страницы товара
        openProductPage(productId) {
            console.log('Opening product page:', productId);
            // window.location.href = `product.html?id=${productId}`;
        }

        // Добавление в корзину
        addToCart(productId) {
            console.log('Товар добавлен в корзину:', productId);
        }

        // Добавление в избранное
        addToFavorite(productId) {
            console.log('Товар добавлен в избранное:', productId);
        }
    }

    // Инициализация каталога
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing catalog...');
        new Catalog();
    });

})();