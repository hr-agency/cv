const roleTiles = document.querySelectorAll('#step1 .tile');
const langStep = document.getElementById('step2');
const langTiles = document.getElementById('languageTiles');
const formStep = document.getElementById('step3');

let selectedRole = '';
let selectedLang = '';

const roleToLanguages = {
  Sale: ['RU', 'EN', 'ES'],
  Retention: ['EN', 'DE'],
  'Team Leader': ['RU', 'FR'],
  Head: ['EN']
};

roleTiles.forEach(tile => {
  tile.addEventListener('click', () => {
    selectedRole = tile.dataset.role;
    document.getElementById('step1').classList.remove('active');
    langStep.classList.add('active');
    langTiles.innerHTML = '';
    roleToLanguages[selectedRole].forEach(lang => {
      const langTile = document.createElement('div');
      langTile.className = 'tile';
      langTile.textContent = lang;
      langTile.addEventListener('click', () => {
        selectedLang = lang;
        langStep.classList.remove('active');
        formStep.classList.add('active');
      });
      langTiles.appendChild(langTile);
    });
  });
});

document.getElementById('finalForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const payload = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    about: form.about.value,
    position: selectedRole,
    language: selectedLang
  };
  try {
    await fetch('https://script.google.com/macros/s/AKfycbzUWoBMFM4Mikx0dgpWf2siKNL7YRoxO_TLq6Io-jAUtUAtKyd3ZcsajGnt8mUzIKnt/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    document.getElementById('statusMsg').innerText = '✅ Отправлено';
    form.reset();
  } catch (err) {
    document.getElementById('statusMsg').innerText = '❌ Ошибка';
  }
});

