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

// Handle checkbox show hide

const email_input = document.getElementById('enquiryEmail')
const id_input =  document.getElementById('enquiryId')
const name_input = document.getElementById('enquiryName')
const subject_input =  document.getElementById('enquirySubject')

const checkbox = document.querySelectorAll('input[type="checkbox"]');

checkbox.forEach( boxes => {
    boxes.addEventListener('change', checkIfchecked);
})



function checkIfchecked (){
    const email_ckbox = document.getElementById('enquiry-search-email')
    const id_ckbox =  document.getElementById('enquiry-search-id')
    const name_ckbox = document.getElementById('enquiry-search-ctname')
    const subject_ckbox =  document.getElementById('enquiry-search-subject')

    
    email_input.classList.toggle('hidden' , !email_ckbox.checked);
    id_input.classList.toggle('hidden' , !id_ckbox.checked);
    name_input.classList.toggle('hidden', !name_ckbox.checked);
    subject_input.classList.toggle('hidden', !subject_ckbox.checked);
}

//handle submit 

checkbox.forEach( boxes => {
    boxes.addEventListener('change',buttonShow);
})

function buttonShow () {

    const submitBtn = document.querySelector('button[name="search-submit"]');

    const email_ckbox = document.getElementById('enquiry-search-email')
    const id_ckbox =  document.getElementById('enquiry-search-id')
    const name_ckbox = document.getElementById('enquiry-search-ctname')
    const subject_ckbox =  document.getElementById('enquiry-search-subject')

    if (email_ckbox.checked || id_ckbox.checked || name_ckbox.checked || subject_ckbox.checked) {
        submitBtn.classList.remove('hidden');
    } else {
        submitBtn.classList.add('hidden');
    }
    }
