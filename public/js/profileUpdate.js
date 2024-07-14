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

            // handle favoriteCities / preferredTransport array to post as FormData
            formData.append('favoriteCities', JSON.stringify(data.favoriteCities)); //it will changed to string at api
            formData.append('preferredTransport', JSON.stringify(data.preferredTransport)); //it will changed to string at api
        
            // handle image FormData
            const fileInput = document.querySelector('input[name="mbImageUp"]');
            if (fileInput.files.length > 0) {
            formData.append('image', fileInput.files[0]);
            }
        
            try {
            const response = await fetch('/myprofile/infoUpdate', {
                method: 'POST',
                body: formData
            });
        
            if (response.ok) {
                alert('Infomation Update successfully!');
                const updatedData = await response.json();
                
                document.getElementById('pw1').value = updatedData.password;
                document.getElementsByClassName('email').value = updatedData.email

            } else {
                alert('Error in updating. Please try later.');
            }
            } catch (error) {
                console.error('Error creating account:', error);
                alert('System failure in javascript.');
            }
        });
});