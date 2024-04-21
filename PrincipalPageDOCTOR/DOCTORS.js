 
    let userJSON= window.localStorage.getItem('user');
    if(userJSON===null) {
        
        window.location.href = "http://127.0.0.1:5500/LoginDoctor/LogIn.html";
    }
