document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. TEMA DEĞİŞTİRİCİ (GECE / AYDINLIK MODU) ---
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    // Sayfa ilk açıldığında hafızada 'light' varsa aydınlık modu yükle
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    // Tıklama olayı (Click Event)
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Seçimi hafızaya kaydet
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- 2. MOBİL MENÜ KONTROLÜ ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // --- 3. HERO SLIDER (GÖRSEL KAYDIRICI) ---
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextSlide');
    const prevBtn = document.getElementById('prevSlide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;
        
        slides[currentSlide].classList.add('active');
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); resetTimer(); });
        prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); resetTimer(); });
    }

    function startTimer() { 
        if (slides.length > 0) {
            slideInterval = setInterval(() => { showSlide(currentSlide + 1); }, 5000); 
        }
    }
    
    function resetTimer() { 
        clearInterval(slideInterval); 
        startTimer(); 
    }

    startTimer();
});