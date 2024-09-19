function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

const formContainer = document.querySelector('.form-container')
const loginLink = document.querySelector('.login-link')
const registerLink = document.querySelector('#register-link-a')
const forgetpwLink = document.querySelector('#forgetpwLink')
const loginLinkforpw =  document.querySelector('#login-link-forpw')


registerLink.addEventListener('click',()=>{
  formContainer.classList.add('active')
})

loginLink.addEventListener('click',() =>{
  formContainer.classList.remove('active')
})

forgetpwLink.addEventListener('click',() => {
  formContainer.classList.add('active-forgetpw')  
})

loginLinkforpw.addEventListener('click',() => {
  formContainer.classList.remove('active-forgetpw')  
})

