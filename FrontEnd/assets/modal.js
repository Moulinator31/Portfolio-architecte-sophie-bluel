import { showWorks } from "./works.js";
import { getWorks, getCategories } from "./client.js";


const modalGallery = document.querySelector('.modal_gallery');
const buttonCloseModal1 = document.querySelector('.icon_close');
const modaleContainer = document.querySelector('.modale_container');
const modaleAddContainer = document.querySelector('.modaleAdd_container');
const buttonModifier = document.querySelector('.modification_icon');
const addpicturesmodal = document.querySelector('.file');
const buttonCloseModal2 = document.getElementById('close');
const overlayClose = document.querySelector('.modale_overlay');
const overlayClose2 = document.querySelector('.modale2_overlay');
const arrowModale = document.querySelector('.arrow');

/*Bouton close pour la première modale*/
buttonCloseModal1.addEventListener('click', () => {
    modaleContainer.style.display = "none";
});

overlayClose.addEventListener('click', () => {
    modaleContainer.style.display = "none";
});

overlayClose2.addEventListener('click', () =>{
    modaleAddContainer.style.display= "none";
})
arrowModale.addEventListener('click', () => {
    modaleAddContainer.style.display = "none";
    modaleContainer.style.display ="block";
});

/*Bouton Close pour la deuxième modale*/
buttonCloseModal2.addEventListener('click', () => {
    modaleAddContainer.style.display = "none";
    console.log(buttonCloseModal1);
});

/*Bouton modifier*/
buttonModifier.addEventListener("click", function () {
    modaleContainer.style.display = "block";
});


addpicturesmodal.addEventListener("change", function (event) {
    previewPictures(event);

});

/*Requete pour supprimer un élément dans l'API*/
async function deleteWork(id) {
    let token = sessionStorage.getItem('token');
    console.log(token);
    const deleterequest = await fetch("http://localhost:5678/api/works/" + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }

    });
    console.log(deleterequest);
    if (deleterequest.ok) {
        const deletedWork = document.querySelectorAll(`[data-id="${id}"]`);
        //Supprime l'élément de la modale
        if (deletedWork && deletedWork.length > 0) {
            for (var i = 0; i < deletedWork.length; i++) {
                deletedWork[i].remove();
            }
        }
    }
    else {
        alert('Une erreur est survenue');
    }
}

/* Ajout des images dans la modale* en recuperant la fonction getWorks*/
async function addWorksModale() {
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
        iconDelete.src = "./assets/icons/group 10.png";
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

export function initModal() {
    addWorksModale();
    categories();
}

async function fetchModaleId(type, options) {
    const url = 'http://localhost:5678/api/works/' + type;

    try {
        const reponse = await fetch(url, options);
        const data = await reponse.json();

        return data;

    }
    catch (error) {
    }
    console.log(type);
}


const buttonAddPictures = document.querySelector('.buttonAdd');

/* Bouton ajouter, permet de fermer la première modale et ouvrir la deuxième*/
buttonAddPictures.addEventListener("click", function () {
    modaleAddContainer.style.display = "block";
    modaleContainer.style.display = "none";
});

const modaleGreen = document.querySelector('.modale_');
/*Preview des photos dans la deuxième modale*/
function previewPictures(event) {
    const file = event.target.files[0];
    if (file.type.match("image.*")) {
        if (file.size <= 4194304) {
            var reader = new FileReader();
        }
    }
    reader.onload = function (event) {
        imagePreview.src = event.target.result;
        document.getElementById("imageModale").style.display = "none";
        document.getElementById("imagePreview").style.display = "block";
        document.getElementById("input_image_container").style.display = "none";


    };
    reader.readAsDataURL(file);
}


const titleForm = document.querySelector("#modale");

titleForm.addEventListener('submit', addPicturesModal);

async function addPicturesModal(event) {
    event.preventDefault();

    const gallery = document.querySelector(".gallery");
    const file = document.getElementById("file").files[0];
    console.log(file);
    const formData = new FormData(titleForm);
    const categorie = document.querySelector('#categorie');
    const category = categorie.value;
    const title = document.getElementById("title");
    console.log(title);

    if (formData.ok) {

        formData.append('image', file[0]);
        formData.append('title', title.value);
        formData.append('categorie', category);


        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');


        img.src = URL.createObjectURL(file);
        figcaption.innerText = title.value;

        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        console.log(JSON.stringify(Object.fromEntries(formData.entries())));

    }
    else {
        alert('Une erreur est survenue')

    }

    addWork(file, title.value, category);

}

async function addWork(file, title, category) {  // fonction d'ajout de travaux via le formulaire + appel api
    const formData = new FormData;
    formData.append('file', document.getElementById("file").files[0]);
    formData.append('title', title);
    formData.append('category', parseInt(category));
    console.log(formData);
    //const plainFormData = Object.fromEntries(formData.entries());
    //const formDataJsonString = JSON.stringify(plainFormData);

    let token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    return response;
}

/* Permet d'ajouter les category dans la deuxième modale dynamiquement en faisant appel a l'api getCategories*/
async function categories() {
    const select = document.getElementById("categorie");
    const categories = await getCategories();

    console.log(categories);

    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}
