let reviewsArray = [
  {
    author: "Prince Sam",
    job: "Web Developer",
    info: "Prince is a skilled web developer with a great eye for clean,functional design and smooth user experience. He’s reliable,creative.",
    img: "greyreview.jpg",
  },
  {
    author: "Kelvin Afiti",
    job: "Backend Developer",
    info: "The app is a very good app. We can all confirm that among its counterparts it stands out",
    img: "kelvin_review_1.jpg",
  },
  {
    author: "Hillary Maya",
    job: "CyberSecurity",
    info: 'My comment oon it comes frrom the Cyber security field. This app is in one word "impenetrable"',
    img: "hillary_review2.jpg",
  },
  {
    author: "Stephen Parry",
    job: "DevOps Engineer",
    info: "Integration of this app with other dependencies is seamless almost like its a lighweight one",
    img: "person-1.jpeg",
  },
];

const addReviewBtn = document.querySelector(".add_a_review_button");
const firstContainer = document.querySelector(".container");
const reviewCard = document.querySelector(".review");
const personImage = document.querySelector("#person-img");
const personJob = document.querySelector("#job");
const personName = document.querySelector("#author");
const personReview = document.querySelector("#info");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const reviewForm = document.querySelector(".reviewForm");
const closeBtn = document.querySelector(".closeBtn");
const formActual = document.querySelector(".actual_form");
const formName = document.querySelector("#name");
const formImage = document.getElementById("image");
const formJob = document.querySelector(".job");
const formReview = document.getElementById("authorsreview");
let currentItem = 0;
let intervalId = null;
// Check localStorage first
const savedReviews = localStorage.getItem("reviews");
if (savedReviews) {
  reviewsArray = JSON.parse(savedReviews);
}

document.addEventListener("DOMContentLoaded", reviewsChange);
const fileInput = document.getElementById("image");
const fileChosen = document.getElementById("file-chosen");

function reviewsChange() {
  const item = reviewsArray[currentItem];
  personImage.src = item.img;
  personJob.textContent = item.job;
  personName.textContent = item.author;
  personReview.textContent = item.info;
  if (!intervalId) {
    intervalId = setInterval(() => {
      currentItem++;
      if (currentItem > reviewsArray.length - 1) {
        currentItem = 0;
      }
      reviewsChange();
    }, 5000);
  }
}

nextBtn.addEventListener("click", () => {
  currentItem++;
  if (currentItem > reviewsArray.length - 1) {
    currentItem = 0;
  }
  reviewsChange();
});

prevBtn.addEventListener("click", () => {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviewsArray.length - 1;
  }
  reviewsChange();
});

fileInput.addEventListener("change", function () {
  fileChosen.textContent = this.files[0]?.name || "No file chosen";
});

addReviewBtn.addEventListener("click", () => {
  firstContainer.style.display = "none";
  reviewForm.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  firstContainer.style.display = "block";
  reviewForm.style.display = "none";
});

formActual.addEventListener("submit", (event) => {
  event.preventDefault();

  let funcformName = formName.value.trim();
  let funcformJob = formJob.value.trim();
  let funcformReview = formReview.value.trim();

  // handle the image: if a file is selected, create a temporary URL
  let funcformImage = formImage.files[0]
    ? URL.createObjectURL(formImage.files[0])
    : "default.jpg";

  // build the object in same shape as reviewsArray
  const newReview = {
    author: funcformName,
    job: funcformJob,
    info: funcformReview,
    img: funcformImage,
  };

  // push to array
  reviewsArray.push(newReview);
  saveReviews();
  // optionally show the new review immediately
  currentItem = reviewsArray.length - 1;
  reviewsChange();

  // reset the form
  formActual.reset();
  fileChosen.textContent = "No file chosen";

  // switch back to main container
  reviewForm.style.display = "none";
  firstContainer.style.display = "block";
});

function saveReviews() {
  localStorage.setItem("reviews", JSON.stringify(reviewsArray));
}
