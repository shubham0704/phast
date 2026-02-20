// PHAST Project Page — Minimal JS
document.addEventListener('DOMContentLoaded', () => {

  // ── BibTeX Copy to Clipboard ───────────────────────────────
  const copyBtn = document.getElementById('copy-bibtex');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const bibtex = document.getElementById('bibtex-content').textContent;
      navigator.clipboard.writeText(bibtex).then(() => {
        const span = copyBtn.querySelector('span:last-child');
        const icon = copyBtn.querySelector('i');
        span.textContent = 'Copied!';
        icon.className = 'fas fa-check';
        copyBtn.classList.add('is-copied');
        setTimeout(() => {
          span.textContent = 'Copy';
          icon.className = 'fas fa-copy';
          copyBtn.classList.remove('is-copied');
        }, 2000);
      });
    });
  }

  // ── Smooth scroll for anchor links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Lazy-load images with data-src ─────────────────────────
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window && lazyImages.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImages.forEach(img => observer.observe(img));
  }

});
