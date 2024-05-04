let userJSON= window.localStorage.getItem('user');



if(userJSON===null){
  window.location.href = "../LoginAdmin/Untitled-1.html";
}

function exit(){
  window.location.href = "../LoginAdmin/Untitled-1.html"
  window.localStorage.removeItem('user');
}


function agregarDoctor() {
    window.location.href = "../AñadirDoctores/paginaAdd.html";
  }
  
  function buscarDoctor() {
      window.location.href = "../BuscarDoctores/paginaSearch.html";

  }
  
  function eliminarDoctor() {
    window.location.href = "../EliminarDoctores/paginadelete.html";
  }

function goDoctorsSeccion(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html"

}

function goHome(){
    window.location.href = "../AgregarEliminarBuscarDoctores/pagina.html";
}




  