// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => navLinks.classList.toggle('show'));

// Sticky header shadow on scroll + back-to-top visibility
document.addEventListener('scroll', () => {
    const hdr = document.querySelector('header');
    const y = window.scrollY;
    hdr.style.boxShadow = y > 8 ? '0 6px 18px rgba(0,0,0,.25)' : 'none';

    // Back to top button
    document.getElementById('toTop').classList.toggle('show', y > 400);
});

// IntersectionObserver — reveal elements on scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Smooth scroll to contact + pre-select pricing plan
function scrollToContact(plan) {
    document.getElementById('plan').value = plan;
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}
window.scrollToContact = scrollToContact;

// Program filter — Show All
document.getElementById('filterAll').addEventListener('click', () => {
    document.querySelectorAll('#programGrid .program').forEach(card => {
        card.style.display = 'block';
    });
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Lightbox
let galleryImages = [];
let currentIndex = 0;

function openLightbox(tile) {
    galleryImages = Array.from(document.querySelectorAll('.tile img'));
    const clickedImg = tile.querySelector('img');
    currentIndex = galleryImages.indexOf(clickedImg);
    showLightboxImage(currentIndex);
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showLightboxImage(index) {
    document.getElementById('lightbox-img').src = galleryImages[index].src;
}

function shiftLightbox(dir) {
    currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
    showLightboxImage(currentIndex);
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox with Escape key, navigate with arrow keys
document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') shiftLightbox(1);
    if (e.key === 'ArrowLeft') shiftLightbox(-1);
});

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.shiftLightbox = shiftLightbox;