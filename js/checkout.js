// open & close cart 

var cart = document.querySelector('.cart');

function open_cart() {
    cart.classList.add("active")
}
function close_cart() {
    cart.classList.remove("active")
}

// عرض المنتجات في صفحة checkout
function displayCheckoutItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const countItemElement = document.querySelector('.count_item');
    const countItemCartElement = document.querySelector('.count_item_cart');
    const product_cart = JSON.parse(localStorage.getItem('cart')) || [];

    let total_price = 0;
    let itemsHTML = '';

    product_cart.forEach(product => {
        itemsHTML += `
            <div class="item_cart">
                <img src="${product.img}" alt="${product.name}">
                <div class="content">
                    <h4>${product.name}</h4>
                    <p class="price_cart">$${product.price}</p>
                </div>
            </div>
        `;
        total_price += product.price;
    });

    cartItemsContainer.innerHTML = itemsHTML;
    totalPriceElement.textContent = `$${total_price.toFixed(2)}`;
    countItemElement.textContent = product_cart.length;
    countItemCartElement.textContent = `(${product_cart.length} Item in Cart)`;
}

// عند تحميل الصفحة، عرض المنتجات في صفحة checkout
document.addEventListener('DOMContentLoaded', displayCheckoutItems);

var all_products_json;
var items_in_cart = document.querySelector(".items_in_cart");
let product_cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    if (!all_products_json) {
        fetch('js/items.json')
            .then(response => response.json())
            .then(data => {
                all_products_json = data;
                getCartItems();
            })
            .catch(error => console.error('Error loading products:', error));
    } else {
        getCartItems();
    }
});

function addToCart(id, btn) {
    if (all_products_json && all_products_json[id]) {
        product_cart.push(all_products_json[id]);
        btn.classList.add("active");

        localStorage.setItem('cart', JSON.stringify(product_cart));

        console.log(product_cart);
        getCartItems();
    } else {
        console.error('Product not found:', id);
    }
}

let count_item = document.querySelector('.count_item');
let count_item_cart = document.querySelector('.count_item_cart');
let price_cart_total = document.querySelector('.price_cart_total');
let Price_Cart_Head = document.querySelector('.Price_Cart_Head');

function getCartItems() {
    let total_price = 0;
    let items_c = "";

    for (let i = 0; i < product_cart.length; i++) {
        items_c += `
            <div class="item_cart">
                <img src="${product_cart[i].img}" alt="">
                <div class="content">
                    <h4>${product_cart[i].name}</h4>
                    <p class="price_cart">${product_cart[i].price}</p>
                </div>
                <button onClick="remove_from_cart(${i})" class="delete_item"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;
        total_price += product_cart[i].price;
    }

    items_in_cart.innerHTML = items_c;
    Price_Cart_Head.innerHTML = "$" + total_price;
    count_item.innerHTML = product_cart.length;
    count_item_cart.innerHTML = `(${product_cart.length} Item in Cart)`;
    price_cart_total.innerHTML = "$" + total_price;
}

function remove_from_cart(index) {
    product_cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(product_cart));

    getCartItems();
}

document.addEventListener('DOMContentLoaded', getCartItems);
