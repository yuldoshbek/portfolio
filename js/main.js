/* ===================================================================
 * Файл: main.js
 * Описание: Оптимизированный и модульный JavaScript для интерактивности сайта-портфолио.
 * Версия: 2.0 (Рефакторинг)
 *
 * --- СТРУКТУРА ---
 * 1. Главная функция инициализации (init)
 * 2. Модуль: Плавная прокрутка
 * 3. Модуль: Мобильное меню (Бургер)
 * 4. Модуль: Анимации при прокрутке (Intersection Observers)
 * 5. Модуль: Эффекты, управляемые курсором (Прожектор, наклон карточек)
 * 6. Модуль: Аккордеон для таймлайна
 * 7. Модуль: Форма контактов с EmailJS
 * ================================================================ */

/**
 * Главная функция, которая запускается после полной загрузки DOM.
 * Вызывает все остальные функции инициализации.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Проверка на наличие ключевых библиотек для избежания ошибок
    if (typeof emailjs === 'undefined') {
        console.error('Ошибка: Библиотека EmailJS не загружена. Форма отправки не будет работать.');
    }
    if (typeof VANTA === 'undefined') {
        console.warn('Предупреждение: Библиотека Vanta.js не загружена. Анимация фона не будет отображаться.');
    }

    // Инициализация всех интерактивных модулей
    initSmoothScroll();
    initMobileMenu();
    initIntersectionObservers();
    initMouseEffects();
    initTimelineAccordion();
    initContactForm();
});


/**
 * 1. МОДУЛЬ: ПЛАВНАЯ ПРОКРУТКА
 * Обеспечивает плавную навигацию по якорным ссылкам.
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (!anchors.length) return;

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Исключаем пустые ссылки, чтобы избежать ошибок
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


/**
 * 2. МОДУЛЬ: МОБИЛЬНОЕ МЕНЮ
 * Управляет открытием и закрытием бургер-меню.
 */
function initMobileMenu() {
    const burgerBtn = document.querySelector('.burger-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.close-menu-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    if (!burgerBtn || !mobileNav || !closeBtn) {
        console.warn('Элементы мобильного меню не найдены.');
        return;
    }

    const toggleMenu = (isOpen) => {
        mobileNav.classList.toggle('is-open', isOpen);
        burgerBtn.setAttribute('aria-expanded', isOpen);
        mobileNav.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : ''; // Блокируем скролл страницы при открытом меню
    };

    burgerBtn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Закрытие меню по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
            toggleMenu(false);
        }
    });
}


/**
 * 3. МОДУЛЬ: АНИМАЦИИ ПРИ ПРОКРУТКЕ
 * Использует Intersection Observer для анимации секций и прогресс-баров.
 */
function initIntersectionObservers() {
    const animationOptions = {
        threshold: 0.1, // Анимация начнется, когда 10% секции видно
        rootMargin: '0px 0px -50px 0px' // Начинаем чуть раньше, чем элемент появится полностью
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Отписываемся от наблюдения после анимации для повышения производительности
                observer.unobserve(entry.target); 
            }
        });
    }, animationOptions);

    // Наблюдаем за каждой секцией с классом .animated-section
    document.querySelectorAll('.animated-section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Отдельный наблюдатель для прогресс-баров
    const langSection = document.getElementById('education-languages');
    if (langSection) {
        const langObserver = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.progress-bar').forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level;
                });
                observer.unobserve(langSection);
            }
        }, { threshold: 0.5 });
        langObserver.observe(langSection);
    }
}


/**
 * 4. МОДУЛЬ: ЭФФЕКТЫ, УПРАВЛЯЕМЫЕ КУРСОРОМ
 * Оптимизированные эффекты для "прожектора" и 3D-наклона карточек.
 */
function initMouseEffects() {
    // Эффект "прожектора" для секции "Философия"
    const philosophySection = document.getElementById('philosophy');
    if (philosophySection) {
        philosophySection.addEventListener('mousemove', e => {
            const rect = philosophySection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            philosophySection.style.setProperty('--mouse-x', `${x}px`);
            philosophySection.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // 3D-наклон для карточек с навыками
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        skillCards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -7; // Уменьшил угол для более сдержанного эффекта
                const rotateY = ((x - centerX) / centerX) * 7;
                
                // Используем requestAnimationFrame для плавной анимации
                requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                });
            });

            card.addEventListener('mouseleave', () => {
                requestAnimationFrame(() => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                });
            });
        });
    }
}


/**
 * 5. МОДУЛЬ: АККОРДЕОН ДЛЯ ТАЙМЛАЙНА
 * Позволяет открывать и закрывать элементы в секции "Опыт".
 */
function initTimelineAccordion() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;

    timelineItems.forEach(item => {
        const header = item.querySelector('.timeline-item-header');
        if (header) {
            header.addEventListener('click', () => {
                // Проверяем, был ли этот элемент уже открыт
                const isOpen = item.classList.contains('is-open');
                
                // Закрываем все другие элементы
                timelineItems.forEach(el => el.classList.remove('is-open'));

                // Если элемент не был открыт, открываем его. Иначе - он просто закроется.
                if (!isOpen) {
                    item.classList.add('is-open');
                }
            });
        }
    });
}


/**
 * 6. МОДУЛЬ: ФОРМА КОНТАКТОВ С EMAILJS
 * Управляет отправкой данных из формы и обратной связью для пользователя.
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    // ВАШИ ДАННЫЕ ИЗ EMAILJS
    const serviceID = 'service_2ph61ce'; // Замените на ваш Service ID
    const templateID = 'template_n9uzzvf'; // Замените на ваш Template ID
    const userID = 'kFJ1u_eSRT6GosyVDbJuO';      // Замените на ваш Public Key (User ID)

    // Инициализация EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(userID);
    } else {
        console.error('Не удалось инициализировать EmailJS.');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button');
        const originalBtnText = submitBtn.textContent;

        // Обновляем состояние кнопки
        submitBtn.textContent = 'Отправка...';
        submitBtn.classList.add('is-sending');
        submitBtn.disabled = true;

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                submitBtn.textContent = 'Заявка отправлена!';
                submitBtn.classList.remove('is-sending');
                submitBtn.classList.add('is-success');
                contactForm.reset(); // Очищаем форму
                setTimeout(() => { // Возвращаем кнопку в исходное состояние через 3 секунды
                    submitBtn.textContent = originalBtnText;
                    submitBtn.classList.remove('is-success');
                    submitBtn.disabled = false;
                }, 3000);
            }, (error) => {
                submitBtn.textContent = 'Ошибка! Попробуйте снова.';
                submitBtn.classList.remove('is-sending');
                submitBtn.classList.add('is-error');
                console.error('Ошибка отправки EmailJS:', error);
                setTimeout(() => { // Возвращаем кнопку в исходное состояние
                    submitBtn.textContent = originalBtnText;
                    submitBtn.classList.remove('is-error');
                    submitBtn.disabled = false;
                }, 3000);
            });
    });
}