fetch('/api/alldb')
  .then(response => response.json())
  .then(data => {
    // Update the HTML elements with the company data
    document.getElementById('cms-allColl').textContent = data
  })
  .catch(error => console.error('Error fetching company data:', error));

fetch('/cms-admin-api/numOfmembers')
.then(response => response.json())
.then(data => {
  document.getElementById('cms-numOfmembers').textContent = data
})
.catch(error => console.error('Error fetching members data:', error));

fetch('/cms-admin-api/numOfsubs')
.then(response => response.json())
.then(data => {
  document.getElementById('cms-numOfsubscribes').textContent = data
})
.catch(error => console.error('Error fetching members data:', error));

fetch('/cms-admin-api/numOfenqus')
.then(response => response.json())
.then(data => {
  document.getElementById('cms-numOfenquiries').textContent = data
})
.catch(error => console.error('Error fetching members data:', error));

fetch('/cms-admin-api/numOftesti')
.then(response => response.json())
.then(data => {
  document.getElementById('cms-numOftestimonials').textContent = data
})

fetch('/cms-admin-api/numOfpacks')
.then(response => response.json())
.then(data => {
  document.getElementById('cms-numOfpackages').textContent = data
})