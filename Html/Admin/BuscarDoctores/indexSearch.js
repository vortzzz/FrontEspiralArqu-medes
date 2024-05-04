//Validación de autenticación
let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginAdmin/Untitled-1.html";
  }

const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const doctorInput = document.getElementById('doctorInput');
const searchButton = document.getElementById('searchButton');
const searchResultsContainer = document.getElementById('searchResultsContainer');

// Eventos

homeButton.addEventListener('click', goHome);
exitButton.addEventListener('click', exit);
searchButton.addEventListener('click', searchDoctor);

function exit(){
    window.location.href = "../LoginAdmin/Untitled-1.html";
    window.localStorage.removeItem('user');
}

function goHome() {
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}

function searchDoctor() {
    let doctorSearch = doctorInput.value;
    postDoctorSearch(doctorSearch);
}

async function postDoctorSearch(doctorSearch) {
    let response = await fetch('http://localhost:8080/doctor/search/' + doctorSearch, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        let doctor = await response.json();
        console.log(doctor);
        // Limpiar resultados anteriores
        searchResultsContainer.innerHTML = '';
        // Mostrar resultados en la interfaz de usuario
        const doctorContainer = document.createElement('div');
        const doctorName = document.createElement('h3');
        const doctorCC = document.createElement('small');
        const doctorPhone = document.createElement('small');

        doctorName.textContent = doctor.name;
        doctorCC.textContent = `Cedula: ${doctor.cc}`;
        doctorPhone.textContent = `Telefono: ${doctor.phone}`;

        doctorContainer.appendChild(doctorName);
        doctorContainer.appendChild(doctorCC);
        doctorContainer.appendChild(doctorPhone);

        searchResultsContainer.appendChild(doctorContainer);
    } else if (response.status === 400) {
        alert("No se ha encontrado el número de cédula.");
    } else {
        throw new Error('Error al obtener los datos del doctor');
    }
}
