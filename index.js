const cartButton = document.getElementById('cartBtn');
const input = document.getElementById('quantityInput');
const focusState =  document.getElementById('focusState');
let slideIndex = 1;
showSlides(slideIndex);
let item;

class PurchaseOrder {
    constructor(name, price, quantity){
        this.name = name;
        this.price = price;
        this.quantity = quantity;     
    }

    totalPrice() {
        const itemPrice = this.price.replace(/[^0-9.-]/g, '');
        return `$${(itemPrice * this.quantity).toFixed(2)}`
    }
}

function plusSlides(slideDirection) {
    showSlides(slideIndex += slideDirection);
}

function currentSlide(currentSlide) {
    showSlides(slideIndex = currentSlide);
}

function showSlides(currentSlide) {
    const isExpanded = document.getElementById('carosuelExpanded').classList.contains('hidden') ? '' : 'expanded-';
    let slides = document.getElementsByClassName(`${isExpanded}slideImg`);
    let thumbnail = document.getElementsByClassName(`${isExpanded}image-thumbnail`);
    
    console.log(slides, thumbnail)
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

function addItem(){
    const itemQuanity = input.value;
    if(itemQuanity <= 0) return;
    const itemName = document.getElementById('itemName').textContent;
    const itemPrice = document.getElementById('itemPrice').textContent;
    item = new PurchaseOrder(itemName, itemPrice, itemQuanity)
    addToCart(item);
}



const cartContent = {
    itemTitleElement: document.getElementById('itemTitle'),
    priceElement: document.getElementById('price'),
    totalPriceElement: document.getElementById('totalPrice'),
    cartQuantityElement: document.getElementById('cartQuantity')
}
function deleteFromCart() {
    item = null;
    for (const key in cartContent) {
        cartContent[key].textContent = ''
    }
    updateCardUi(item);
}

function addToCart() {
    cartContent.itemTitleElement.textContent = item.name;
    cartContent.priceElement.textContent = `${item.price} x ${item.quantity}`;
    cartContent.totalPriceElement.textContent = item.totalPrice();
    cartContent.cartQuantityElement.textContent = item.quantity;
    updateCardUi();
}
cartButton.addEventListener('click', () => {
        document.getElementById('cart').classList.toggle('hidden');
        updateCardUi();
});

function updateCardUi(item) {
    const isEmpty = !document.getElementById('itemTitle').textContent.trim() || item === null;
    const cardContent = document.getElementById('cardContent');
    const toggleHideElements = {
        checkoutBtnElement: document.getElementById('checkoutBtn'),
        emptyCartElement: document.getElementById('emptyCart'),
        cartQuantityElement:  document.getElementById('cartQuantity'),
        cartBtnElement: document.getElementById('cartBtn')
    }
    function toggleHidden(elements, hide = true) {
        elements.forEach(el => el.classList.toggle('hidden', hide));
    }
    toggleHidden([...cardContent.children], isEmpty);
    toggleHideElements.checkoutBtnElement.classList.toggle('hidden', isEmpty);
    toggleHideElements.emptyCartElement.classList.toggle('hidden', !isEmpty);
    toggleHideElements.cartQuantityElement.classList.toggle('hidden', isEmpty);
    toggleHideElements.cartBtnElement.classList.toggle('active', !isEmpty);
}

function navMenu(menuStatus){
    const closeMenuButton = document.getElementById('menuClose')
    const navMenu = document.getElementById('navMenu')
    navMenu.classList.toggle('nav-expanded', menuStatus);
    focusState.classList.toggle('hidden', !menuStatus)
    closeMenuButton.classList.toggle('hidden', !navMenu.classList.contains('nav-expanded'));
    document.body.style.overflow = menuStatus ? 'hidden' : 'visbility';
}

document.querySelector('.main-image').addEventListener('click', () => expandedImage());

function expandedImage(expandedStatus) {
    if(window.innerWidth < 1024) return;
    document.getElementById('carosuelExpanded').classList.toggle('hidden', expandedStatus)
    focusState.classList.toggle('hidden', expandedStatus);
    showSlides(slideIndex);
}

focusState.addEventListener('click', () => {
    navMenu(false);
    expandedImage(true);
});


