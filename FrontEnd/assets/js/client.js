export async function getCategories() {
    try {
        const reponse = await fetch('http://localhost:5678/api/categories');
        const data = await reponse.json();


        return data;
    }
     catch(error){
        console.error(error);
    }
}

export async function getWorks() {
    
    try {
        const reponse = await fetch('http://localhost:5678/api/works');
        const data = await reponse.json();
        

        return data;
    }
     catch(error){
        console.error(error);
    }
}

  

