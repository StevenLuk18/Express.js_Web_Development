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


// Handle checkbox show hide

const name_input = document.getElementById('companyName')
const email_input =  document.getElementById('companyEmail')
const tel_input = document.getElementById('companyTel')

const checkbox = document.querySelectorAll('input[type="checkbox"]');

checkbox.forEach( boxes => {
    boxes.addEventListener('change', checkIfchecked);
})



function checkIfchecked (){
    const name_ckbox = document.getElementById('company-search-name')
    const email_ckbox =  document.getElementById('company-search-email')
    const tel_ckbox = document.getElementById('company-search-tel')

    
    name_input.classList.toggle('hidden' , !name_ckbox.checked);
    email_input.classList.toggle('hidden' , !email_ckbox.checked);
    tel_input.classList.toggle('hidden', !tel_ckbox.checked);
}

//handle submit 

checkbox.forEach( boxes => {
    boxes.addEventListener('change',buttonShow);
})

function buttonShow () {

    const submitBtn = document.querySelector('button[name="search-submit"]');

    const name_ckbox = document.getElementById('company-search-name')
    const email_ckbox =  document.getElementById('company-search-email')
    const tel_ckbox = document.getElementById('company-search-tel')

    if (email_ckbox.checked || tel_ckbox.checked || name_ckbox.checked) {
        submitBtn.classList.remove('hidden');
    } else {
        submitBtn.classList.add('hidden');
    }
    }