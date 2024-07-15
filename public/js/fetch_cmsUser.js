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
        break;
        }
      
    
  
  
  })
  .catch(error => console.error('Error fetching company data:', error));


