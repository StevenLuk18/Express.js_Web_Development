document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enquiry-search');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
        }
    
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        const response = await fetch('/cms-admin-api-enquiry/enquirySearch', {
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
            < &nbsp;Searched ctemail: *${data.ctemail}*&nbsp; > <br/> 
            < &nbsp;Searched ctname: *${data.ctname}*&nbsp; > <br/>
            < &nbsp;Searched ctdate: *${data.ctdate}*&nbsp; > <br/>
            < &nbsp;Searched ctsubject: *${data.ctsubject}*&nbsp; > <br/>
            < &nbsp;Searched ctmessage: *${data.ctmessage}*&nbsp; > <br/>`
            
            
            document.getElementById('searchResult').innerHTML = searchResult;
            alert('Your search request is sent !');
        });
        } else {
        alert('Error in searching. Please try later.');
        }
        
    });
    })