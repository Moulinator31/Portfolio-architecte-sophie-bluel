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
    const projets = document.querySelectorAll(".gallery img");/* Les images*/
    console.log(projets);
    

    const resetActive = () =>{
        filterButtons.forEach(filterButton =>{
            filterButton.classList.remove('active');
        });
    };

   /*Appel toutes les images*/
    const Showprojets = (element) => {
        projets.forEach(projet => {
            let category = projet.getAttribute('data-category-id');
            /* Button Tous*/
            if (element === 'all'){
                projet.parentNode.classList.remove('hide');
                return; /*Arrête l'action ici*/
            }
            /* Si le filtre est différent à la categorie alors il ajoute la Class, sinon il l'enlève*/
            if (category !== element){
                projet.parentNode.classList.add('hide');
            } else {
                projet.parentNode.classList.remove('hide');
            }
            
        });

    }
    filterButtons.forEach(filterButton => {
        filterButton.addEventListener("click", () => {
            //event.preventDefault();
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




