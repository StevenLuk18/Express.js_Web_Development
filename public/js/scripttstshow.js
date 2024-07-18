// public/scripttstshow.js

fetch('/api/testimonial')
  .then((response) => response.json())
  .then((data) => {

    const testimonialCarousel = document.getElementById('testimonial-carousel');
    
    data.forEach((item, index) => {
      const testimonialItem = document.createElement('div');
      testimonialItem.className = 'testimonial-item bg-white text-center border p-4';

      const img = document.createElement('img');
      img.className = 'bg-white rounded-circle shadow p-1 mx-auto mb-3';
      img.src = item.mpimagepath;
      img.style.width = '80px';
      img.style.height = '80px';

      const h5 = document.createElement('h5');
      h5.className = 'mb-0';
      h5.textContent = item.mpname;

      const p1 = document.createElement('p');
      p1.textContent = item.tmcountry;

      const p2 = document.createElement('p');
      p2.textContent = item.tmdate;

      const p3 = document.createElement('p');
      p3.className = 'mb-0';
      p3.textContent = item.tmtest;

      testimonialItem.append(img, h5, p1, p2, p3); 
//      testimonialItem.appendChild(img);
//      testimonialItem.appendChild(h5);
//      testimonialItem.appendChild(p1);
//      testimonialItem.appendChild(p2);
//      testimonialItem.appendChild(p3); 

  testimonialCarousel.appendChild(testimonialItem);
          
    });
  })
  .catch((error) => {
    console.log('Error:', error);
  });