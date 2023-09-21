import { getWorks } from "./client.js";
import { deleteWork } from "./delete-work.js";


const overlayClose = document.querySelector('.modale_overlay');
const buttonCloseModal1 = document.querySelector('.icon_close');
const modaleContainer = document.querySelector('.modale_container');


/*Bouton close pour la première modale*/
buttonCloseModal1.addEventListener('click', () => {
    modaleContainer.style.display = "none";
})

/*Permet de fermer la modale en cliquant en dehors de la modale*/
overlayClose.addEventListener('click', () => {
    modaleContainer.style.display = "none";
});

const modalGallery = document.querySelector('.modal_gallery');

/* Ajout des images dans la modale* en recuperant la fonction getWorks*/
export async function addWorksModale() {
    const images = await getWorks();

    images.forEach(image => {
        const img = document.createElement('img');

        img.src = image.imageUrl;
        img.alt = image.title;

        const ImageModal = document.createElement('div');

        img.classList.add('image_modal');
        ImageModal.classList.add('position_image');
        ImageModal.dataset.id = image.id;
        ImageModal.appendChild(img);
        const iconDelete = document.createElement("img");
        iconDelete.src = "./assets/icons/group10.png";
        iconDelete.classList.add('icon_delete');
        const iconMove = document.createElement("img");
        iconMove.src = "./assets/icons/Move.png";
        iconMove.classList.add('icon_move');
        const edit = document.createElement('p');
        edit.innerHTML = 'éditer';

        modalGallery.appendChild(ImageModal);
        ImageModal.appendChild(edit);
        ImageModal.appendChild(iconDelete);
        ImageModal.appendChild(iconMove);

    });

    /*Pour supprimer une image de la modale*/
    const iconsDelete = document.querySelectorAll('.icon_delete');

    iconsDelete.forEach(iconDelete => {

        iconDelete.addEventListener('click', () => {
            let dataId = iconDelete.parentNode.dataset.id;
            console.log(dataId);
            deleteWork(dataId);
        });
    });
}

const modaleAddContainer = document.querySelector('.modaleAdd_container');
const buttonAddPictures = document.querySelector('.buttonAdd');

/* Bouton ajouter, permet de fermer la première modale et ouvrir la deuxième*/
buttonAddPictures.addEventListener("click", function () {
    modaleAddContainer.style.display = "block";
    modaleContainer.style.display = "none";
});