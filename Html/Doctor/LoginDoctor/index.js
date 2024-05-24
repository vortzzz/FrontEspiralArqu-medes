const ccInput = document.getElementById('ccInput');
const passwordInput = document.getElementById('passwordInput');
const login_admin= document.getElementById('login_admin');
const login_doctor = document.getElementById('login_doctor');
const changePassword = document.getElementById('ChangePassword');



//Eventos
changePassword.addEventListener('click',page_password);
login_doctor.addEventListener('click',login);
login_admin.addEventListener('click',back_page);

function page_password(){
    window.location.href = "../CambiarContraseña/CambiarContraseña.html";
}


function back_page(){
    location.href = "../../Admin/LoginAdmin/Untitled-1.html";
}

function login(){
    let cc= ccInput.value;
    let password= passwordInput.value;

    let LoginRequest ={
        cc: cc,
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

   let data= await response.json()
   if(response.ok) {
    let user= JSON.stringify(data);
    window.localStorage.setItem('user', user);
    location.href ='../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html';  
    } else {
        if(response.status === 401) {
       alert(data.message);
    } else {
        console.error('Request error: ', response.status);
        alert('An error occurred in the request. Please try again later.');
    }
 }
}