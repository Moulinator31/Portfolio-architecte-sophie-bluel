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

export async function fetchLogin(type, options) {
  const url = 'http://localhost:5678/api/users/' + type;
  
  try {
    const reponse = await fetch(url, options);
    const data = await reponse.json();

    return data;
     
  }
  catch(error){
    return addError('request');
  }
  
}

export async function fetchModaleId(type, options) {
    const url = 'http://localhost:5678/api/works/' + type;
    
    try {
      const reponse = await fetch(url, options);
      const data = await reponse.json();
  
      return data;
       
    }
    catch(error){
    }

}

/*export async function addpictures(){
  const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
  let token = sessionStorage.getItem('token');
  console.log(token);
  const addPictures = await fetch("http://localhost:5678/api/works/" , {
      method: "POST",
    headers: {
      Accept: "application/json",
      'Authorization': `Bearer ${token}`
  },
  body: formDataJsonString,

  });
  const response = await fetch(url, addPictures);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();

}*/

  

