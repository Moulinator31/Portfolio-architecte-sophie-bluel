const form = document.querySelector(".loginForm");
const loginPassword = document.getElementById('password');
const loginEmail = document.getElementById('email');
const errorPassword = document.getElementById('errorPassword');
const errorEmail = document.getElementById('errorEmail');
const ici = document.getElementById('non')


form.addEventListener('submit', (event) => {
  event.preventDefault();
  formLogin();
});

async function fetchLogin(type, options) {
  const url = 'http://localhost:5678/api/users/' + type;
  try {
    const reponse = await fetch(url, options);
    const data = await reponse.json();

    return data;
     
  }
  catch(error){
    return addError('requête');
  }
  
}

async function loginForm (user){
  const type = 'login';
  const content = user;
    
  const options = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(content)
  };

  return fetchLogin(type, options);

}
function addError(errorType){
  var type = errorType;
  errorEmail.innerText = '';
  errorPassword.innerText = '';
  var errorText = '';
  switch (type) {
    case 'invalid_data': 
      errorText = document.createTextNode('Email ou password incorrect.');
      errorEmail.appendChild(errorText);
      break;
    case 'invalid_email': 
      errorText = document.createTextNode('Email incorrecte veuillez réessayer.');
      errorEmail.appendChild(errorText);
      break;
    case 'invalid_password': 
      errorText = document.createTextNode('Mot de passe incorrect. réessayez ou cliquez sur mot de passe oublié pour le réinitialiser.'); 
      errorPassword.appendChild(errorText);
      break;
    case 'requête': 
      errorText = document.createTextNode('Erreur lors de la requête veuillez réessayer ultérieurement.');
      errorEmail.appendChild(errorText);
      break;
    case 'user not found': 
      errorText = document.createTextNode('Aucun utilisateur existe.');
      errorEmail.appendChild(errorText);
    default:
      break;
  }
}
async function formLogin(){
  const email = loginEmail.value;
  const password = loginPassword.value;
  if(!email || !password) return addError('invalid_data');
  if (password.length < 6) return addError('invalid_password');
  const validEmail = checkEmail(email);
  if (!validEmail) return addError('invalid_email');
  const user = { email, password };

  try {
    const req = await loginForm(user);
    console.log(req);
    if(req.token){
      window.location.href="index.html";
    }
    if (req.message) return addError('user not found');
  } catch (error) {
    
  } 
}

function checkEmail(email) {
  var regexMail = /^[^\s@]+@[a-z]+\.[a-z]{2,}$/;
  if(!regexMail.test(email)) {
      return false;
  }
  return regexMail.test(email);
}

/*async function fetchLogin (user){
  const response = await fetch('http://localhost:5678/api/users/login',{
  method: 'POST',
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
})
return response
}

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

