// Update timestamp with current time in milliseconds
function updateTimestamp() {
  const timestampElement = document.querySelector('[data-testid="test-user-time"]');
  if (timestampElement) {
    const now = Date.now();
    timestampElement.textContent = now;
    timestampElement.setAttribute('datetime', new Date(now).toISOString());
  }
}

// Initialize timestamp on load
updateTimestamp();

// Optional: Update timestamp every second to show it's dynamic
// Uncomment the line below if you want live updates
// setInterval(updateTimestamp, 1000);

// Handle potential image upload (if you want to add this feature)
// This is optional but demonstrates handling user-uploaded avatars
function handleImageUpload() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.style.display = 'none';
  
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const avatarImg = document.querySelector('[data-testid="test-user-avatar"]');
        if (avatarImg) {
          avatarImg.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  });
  
  document.body.appendChild(input);
  
  // Optional: Add click handler to avatar to trigger upload
  const avatar = document.querySelector('[data-testid="test-user-avatar"]');
  if (avatar) {
    avatar.style.cursor = 'pointer';
    avatar.addEventListener('click', () => input.click());
    avatar.setAttribute('title', 'Click to change avatar');
  }
}

// Uncomment to enable image upload feature
// handleImageUpload();

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
  // Allow Escape key to blur focused element
  if (e.key === 'Escape') {
    document.activeElement.blur();
  }
});

// Add visual feedback for keyboard navigation
let keyboardNavigation = false;
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    keyboardNavigation = true;
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  keyboardNavigation = false;
  document.body.classList.remove('keyboard-nav');
});

// Log component load for debugging
console.log('Profile Card Component Loaded');
console.log('All data-testid attributes:', 
  Array.from(document.querySelectorAll('[data-testid]'))
    .map(el => el.getAttribute('data-testid'))
);