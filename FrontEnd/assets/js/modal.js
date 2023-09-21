import { createCategories } from "./create-select-option-category.js";
import { addWorksModale } from "./modale-delete-work.js";
import { previewPictures } from "./modal-add-work.js";
import { showWorks } from "./works.js";
import { tabsFilter } from "./filters.js";



const buttonModifier = document.querySelector('.modification_icon');
const modaleContainer = document.querySelector('.modale_container');

/*Bouton modifier*/
buttonModifier.addEventListener("click", function () {
    modaleContainer.style.display = "block";
});


export function initModal() {
    addWorksModale();
    createCategories();
}

const titleForm = document.querySelector("#form-add-work");

titleForm.addEventListener('submit', addPicturesModal, addWork);


async function addPicturesModal(event) {
    event.preventDefault();

    const workAdded = await addWork();
    if (workAdded) {
        /*Cette boucle va permettre de vider la gallery présente dans la gallery sur les balises "figure"*/
        const gallery = document.querySelector(".gallery");

        const galleryElem = gallery.querySelectorAll('figure');
        if (galleryElem && galleryElem.length > 0) {
            for (var i = 0; i < galleryElem.length; i++) {
                galleryElem[i].remove();
            }
        }
        /**Ensuite on appel la fonction suivante afin de recuperer les images et ajouter l'image envoyer*/
        showWorks();
        /*Cette boucle va permettre de vider la gallery présente dans la modale*/
        const workModalGalleryChildren = document.querySelectorAll(".position_image");
        if (workModalGalleryChildren && workModalGalleryChildren.length > 0) {
            for (var i = 0; i < workModalGalleryChildren.length; i++) {
                workModalGalleryChildren[i].remove();
            }
        }
        /**Ensuite on appel la fonction suivante afin de recuperer les images et ajouter l'image envoyer */
        addWorksModale();
    }

}

/**
 * Cette function va permettre d'envoyer ce qu'il y a dans le FromData, si il y a le token alors je peux réaliser la methode POST.
 * En cas de reussite il y aura un message de reussite.
 * Autrement il y aura un message d'erreur
 */
export async function addWork() {  // fonction d'ajout de travaux via le formulaire + appel api
    const formAddWorkData = document.querySelector('#form-add-work');
    const formData = new FormData(formAddWorkData);

    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    /* Envoie d'un message si la réponse est ok*/
    if (response.ok) {
        alert("Votre image à bien été ajoutée!")
        return true;
    }
    /*Message d'alert en cas d'une erreur*/
    else {
        alert('Une erreur est survenue')
    }
    return response;
}

