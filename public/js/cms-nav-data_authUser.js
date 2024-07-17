fetch('/cms-admin-api-authUser/allRoles')
.then(response => response.json())
.then(data =>{
  let roleLists = '';
    data.forEach(roles => {
      roleLists += `<&nbsp;>${roles.sysopname}<&nbsp;>`;
    });
    document.getElementById('cms-allRoles').innerHTML = roleLists;
  })
  .catch(error => {
    console.error('Error fetching company data:', error)
  });


// Search users field fetch

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authUser-search');

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    if (!form.checkValidity()) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/cms-admin-api-authUser/sysopSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json().then(data => {
        const searchResult = 
        `< &nbsp;Searched sysopname: *${data.searchedName}*&nbsp; > <br/> 
        < &nbsp;Searched sysoppswd: *${data.searchedPw}*&nbsp; > <br/> 
        < &nbsp;Searched syslevel: *${data.searchedLevel}*&nbsp; >` ;

        document.getElementById('searchResult').innerHTML = searchResult;
        alert('Your search request is sent !');
      });
    } else {
      alert('Error in searching. Please try later.');
    }
    
  });
})


//Update users field fetch

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authUser-update');

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    if (!form.checkValidity()) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/cms-admin-api-authUser/sysopUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      return response.json().then(data => {
        const updateResult = 
        `< Updated sysopname: *${data.updatedName}* > <br/>
        < Updated sysoppswd: *${data.updatedPw}* > <br/> 
        < Updated syslevel: *${data.updatedLevel}* >`;

        document.getElementById('updateResult').innerHTML = updateResult;
        alert('Your update request is sended !');
      });
    } else {
      return response.json().then(error => {
        alert(error);
      });
    }})

  })

//
/* const updateNamefield = document.querySelector('input[name="updateName"]')
const updatePwfield = document.querySelector('input[name="updatePw"]') */ 
const updateLevelfield = document.querySelector('select[name="updateLevel"]')

/* const updateNameComfField = document.querySelector('input[name="updateNameComf"]');
const updatePwComfField = document.querySelector('input[name="updatePwComf"]'); */
const updateLevelComfField = document.querySelector('select[name="updateLevelComf"]');

/* updateNamefield.addEventListener('input',autoFillUpdateName)
updatePwfield.addEventListener('input',autoFillUpdatePw) */
updateLevelfield.addEventListener('change',autoFillUpdateLevel)

/* function autoFillUpdateName() {updateNameComfField.value = updateNamefield.value}
function autoFillUpdatePw() {updatePwComfField.value = updatePwfield.value} */
function autoFillUpdateLevel() {updateLevelComfField.value = updateLevelfield.value}

//Set detect add or delete action
const addordelActionPos = document.querySelector('select[name="addordelAction"]')
document.getElementById('addordelAutoShow').innerHTML = "What's your action today? (*Please select the action first* so as to vertify your action !!)" 
const defaultMsg = "What's your action today? (*Please select the action first* so as to vertify your action !!)"

//If detect change, show out the <h4> text
addordelActionPos.addEventListener('change', async () => {
  const addordelActionDect = document.querySelector('select[name="addordelAction"]').value
  document.getElementById('addordelAutoShow').innerHTML = addordelActionDect === 'add' ? 'Add User' : 'Delete User';
  if (addordelActionDect === 'none') {
    document.getElementById('addordelAutoShow').innerHTML = defaultMsg
  }
  
});


// Hide the button if select none
const addordelButtonPos = document.querySelector('button[type="submit"][name="addordel-submit"]');
const addordelActionSelect = document.querySelector('select[name="addordelAction"]');

addordelButtonPos.style.display = 'none'

addordelActionSelect.addEventListener('change', async () => {
  const addordelActionValue = addordelActionSelect.value;
  const addordelButton = document.querySelector('button[type="submit"][name="addordel-submit"]');

  if (addordelActionValue === 'none') {
    addordelButton.style.display = 'none';
  } else {
    addordelButton.style.display = 'inline';
  }
});


//Add/Del users field fetch

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('authUser-adddel');

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    if (!form.checkValidity()) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/cms-admin-api-authUser/sysopAddDel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      console.log(response)
      return response.json().then( async data => {

          if (data.addordelAction === "add"){
            await alert('Your add user request is sended !');
          } else {
            await alert('Your delete user request is sended !')
          }
          

        const addResult = 
        `< Your action: *${data.addordelAction}* > <br/>
        < Added sysopname: *${data.addordelName}* > <br/>
        < Added sysoppswd: *${data.addordelPw}* > <br/> 
        < Added syslevel: *${data.addordelLevel}* >`;

        const delResult = 
        `< Your action: *${data.addordelAction}* > <br/>
        < deleted sysopname: *${data.addordelName}* > <br/>
        < deleted sysoppswd: *${data.addordelPw}* > <br/> 
        < deleted syslevel: *${data.addordelLevel}* >`;

        if (data.addordelAction === "add"){
          document.getElementById('addordelResult').innerHTML = addResult;
        } else {
          document.getElementById('addordelResult').innerHTML = delResult;
        }


      });

    } else {

      return response.json().then(error => {
        alert(error);
        });

    }})

})