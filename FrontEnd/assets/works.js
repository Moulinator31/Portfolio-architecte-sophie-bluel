import { getWorks } from "./client.js";
import { filtre } from "./filters.js"


export async function showWorks(){
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
        image.setAttribute("data-category-id",work.categoryId);
        

        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);

    });
    filtre();
}