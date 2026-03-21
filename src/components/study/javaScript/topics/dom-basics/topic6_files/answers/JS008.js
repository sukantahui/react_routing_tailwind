// Simple Image Slider
// HTML: <div class="slider">
//   <img id="sliderImage" src="image1.jpg" alt="Image">
//   <p id="caption">Caption 1</p>
//   <button id="prevBtn">Prev</button>
//   <button id="nextBtn">Next</button>
// </div>

const images = [
    { src: 'image1.jpg', caption: 'Beautiful Sunset' },
    { src: 'image2.jpg', caption: 'Mountain View' },
    { src: 'image3.jpg', caption: 'Ocean Waves' }
];

let currentIndex = 0;
const imgElement = document.getElementById('sliderImage');
const captionElement = document.getElementById('caption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateSlider() {
    imgElement.src = images[currentIndex].src;
    captionElement.textContent = images[currentIndex].caption;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
});

updateSlider(); // initial
