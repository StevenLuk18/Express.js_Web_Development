document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('package-search');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
        }
    
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        const response = await fetch('/cms-admin-api-company/packageSearch', {
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
            < &nbsp;Searched : *${data.cpname}*&nbsp; > <br/> 
            < &nbsp;Searched : *${data.cpadres}*&nbsp; > <br/>
            < &nbsp;Searched : *${data.cptel}*&nbsp; > <br/>
            < &nbsp;Searched : *${data.cpemail}*&nbsp; > <br/>`
            
            document.getElementById('searchResult').innerHTML = searchResult;
            alert('Your search request is sent !');
        });
        } else {
        alert('Error in searching. Please try later.');
        }
        
    });
    })