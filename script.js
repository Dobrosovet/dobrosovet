document.addEventListener('DOMContentLoaded', () => {
  const donateBtn = document.getElementById('donateBtn');
  const modal = document.getElementById('donateModal');
  const closeBtn = document.getElementById('modalClose');
  const revealBtn = document.getElementById('revealBtn');
  const copyBtn = document.getElementById('copyBtn');
  const cardNumberEl = document.getElementById('cardNumber');
  const cardHolderEl = document.getElementById('cardHolder'); // если есть — спрячем
  const qrImg = document.getElementById('qrImg');
const donateBtnProjects = document.getElementById('donateBtnProjects');
if (donateBtnProjects) {
  donateBtnProjects.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'false');
    const last4 = CARD_NUMBER_FULL.replace(/\s+/g, '').slice(-4);
    cardNumberEl.textContent = '•••• •••• •••• ' + last4;
  });
}

  // Настройки номера карты
  const CARD_NUMBER_FULL = '2200 2706 3397 7189';
  
  let revealed = false;

  // Скрываем владельца карты (если есть)
  if (cardHolderEl) {
    cardHolderEl.style.display = 'none';
    cardHolderEl.textContent = ''; // очищаем текст
  }

  // Кнопка открыть модал
  donateBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'false');

    // показываем последние 4 цифры карты
    const last4 = CARD_NUMBER_FULL.replace(/\s+/g, '').slice(-4);
    cardNumberEl.textContent = '•••• •••• •••• ' + last4;

  
  });

  // Закрыть модальное окно
  closeBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  // Показать / скрыть полный номер карты
  revealBtn.addEventListener('click', () => {
    if (!revealed) {
      cardNumberEl.textContent = CARD_NUMBER_FULL;
      revealBtn.textContent = 'Скрыть номер';
      revealed = true;
    } else {
      const last4 = CARD_NUMBER_FULL.replace(/\s+/g, '').slice(-4);
      cardNumberEl.textContent = '•••• •••• •••• ' + last4;
      revealBtn.textContent = 'Показать номер';
      revealed = false;
    }
  });

  // Копировать номер карты в буфер
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CARD_NUMBER_FULL);
      copyBtn.textContent = 'Скопировано';
      setTimeout(() => copyBtn.textContent = 'Копировать', 1500);
    } catch (err) {
      alert('Не удалось автоматически скопировать. Скопируйте вручную: ' + CARD_NUMBER_FULL);
    }
  });

  // Закрыть модал, если кликнули вне модального блока
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });
});
