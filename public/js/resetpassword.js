function checkPasswordMatch() {
    const profilePw1 = document.getElementById('password');
    const profilePw2 = document.getElementById('re-password');
    const submitBtn = document.getElementById('submit');

    if (profilePw1.value === profilePw2.value) {
        profilePw1.style.border = '2px solid green';
        profilePw2.style.border = '2px solid green';
        submitBtn.style.display = 'block';
    } else {
        profilePw1.style.border = '2px solid red';
        profilePw2.style.border = '2px solid red';
        submitBtn.style.display = 'none';
    }
}

document.getElementById('password').addEventListener('input', checkPasswordMatch);
document.getElementById('re-password').addEventListener('input', checkPasswordMatch);