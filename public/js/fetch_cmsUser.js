fetch('/cms-admin-api/get-auth-user')
  .then(response => response.json())
  .then(data => {
    // Update the HTML elements with the company data
    document.getElementById('cms-username').textContent = data[1];
  })
  .catch(error => console.error('Error fetching company data:', error));


