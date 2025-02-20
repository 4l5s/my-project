// open & close cart 

var cart = document.querySelector('.cart');

function open_cart() {
    cart.classList.add("active")
}
function close_cart() {
    cart.classList.remove("active")
}

// open & close menu

var menu = document.querySelector('#menu');

function open_menu() {
    menu.classList.add("active")
}
function close_menu() {
    menu.classList.remove("active")
}

// change item image

let bigImage = document.querySelector("bigImg")

function ChangeItemImage(img) {
    bigImg.src = img
}

/* add items in cart */

var all_products_json;
var items_in_cart = document.querySelector(".items_in_cart");
let product_cart = JSON.parse(localStorage.getItem('cart')) || [];

window.onload = function() {
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
};

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

    let addToCartButtons = document.querySelectorAll(".fa-cart-plus");
    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].classList.remove("active");

        product_cart.forEach(product => {
            if (product.id == i) {
                addToCartButtons[i].classList.add("active");
            }
        });
    }
}

window.onload = getCartItems;

// back_to_top hj

let back_to_top_buttons = document.querySelectorAll(".back_to_top");

back_to_top_buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

function open_close_filter() {
    const filter = document.querySelector('.filter');
    if (filter) {
        filter.classList.toggle('active');
    } else {
        console.error('Filter element not found');
    }
}