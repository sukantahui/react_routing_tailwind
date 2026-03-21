// Accordion Component
// HTML: <div class="accordion">
//   <div class="accordion-item">
//     <div class="accordion-header">Section 1</div>
//     <div class="accordion-content">Content 1...</div>
//   </div>
//   ... more items
// </div>

const headers = document.querySelectorAll('.accordion-header');
headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isActive = content.classList.contains('active');
        
        // Optional: close all other items
        document.querySelectorAll('.accordion-content').forEach(c => {
            if (c !== content) c.classList.remove('active');
        });
        
        // Toggle current
        content.classList.toggle('active');
    });
});
