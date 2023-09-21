const modaleAddContainer = document.querySelector('.modaleAdd_container');
const modaleContainer = document.querySelector('.modale_container');
const buttonCloseModal2 = document.getElementById('close');
const overlayClose2 = document.querySelector('.modale2_overlay');
const arrowModale = document.querySelector('.arrow');
const addPicturesModal = document.querySelector('.file');
const buttonValider = document.querySelector("#button_submit");
const addTitle = document.querySelector("#title");
var fileBoolean = false;
var nameBoolean = false;



/*Permet de fermer la modale en cliquant en dehors de la modale*/
overlayClose2.addEventListener('click', () => {
    modaleAddContainer.style.display = "none";
});

/*La flêche va permettre de me rediriger vers la première modale*/
arrowModale.addEventListener('click', () => {
    modaleAddContainer.style.display = "none";
    modaleContainer.style.display = "block";
});

/*Bouton Close pour la deuxième modale*/
buttonCloseModal2.addEventListener('click', () => {
    modaleAddContainer.style.display = "none";
});

/**
 * Permet d'afficher l'explorateur de fichier
 * On ajoute la fonction PreviewPictures pour pouvoir afficher la photo selectionner
 */
addPicturesModal.addEventListener("change", function (event) {
    previewPictures(event);
});

/**
 * Si il y a quelque chose dans le champ "titre" alors on passe à true
 * On regarde si les autres autres champs sont à true avec la funtion checkFromBoolean*/
addTitle.addEventListener("keyup", function (event) {
    nameBoolean = false;
    if (addTitle.value && addTitle.value.length > 0) {
        nameBoolean = true;
    }
    checkFormBoolean();
});

/*Preview de photo selectionnée dans la deuxième modale*/
export function previewPictures(e) {
    const file = e.target.files[0];
    if (file.type.match("image.*")) {
        if (file.size <= 4194304) {
            var reader = new FileReader();
        }else {
            alert('Votre image ne doit pas dépasser les 4MO.');
        }
    }
    /*Une fois la photo selectionner les elements seront caché grace a un display none*/
    reader.onload = function (e) {
        imagePreview.src = e.target.result;
        document.getElementById("imageModale").style.display = "none";
        document.getElementById("imagePreview").style.display = "block";
        document.getElementById("input_image_container").style.display = "none";

        fileBoolean = true;

    };
    reader.readAsDataURL(file);

    checkFormBoolean();
}
/*Cette function permet d'ajouter une class sur le bouton valider en vert si le nom et la photo est choisie*/
function checkFormBoolean() {
    if (fileBoolean && nameBoolean) {
        buttonValider.removeAttribute("disabled");
        buttonValider.classList.add('modale_green');
    } else {
        buttonValider.setAttribute("disabled", "disabled");
        buttonValider.classList.remove("modale_green");

    }
}