const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/logout', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      window.location.href = '/'
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
});
