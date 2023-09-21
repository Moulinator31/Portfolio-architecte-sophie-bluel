import { showWorks } from "./works.js";
import { initModal } from "./modal.js";
import { filtre } from "./filters.js";



function init() {
    showWorks();
    filtre();
    logOut();
}

init();
initModal();

/*Cette fonction va permettre de modifier le "login" et le "logout" ainsi que le bouton "modifier".*/
function logOut() {
    const buttonModifier = document.querySelector('.modification_icon');
    const login = document.getElementById('btnlogin');
    const logout = document.getElementById('logout');
    const token = sessionStorage.getItem('token');
    /*Si nous avons le token alors on change le "login" en "logout" et nous pouvons afficher le button modifier*/
    if (token) {
        login.classList.toggle('hide');
        logout.classList.toggle('hide');
        buttonModifier.classList.toggle('hide');

        /*Si nous cliquons sur le bouton logout alors on enlève le token on change le "logout" en "login" et on enlève le bouton modifier */
        logout.addEventListener('click', () => {
            sessionStorage.removeItem('token');
            login.classList.toggle('hide');
            logout.classList.toggle('hide');
            buttonModifier.classList.toggle('hide');

        })
    }

}

// fonction asynchrone = ça permet de continuer l'exécution de la page pendant le chargement de la fonction (async)
// await = on attend la validation de tous les AWAIT avant de valider la promesse et retourner  le résultat de la fonction
