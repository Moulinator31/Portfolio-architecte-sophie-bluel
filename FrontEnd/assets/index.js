async function getWorks() {
    try {
        const reponse = await fetch('http://localhost:5678/api/works');
        const data = await reponse.json();

        return data;
    }
     catch(error){
        console.error(error);
     }
};


const gallery = document.querySelector('.gallery');
let filtres = document.querySelector('.filtres');



let number = 0;

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

        gallery.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(figcaption);
    });
};
showWorks();

/** Ajout des filtres */

async function getCategory() {
    try {
        const reponse = await fetch('http://localhost:5678/api/categories');
        const data = await reponse.json();

        return data;
    }
     catch(error){
        console.error(error);
     }
};


async function filtre () {
    const category = await getCategory();

    category.forEach(category => {


    const button = document.createElement('button');
    button.classList.add('.filterborder');

    

    button.setAttribute("name",category.name);
    button.setAttribute("class","filtresborder");
    button.setAttribute("id", category.id);
    button.innerText = category.name;
   
 
    filtres.appendChild(button);
   
    
    
console.log(category);
    
});
}
filtre();

/*Bouton du "Tous" */

const ButtonTous = document.createElement("button");
ButtonTous.classList.add("filter");
ButtonTous.setAttribute("id", "all");
ButtonTous.setAttribute("class","filtresborder");
ButtonTous.innerText = "Tous";
filtres.appendChild(ButtonTous);


/** Changement d'images au click */
const button = document.createElement('button');

ButtonTous.addEventListener ('click', function() {

  
});

button.addEventListener ('click', function() {
    if (categoryId == 1){
        categoryId = id
    }else {
        categoryId == all
    }

   showWorks();

});

button.addEventListener ('click', function() {
    category = 3;
   showWorks();
   filtre()
});

button.addEventListener ('click', function() {
    category = 0;
    showWorks()
    filtre
});







