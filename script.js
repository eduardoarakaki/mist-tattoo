gsap.registerPlugin(ScrollTrigger);

// 1. SCROLL E PRELOADER LÓGICA INTEGRADAS
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

// Trava o scroll até o preloader terminar
lenis.stop(); 

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// Timeline do Preloader e Hero
window.addEventListener('load', () => {
    const tl = gsap.timeline({
        onComplete: () => {
            lenis.start(); // Libera o scroll
            document.querySelector('.preloader').style.display = 'none';
        }
    });

    // Animação do Preloader
    tl.to('.preloader-text', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to('.preloader-line', { width: '100%', duration: 1.2, ease: 'power4.inOut' }, "-=0.3")
      .to('.preloader', { yPercent: -100, duration: 1.2, ease: 'power4.inOut', delay: 0.4 })
      
      // Animação inicial do Hero logo após o preloader subir
      .to('.hero-title', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, "-=0.6")
      .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.8")
      .to('.hero-btn-container', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.8");
});

// 2. SCROLL PROGRESS E PARALLAX BASE
gsap.to('.progress-bar', { width: '100%', ease: 'none', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.3 } });
gsap.to('.hero-bg', { yPercent: 30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

// 3. REVEALS GERAIS
const revealElements = document.querySelectorAll('.reveal-up');
revealElements.forEach((el) => {
    gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } }
    );
});

const imgReveals = document.querySelectorAll('.img-reveal');
imgReveals.forEach((el) => {
    gsap.fromTo(el, 
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 80%' } }
    );
});

// 4. ANIMAÇÕES COMPLEXAS ARTISTAS
const artistRows = document.querySelectorAll('.artist-row');
artistRows.forEach(row => {
    const imgContainer = row.querySelector('.img-reveal-artist');
    const parallaxImg = row.querySelector('.parallax-img');
    const textElements = row.querySelectorAll('.fade-up-artist');

    gsap.fromTo(imgContainer, 
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', scrollTrigger: { trigger: row, start: 'top 80%' } }
    );

    gsap.fromTo(parallaxImg,
        { yPercent: -15 },
        { yPercent: 15, ease: 'none', scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true } }
    );

    gsap.fromTo(textElements,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 75%', toggleActions: 'play none none reverse' } }
    );
});

// 5. SISTEMA DE FILTROS (GALERIA)
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                gsap.to(item, { scale: 1, opacity: 1, duration: 0.4, display: 'block' });
            } else {
                gsap.to(item, { scale: 0.8, opacity: 0, duration: 0.4, display: 'none' });
            }
        });
        setTimeout(() => ScrollTrigger.refresh(), 400);
    });
});

// 6. SISTEMA DE MODAIS
const modalWork = document.getElementById('modal-work');
const modalArtist = document.getElementById('modal-artist');
const closeBtns = document.querySelectorAll('.close-modal, .modal-backdrop');

function openModal(modal) { modal.classList.add('active'); lenis.stop(); }
function closeModal() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')); lenis.start(); }

closeBtns.forEach(btn => { btn.addEventListener('click', closeModal); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('mw-img').src = item.getAttribute('data-img');
        document.getElementById('mw-title').innerText = item.getAttribute('data-title');
        document.getElementById('mw-style').innerText = item.getAttribute('data-style');
        document.getElementById('mw-artist').innerText = item.getAttribute('data-artist');
        document.getElementById('mw-desc').innerText = item.getAttribute('data-desc');
        openModal(modalWork);
    });
});

document.querySelectorAll('.open-artist-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('ma-img').src = btn.getAttribute('data-img');
        document.getElementById('ma-name').innerText = btn.getAttribute('data-name');
        document.getElementById('ma-spec').innerText = btn.getAttribute('data-spec');
        document.getElementById('ma-exp').innerText = btn.getAttribute('data-exp');
        document.getElementById('ma-bio').innerText = btn.getAttribute('data-bio');
        openModal(modalArtist);
    });
});

// 7. MENU MOBILE INTERATIVO
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    nav.classList.toggle('active');
    
    if (nav.classList.contains('active')) {
        lenis.stop(); document.body.style.overflow = 'hidden';
    } else {
        lenis.start(); document.body.style.overflow = '';
    }
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) toggleMobileMenu();
    });
});

// 8. CURSOR CUSTOMIZADO EFEITOS
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.custom-cursor-follower');
const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .artist-row-img');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    gsap.ticker.add(() => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
    });
} else {
    if(cursor) cursor.style.display = 'none';
    if(follower) follower.style.display = 'none';
}