
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('creatAC-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add arrays for checkbox groups
    data.favoriteCities = [];
    data.preferredTransport = [];

    // Get favorite cities
    document.querySelectorAll('input[name="favcity"]').forEach((checkbox) => {
      if (checkbox.checked) {
        data.favoriteCities.push(checkbox.value);
      }
    });

    // Get preferred transport
    document.querySelectorAll('input[name="favcity2"]').forEach((checkbox) => {
      if (checkbox.checked) {
        data.preferredTransport.push(checkbox.value);
      }
    });

    try {
      const response = await fetch('myprofile/infoUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Infomation Update successfully!');
        const updatedData = await response.json(); // get new after update

        // 更新頁面上的表單元素
        document.getElementById('pw1').value = updatedData.password;
        document.getElementsByClassName('email').value = updatedData.email
        /* updatedData.password = sessionStorage.setItem('newPw') */
      } else {
        alert('Error in updating. Please try later.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('System failure in javascript.');
    }

  function uploadImage() {
    const formData = new FormData();
    const fileInput = document.querySelector('input[name="mbImageUp"]');
    formData.append('image', fileInput.files[0]);

    fetch('/myprofile/mbImageUpload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  
   uploadImage()

  })
});