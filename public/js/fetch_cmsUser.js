fetch('/cms-admin-api/get-auth-user')
  .then(response => response.json())
  .then(data => {
    // Update the HTML elements with the company data
    document.getElementById('cms-username').textContent = data[1];
    
    const system_level = data[3] //a,s,o
    
    switch (system_level) {
      case 'A':
        /* document.getElementById('cms-system-level').textContent = 'Administrator'; */
        let admin_op = document.querySelectorAll('.authUser-op-a')
        if (admin_op) {
          admin_op.forEach((op) => {
          op.parentNode.removeChild(op);})}
        break;
      
      case 'S':
        let sup_op = document.querySelectorAll('.authUser-op-s')
        if (sup_op) {
          sup_op.forEach((op) => {
          op.parentNode.removeChild(op);})}

        let admin_op2 = document.querySelectorAll('.authUser-op-a')
        if (admin_op2) {
          admin_op2.forEach((op) => {
          op.parentNode.removeChild(op);})}

          let hideColl = document.querySelector('.dashboard-container.allColl')
          if (hideColl) {hideColl.classList.toggle('hidden')}
  
          let hideMbIdLabel = document.querySelector('label[for="member-search-id"]')
          let hideMbIdRadio = document.getElementById('member-search-id')
          if (hideMbIdLabel) {hideMbIdLabel.classList.toggle('hidden')}
          if (hideMbIdRadio) {hideMbIdRadio.classList.toggle('hidden')}
  
          let hideSubIdLabel = document.querySelector('label[for="subscription-search-id"]')
          let hideSubIdRadio = document.getElementById('subscription-search-id')
          if (hideSubIdLabel) {hideSubIdLabel.classList.toggle('hidden')}
          if (hideSubIdRadio) {hideSubIdRadio.classList.toggle('hidden')}
  
          let hideEnqIdLabel = document.querySelector('label[for="enquiry-search-id"]')
          let hideEnqIdRadio = document.getElementById('enquiry-search-id')
          if (hideEnqIdLabel) {hideEnqIdLabel.classList.toggle('hidden')}
          if (hideEnqIdRadio) {hideEnqIdRadio.classList.toggle('hidden')}
  
          let hidePkIdLabel = document.querySelector('label[for="package-search-id"]')
          let hidePkIdRadio = document.getElementById('package-search-id')
          if (hidePkIdLabel) {hidePkIdLabel.classList.toggle('hidden')}
          if (hidePkIdRadio) {hidePkIdRadio.classList.toggle('hidden')}
        
        break;
      
      case 'O':
        
        let admin_op3 = document.querySelectorAll('.authUser-op-a')
        if (admin_op3) {
          admin_op3.forEach((op) => {
          op.parentNode.removeChild(op);})}
        
        let sup_op2 = document.querySelectorAll('.authUser-op-s')
        if (sup_op2) {
          sup_op2.forEach((op) => {
          op.parentNode.removeChild(op);})}
        
        let op_op = document.querySelectorAll('.authUser-op-o')
        if (op_op) {
          op_op.forEach((op) => {
          op.parentNode.removeChild(op)})}

        let op_aside = document.getElementById('aside-authUser')
        if(op_aside) op_aside.style.display = 'none'

        let hideColl2 = document.querySelector('.dashboard-container.allColl')
        if (hideColl2) {hideColl.classList.toggle('hidden')}

        let hideMbIdLabel2 = document.querySelector('label[for="member-search-id"]')
        let hideMbIdRadio2 = document.getElementById('member-search-id')
        if (hideMbIdLabel2) {hideMbIdLabel.classList.toggle('hidden')}
        if (hideMbIdRadio2) {hideMbIdRadio.classList.toggle('hidden')}

        let hideSubIdLabel2 = document.querySelector('label[for="subscription-search-id"]')
        let hideSubIdRadio2 = document.getElementById('subscription-search-id')
        if (hideSubIdLabel2) {hideSubIdLabel.classList.toggle('hidden')}
        if (hideSubIdRadio2) {hideSubIdRadio.classList.toggle('hidden')}

        let hideEnqIdLabel2 = document.querySelector('label[for="enquiry-search-id"]')
        let hideEnqIdRadio2 = document.getElementById('enquiry-search-id')
        if (hideEnqIdLabel2) {hideEnqIdLabel.classList.toggle('hidden')}
        if (hideEnqIdRadio2) {hideEnqIdRadio.classList.toggle('hidden')}

        let hidePkIdLabel2 = document.querySelector('label[for="package-search-id"]')
        let hidePkIdRadio2 = document.getElementById('package-search-id')
        if (hidePkIdLabel2) {hidePkIdLabel.classList.toggle('hidden')}
        if (hidePkIdRadio2) {hidePkIdRadio.classList.toggle('hidden')}

        break;

        }

        

      
    
  
  
  })
  .catch(error => console.error('Error fetching company data:', error));


