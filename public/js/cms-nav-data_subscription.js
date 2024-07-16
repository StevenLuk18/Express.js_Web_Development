document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscription-search');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
        }
    
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        const response = await fetch('/cms-admin-api-subscription/subscriptionSearch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
    
        if (response.ok) {
        return response.json().then(data => {
            const searchResult =
            `< &nbsp;Searched _id: *${data._id}*&nbsp; > <br/> 
            < &nbsp;Searched sbemail: *${data.sbemail}*&nbsp; > <br/> 
            < &nbsp;Searched sbdate: *${data.sbdate}*&nbsp; > <br/>`
            
            document.getElementById('searchResult').innerHTML = searchResult;
            alert('Your search request is sent !');
        });
        } else {
        alert('Error in searching. Please try later.');
        }
        
    });
    })

//checkbox display
function radio_showHide() {
    let email_radio = document.getElementById('subscription-search-email');
    let id_radio = document.getElementById('subscription-search-id');
  
  
    email_radio.addEventListener('change', function() {
      if (this.checked) {
        document.getElementById('subscriptionId').style.display= 'none'
        document.getElementById('subscriptionId-label').style.display= 'none'
        document.getElementById('subscriptionEmail').style.display= 'inline-block'
        document.getElementById('subscriptionEmail-label').style.display= 'inline-block'
      } 
    });
  
    id_radio.addEventListener('change', function() {
      if (this.checked) {
          document.getElementById('subscriptionEmail').style.display= 'none'
          document.getElementById('subscriptionEmail-label').style.display= 'none'
          document.getElementById('subscriptionId').style.display= 'inline-block'
          document.getElementById('subscriptionId-label').style.display= 'inline-block'
      } 
      })
  
  }
  
  radio_showHide();