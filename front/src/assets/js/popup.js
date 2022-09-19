//  const btnPopup = document.querySelectorAll('#btnPopup');
//  const overlay = document.getElementById('overlay');
//  const btnClose = document.querySelectorAll('#btnClose');

//  for (const popup of btnPopup) {
//      popup.addEventListener('click', openModal);
//  }
//  function openModal() {
//      overlay.style.display = 'block';
//  }

//  for (const close of btnClose) {
//      close.addEventListener('click', closePopup);
//  }
//  function closePopup() {
//      overlay.style.display = 'none';
//  }


//  for (const oneOverlay of overlay) {
//     overlay.style.display = 'none';
// }

const popup = {

    init: function() {

        const btnPopup = document.querySelectorAll('#btnPopup');
        for (const currentPopup of btnPopup) {
            currentPopup.addEventListener('click', popup.openModal);
        }  

        const btnClose = document.querySelectorAll('#btnClose');
        for (const currenntBtnClose of btnClose) {
            currenntBtnClose.addEventListener('click', popup.closePopup);
        }
    },

    openModal: function() {
        const overlay = document.getElementById('overlay');
       // for (const currentOverlay of overlay) {
        overlay.style.display = 'block';
        //}
        },

    closePopup: function() {
        const overlay = document.getElementById('overlay');
        // on passe le display à none pour fermer la fenètre au click sur croix
        overlay.style.display = 'none';
        }
}

document.addEventListener('DOMContentLoaded', popup.init);
