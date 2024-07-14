document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('company-search');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
        }
    
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        const response = await fetch('/cms-admin-api-company/companySearch', {
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
            < &nbsp;Searched cpname: *${data.cpname}*&nbsp; > <br/> 
            < &nbsp;Searched cpadres: *${data.cpadres}*&nbsp; > <br/>
            < &nbsp;Searched cptel: *${data.cptel}*&nbsp; > <br/>
            < &nbsp;Searched cpemail: *${data.cpemail}*&nbsp; > <br/>`
            
            
            document.getElementById('searchResult').innerHTML = searchResult;
            alert('Your search request is sent !');
        });
        } else {
        alert('Error in searching. Please try later.');
        }
        
    });
    })