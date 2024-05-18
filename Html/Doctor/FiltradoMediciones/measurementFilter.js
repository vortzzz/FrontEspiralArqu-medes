//Autenticacion

let userJSON= window.localStorage.getItem('user');

if(userJSON===null){
    location.href = "../LoginDoctor/Login.html";
    }
//Convierto string a objeto
else{
    userJSON=JSON.parse(userJSON);
}

const homeButton = document.getElementById('homeButton');
const doctorsButton = document.getElementById('doctorsButton');
const exitButton = document.getElementById('exitButton');
const patientsButton = document.getElementById('patientsButton');
const measurementButton = document.getElementById('measurementButton');
const inputSearchByCC= document.getElementById('inputSearchByCC');
const filterBTN = document.getElementById('filterBTN');
const measurementContainer=document.getElementById('measurementContainer');
const searchBTN=document.getElementById("searchBTN");
const selection=document.getElementById('selection');
const divContainer=document.getElementById('divContainer');
var date1 ='';
var date2 ='';
var text ='';

homeButton.addEventListener('click',home)
exitButton.addEventListener('click',exit)
measurementButton.addEventListener('click',measurement)
selection.addEventListener('change',changeInput)
searchBTN.addEventListener('click',search)
patientsButton.addEventListener("click",patients);


function home(){
    location.href='../PrincipalPageDOCTOR/indexPagePrincipalDoctor.html';
}

function exit(){
    location.href='../LoginDoctor/Login.html';
    window.localStorage.removeItem('user');
}

function patients(){
    location.href='../PagPpalPacientes/PaginaPacientes.html';
}

function measurement(){
    location.href='../PaginaPrincipalMedicion/Meditions.html';
}

function search(){
    date1.value='';
    date2.value='';
    text.value='';  
    let patientCC=inputSearchByCC.value;
    if(patientCC!==""){
        searchByCC(patientCC);
    }
    else{
        alert("Please fill the field");
        measurementContainer.innerHTML = '';
    }
    
}

async function searchByCC(patientCC){
    let response = await fetch('http://localhost:8080/doctor/'+userJSON.id+'/measurement/filterByCC/' + patientCC, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let measurement= await response.json();
    getMeasurementfilter(measurement,response);
}



function changeInput(){
    divContainer.innerHTML = '';
    if(selection.value==="byDate"){
        date1=document.createElement("input");
        date2=document.createElement("input");
        date1.type="date";
        date2.type="date";
        date1.className="input2";
        date2.className="input2";
        var btn=document.createElement("button");
        btn.className="minibuttons";
        btn.textContent="FILTER";
        btn.addEventListener('click',function(){
            filter1(date1,date2);
        });
        divContainer.appendChild(date1);
        divContainer.appendChild(date2);
        divContainer.appendChild(btn);
    }
    else if(selection.value==="byNamePatient"){
        text=document.createElement("input");
        text.id="text";
        text.className="input2";
        text.placeholder="patientName"
        var btn=document.createElement("button");
        btn.className="minibuttons";
        btn.textContent="FILTER";
        btn.addEventListener('click',function(){
            filter2(text);
        });
        divContainer.appendChild(text);
        divContainer.appendChild(btn);

    }
    else{
        alert("Please select a type of filtering")
    }
}

async function filter1(date1,date2){
    inputSearchByCC.value=''; 
    if(date1.value!==''&&date2.value!==''){
    let response = await fetch("http://localhost:8080/doctor/"+userJSON.id+"/measurement/filterByDate/"+date1.value+"/"+date2.value,{
        method: 'GET',
            headers:{
               'Content-Type': 'application/json'
             }, 
         });
        let measurement= await response.json();
        getMeasurementfilter(measurement,response);
    }
    else{
        alert("Please fill all fields")
    }
}

async function filter2(text){
    inputSearchByCC.value=''; 
    if(text.value!==''){
    let response = await fetch("http://localhost:8080/doctor/"+userJSON.id+"/measurement/filterByName/"+text.value,{
        method: 'GET',
            headers:{
               'Content-Type': 'application/json'
             }, 
         });
        let measurement= await response.json();
        getMeasurementfilter(measurement,response);
    }
    else{
        alert("Please fill all fields")
    }
}

async function getMeasurementfilter(measurement,response){
    if(response.status==200){
        measurementContainer.innerHTML = '';    
        let table = document.createElement("table");
        table.id = "miTabla";
        var tblBody = document.createElement("tbody");
        var ceilInfo;
        var textoBTN1;
        var textoBTN2;
        var hilera = document.createElement("tr");
        for (var j = 0; j < 3; j++) {
            var celda = document.createElement("td");   
            if(j==0){
                ceilInfo=document.createTextNode("ID");
            }
            else if(j==1){
                ceilInfo=document.createTextNode("PATIENT");        
            }
            else{
                ceilInfo=document.createTextNode("DATE TAKEN");
            }
            celda.appendChild(ceilInfo);
            hilera.appendChild(celda);
        }
        tblBody.append(hilera);
        table.appendChild(tblBody);
        measurementContainer.appendChild(table);

        measurement.forEach(measurement =>{
                var hilera = document.createElement("tr");
                for (var j = 0; j < 5; j++) {
                    var celda = document.createElement("td");   
                    if(j==0){
                        ceilInfo=document.createTextNode(measurement.id);
                    }
                    else if(j==1){
                        ceilInfo=document.createTextNode(measurement.patient.name);        
                    }
                    else if(j==2){
                        ceilInfo=document.createTextNode(measurement.dateTaken);
                    }
                    else if(j==3){
                        ceilInfo=document.createElement("button");
                        textoBTN1=document.createTextNode("DELETE");
                        ceilInfo.appendChild(textoBTN1);
                        ceilInfo.addEventListener("click", function(){
                            remove(measurement.id);
                        });
                    }
                    else{
                        ceilInfo=document.createElement("button");
                        textoBTN2=document.createTextNode("MODIFY");
                        ceilInfo.appendChild(textoBTN2);
                        ceilInfo.addEventListener("click", function(){
                            editMeasurement(measurement);
                        });
                    }

                    celda.appendChild(ceilInfo);
                    hilera.appendChild(celda);
                }
            tblBody.append(hilera);
            table.appendChild(tblBody);
            measurementContainer.appendChild(table);
        }
    )}
    else{
        measurementContainer.innerHTML = '';
        alert(measurement.description);
    }
    function editMeasurement(measurement){
        window.localStorage.setItem('medition', JSON.stringify(measurement))
        window.localStorage.setItem('medicionid', measurement.id);
        window.localStorage.setItem('medicionid', measurement.patient.cc);
        window.location.href = "../VisualizacionMediciones/visualizacion.html"
    }
}