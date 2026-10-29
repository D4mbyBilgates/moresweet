const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const filterButtons = [...document.querySelectorAll('.filter-chip')];
const flavorCards = [...document.querySelectorAll('.flavor-card')];
const emptyState = document.getElementById('emptyState');
const modal = document.getElementById('flavorModal');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const modalDone = document.getElementById('modalDone');

document.getElementById('year').textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
    navLinks.querySelectorAll('a').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    const filter = button.dataset.filter;
    let visibleCount = 0;
    flavorCards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      const visible = filter === 'all' || categories.includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount++;
    });
    emptyState.hidden = visibleCount !== 0;
  });
});

function openFlavorModal(flavor) {
  modalTitle.textContent = flavor;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}
function closeFlavorModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}
document.querySelectorAll('.details-button').forEach(button => {
  button.addEventListener('click', () => openFlavorModal(button.dataset.flavor));
});
modalClose.addEventListener('click', closeFlavorModal);
modalDone.addEventListener('click', closeFlavorModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeFlavorModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) closeFlavorModal();
});
