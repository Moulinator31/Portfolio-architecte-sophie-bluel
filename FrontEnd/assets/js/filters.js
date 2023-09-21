import { getCategories } from "./client.js";


/*Cette function va creer les filtres grâce à la boucle forEach qui va recupérer les noms, l'id et ajouter une class*/
export async function filtre() {
    const filtres = document.querySelector('.filtres');
    /*récupération des l'appel Api*/
    const categories = await getCategories();

    const buttonAll = document.createElement("button");

    buttonAll.setAttribute("data-filtre-id", "all");
    buttonAll.setAttribute("class", "filtresborder");
    buttonAll.innerText = "Tous";

    filtres.appendChild(buttonAll);

    /*Cette boucle va creer les boutton et recuperer le name du bouton ainsi que la categorie et ajouter la class*/
    categories.forEach(category => {

        const button = document.createElement('button');

        button.setAttribute("name", category.name);
        button.setAttribute("class", "filtresborder");
        button.setAttribute("data-filtre-id", category.id);
        button.innerText = category.name;


        filtres.appendChild(button);
    });
    tabsFilter();
}


export function tabsFilter() {
    const filterButtons = document.querySelectorAll('.filtresborder');/*Les filtres*/

    /*Enlève la class active au bouton quand je clique sur un autre bouton filtre*/
    const resetActive = () => {
        filterButtons.forEach(filterButton => {
            filterButton.classList.remove('active');
        });
    };

    /*Appel toutes les images*/
    const Showprojets = (filtreId) => {
        const pictures = document.querySelectorAll(".gallery img");/*les images*/
        pictures.forEach(picture => {
            const categoryId = picture.dataset.categoryId;
            /* Si le filtreId est égale à all alors il va enlever la class "hide" et afficher toutes les images*/
            if (filtreId === 'all') {
                picture.parentNode.classList.remove('hide');
                return; /*Arrête l'action ici*/
            }
            /**
             *  Si le filtre est différent à la categorie alors il ajoute la Class hide qui va enlever l'image.
             * Sinon il l'enlève la class "hide" et affiche l'image.
             */
            if (categoryId !== filtreId) {
                picture.parentNode.classList.add('hide');
            } else {
                picture.parentNode.classList.remove('hide');
            }
        });

    }
    /*Au clique sur le bouton il jouera la fonction Showprojets qui va afficher */
    filterButtons.forEach(filterButton => {
        filterButton.addEventListener("click", () => {
            const filtre = filterButton.dataset.filtreId;
            Showprojets(filtre);
            resetActive();
            /*Quand je clique sur un bouton filtre ça ajoute la class "active" au bouton*/
            filterButton.classList.add('active');
        });
    });

}