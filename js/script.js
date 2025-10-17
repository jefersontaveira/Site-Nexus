document.addEventListener('DOMContentLoaded', () => {

    // --- 1. EFEITO DE CURSOR SUTIL COM BRILHO ---
    const customCursor = document.querySelector('.custom-cursor');

    // Só ativa o cursor em dispositivos que não são de toque
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            customCursor.style.opacity = '1';
            const posX = e.clientX;
            const posY = e.clientY;
            
            customCursor.style.left = `${posX}px`;
            customCursor.style.top = `${posY}px`;
        });
    }

    // Adiciona efeito de hover em links e botões
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseover', () => {
            customCursor.classList.add('hover');
        });
        el.addEventListener('mouseout', () => {
            customCursor.classList.remove('hover');
        });
    });


    // --- 2. ANIMAÇÕES AO ROLAR REFINADAS (SEM "SALTOS") ---
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '0px',   // Sem movimento vertical
        duration: 700,
        scale: 0.95,       // Efeito de zoom sutil
        easing: 'ease-in-out',
        reset: false
    });

    sr.reveal('.section-title');
    sr.reveal('.hero-subtitle', { delay: 300 });
    sr.reveal('.btn', { delay: 400 });
    
    sr.reveal('.service-card', { interval: 100 });
    sr.reveal('.portfolio-item', { interval: 100 });
    sr.reveal('.process-step', { interval: 100 });
    sr.reveal('.testimonial-card');
    sr.reveal('.about-image', { origin: 'left', scale: 1 });
    sr.reveal('.about-text', { origin: 'right', scale: 1 });
    sr.reveal('.contact-info', { origin: 'left', scale: 1 });
    sr.reveal('.contact-form', { origin: 'right', scale: 1 });


    // --- 3. FILTRO DO PORTFÓLIO (FUNCIONALIDADE MANTIDA) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });


    // --- 4. NAVEGAÇÃO SUAVE (FUNCIONALIDADE MANTIDA) ---
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .logo[href^="#"], .hero-section a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            
            // Fecha o menu mobile ao clicar em um link
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // --- 5. MENU MOBILE (HAMBURGER) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

});