const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/cms-admin-api/logout', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      window.location.href = '/cms-admin-api'
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
});
