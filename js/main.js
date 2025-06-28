document.addEventListener('DOMContentLoaded', () => {

   // --- Плавная прокрутка для якорных ссылок в меню ---
   // Этот код находит все ссылки, которые ведут на якоря (начинаются с #)
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
       // и добавляет обработчик клика
       anchor.addEventListener('click', function (e) {
           e.preventDefault(); // Отменяем стандартное поведение "прыжка"

           const targetId = this.getAttribute('href');
           const targetElement = document.querySelector(targetId);

           // Если элемент с таким id найден, плавно прокручиваем к нему
           if (targetElement) {
               targetElement.scrollIntoView({
                   behavior: 'smooth' // Магия планой прокрутки
               });
           }
       });
   });

});

// --- Анимация секций при прокрутке ---
const animatedSections = document.querySelectorAll('.animated-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Если секция появляется в поле зрения
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1 // Анимация начнется, когда 10% секции видно
});

// Начинаем "наблюдать" за каждой анимируемой секцией
animatedSections.forEach(section => {
    observer.observe(section);
});


// --- Логика для эффекта "Прожектора" в секции "Философия" ---
const philosophySection = document.getElementById('philosophy');

if (philosophySection) {
    philosophySection.addEventListener('mousemove', e => {
        // Вычисляем позицию курсора внутри секции
        const rect = philosophySection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Передаем эти координаты в наши CSS переменные
        philosophySection.style.setProperty('--mouse-x', `${x}px`);
        philosophySection.style.setProperty('--mouse-y', `${y}px`);
    });
}


// --- Логика для интерактивного таймлайна (аккордеон) ---
const timelineHeaders = document.querySelectorAll('.timeline-item-header');

timelineHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        
        // Проверяем, был ли этот элемент уже открыт
        const isOpen = item.classList.contains('is-open');

        // Сначала закрываем все открытые элементы
        document.querySelectorAll('.timeline-item').forEach(el => {
            el.classList.remove('is-open');
        });

        // Если элемент не был открыт, открываем его
        if (!isOpen) {
            item.classList.add('is-open');
        }
    });
});


// --- Логика для 3D-наклона карточек с навыками ---
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // X позиция внутри карточки
        const y = e.clientY - rect.top;  // Y позиция внутри карточки

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8; // Макс наклон по X: 8 градусов
        const rotateY = ((x - centerX) / centerX) * 8;  // Макс наклон по Y: 8 градусов

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        // Возвращаем карточку в исходное положение
        card.style.transform = `rotateX(0) rotateY(0)`;
    });
});


// --- Инициализация EmailJS и отправка формы ---
(function() {
    // Вставьте сюда ваши данные из EmailJS
    emailjs.init("kFJ1u_eSRT6GosyVDbJuO"); 
})();

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Отменяем стандартную отправку
        
        const submitBtn = this.querySelector('button');
        const originalBtnText = submitBtn.textContent;

        // Показываем состояние отправки
        submitBtn.textContent = 'Отправка...';
        submitBtn.classList.add('is-sending');
        submitBtn.disabled = true;

        emailjs.sendForm('service_2ph61ce', 'template_n9uzzvf', this)
            .then(() => {
                // Успех
                submitBtn.textContent = 'Заявка отправлена!';
                submitBtn.classList.remove('is-sending');
                submitBtn.classList.add('is-success');
            }, (error) => {
                // Ошибка
                submitBtn.textContent = 'Ошибка! Попробуйте снова.';
                submitBtn.classList.remove('is-sending');
                submitBtn.classList.add('is-error');
                console.log('FAILED...', error);
            });
    });
}


// --- Анимация прогресс-баров при прокрутке ---
const progressBars = document.querySelectorAll('.progress-bar');
const langSection = document.getElementById('education-languages');

const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            progressBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level;
            });
            langObserver.unobserve(langSection); // Запускаем анимацию один раз
        }
    });
}, { threshold: 0.5 });

if(langSection) {
    langObserver.observe(langSection);
}

// --- Логика для мобильного меню ---
const burgerBtn = document.querySelector('.burger-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.close-menu-btn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

if (burgerBtn && mobileNav && closeBtn) {
    // Открываем меню по клику на бургер
    burgerBtn.addEventListener('click', () => {
        mobileNav.classList.add('is-open');
    });

    // Закрываем меню по клику на крестик
    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
    });

    // Закрываем меню по клику на любую ссылку
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('is-open');
        });
    });
}