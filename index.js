let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(slideDirection) {
    showSlides(slideIndex += slideDirection);
}

function currentSlide(currentSlide) {
    showSlides(slideIndex = currentSlide);
}

function showSlides(currentSlide) {
    let slides = document.getElementsByClassName("slideImg");
    let thumbnail = document.getElementsByClassName("image-thumbnail");
    if(currentSlide > slides.length) slideIndex = 1;
    if(currentSlide < 1) slideIndex = slides.length;
    for(let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for(let i = 0; i < thumbnail.length; i++) {
            thumbnail[i].lastElementChild.style.opacity = 1;
            thumbnail[i].classList.remove("active");
    }
    slides[slideIndex-1].style.display = "block";
    thumbnail[slideIndex-1].classList.add("active")
    thumbnail[slideIndex-1].lastElementChild.style.opacity = 0.4;
}
