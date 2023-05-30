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

// **************** INIT ********************

const gallery = document.querySelector('.gallery');
let filtres = document.querySelector('.filtres');

//let boutons = Array.from(categories.children);

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
}
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






let buttonId = null;  
    const filterOnClick = function(e) {
        e.preventDefault();
        buttonId = e.target.getAttribute("id");
        gallery.innerHTML="";

        if (buttonId == "all"){ // For the "Tous" button, display all the projects
            displayProjects(projects);
        } else { // For the others button, the projects displayed match the buttons categories
            const filteredProjects = projects.filter(function(project){
                return project.category.name == buttonId;
            });
            displayProjects(filteredProjects);
        };
    };

    /* Add the event listener on the categories buttons */
    document.querySelectorAll(".filter").forEach(button => button.addEventListener("click",filterOnClick)); 


    function displayProjects(array){
        for (let i=0; i<array.length; i++){
            const projectData = array[i]; // using the i element (object) of the array
            showWorks(projectData);
        }};



