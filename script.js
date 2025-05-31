document.addEventListener('DOMContentLoaded', function() {
    // Плавное появление элементов при скролле
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Навигация к секции игры
    const gameLink = document.getElementById('gameLink');
    const gameSection = document.getElementById('neonGlide');
    
    gameLink.addEventListener('click', () => {
        gameSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Слайдер
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    const slideCount = slides.length;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Свайп для слайдера
    let touchStartX = 0;
    let touchEndX = 0;
    const sliderContainer = document.querySelector('.slider-container');

    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    sliderContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
    }

    // Модальное окно для изображений
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('#imageModal .close-modal');
    const slideImages = document.querySelectorAll('.slide-img');

    slideImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Модальное окно истории
    const storyModal = document.getElementById('storyModal');
    const storyButton = document.getElementById('storyButton');
    const closeStoryModal = document.querySelector('#storyModal .close-modal');
    const chapterNavBtns = document.querySelectorAll('.chapter-nav-btn');
    const storyChapters = document.querySelectorAll('.story-chapter');
    let currentOpenChapter = 0;

    storyButton.addEventListener('click', function() {
        storyModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Активируем первую главу, если ничего не открыто
        if (!document.querySelector('.story-chapter.active')) {
            chapterNavBtns[0].classList.add('active');
            storyChapters[0].classList.add('active');
            currentOpenChapter = 0;
        }
    });

    closeStoryModal.addEventListener('click', function() {
        storyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    storyModal.addEventListener('click', function(e) {
        if (e.target === storyModal) {
            storyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    chapterNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const chapterIndex = parseInt(this.getAttribute('data-chapter'));
            
            if (currentOpenChapter !== chapterIndex) {
                // Убираем активный класс у всех кнопок и глав
                chapterNavBtns.forEach(b => b.classList.remove('active'));
                storyChapters.forEach(ch => ch.classList.remove('active'));
                
                // Добавляем активный класс к выбранной кнопке и главе
                this.classList.add('active');
                storyChapters[chapterIndex].classList.add('active');
                currentOpenChapter = chapterIndex;
            }
        });
    });

    // Инициализация
    updateSlider();
});