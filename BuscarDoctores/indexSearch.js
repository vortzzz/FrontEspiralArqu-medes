const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const doctorInput = document.getElementById('doctorInput');
const SearchButton = document.getElementById('SearchButton');


//Eventos

homeButton.addEventListener('click',goHome);
doctorsButton.addEventListener('click',goDoctorsSeccion);
exitButton.addEventListener('click', exit);
SearchButton.addEventListener('click',deleteDoctor);



function exit(){
    //Volver a sign up

}
function goDoctorsSeccion(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html"

}


function goHome(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}


function SearchDoctor() {
  let doctorSearch = doctorInput.value;
  postDoctorSearch(doctorSearch);
}

async function postDoctorSearch(doctorSearch){
  let json = JSON.stringify(doctorSearch);
  if (response.status === 200){let response = await fetch('http://localhost:8080/doctor/search/'+doctorSearch,{
      method: 'Search',
      headers:{
          'Content-Type': 'application/json'
      },
      body: json
  });}
  else if (response.status === 400){
    alert("No se ha encontrado el número de cedúla.");
  }
  let doctor = await response.json();
  console.log(doctor);
}