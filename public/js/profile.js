// Get backend api in routes login.js from front-end 
fetch('/login/get-auth-user')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    //let session = data
    document.querySelector('.acname').value = data.authUser[1]; 
    document.querySelector('.email').value = data.authUser[3];
    document.querySelector('.nickname').value = data.authUser[2];
    document.querySelector('#pw1').value = data.authUser[4];
    
    /* sessionStorage.getItem('') */
    
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
    let favcities = document.querySelectorAll('input[name="favcity"]')

    favcities.forEach(function(checkbox) {
    
        let matchingCity = data.userCities.find((city) => {
          return Object.keys(city)[0] === checkbox.value && Object.values(city)[0] === 'T';
        });
      
        if (matchingCity) {
          checkbox.checked = true;
        } 
      });
    
    //other countries
    document.querySelector('#othercountry').value = data.userCities[9]

    //trabsportation
    let userTrans = document.querySelectorAll('input[name="favcity2"]')

    userTrans.forEach(function(checkbox) {
    
        let matchingTrans = data.userTrans.find((trans) => {
          return Object.keys(trans)[0] === checkbox.value && Object.values(trans)[0] === 'T';
        });
      
        if (matchingTrans) {
          checkbox.checked = true;
        } 
      });

    //other transport
    document.querySelector('#othertran').value = data.userTrans[5];
    
  })
  .catch(error => console.error('Error fetching company data:', error));


//lock and open desc input in update profile
let otherCountryCheckbox = document.querySelector('input[type="checkbox"][name="favcity"][id="othersC"]');

otherCountryCheckbox.addEventListener('change', function() {
    
      let otherCountryInput = document.querySelector('#othercountry');
      otherCountryInput.disabled =!this.checked;
    } )

let otherTransCheckbox = document.querySelector('input[type="checkbox"][name="favcity2"][id="othersT"]');

otherTransCheckbox.addEventListener('change', function() {
    
      let otherCountryInput = document.querySelector('#othertran');
      otherCountryInput.disabled =!this.checked;
    } )


    


/* document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('creatAC-form');
    const resetButton = document.getElementById('reset');
    let originalData = {};

    // Function to load user data from session storage
    function loadUserData() {
        sessionStorage.setItem('userData', session);
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (userData) {
            originalData = userData;
            populateForm(userData);
        } else {
            console.error('No user data found in session storage');
        }
    }

    // Function to populate form with user data
    function populateForm(data) {
        document.getElementById('email').value = data.authUser[3] || '';
        document.getElementById('acname').value = data.authUser[1] || '';
        document.getElementById('nickname').value = data.authUser[2] || '';
        document.getElementById('pw1').value = data.authUser[4] || '';
        document.getElementById('pw2').value = data.mppswd || '';
        
        if (data.mpgender === 'male') {
            document.getElementById('male').checked = true;
        } else if (data.mpgender === 'female') {
            document.getElementById('female').checked = true;
        }

        // Set favorite cities
        const favCities = ['china', 'japan', 'korean', 'taiwan', 'europe', 'usa', 'england', 'canada'];
        favCities.forEach(city => {
            document.getElementById(city).checked = data[`mp${city}`] || false;
        });

        if (data.mpcntyother) {
            document.getElementById('others').checked = true;
            document.getElementById('othercountry').value = data.mpcntyothdesc || '';
        }

        // Set transportation preferences
        const transportations = ['airplan', 'cruise', 'train', 'highspeedrail'];
        transportations.forEach(trans => {
            document.getElementById(trans).checked = data[`mp${trans}`] || false;
        });

        if (data.mptranother) {
            document.getElementById('others2').checked = true;
            document.getElementById('othertran').value = data.mptranothdesc || '';
        }

        // Set image
        if (data.mpimagepath) {
            document.getElementById('output').src = data.mpimagepath;
        }
    }

    // Load user data when page loads
    loadUserData();

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Collect form data
        const formData = new FormData(form);
        const updatedData = {};

        for (let [key, value] of formData.entries()) {
            updatedData[key] = value;
        }

        // Handle checkboxes
        const favCities = ['china', 'japan', 'korean', 'taiwan', 'europe', 'usa', 'england', 'canada'];
        favCities.forEach(city => {
            updatedData[`mp${city}`] = document.getElementById(city).checked;
        });

        const transportations = ['airplan', 'cruise', 'train', 'highspeedrail'];
        transportations.forEach(trans => {
            updatedData[`mp${trans}`] = document.getElementById(trans).checked;
        });

        // Handle file upload
        const fileInput = document.getElementById('imagepath');
        if (fileInput.files.length > 0) {
            updatedData.mpimagepath = URL.createObjectURL(fileInput.files[0]);
        } else {
            updatedData.mpimagepath = originalData.mpimagepath;
        }

        // Update session storage
        sessionStorage.setItem('userData', JSON.stringify(updatedData));

        alert('Profile updated successfully!');
    });

    // Handle reset button
    resetButton.addEventListener('click', function() {
        populateForm(originalData);
    });

    // Image preview function
    window.loadFile = function(event) {
        const output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src) // free memory
        }
    };

    // Form validation function
    function validateForm() {
        const password = document.getElementById('pw1').value;
        const confirmPassword = document.getElementById('pw2').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return false;
        }

        const othersCheckbox = document.getElementById('others');
        const othercountryInput = document.getElementById('othercountry');
        if (othersCheckbox.checked && othercountryInput.value.trim() === '') {
            alert("Please specify other countries.");
            return false;
        }

        const others2Checkbox = document.getElementById('others2');
        const othertranInput = document.getElementById('othertran');
        if (others2Checkbox.checked && othertranInput.value.trim() === '') {
            alert("Please specify other transportation.");
            return false;
        }

        return true;
    }
}); */