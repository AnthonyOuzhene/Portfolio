const btnPopup = document.getElementById('btnPopup');
const overlay = document.getElementById('overlay');
const btnClose = document.getElementById('btnClose');

btnPopup.addEventListener('click', openModal);

btnClose.addEventListener('click', closePopup);


function openModal() {
    overlay.style.display = 'block';
}

function closePopup() {
    overlay.style.display = 'none';
}