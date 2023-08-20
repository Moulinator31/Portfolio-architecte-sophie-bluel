import { showWorks } from "./works.js";
import { getCategories, getWorks } from "./client.js";
import { initModal } from "./modal.js";
import { filtre, tabsFilter } from "./filters.js";

function init() {
    showWorks();
    logOut();
}

init();
initModal();

function logOut() {
    const login = document.getElementById('btnlogin');
    const logout = document.getElementById('logout');
    const token = sessionStorage.getItem('token');
    if (token) {
        login.classList.toggle('hide');
        logout.classList.toggle('hide');

        logout.addEventListener('click', () => {
            sessionStorage.removeItem('token');
            login.classList.toggle('hide');
            logout.classList.toggle('hide');

        })
    }

}

// fonction asynchrone = ça permet de continuer l'exécution de la page pendant le chargement de la fonction (async)
// await = on attend la validation de tous les AWAIT avant de valider la promesse et retourner  le résultat de la fonction
