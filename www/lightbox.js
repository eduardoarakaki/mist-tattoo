// ========== LIGHTBOX ==========

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.close-modal');

    // ========== LIGHTBOX: OPEN =========
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const img = this.querySelector('img');
            if (!img) return;

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');

            // Impede scroll no body quando lightbox está aberta
            setTimeout(() => {
                document.body.style.overflow = 'hidden';
            }, 300);
        });
    });

    // ========== LIGHTBOX: CLOSE =======
    function closeLightbox() {
        lightbox.classList.remove('active');

        // Limpa a imagem após animação
        setTimeout(() => {
            lightboxImg.src = '';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);

    // ========== FECHAR AO CLICAR NO BACKGROUND =========
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ========== ESC TOU =========
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

});