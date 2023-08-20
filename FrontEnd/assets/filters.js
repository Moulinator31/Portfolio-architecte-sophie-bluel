import { getCategories } from "./client.js";

/*Cette function va creer les filtres*/
export async function filtre() {
    let filtres = document.querySelector('.filtres');
    const categories = await getCategories();

    const buttonAll = document.createElement("button");

    buttonAll.setAttribute("data-filtre-id", "all");
    buttonAll.setAttribute("class", "filtresborder");
    buttonAll.innerText = "Tous";

    filtres.appendChild(buttonAll);

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


/* function categoriser les images avec les filtres dans l'index.html*/

export function tabsFilter() {
    const filterButtons = document.querySelectorAll('.filtresborder');/*Les filtres*/
    const pictures = document.querySelectorAll(".gallery img");/* Les images*/


    const resetActive = () => {
        filterButtons.forEach(filterButton => {
            filterButton.classList.remove('active');
        });
    };

    /*Appel toutes les images*/
    const Showprojets = (filtreId) => {
        pictures.forEach(picture => {
            let categoryId = picture.dataset.categoryId;
            /* Button Tous*/
            if (filtreId === 'all') {
                picture.parentNode.classList.remove('hide');
                return; /*Arrête l'action ici*/
            }
            /* Si le filtre est différent à la categorie alors il ajoute la Class, sinon il l'enlève*/
            if (categoryId !== filtreId) {
                picture.parentNode.classList.add('hide');
            } else {
                picture.parentNode.classList.remove('hide');
            }
            console.log(filtreId);
        });

    }
    filterButtons.forEach(filterButton => {
        filterButton.addEventListener("click", () => {
            let filtre = filterButton.dataset.filtreId;
            Showprojets(filtre);
            resetActive();
            filterButton.classList.add('active');
        });
    });

}