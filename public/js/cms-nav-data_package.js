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
    
        const response = await fetch('/cms-admin-api-package/packageSearch', {
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
            < &nbsp;Searched pkname: *${data.pkname}*&nbsp; > <br/> 
            < &nbsp;Searched pkdate: *${data.pkdate}*&nbsp; > <br/>
            < &nbsp;Searched pkcountry: *${data.pkcountry}*&nbsp; > <br/>
            < &nbsp;Searched pkdescription: *${data.pkdescription}*&nbsp; > <br/>
            < &nbsp;Searched pkcreatedAt: *${data.pkcreatedAt}*&nbsp; > <br/>
            < &nbsp;Searched pkprice: *${data.pkprice}*&nbsp; > <br/>
            < &nbsp;Searched pkduration: *${data.pkduration}*&nbsp; > <br/>
            < &nbsp;Searched pkinclusions: *${data.pkinclusions}*&nbsp; > <br/>
            < &nbsp;Searched pkavailability: *${data.pkavailability}*&nbsp; > <br/>
            < &nbsp;Searched pkjoinByDeadline: *${data.pkjoinByDeadline}*&nbsp; > <br/>
            < &nbsp;Searched pkhighlights: *${data.pkhighlights}*&nbsp; > <br/>`
            
            document.getElementById('searchResult').innerHTML = searchResult;
            alert('Your search request is sent !');
        });
        } else {
        alert('Error in searching. Please try later.');
        }
        
    });
    })

// handle checkbox change and show input field
    const packageIdInput = document.getElementById('packageSearchId')
    const packageNameInput = document.getElementById('packageSearchName')
    const packageCountryInput = document.getElementById('packageSearchCountry')

    const everyCheckbox = document.querySelectorAll('input[type="checkbox"]')

    everyCheckbox.forEach( boxes => {
        boxes.addEventListener('change', showHideInout)
    })

    function showHideInout() {
        const idCheckbox = document.getElementById('package-search-id')
        const nameCheckbox = document.getElementById('package-search-name')
        const countryCheckbox = document.getElementById('package-search-country')

        packageIdInput.classList.toggle('hidden' , !idCheckbox.checked) 
        packageNameInput.classList.toggle('hidden' ,  !nameCheckbox.checked)
        packageCountryInput.classList.toggle('hidden', !countryCheckbox.checked)

        
    }

//handle submit 

everyCheckbox.forEach( boxes => {
    boxes.addEventListener('change',buttonShow);
})

function buttonShow () {
    
    const submitBtn = document.querySelector('button[name="search-submit"]');

    const idCheckbox = document.getElementById('package-search-id')
    const nameCheckbox = document.getElementById('package-search-name')
    const countryCheckbox = document.getElementById('package-search-country')

    if (idCheckbox.checked || nameCheckbox.checked || countryCheckbox.checked) {
        submitBtn.classList.remove('hidden');
    } else {
        submitBtn.classList.add('hidden');
    }
    }
