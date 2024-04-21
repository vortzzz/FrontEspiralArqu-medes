const currentPasswordInput = document.getElementById('currentPasswordInput');
const newPasswordInput = document.getElementById('newPasswordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const changePasswordForm = document.getElementById('changePasswordButton');
const usernameInput= document.getElementById('usernameInput');
const goBackButton = document.getElementById('goBackButton');

changePasswordForm.addEventListener('click', change);
goBackButton.addEventListener('click', goBack);

function goBack() {
    window.location.href = 'http://127.0.0.1:5500/LoginDoctor/LogIn.html';
}

async function change() {
  
    let username= usernameInput.value;
    let password = currentPasswordInput.value;
    let passwordNEW1 = newPasswordInput.value;
    let passwordNEW2 = confirmPasswordInput.value

    let changePasswordRequest = {
        username: username,
        password: password,
        passwordNEW1: passwordNEW1,
        passwordNEW2: passwordNEW2
    
    }

     fchangePasswordRequest(changePasswordRequest);
    }

    async function fchangePasswordRequest(changePasswordRequest) {
        let json = JSON.stringify(changePasswordRequest);
        let response = await fetch('http://localhost:8080/doctor/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
    
        let data = await response.text();
        console.log(data);
        if (response.ok) {
            alert(data);
            goBackButton.style.display = 'block';
        } else {
            if (response.status === 401) {
                alert(data);
            } else {
                alert(data);
            }
        }
    }