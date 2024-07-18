// Get backend api in routes login.js from front-end 
fetch('/login/get-auth-user')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    
    document.querySelector('.acname').value = data.authUser[1]; 
    document.querySelector('.email').value = data.authUser[3];
    document.querySelector('.nickname').value = data.authUser[2];
    document.querySelector('#pw1').value = data.authUser[4];
    
    
    //show profile image
    imageInput = document.querySelector('input[type="file"]').value
    if (!imageInput){document.getElementById('output').src = data.imagePath[0];}
    
    
    // Fill gender radio
    let maleRadioValue = document.querySelector('#male').value
    let femaleRadioValue = document.querySelector('#female').value

    if (maleRadioValue = data.authUser[5]) {
        document.querySelector('input[id="male"]').checked = true
    } else {
            document.querySelector('input[id="male"]').checked = false
        }

    if (femaleRadioValue === data.authUser[5]){ 
        document.querySelector('input[id="female"]').checked = true
    } else {document.querySelector('input[id="female"]').checked = false}

    //Fill fav cities radio
    let favcities = document.querySelectorAll('input[name="favcity"]');

    favcities.forEach(function(checkbox) {
        let cityName = checkbox.value;
        let isCityFavorite = data.userCities.some(city => Object.keys(city)[0] === cityName && Object.values(city)[0] === 'T');
        checkbox.checked = isCityFavorite;
    });
    
    //other countries
    document.querySelector('#othercountry').value = data.userCities[9]
    if (document.querySelector('#othercountry').value){
        document.querySelector('#othercountry').disabled = false;
    } else {
        otherCountryCheckbox = document.getElementById('othersC')
        if (otherCountryCheckbox.checked){
            document.querySelector('#othercountry').disabled = false;
            document.querySelector('#othercountry').required = true;
        }
    }

    //trabsportation
    let userTrans = document.querySelectorAll('input[name="favcity2"]')

    userTrans.forEach(function(checkbox) {
        let transname = checkbox.value;
        let istransFavorite = data.userTrans.some(tran => Object.keys(tran)[0] === transname && Object.values(tran)[0] === 'T');
        checkbox.checked = istransFavorite;
      });

    //other transport
    document.querySelector('#othertran').value = data.userTrans[5];
    if (document.querySelector('#othertran').value){
        document.querySelector('#othertran').disabled = false;
    } else {
        otherTransCheckbox = document.getElementById('othersT')
        if (otherTransCheckbox.checked){
            document.querySelector('#othertran').disabled = false;
            document.querySelector('#othertran').required = true;
        }
    }
    
  })
  .catch(error => console.error('Error fetching company data:', error));


//lock and open desc input in update profile
document.addEventListener('DOMContentLoaded', function() {
    // 找到需要操作的 checkbox 和 input 元素
    let otherCountryCheckbox = document.getElementById('othersC');
    let otherCountryInput = document.getElementById('othercountry');
  
    let otherTransCheckbox = document.getElementById('othersT');
    let otherTransInput = document.getElementById('othertran');

    updateInputDisabledState(otherCountryCheckbox, otherCountryInput);
    updateInputDisabledState(otherTransCheckbox, otherTransInput);
    
    if (otherCountryCheckbox && otherCountryInput && otherTransCheckbox && otherTransInput) {
    
    
        otherCountryCheckbox.addEventListener('change', function() {
        updateInputDisabledState(this, otherCountryInput);
        });
    
        otherTransCheckbox.addEventListener('change', function() {
        updateInputDisabledState(this, otherTransInput);
        });
    } else {
        console.log('cant find the elements !!');
    }
});


function updateInputDisabledState(checkbox, input) {
    input.disabled = !checkbox.checked;
  }


  function checkPasswordMatch() {
    const profilePw1 = document.getElementById('pw1');
    const profilePw2 = document.getElementById('pw2');
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
  
  // Call the checkPasswordMatch function whenever the password fields are changed
  document.getElementById('pw1').addEventListener('input', checkPasswordMatch);
  document.getElementById('pw2').addEventListener('input', checkPasswordMatch);

