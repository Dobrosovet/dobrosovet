document.addEventListener('DOMContentLoaded', () => {
  // --- 💳 МОДАЛЬНОЕ ОКНО ДОНАТА ---
  const donateBtn = document.getElementById('donateBtn');
  const modal = document.getElementById('donateModal');
  const closeBtn = document.getElementById('modalClose');
  const revealBtn = document.getElementById('revealBtn');
  const copyBtn = document.getElementById('copyBtn');
  const cardNumberEl = document.getElementById('cardNumber');
  const cardHolderEl = document.getElementById('cardHolder');
  const donateBtnProjects = document.getElementById('donateBtnProjects');

  const CARD_NUMBER_FULL = '2200 2706 3397 7189';
  let revealed = false;

  // --- Кнопки доната ---
  if (donateBtnProjects) {
    donateBtnProjects.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'false');
      const last4 = CARD_NUMBER_FULL.replace(/\s+/g, '').slice(-4);
      cardNumberEl.textContent = '•••• •••• •••• ' + last4;
    });
  }

  if (cardHolderEl) {
    cardHolderEl.style.display = 'none';
    cardHolderEl.textContent = '';
  }

  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'false');
      const last4 = CARD_NUMBER_FULL.replace(/\s+/g, '').slice(-4);
      cardNumberEl.textContent = '•••• •••• •••• ' + last4;
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      if (!revealed) {
        cardNumberEl.textContent = CARD_NUMBER_FULL;
        revealBtn.textContent = 'Скрыть номер';
      } else {
        const last4 = CARD_NUMBER_FULL.replace(/\s+/g, '').slice(-4);
        cardNumberEl.textContent = '•••• •••• •••• ' + last4;
        revealBtn.textContent = 'Показать номер';
      }
      revealed = !revealed;
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CARD_NUMBER_FULL);
        copyBtn.textContent = 'Скопировано';
        setTimeout(() => (copyBtn.textContent = 'Копировать'), 1500);
      } catch {
        alert('Не удалось автоматически скопировать. Скопируйте вручную: ' + CARD_NUMBER_FULL);
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
    });
  }

 
  // --- 📖 ФУНКЦИЯ РАЗВОРАЧИВАНИЯ ТЕКСТА ---
  const cards = document.querySelectorAll('.case-card');

  cards.forEach(card => {
    const toggleBtn = card.querySelector('.toggle-btn');
    const situationText = card.querySelector('.situation-text');
    if (!toggleBtn || !situationText) return;

    // Исходное состояние
    situationText.style.maxHeight = '120px';
    card.style.maxHeight = '180px'; // Ограничение карточки до нажатия

    toggleBtn.addEventListener('click', () => {
      const isExpanded = situationText.classList.toggle('expanded');
      card.classList.toggle('expanded', isExpanded); // Добавляем/удаляем класс для карточки

      if (isExpanded) {
        // Получаем полную высоту блока текста
        const fullHeight = situationText.scrollHeight + 80; // Увеличиваем запас, чтобы текст полностью разворачивался

        situationText.style.transition = 'max-height 0.4s ease'; // Плавный переход
        situationText.style.maxHeight = fullHeight + 'px'; // Делаем высоту динамичной
        card.style.maxHeight = fullHeight + 40 + 'px'; // Добавляем немного для кнопки и отступов

        toggleBtn.innerHTML = '▲ Свернуть';
      } else {
        // Сворачиваем обратно
        situationText.style.transition = 'max-height 0.4s ease';
        situationText.style.maxHeight = '120px';
        card.style.maxHeight = '180px';

        toggleBtn.innerHTML = '▼ Развернуть';
      }
    });

    // Адаптация при изменении размера окна
    window.addEventListener('resize', () => {
      if (situationText.classList.contains('expanded')) {
        // Пересчитываем полную высоту при изменении окна
        const fullHeight = situationText.scrollHeight + 80; // Увеличиваем запас для адаптивности
        situationText.style.maxHeight = fullHeight + 'px';
        card.style.maxHeight = fullHeight + 40 + 'px';
      }
    });
  });
});