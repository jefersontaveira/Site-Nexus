
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. EFEITO DE CURSOR SUTIL COM BRILHO ---
    const customCursor = document.querySelector('.custom-cursor');
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            if (customCursor) { // Adiciona verificação de segurança
                customCursor.style.opacity = '1';
                const posX = e.clientX;
                const posY = e.clientY;
                customCursor.style.left = `${posX}px`;
                customCursor.style.top = `${posY}px`;
            }
        });
    }
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseover', () => {
            customCursor?.classList.add('hover');
        });
        el.addEventListener('mouseout', () => {
            customCursor?.classList.remove('hover');
        });
    });

    // --- 2. ANIMAÇÕES AO ROLAR REFINADAS ---
    // Verifica se ScrollReveal existe antes de usar
    if (typeof ScrollReveal === 'function') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '0px',
            duration: 700,
            scale: 0.95,
            easing: 'ease-in-out',
            reset: false
        });
        sr.reveal('.section-title');
        sr.reveal('.hero-subtitle', { delay: 300 });
        sr.reveal('.btn', { delay: 400 });
        sr.reveal('.service-card', { interval: 100 });
        sr.reveal('.portfolio-item', { interval: 100 });
        sr.reveal('.testimonial-card');
        sr.reveal('.about-image', { origin: 'left', scale: 1 });
        sr.reveal('.about-text', { origin: 'right', scale: 1 });
        sr.reveal('.contact-info', { origin: 'left', scale: 1 });
        sr.reveal('.contact-form', { origin: 'right', scale: 1 });
    } else {
        console.warn("ScrollReveal não foi carregado. Animações de scroll desativadas.");
    }


    // --- 3. FILTRO DO PORTFÓLIO ---
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

    // --- 4. NAVEGAÇÃO SUAVE ---
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"], .logo[href^="#"], .hero-section a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            try {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            } catch (error) {
                console.error("Erro no scroll suave:", error);
            }
        });
    });

    // --- 5. MENU MOBILE (HAMBURGER) ---
    const hamburger = document.querySelector('.hamburger-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

   // --- 8. ANIMAÇÃO DE LINHA DO TEMPO (VERSÃO CORRIGIDA E OTIMIZADA) ---

    const timelineSteps = document.querySelectorAll('.timeline-step');
    const processCards = document.querySelectorAll('.process-card');
    const timelineOrb = document.querySelector('.timeline-orb');

    // Define o primeiro passo como ativo no carregamento da página
    function initializeTimeline() {
        if (timelineSteps.length > 0) {
            // Ativa o primeiro step e card
            timelineSteps[0].classList.add('active');
            document.getElementById('card-1').classList.add('active');
            
            // Posiciona o orb no primeiro step
            // 'offsetLeft' pega a posição exata em pixels
            // 'offsetWidth / 2' centraliza o orb no meio do step
            const firstStep = timelineSteps[0];
            const orbPosition = firstStep.offsetLeft + (firstStep.offsetWidth / 2) - (timelineOrb.offsetWidth / 2);
            timelineOrb.style.left = `${orbPosition}px`;
        }
    }

    // Adiciona o 'listener' de HOVER (mouseenter) para cada step
    timelineSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            
            // 1. Pega o número do step (ex: "3")
            const targetStep = step.getAttribute('data-step');
            
            // 2. Desativa TODOS os steps e cards
            timelineSteps.forEach(s => s.classList.remove('active'));
            processCards.forEach(c => c.classList.remove('active'));
            
            // 3. Ativa o step e o card correspondente
            step.classList.add('active');
            document.getElementById(`card-${targetStep}`).classList.add('active');
            
            // 4. Move o Círculo Luminoso!
            // Pega a posição em pixels do step em que o mouse entrou
            // e centraliza o orb nele.
            const stepPosition = step.offsetLeft + (step.offsetWidth / 2) - (timelineOrb.offsetWidth / 2);
            timelineOrb.style.left = `${stepPosition}px`;
        });
    });

    // Roda a função de inicialização
    initializeTimeline();

    const logoItems = document.querySelectorAll('.logo-item');
    const testimonialTextDisplay = document.getElementById('testimonial-text-display');
    const testimonialAuthorDisplay = document.getElementById('testimonial-author-display');

    // Adiciona o 'listener' de HOVER (mouseenter) para cada logo
    logoItems.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            
            // 1. Pega os dados do logo em que o mouse entrou
            const newText = logo.getAttribute('data-text');
            const newAuthor = logo.getAttribute('data-author');
            const newCompany = logo.getAttribute('data-company');

            // 2. Desativa TODOS os logos
            logoItems.forEach(item => item.classList.remove('active'));
            
            // 3. Ativa apenas o logo atual
            logo.classList.add('active');

            // 4. Efeito de fade-out no texto antigo
            testimonialTextDisplay.style.opacity = 0;
            testimonialAuthorDisplay.style.opacity = 0;

            // 5. Espera a animação de fade-out terminar (0.15s)
            setTimeout(() => {
                // Atualiza o conteúdo do card de destaque
                testimonialTextDisplay.textContent = newText;
                testimonialAuthorDisplay.innerHTML = `
                    <cite>${newAuthor}</cite>
                    <span>${newCompany}</span>
                `;
                
                // 6. Efeito de fade-in no texto novo
                testimonialTextDisplay.style.opacity = 1;
                testimonialAuthorDisplay.style.opacity = 1;
            }, 150); // 150ms (metade da transição de 0.3s)
        });
    });

    // --- 10. CONTROLES DO SLIDER DE LOGOS (VERSÃO REVISADA) ---
    // (Certifique-se que isso está DENTRO do 'DOMContentLoaded')

    const logoGrid = document.querySelector('.testimonial-logo-grid');
    const prevBtn = document.getElementById('logo-prev');
    const nextBtn = document.getElementById('logo-next');

    // Adicionamos uma verificação mais robusta
    if (logoGrid && prevBtn && nextBtn) {
        
        // Função de scroll simplificada
        function scrollSlider(direction) {
            // Pega a largura visível da grade (o espaço que vemos)
            const gridWidth = logoGrid.clientWidth; 
            
            // Calcula quanto rolar (80% da largura visível)
            const scrollAmount = gridWidth * 0.8;
            
            if (direction === 'next') {
                console.log("Scroll Next:", scrollAmount); // Log para debug
                logoGrid.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                console.log("Scroll Prev:", -scrollAmount); // Log para debug
                logoGrid.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            }
        }

        // Evento do botão "Próximo"
        nextBtn.addEventListener('click', () => {
            scrollSlider('next');
        });

        // Evento do botão "Anterior"
        prevBtn.addEventListener('click', () => {
            scrollSlider('prev');
        });

    } else {
        // Log de erro para sabermos se os elementos não foram encontrados
        console.error("Erro no Slider: Elementos (logoGrid, prevBtn, ou nextBtn) não foram encontrados. Verifique os IDs no HTML.");
    }

}); // <-- FIM DO 'DOMContentLoaded'