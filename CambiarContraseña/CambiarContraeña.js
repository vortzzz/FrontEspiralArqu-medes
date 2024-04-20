const currentPasswordInput = document.getElementById('currentPassword');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const changePasswordForm = document.getElementById('changePasswordForm');
const redirectButton = document.createElement('Volver a inicio');

changePasswordForm.addEventListener('submit', changePassword);
redirectButton.addEventListener('click', redirectToLogin);

function redirectToLogin() {
    window.location.href = 'http://127.0.0.1:5500/login.html';
}

async function changePassword(event) {
  event.preventDefault();

    let currentPassword = currentPasswordInput.value;
    let newPassword = newPasswordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    if (newPassword !== confirmPassword) {
        alert('Las contraseñas no son las mismas.');
        return;
    }

    let changePasswordRequest = {
    currentPassword: currentPassword,
    newPassword: newPassword
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
                redirectButton.style.display ='block';
                document.body.appendChild(redirectButton);
            } else {
                if (response.status === 401) {
                    alert('Current password is incorrect.');
                } else {
                    console.error('Error in request:', response.status);
                    alert('An error occurred in the request. Please try again later.');
                }
              }
            }
