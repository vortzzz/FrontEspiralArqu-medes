const nameInput = document.getElementById('nameInput');
const passwordInput = document.getElementById('passwordInput');
const login_admin= document.getElementById('login_admin');
const login_doctor = document.getElementById('login_doctor')



//Eventos

login_doctor.addEventListener('click',login);
//login_doctor.addEventListener('click',back_page);



function login(){
    let username= nameInput.value;
    let password= passwordInput.value;

    let LoginRequest ={
        username: username,
        password: password,
    }


    postLogin(LoginRequest);

}

async function  postLogin(LoginRequest){
   let json= JSON.stringify(LoginRequest);

   let response = await fetch('http://localhost:8080/doctor/login',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: json
   });

   let data= await responsse.json()
   console.log (data);
   if(response.ok) {
    let user= JSON.stringify(data);
    window.localStorage.setItem('user', user);
    window.location.href ='hhtp//127.0.0.1:5500/AgregarEliminarBuscarDoctores/pagina.html';
    } else {
        if(response.status === 401) {
       alert('Nombre de usuario o contraseña incorrectos');
    } else {
        console.error('Error en la solicitud:', response.status);
        alert('Ocurrió un error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
 }


}




