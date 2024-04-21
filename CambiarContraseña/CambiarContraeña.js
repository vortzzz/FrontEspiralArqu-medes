const currentPasswordInput = document.getElementById('currentPasswordInput');
const newPasswordInput = document.getElementById('newPasswordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const changePasswordForm = document.getElementById('changePasswordFButton');
const usernameInput= document.getElementById('usernameInput');
const goBackButton = document.getElementById('goBackButton');

changePasswordForm.addEventListener('submit', changePassword);
goBackButton.addEventListener('click', goBackButton);

function goBackButton() {
    window.location.href = 'http://127.0.0.1:5500/login.html';
}

async function changePassword(changePasswordRequest) {
  
    let username= usernameInput.value;
    let password = currentPasswordInput.value;
    let passwordNEW1 = newPasswordInput.value;
    let passwordNEW2 = confirmPasswordInput.value;

    if (passwordNEW1 !== passwordNEW2) {
        alert('Las contraseñas no son las mismas.');
        return;
    }

    let changePasswordRequest = {
        username: usernameInput.value,
        password: password,
        passwordNEW1: passwordNEW1,
        passwordNEW2: passwordNEW2
    
    }

     await changePasswordRequest(changePasswordRequest);
    }

async function changePasswordRequest(changePasswordRequest) {
    let json = JSON.stringify(changePasswordRequest);
    let response = await fetch('http://localhost:8080/doctor/change-password', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
         body: json
        });

            let data = await response.json();
            console.log(data);
            if (response.ok) {
                alert('Password changed successfully.');
                goBackButton.style.display ='block';
                document.body.appendChild(goBackButton);
            } else {
                if (response.status === 401) {
                    alert('Current password is incorrect.');
                } else {
                    console.error('Error in request:', response.status);
                    alert('An error occurred in the request. Please try again later.');
                }
              }
            }
