// Form Validation
// HTML: <form id="regForm">
//   <input id="name" placeholder="Name" required>
//   <input id="email" placeholder="Email" type="email">
//   <input id="password" placeholder="Password" type="password">
//   <input id="confirm" placeholder="Confirm Password" type="password">
//   <button type="submit">Register</button>
// </form>
// <div id="errorMessages"></div>

const form = document.getElementById('regForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const errorDiv = document.getElementById('errorMessages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errors = [];
    
    if (nameInput.value.trim() === '') errors.push('Name is required');
    
    const email = emailInput.value.trim();
    if (email === '') errors.push('Email is required');
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Invalid email format');
    
    const pwd = passwordInput.value;
    if (pwd.length < 6) errors.push('Password must be at least 6 characters');
    if (pwd !== confirmInput.value) errors.push('Passwords do not match');
    
    if (errors.length > 0) {
        errorDiv.innerHTML = errors.map(e => `<p style="color:red">${e}</p>`).join('');
    } else {
        errorDiv.innerHTML = '<p style="color:green">Form submitted successfully!</p>';
        // form.submit(); // uncomment to actually submit
    }
});
