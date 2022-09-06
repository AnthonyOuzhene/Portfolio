const header = {
    headerElement: null,
    headerHeight: null,
    profileHeight: null,
    scrollTarget: null, // la hauteur à partir de laquelle on passe en sticky
    isProfilePage: false, // sommes-nous sur la page profil ?
    init: function() {
        window.addEventListener('scroll', header.onScroll);
        // on enregistre l'élément .header dans une propriété du module
        header.headerElement = document.querySelector('.navbar_dark-mode');

        // si le body a une classe "profile", alors on change la valeur de la propriété isProfilePage
        if (document.querySelector('body').classList.contains('profile')) {
            header.isProfilePage = true;
        } else {
            header.isProfilePage = false;
        }
        
        header.getScrollTarget();
    }, 
    getScrollTarget: function() {
        // on stocke un fois pour toute la hauteur du header au chargement du module
        header.headerHeight = document.querySelector('.navbar_dark-mode').offsetHeight;
        
        // la hauteur à dépasser pour passer en sticky est la hauteur du header par défaut
        header.scrollTarget = header.headerHeight;

        // si on est sur la page profil, 
        if (header.isProfilePage) {
            // on stocke la hauteur du profil
            header.profileHeight = document.querySelector('.profile-card').offsetHeight;

            // on ajoute cette hauteur à scrollTarget
            header.scrollTarget += header.profileHeight;
        }
    },
    onScroll: function() {
        // si le scroll dépasse la hauteur du header
        if(window.scrollY > header.scrollTarget) {
            // on ajoute la classe sticky au header
            header.headerElement.classList.add('sticky');
        } else {
            // on retire la classe sticky
            header.headerElement.classList.remove('sticky');
        }
    }
};

document.addEventListener('DOMContentLoaded', header.init);