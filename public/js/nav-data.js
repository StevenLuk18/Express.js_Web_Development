// nav-data.js

// get the company information from mongodb collection --> company
// preset the data content for system testing  
// const companyAddress = "My Company address"
// const companyTel = "123-456-7890";
// const companyEmail = "info@mycompany.com";

fetch('/api/company')
  .then(response => response.json())
  .then(data => {
    // Update the HTML elements with the company data
    document.getElementById('company-address').textContent = data.cpadres;
    document.getElementById('company-tel').textContent = data.cptel;
    document.getElementById('company-email').textContent = data.cpemail;
    //document.getElementById('company-address').textContent = companyAddress;
    //document.getElementById('company-tel').textContent = companyTel;
    //document.getElementById('company-email').textContent = companyEmail;
  })
  .catch(error => console.error('Error fetching company data:', error));


//  get the end user information from mongodb collection --> enduser for about us
fetch('/api/enduser')
  .then(response => response.json())
  .then(data => {
    // Update the HTML elements with the about us (end user) data
    document.getElementById('enduser-euname').textContent = data.euname;
    document.getElementById('enduser-euprofile').textContent = data.euprofile;
    document.getElementById('enduser-euimage').textContent = data.euimage;
  })
  .catch(error => console.error('Error fetching end user data:', error));

//  get the member information from mongodb collection --> member information 
fetch('/api/member')
  .then(response => response.json())
  .then(data => {
    // Update the HTML elements with the member information (member) data
    document.getElementById('member-email').textContent = data.mpemail;
    document.getElementById('member-pswd').textContent = data.mppswd;
    document.getElementById('member-name').textContent = data.mpname;
    document.getElementById('member-username').textContent = data.mpusername;
    document.getElementById('member-gender').textContent = data.fgender;
    document.getElementById('member-gender').textContent = data.mgender;
    document.getElementById('member-china').textContent = data.mpchina;
    document.getElementById('member-japan').textContent = data.mpjapan;
    document.getElementById('member-korean').textContent = data.mpkorean;
    document.getElementById('member-taiwan').textContent = data.mptaiwan;
    document.getElementById('member-europe').textContent = data.mpeurope;
    document.getElementById('member-usa').textContent = data.mpusa;
    document.getElementById('member-england').textContent = data.mpengland;
    document.getElementById('member-canada').textContent = data.mpcanada;
    document.getElementById('member-cntoth').textContent = data.mpcntoth;
    document.getElementById('member-cntotd').textContent = data.mpcntotd;
    document.getElementById('member-airplan').textContent = data.mpairplan;
    document.getElementById('member-cruise').textContent = data.mpcruise;
    document.getElementById('member-train').textContent = data.mptrain;
    document.getElementById('member-rail').textContent = data.mprail;
    document.getElementById('member-tranoth').textContent = data.mptranoth;
    document.getElementById('member-tranotd').textContent = data.mptranotd;
    document.getElementById('member-imagepath').textContent = data.mpimagepath;
    document.getElementById('member-joindate').textContent = data.mpjoindate;




  })
  .catch(error => console.error('Error fetching end user data:', error));  

  //  get the member information from mongodb collection --> member's testimonial 
fetch('/api/testimonial')
.then(response => response.json())
.then(data => {
  // Update the HTML elements with the member's testimonial (testimonial) data
  document.getElementById('testimonial-tmname').textContent = data.tmname;
  document.getElementById('testimonial-tmdate').textContent = data.tmdate;
  document.getElementById('testimonial-tmtest').textContent = data.tmtest;
})
.catch(error => console.error('Error fetching end user data:', error));  