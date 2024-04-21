let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
  window.location.href = "http://127.0.0.1:5500/LoginAdmin/Untitled-1.html";
}
function agregarDoctor() {
    window.location.href = "../AñadirDoctores/paginaAdd.html";
  }
  
  function buscarDoctor() {
<<<<<<< HEAD
      window.location.href = "../BuscarDoctores/paginaSearch.html";
=======
    alert("Funcionalidad para buscar doctor aún no implementada.");
>>>>>>> 4f7501e0a6af80a7c5aafcfcf52074d1fe94eb2e
  }
  
  function eliminarDoctor() {
    window.location.href = "../EliminarDoctores/paginadelete.html";
  }

function exit(){
    window.location.href = "../LoginAdmin/Untitled-1.html"

}
function goDoctorsSeccion(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html"

}

function goHome(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}




  