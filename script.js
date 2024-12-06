let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItem = document.querySelector('.cart-items-container');
let totalAmount = 0; // Variable to store the total amount

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

window.onload = () => {
    if (localStorage.getItem('cartItems')) {
        let cartContent = document.getElementById('cart-items');
        cartContent.innerHTML = localStorage.getItem('cartItems');

        totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

        let totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = `Total: ₱${Math.max(totalAmount, 0).toFixed(2)}`;
    }
};

function saveCartToLocalStorage() {
    let cartContent = document.getElementById('cart-items').innerHTML;
    localStorage.setItem('cartItems', cartContent);
    localStorage.setItem('totalAmount', Math.max(totalAmount, 0).toFixed(2));
}

function addToCart(productName, imagePath, price) {
    let cartContent = document.getElementById('cart-items');
    let totalPriceElement = document.getElementById('total-price');

    totalAmount += parseFloat(price.replace('₱', ''));

    totalPriceElement.textContent = `Total: ₱${Math.max(totalAmount, 0).toFixed(2)}`;

    let newCartItem = document.createElement('div');
    newCartItem.classList.add('cart-item');
    newCartItem.innerHTML = `
        <span class="fas fa-times" onclick="removeCartItem(this)"></span>
        <img src="${imagePath}" alt="">
        <div class="content">
            <h3>${productName}</h3>
            <div class="quantity">
                <button class="quantity-btn" onclick="updateQuantity(this, -1)">-</button>
                <span class="unit">1</span>
                <button class="quantity-btn" onclick="updateQuantity(this, 1)">+</button>
            </div>
            <div class="price">${price}</div>
        </div>
    `;
    cartContent.appendChild(newCartItem);

    saveCartToLocalStorage();
}

function updateQuantity(button, quantityChange) {
    let cartItem = button.closest('.cart-item');
    let unitElement = cartItem.querySelector('.unit');
    let priceElement = cartItem.querySelector('.price');

    let currentQuantity = parseInt(unitElement.textContent);
    let newQuantity = Math.max(currentQuantity + quantityChange, 1);

    unitElement.textContent = newQuantity;
    totalAmount += quantityChange * parseFloat(priceElement.textContent.replace('₱', ''));

    let totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Total: ₱${Math.max(totalAmount, 0).toFixed(2)}`;

    saveCartToLocalStorage();
}

function removeCartItem(removeButton) {
    let cartItem = removeButton.parentElement;
    let priceElement = cartItem.querySelector('.price');

    totalAmount -= parseFloat(priceElement.textContent.replace('₱', ''));

    let totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `Total: ₱${Math.max(totalAmount, 0).toFixed(2)}`;

    cartItem.remove();

    saveCartToLocalStorage();
}


document.getElementById('checkout-btn').onclick = function () {
    const url = `checkout1.html?total=${totalAmount}`;
    window.location.href = url;
}
