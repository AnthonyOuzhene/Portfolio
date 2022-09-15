const btnPopup = document.querySelectorAll('#btnPopup');
const overlay = document.getElementById('overlay');
const btnClose = document.querySelectorAll('#btnClose');

for (const popup of btnPopup) {
    popup.addEventListener('click', openModal);
}
function openModal() {
    overlay.style.display = 'block';
}

for (const close of btnClose) {
    close.addEventListener('click', closePopup);
}
function closePopup() {
    overlay.style.display = 'none';
}