/* ===================================================================
 * Файл: three-scene.js
 * Описание: Оптимизированный и доработанный скрипт для инициализации
 * фона Vanta.js с упором на производительность и доступность.
 * Версия: 2.1 (Оптимизация)
 *
 * --- УЛУЧШЕНИЯ ---
 * - Добавлена проверка на `prefers-reduced-motion` для доступности.
 * - Параметры вынесены в конфигурационные объекты для удобства.
 * - Реализован правильный жизненный цикл: создание и уничтожение
 * эффекта для освобождения ресурсов.
 * ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Проверяем наличие библиотеки Vanta.js
    if (typeof VANTA === 'undefined') {
        console.warn('Библиотека Vanta.js не загружена. Анимация фона не будет отображаться.');
        return;
    }

    const vantaContainer = document.getElementById('vanta-canvas-container');
    if (!vantaContainer) {
        // Если контейнер не найден, ничего не делаем
        return;
    }

    // --- КОНФИГУРАЦИИ АНИМАЦИИ ---

    // Стандартные, качественные настройки для большинства пользователей
    const VANTA_CONFIG_DEFAULT = {
        el: vantaContainer,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00ffa3,
        backgroundColor: 0x121217,
        points: 14.00,      // Слегка увеличим количество для плотности
        maxDistance: 25.00, // и дистанцию для лучшей связи
        spacing: 17.00
    };

    // Облегченные настройки для режима "пониженного движения"
    const VANTA_CONFIG_REDUCED = {
        ...VANTA_CONFIG_DEFAULT, // Берем за основу стандартные настройки
        mouseControls: false,    // Отключаем интерактивность
        touchControls: false,
        points: 4.00,            // Значительно снижаем количество точек
        maxDistance: 10.00,
        spacing: 30.00           // и увеличиваем расстояние между ними
    };

    // --- ЛОГИКА ИНИЦИАЛИЗАЦИИ И УНИЧТОЖЕНИЯ ---

    let vantaEffect = null; // Переменная для хранения активного эффекта

    /**
     * Инициализирует Vanta-эффект на основе настроек пользователя.
     */
    function initVanta() {
        // Проверяем, предпочитает ли пользователь пониженное движение
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const activeConfig = prefersReducedMotion ? VANTA_CONFIG_REDUCED : VANTA_CONFIG_DEFAULT;

        // Создаем эффект, только если он еще не был создан
        if (!vantaEffect) {
            vantaEffect = VANTA.NET(activeConfig);
        }
    }

    /**
     * Уничтожает активный Vanta-эффект и освобождает ресурсы.
     */
    function destroyVanta() {
        if (vantaEffect) {
            vantaEffect.destroy();
            vantaEffect = null;
        }
    }

    // --- ЗАПУСК ---

    // Инициализируем анимацию
    initVanta();

    // Добавляем слушателя для корректного уничтожения эффекта при уходе со страницы.
    // Это хорошая практика для предотвращения утечек памяти.
    window.addEventListener('beforeunload', destroyVanta);
});
