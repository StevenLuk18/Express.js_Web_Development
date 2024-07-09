// script.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('creatAC-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add arrays for checkbox groups
    data.favoriteCities = [];
    data.preferredTransport = [];

    // Get favorite cities
    document.querySelectorAll('input[type="checkbox"][name^="China"], input[type="checkbox"][name^="Japan"], input[type="checkbox"][name^="Korean"], input[type="checkbox"][name^="Taiwan"], input[type="checkbox"][name^="Europe"], input[type="checkbox"][name^="USA"], input[type="checkbox"][name^="England"], input[type="checkbox"][name^="Canada"], input[type="checkbox"][name^="Others"]').forEach(checkbox => {
      if (checkbox.checked) {
        data.favoriteCities.push(checkbox.value);
      }
    });

    // Get preferred transport
    document.querySelectorAll('input[type="checkbox"][name^="Airplan"], input[type="checkbox"][name^="Cruise"], input[type="checkbox"][name^="Train"], input[type="checkbox"][name^="highspeedrail"], input[type="checkbox"][name^="Others2"]').forEach(checkbox => {
      if (checkbox.checked) {
        data.preferredTransport.push(checkbox.value);
      }
    });

    try {
      const response = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Account created successfully!');
        form.reset();
      } else {
        alert('Error creating account. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
});