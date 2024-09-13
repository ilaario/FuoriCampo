let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let OnOff = 1;

/**
 * Displays the slide based on the provided index.
 * If `OnOff` is 1, it calculates the current index and applies CSS transformations to the slides.
 * It also toggles the 'active-dot' class for the current slide.
 *
 * @param {number} index - The index of the slide to display.
 */
function showSlide(index) {
    if(OnOff === 1){
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        slides.forEach((slide, i) => {
            if(OnOff === 1){
                const isCurrent = i === currentIndex;
                const transformValue = isCurrent ? 'scale(1)' : 'scale(0.8)';
                const widthValue = isCurrent ? '100%' : '80%';

                slide.style.transform = transformValue;
                slide.style.width = widthValue;
                dots[i].classList.toggle('active-dot', isCurrent);
            }
        });

        const translateValue = -currentIndex * 100 + '%';
        document.querySelector('.slider').style.transform = `translateX(${translateValue})`;
    }
}

/**
 * Displays the previous slide.
 * Decrements the current index and calls the `showSlide` function with the new index.
 */
function prevSlide(){
    showSlide(currentIndex - 1);
}

/**
 * Displays the next slide.
 * Increments the current index and calls the `showSlide` function with the new index.
 */
function nextSlide(){
    showSlide(currentIndex + 1);
}

/**
 * Displays the slide based on the provided index.
 * Calls the `showSlide` function with the provided index.
 *
 * @param {number} index - The index of the slide to display.
 */
function currentSlide(index){
    showSlide(index);
}

showSlide(currentIndex);
setInterval(nextSlide, 5000);

/**
 * Toggles the slide show on and off.
 * If `OnOff` is 1, it sets `OnOff` to 0, changes the button icon to 'play', and rotates the button 360 degrees.
 * If `OnOff` is not 1, it sets `OnOff` to 1, changes the button icon to 'pause', and rotates the button back to its initial position.
 */
function toggleSlideShow() {
    const button = document.querySelector('.fas'); // Select the button

    // Add a transition for the icon change
    button.style.transition = 'transform 0.2s ease';

    if (OnOff == 1) {
        OnOff = 0;
        button.classList.remove('fa-pause');
        button.classList.add('fa-play');
        // Rotation effect for the icon change
        button.style.transform = 'rotate(360deg)';
    } else {
        OnOff = 1;
        button.classList.remove('fa-play');
        button.classList.add('fa-pause');
        // Return to initial position
        button.style.transform = 'rotate(0deg)';
    }
}
