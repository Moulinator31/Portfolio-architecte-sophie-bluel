const gallery = document.querySelector('.gallery');
let filtres = document.querySelector('.filtres');

async function getWorks() {
    
    try {
        const reponse = await fetch('http://localhost:5678/api/works');
        const data = await reponse.json();
        

        return data;
    }
     catch(error){
        console.error(error);
     }
    
}

async function showWorks(){
    const works = await getWorks();
    
    works.forEach(work => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const figcaption = document.createElement('figcaption');

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


/** Ajout des filtres */

async function getCategories() {
    try {
        const reponse = await fetch('http://localhost:5678/api/categories');
        const data = await reponse.json();


        return data;
    }
     catch(error){
        console.error(error);
    }
}

async function filtre () {
    const categories = await getCategories();
    
    const buttonAll = document.createElement("button");

    buttonAll.setAttribute("data-filtre-id", "all");
    buttonAll.setAttribute("class","filtresborder");
    buttonAll.innerText = "Tous";

    filtres.appendChild(buttonAll);

    categories.forEach(category => {


        const button = document.createElement('button');
        button.classList.add('.filterborder');

    
    
        button.setAttribute("name",category.name);
        button.setAttribute("class","filtresborder");
        button.setAttribute("data-filtre-id", category.id);
        button.innerText = category.name;
    
   
 
        filtres.appendChild(button);
    });
    tabsFilter();
}

/* Mise en place des filtres par images*/

function tabsFilter(){
    const filterButtons = document.querySelectorAll('.filtresborder');/*Les filtres*/
    const pictures = document.querySelectorAll(".gallery img");/* Les images*/
    

    const resetActive = () =>{
        filterButtons.forEach(filterButton =>{
            filterButton.classList.remove('active');
        });
    };

   /*Appel toutes les images*/
    const Showprojets = (filtreId) => {
        pictures.forEach(picture => {
            let categoryId = picture.dataset.categoryId;
            /* Button Tous*/
            if (filtreId === 'all'){
                picture.parentNode.classList.remove('hide');
                return; /*Arrête l'action ici*/
            }
            /* Si le filtre est différent à la categorie alors il ajoute la Class, sinon il l'enlève*/
            if (categoryId !== filtreId){
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

 function init(){
    showWorks();
}

init();




