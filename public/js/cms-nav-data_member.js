fetch('/cms-admin-api-member/allMbs')
.then(response => response.json())
.then(data => {
    let memberLists = '';
    data.forEach(members => {
    memberLists += `<&nbsp;>${members.mpname}<&nbsp;>`;
    });
    document.getElementById('cms-allMbs').innerHTML = memberLists;
  })
  .catch(error => {
    console.error('Error fetching company data:', error)
    });

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('member-search');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        
        if (!form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
        }
    
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        const response = await fetch('/cms-admin-api-member/memberSearch', {
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
            < &nbsp;Searched mpemail: *${data.mpemail}*&nbsp; > <br/> 
            < &nbsp;Searched mppswd: *${data.mppswd}*&nbsp; > <br/>
            < &nbsp;Searched mpname: *${data.mpname}*&nbsp; > <br/>
            < &nbsp;Searched mpusername: *${data.mpusername}*&nbsp; > <br/>
            < &nbsp;Searched mpgender: *${data.mpgender}*&nbsp; > <br/>
            < &nbsp;Searched mpjoindate: *${data.mpjoindate}*&nbsp; > <br/>
            < &nbsp;Searched mpchina: *${data.mpchina}*&nbsp; > <br/>
            < &nbsp;Searched mpjapan: *${data.mpjapan}*&nbsp; > <br/>
            < &nbsp;Searched mpkorean: *${data.mpkorean}*&nbsp; > <br/>
            < &nbsp;Searched mptaiwan: *${data.mptaiwan}*&nbsp; > <br/>
            < &nbsp;Searched mpeurope: *${data.mpeurope}*&nbsp; > <br/>
            < &nbsp;Searched mpusa: *${data.mpusa}*&nbsp; > <br/>
            < &nbsp;Searched mpengland: *${data.mpengland}*&nbsp; > <br/>
            < &nbsp;Searched mpcanada: *${data.mpcanada}*&nbsp; > <br/>
            < &nbsp;Searched mpcntyother: *${data.mpcntyother}*&nbsp; > <br/>
            < &nbsp;Searched mpcntyothdesc: *${data.mpcntyothdesc}*&nbsp; > <br/>
            < &nbsp;Searched mpairplan: *${data.mpairplan}*&nbsp; > <br/>
            < &nbsp;Searched mpcruise: *${data.mpcruise}*&nbsp; > <br/>
            < &nbsp;Searched mptrain: *${data.mptrain}*&nbsp; > <br/>
            < &nbsp;Searched mprail: *${data.mprail}*&nbsp; > <br/>
            < &nbsp;Searched mptranother: *${data.mptranother}*&nbsp; > <br/>
            < &nbsp;Searched mptranothdesc: *${data.mptranothdesc}*&nbsp; > <br/>
            < &nbsp;Searched mpimagepath: *${data.mpimagepath}*&nbsp; > >`
            
            document.getElementById('searchResult').innerHTML = searchResult;
            alert('Your search request is sent !');
        });
        } else {
        alert('Error in searching. Please try later.');
        }
        
    });
    })