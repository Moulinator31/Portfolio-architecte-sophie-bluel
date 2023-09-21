import { getWorks } from "./client.js";

/**
 * Dans la div ".gallery" je recupère les éléments grâce à getWorks.
 * Une fois l'appel Api, je fais une boucle qui va creer les balises "figure","img",figcaption" grâce à creatElement.
 * Dans cette boucle je récupère l'id de l'image, l'image, la categorie et le titre avec le setAttribute.
 * Dans un premier temps la gallery ajoutera les figures.
 * Ensuite dans la figure nous aurons les images avec le alt, src et le titre et le figcaption qui affichera le texte dans le DOM.
 */
export async function showWorks() {
    const gallery = document.querySelector('.gallery');
    const works = await getWorks();

    works.forEach(work => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        figure.setAttribute('data-id', work.id);
        image.setAttribute('src', work.imageUrl);
        image.setAttribute('alt', work.title);
        image.setAttribute('figcaption', work.title);
        figcaption.innerText = work.title;
        image.setAttribute("data-category-id", work.categoryId);


        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
    });
}