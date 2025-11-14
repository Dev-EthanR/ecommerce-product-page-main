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

function changeQauntity(delta) {
    const input = document.getElementById('quantityInput');
    let currentNumber = parseFloat(input.value);
    if(!currentNumber) currentNumber = 0;
    if(currentNumber + delta < 0) return;
    input.value =  currentNumber + delta;;
 
}

function limitNumberLength(inputElement) {
    const maxLength = 7;
    if (inputElement.value.length > maxLength) {
        inputElement.value = inputElement.value.slice(0, maxLength);
    }
}
