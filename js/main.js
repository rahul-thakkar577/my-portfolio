// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animate() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animate);
})();

// Scroll reveals + skill bars
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.sp-fill, .skill-bar-fill').forEach(b => {
          b.style.width = (b.dataset.w || b.dataset.width) + '%';
        });
      }, 80 * (e.target.dataset.i || 0));
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.skills-grid, .projects-layout, .edu-grid, .about-stats, .timeline').forEach(parent => {
  parent.querySelectorAll('.reveal').forEach((el, i) => el.dataset.i = i);
});
reveals.forEach(el => io.observe(el));
