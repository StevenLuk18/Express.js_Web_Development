document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enduser-search');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
        }
    
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        const response = await fetch('/cms-admin-api-enduser/enduserSearch', {
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
            < &nbsp;Searched eulogin: *${data.eulogin}*&nbsp; > <br/> 
            < &nbsp;Searched eupswd: *${data.eupswd}*&nbsp; > <br/>
            < &nbsp;Searched euname: *${data.euname}*&nbsp; > <br/>
            < &nbsp;Searched euprofile: *${data.euprofile}*&nbsp; > <br/>
            < &nbsp;Searched eucrdate: *${data.eucrdate}*&nbsp; > <br/>
            < &nbsp;Searched euimage: *${data.euimage}*&nbsp; > <br/>`
            
            document.getElementById('searchResult').innerHTML = searchResult;
            document.getElementById('output').src = data.euimage;

            alert('Your search request is sent !');
        });
        } else {
        alert('Error in searching. Please try later.');
        }
        
    });
    })