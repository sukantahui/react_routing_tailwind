// Responsive Hamburger Menu
// HTML: <nav class="navbar">
//   <div class="hamburger">&#9776;</div>
//   <ul class="nav-links">
//     <li><a href="#">Home</a></li>
//     <li><a href="#">About</a></li>
//     <li><a href="#">Contact</a></li>
//   </ul>
// </nav>
// CSS: .nav-links { display: flex; } @media (max-width:768px){ .nav-links { display: none; } .nav-links.active { display: flex; } }

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
