let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
  window.location.href = "http://127.0.0.1:5500/LoginAdmin/Untitled-1.html";
}
function agregarDoctor() {
    window.location.href = "../AñadirDoctores/paginaAdd.html";
  }
  
  function buscarDoctor() {
    alert("Funcionalidad para buscar doctor aún no implementada.");
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




  