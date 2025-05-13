let slideIndex = 1;
let timeoutId = null;

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    const currentCounter = document.getElementById("current");
    
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active");
    }

    // Show current slide
    slides[slideIndex-1].classList.add("active");
    dots[slideIndex-1].classList.add("active");
    currentCounter.textContent = slideIndex;

    // Reset and start progress bar
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.animation = 'none';
    progressBar.offsetHeight; // Trigger reflow
    progressBar.style.animation = 'progress 5s linear';

    // Auto advance
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => changeSlide(1), 5000);
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    
    // Pause slideshow on hover
    const container = document.querySelector('.slideshow-container');
    container.addEventListener('mouseenter', () => clearTimeout(timeoutId));
    container.addEventListener('mouseleave', () => timeoutId = setTimeout(() => changeSlide(1), 5000));
});