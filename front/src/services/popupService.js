export default {

    init() {

        const btnPopup = document.querySelectorAll('#btnPopup');
        for (const currentPopup of btnPopup) {
            // console.log(currentPopup.classList[1])
            currentPopup.addEventListener('click', () => {
                popup.openModal(currentPopup.classList[1])
            });
        }  

        const btnClose = document.querySelectorAll('#btnClose');
        for (const currentBtnClose of btnClose) {
            currentBtnClose.addEventListener('click', popup.closePopup)}
    },

    openModal(btnClassName) {
        // console.log(btnClassName)
        const overlay = document.querySelector('.popup'+ btnClassName);
        
        // for (const currentOverlay of overlay) {
            overlay.style.display = 'block';
            //}
        },
        
        closePopup() {
            
            const AllOverlay = document.querySelectorAll('#overlay');
            // on passe le display à none pour fermer la fenètre au click sur croix
            for (let currentOverlay of AllOverlay) {
                currentOverlay.style.display = 'none';
            }
        }
    }
    
// document.addEventListener('DOMContentLoaded', popup.init);
