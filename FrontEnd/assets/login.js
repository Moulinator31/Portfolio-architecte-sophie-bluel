const form = document.querySelector(".loginForm");
const email = form.querySelector("#email").value;
const password = form.querySelector("#password").value;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
fetchLogin()
}
)

async function fetchData(type, options){
  //const url = ('http://localhost:5678/api/users/login');

  try {
    fetch('http://localhost:5678/api/users/login', options)
  .then(function (response) {
    return response.json()
  })
  .then(function (json) {
    console.log(json)
    // json est le vrai résultat de notre requête !
  })

    /*const response = await fetch(url, options);
    const json = await response.json();
    console.log(json)
    
    if (json &&  json.status === 200){
    }
    return false;*/
  }
    catch(error){
      console.log(error)
    }
}

async function fetchLogin (username,password){
  const type = '/login';
  const content = {
    "email": username,
    "password": password,
  };
  const options = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(content)
 }
 return fetchData(type, options);

}