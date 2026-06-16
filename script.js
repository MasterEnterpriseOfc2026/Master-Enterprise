// Scroll progress bar
const progress = document.getElementById('scrollProgress');
const toTop = document.getElementById('toTop');

function onScroll() {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
  toTop.classList.toggle('visible', h.scrollTop > 480);
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Add staggered animation to value items FIRST
const valueItems = document.querySelectorAll('.value-item');
valueItems.forEach((item, index) => {
  item.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
  item.style.transitionDelay = `${index * 0.1}s`;
});

// Add scale reveal to brand cards FIRST
const brandCards = document.querySelectorAll('.brand-card');
brandCards.forEach((card, index) => {
  card.classList.add('reveal-scale');
  card.style.transitionDelay = `${index * 0.15}s`;
});

// Add floating animation to hero figures
const heroFigures = document.querySelectorAll('.hero-figures .fig');
heroFigures.forEach((fig, index) => {
  fig.style.animation = `float 4s ease-in-out infinite`;
  fig.style.animationDelay = `${index * 0.3}s`;
});

// Reveal on scroll - all types (now after classes are added)
const allRevealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
allRevealEls.forEach(el => io.observe(el));

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
  let i = 0;
  const originalHTML = element.innerHTML;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      element.appendChild(cursor);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero h2');
  if (heroTitle) {
    heroTitle.innerHTML = 'Construímos tecnologia, conteúdo e produtos com <em>propósito real</em><span class="cursor"></span>';
  }
});

// Subtle tilt + glow-follow on brand cards
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -4;
    const rotY = ((x - cx) / cx) * 4;
    card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

