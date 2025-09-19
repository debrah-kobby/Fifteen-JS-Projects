const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initialiseSlide);

function initialiseSlide() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displayImage");
    intervalId = setInterval(nextSlide, 3000);
  } else {
  }
}
function showSlide(index) {
  // wrap index around (looping)
  if (index >= slides.length) {
    index = 0;
  } else if (index < 0) {
    index = slides.length - 1;
  }

  // update the global slideIndex
  slideIndex = index;
  slides.forEach((slide) => {
    slide.classList.remove("displayImage");
  });
  slides[slideIndex].classList.add("displayImage");
}
function prevSlide() {
  clearInterval(intervalId);
  slideIndex--;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}
