fetch('/api/alldb')
  .then(response => response.json())
  .then(data => {
    // Update the HTML elements with the company data
    document.getElementById('cms-allColl').textContent = data
  })
  .catch(error => console.error('Error fetching company data:', error));