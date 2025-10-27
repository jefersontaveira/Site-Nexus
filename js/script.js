
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
    const navToggle = document.querySelector('.nav-toggle');

    // 1. Ação de Abrir/Fechar o Menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            // Adiciona/Remove a classe 'is-active' em ambos
            navToggle.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
            
            // Bônus: Impede o scroll da página quando o menu está aberto
            document.body.classList.toggle('no-scroll');
        });
    }

    // 2. Ação de fechar o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('is-active');
            navMenu.classList.remove('is-active');
            document.body.classList.remove('no-scroll');
        });
    });

    /* --- 3. EFEITOS DO PORTFÓLIO (HÍBRIDO: HOVER/AUTO-SCROLL) --- */

    const isMobile = window.matchMedia('(max-width: 768px)').matches; // Verifica se é mobile

    // --- Lógica de Hover (SÓ PARA DESKTOP) ---
    if (!isMobile && portfolioItems.length > 0) {
        const siteItemsDesktop = document.querySelectorAll('.portfolio-item.item-type-site');
        const scrollSpeed = 100; // Pixels por segundo (para hover)

        siteItemsDesktop.forEach(item => {
            const img = item.querySelector('img');

            // Função para calcular e aplicar hover
            const applyHoverEffect = () => {
                const cardHeight = item.clientHeight;
                const imgHeight = img.clientHeight;
                const moveDistance = Math.max(0, imgHeight - cardHeight);

                item.addEventListener('mouseenter', () => {
                    if (moveDistance > 0) {
                        const durationMs = (moveDistance / scrollSpeed) * 1000;
                        img.style.transition = `transform ${durationMs}ms ease-in-out`;
                        img.style.transform = `translateY(-${moveDistance}px)`;
                    }
                });

                item.addEventListener('mouseleave', () => {
                    img.style.transition = 'transform 0.5s ease-in-out';
                    img.style.transform = 'translateY(0)';
                });
            };

            // Aplica o efeito após carregar ou se já carregada
            if (img.complete && img.naturalHeight > 0) {
                applyHoverEffect();
            } else {
                img.addEventListener('load', applyHoverEffect);
            }
        });
    }

    // --- Lógica de Auto-Scroll (SÓ PARA MOBILE) ---
    if (isMobile && portfolioItems.length > 0) {
        const siteItemsMobile = document.querySelectorAll('.portfolio-item.item-type-site');

        // Cria o Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const item = entry.target;
                const img = item.querySelector('img');

                if (entry.isIntersecting) {
                    // Elemento ENTROU na tela

                    // Função para calcular distância e iniciar animação
                    const startAnimation = () => {
                        const cardHeight = item.clientHeight;
                        const imgHeight = img.clientHeight;
                        const moveDistance = Math.max(0, imgHeight - cardHeight);

                        // Define a variável CSS que a animação vai usar
                        item.style.setProperty('--scroll-distance', `-${moveDistance}px`);
                        
                        // Adiciona a classe que ativa a animação no CSS
                        item.classList.add('is-visible'); 
                    };

                    // Garante que a imagem carregou antes de calcular
                    if (img.complete && img.naturalHeight > 0) {
                        startAnimation();
                    } else {
                        // Se não carregou ainda, espera o 'load'
                        // Usamos { once: true } para não adicionar múltiplos listeners
                        img.addEventListener('load', startAnimation, { once: true });
                    }

                } else {
                    // Elemento SAIU da tela
                    item.classList.remove('is-visible'); // Pausa a animação via CSS
                }
            });
        }, {
            threshold: 0.1 // Ativa quando 10% do item estiver visível
        });

        // Observa cada item de site no mobile
        siteItemsMobile.forEach(item => {
            observer.observe(item);
        });
    }









    // --- 8. ANIMAÇÃO DE LINHA DO TEMPO ---
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


    // --- 9. CONTROLE DO ACCORDION (PROCESSO MOBILE) ---
    const accordionHeaders = document.querySelectorAll('.process-section-mobile .accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Pega o 'pai' (o .accordion-item) do botão que foi clicado
            const currentItem = header.parentElement;

            // 1. Fecha TODOS os *outros* itens
            document.querySelectorAll('.process-section-mobile .accordion-item').forEach(item => {
                // Se o item do loop NÃO for o que eu cliquei...
                if (item !== currentItem) {
                    // ...remove a classe 'active' dele.
                    item.classList.remove('active');
                }
            });

            // 2. Agora, 'alterna' (toggle) o item que eu cliquei
            // Se ele tinha 'active', remove.
            // Se ele não tinha 'active', adiciona.
            currentItem.classList.toggle('active');
        });
    });
    

    /* --- 10. LÓGICA DE DEPOIMENTOS (VERSÃO FINAL CORRIGIDA) --- */

    const sliderContainer = document.querySelector('.testimonial-slider-container');
    const grid = document.querySelector('.testimonial-logo-grid');
    const prevBtn = document.getElementById('logo-prev');
    const nextBtn = document.getElementById('logo-next');
    const textDisplay = document.getElementById('testimonial-text-display');
    const authorDisplay = document.getElementById('testimonial-author-display');

    if (grid && prevBtn && nextBtn && textDisplay && authorDisplay) {

        const originalItems = grid.querySelectorAll('.logo-item');
        const totalItems = originalItems.length; // (ex: 5)
        
        let isMoving = false;
        let currentIndex = 0; // Começa no índice 0
        
        const authorCite = authorDisplay.querySelector('cite');
        const authorSpan = authorDisplay.querySelector('span');

        // --- PASSO 1: CLONAGEM ---
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.remove('active');
            grid.appendChild(clone);
        });

        // 'items' agora tem 10 (originais + clones)
        const items = grid.querySelectorAll('.logo-item');

        
        // --- LÓGICA 1: MUDAR O TEXTO E O .ACTIVE (Sua função) ---
        function updateTestimonial(activeItem) {
            items.forEach(item => item.classList.remove('active'));
            activeItem.classList.add('active');
            const newText = activeItem.getAttribute('data-text');
            const newAuthor = activeItem.getAttribute('data-author');
            const newCompany = activeItem.getAttribute('data-company');
            textDisplay.style.opacity = '0';
            authorDisplay.style.opacity = '0';
            setTimeout(() => {
                textDisplay.textContent = newText;
                authorCite.textContent = newAuthor;
                authorSpan.textContent = newCompany;
                textDisplay.style.opacity = '1';
                authorDisplay.style.opacity = '1';
            }, 300);
        }
        
        // Adiciona o listener de clique a TODOS os 10 itens
        items.forEach((item) => {
            // 1. NOVO: Adiciona o listener de HOVER (passar o mouse)
            item.addEventListener('mouseenter', () => {
                // Chama a sua função de atualizar o texto
                updateTestimonial(item);
            });

            // 2. O listener de CLIQUE (mantém para mobile/acessibilidade)
             item.addEventListener('click', () => {
                 // O clique também atualiza
             updateTestimonial(item);
             });
        });

        
        // --- LÓGICA 2: MOVER O CARROSSEL (Lógica de "loop") ---

        function getItemWidth() {
            const firstItem = grid.querySelector('.logo-item');
            if (!firstItem) return 0;
            const gap = parseFloat(window.getComputedStyle(grid).gap) || 0;
            return firstItem.offsetWidth + gap;
        }

        // --- Botão NEXT (Avançar) ---
        nextBtn.addEventListener('click', () => {
            if (isMoving) return;
            isMoving = true;
            
            const itemWidth = getItemWidth();
            currentIndex++; 

            grid.style.transition = 'transform 0.5s ease-in-out';
            grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

            // *** AQUI ESTÁ A CORREÇÃO ***
            // Atualiza a UI para o slide que *está entrando*
            updateTestimonial(items[currentIndex]); 
            
            grid.addEventListener('transitionend', () => {
                if (currentIndex === totalItems) { 
                    setTimeout(() => {
                        grid.style.transition = 'none'; 
                        grid.style.transform = 'translateX(0)'; 
                        currentIndex = 0; 
                    }, 0); 
                }
                isMoving = false;
            }, { once: true });
        });

        // --- Botão PREV (Voltar) ---
        prevBtn.addEventListener('click', () => {
            if (isMoving) return;
            isMoving = true;

            const itemWidth = getItemWidth();

            if (currentIndex === 0) {
                currentIndex = totalItems; 
                grid.style.transition = 'none';
                grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                grid.offsetHeight; 
            }
            
            currentIndex--; 

            // *** AQUI ESTÁ A CORREÇÃO ***
            // Atualiza a UI para o slide que *está entrando*
            updateTestimonial(items[currentIndex]); 

            grid.style.transition = 'transform 0.5s ease-in-out';
            grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

            grid.addEventListener('transitionend', () => {
                isMoving = false;
            }, { once: true });
        });

    } else {
        console.error("Erro no Slider de Depoimentos: Um ou mais elementos não foram encontrados.");
    }


    // --- 11. EFEITO DE HEADER ENCOLHENDO NO SCROLL ---
    const header = document.querySelector('.main-header');
    const scrollThreshold = 50; // Quantos pixels rolar antes de encolher (ajuste se quiser)

    // Função que verifica o scroll e aplica/remove a classe
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            // Se rolou mais que o threshold, adiciona a classe
            header.classList.add('header-scrolled');
        } else {
            // Se voltou para o topo, remove a classe
            header.classList.remove('header-scrolled');
        }
    }

    // Adiciona o listener de scroll na janela
    window.addEventListener('scroll', handleScroll);

    // Verifica o estado inicial ao carregar (caso a página já carregue rolada)
    handleScroll();

}); // <-- FIM DO 'DOMContentLoaded'