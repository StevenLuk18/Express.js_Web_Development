// public/scriptenduser.js

fetch('/api/enduser')
  .then(response => response.json())
  .then(data => {
    const teamMembersContainer = document.querySelector('.team-members');

    data.forEach((member, index) => {
      const memberElement = document.createElement('div');
      memberElement.classList.add('col-lg-4', 'col-md-6', 'wow', 'fadeInUp');
      memberElement.setAttribute('data-wow-delay', `${index * 0.2}s`);

      memberElement.innerHTML = `
      <div class="team-item">
          <div class="overflow-hidden">
            <img class="img-fluid" src="${member.euimage}" alt="">
          </div>

          <div class="position-relative d-flex justify-content-center" style="margin-top: -19px;">
            <a class="btn btn-square mx-1" href="https://www.facebook.com"><i class="fab fa-facebook-f"></i></a>
            <a class="btn btn-square mx-1" href="https://www.twitter.com"><i class="fab fa-twitter"></i></a>
            <a class="btn btn-square mx-1" href="https://www.instagram.com"><i class="fab fa-instagram"></i></a>
          </div>

          <div class="text-center p-4">
            <h5 class="mb-0">${member.euname}</h5>
            <small>${member.euprofile}</small>
          </div>

      </div>
      `;

      /* teamMembersContainer.innerHTML(memberElement.innerHTML); */ 
      teamMembersContainer.appendChild(memberElement); 
    });
  }).catch((error) => {
    console.log('Error:', error)
  });