const payload = {
  name: form.name.value,
  email: form.email.value,
  phone: form.phone.value,
  about: form.about.value,
  position: selectedRole,
  language: selectedLang
};

// Логируем данные
console.log("Отправка данных:", payload);

await fetch('https://script.google.com/macros/s/AKfycbx_sL0IhaoL_KLiGMjO_1eCu1fome-KxD0aBrol2te0r10YWvjM-ZZCgDTF65BiiRVN/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(response => response.text())
.then(response => {
  console.log("Ответ сервера:", response);
  document.getElementById('statusMsg').innerText = '✅ Отправлено';
  form.reset();
})
.catch(error => {
  console.error('Ошибка:', error);
  document.getElementById('statusMsg').innerText = '❌ Ошибка';
});
