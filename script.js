function showPage(pageId, event) {
  if (event) event.preventDefault(); // Отключаем переход по ссылке (чтобы не прыгало)

  const pages = document.querySelectorAll('.page-content');
  pages.forEach(page => page.classList.remove('active'));

  const activePage = document.getElementById(pageId);
  activePage.classList.add('active');

  const links = document.querySelectorAll('nav a');
  links.forEach(link => link.classList.remove('active'));
  document.querySelector(`a[href="#${pageId}"]`).classList.add('active');

  // 🔹 Убираем любую автопрокрутку, если браузер пытается прыгнуть
  setTimeout(() => {
    window.scrollTo({ top: window.scrollY, behavior: "instant" });
  }, 10);
}
