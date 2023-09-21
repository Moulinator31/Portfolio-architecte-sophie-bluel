import { getCategories } from "./client.js";

/* Permet d'ajouter les categories dans la deuxième modale dynamiquement en faisant appel a l'api getCategories*/
export async function createCategories() {
    const select = document.getElementById("categorie");
    const categories = await getCategories();

    /**
     * Cette boucle va permettre d'ajouter les categories dans les balises "option" grace a l'appel API "getCategories".
     * Dans les balises "option" on a le nom et l'id de la category seul le nom sera afficher grace à "textContent".
     * Les options seront afficher dans la balise "select".
    */
    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}