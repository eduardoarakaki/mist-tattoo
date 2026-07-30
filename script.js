document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. PRELOADER & CURSOR
    ========================================= */
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        });
    }

    // const cursor = document.querySelector('.custom-cursor');
    // const follower = document.querySelector('.custom-cursor-follower');
    const progressBar = document.querySelector('.progress-bar');

    // if (cursor && follower) {
    //     document.addEventListener('mousemove', (e) => {
    //         cursor.style.left = `${e.clientX}px`;
    //         cursor.style.top = `${e.clientY}px`;
            
    //         follower.style.left = `${e.clientX}px`;
    //         follower.style.top = `${e.clientY}px`;
    //     });

    //     // Adiciona efeito hover aos elementos interativos
    //     const interactiveElements = document.querySelectorAll('a, button, .carousel-img, .gallery-item');
    //     interactiveElements.forEach(el => {
    //         el.addEventListener('mouseenter', () => {
    //             cursor.classList.add('hover');
    //             follower.classList.add('hover');
    //         });
    //         el.addEventListener('mouseleave', () => {
    //             cursor.classList.remove('hover');
    //             follower.classList.remove('hover');
    //         });
    //     });
    // }

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = `${scrolled}%`;
    });

    /* =========================================
       2. MENU MOBILE
    ========================================= */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    /* =========================================
       3. FILTROS DA GALERIA
    ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* =========================================
       4. MODAL APENAS IMAGEM
    ========================================= */
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img-target');
    const closeModalBtn = modal ? modal.querySelector('.close-modal') : null;
    const backdrop = modal ? modal.querySelector('.modal-backdrop') : null;

    const openModalWithImage = (src, alt) => {
        if (!modal || !modalImg) return;
        modalImg.src = src;
        modalImg.alt = alt || 'Trabalho Recente';
        modal.classList.add('open', 'active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('open', 'active');
        document.body.style.overflow = '';
    };

    // Cliques no carrossel
    document.querySelectorAll('.carousel-img, .local-carousel-item img').forEach(img => {
        img.addEventListener('click', () => openModalWithImage(img.src, img.alt));
    });

    // Cliques na galeria principal
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) openModalWithImage(img.src, img.alt);
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

});