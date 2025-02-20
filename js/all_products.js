fetch('js/items.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const productsContainer = document.getElementById('products_dev');

    if (!productsContainer) {
      console.error('Element with ID "products_dev" not found');
      return;
    }

    function displayProducts(products) {
      let productsHTML = '';
      products.forEach(product => {
        const percent_disc = product.old_price ? Math.floor((product.old_price - product.price) / product.old_price * 100) : null;
        productsHTML += `
          <div class="product">
            ${percent_disc ? `<span class="sale_present">%${percent_disc}</span>` : ''}
            <div class="img_product">
              <img src="${product.img}" alt="${product.name}">
              <img class="img_hover" src="${product.img_hover}" alt="${product.name}">
            </div>
            <h3 class="name_product">
              <a href="items.html?id=${product.id}">${product.name}</a>
            </h3>
            <div class="stars">
              ${[...Array(5)].map((_, i) => {
                const fullStars = Math.floor(product.rating);
                const halfStar = product.rating % 1 !== 0;
                if (i < fullStars) {
                  return '<i class="fa-solid fa-star"></i>';
                } else if (i === fullStars && halfStar) {
                  return '<i class="fa-solid fa-star-half-alt"></i>';
                } else {
                  return '<i class="fa-solid fa-star-o"></i>';
                }
              }).join('')}
            </div>
            <div class="price">
              <p><span>$${product.price}</span></p>
              ${product.old_price ? `<p class="old_price">$${product.old_price}</p>` : ''}
            </div>
          </div>
        `;
      });

      productsContainer.innerHTML = productsHTML;
    }

    const filteredProducts = data.filter(product => product.id >= 0 && product.id <= 11);
    displayProducts(filteredProducts);
  })
  .catch(error => {
    console.error('Error loading products:', error);
  });

// filter products

var all_products_json = []; // لتخزين جميع المنتجات
var all_products_div = document.getElementById("products_dev");

fetch('js/items.json')
  .then(response => response.json())
  .then(data => {
    all_products_json = data;
    // لا حاجة لاستدعاء displayProducts هنا مرة أخرى
  })
  .catch(error => console.error('Error loading products:', error));

// دالة لعرض المنتجات
function displayProducts(products) {
  if (!all_products_div) {
    console.error('Element with ID "products_dev" not found');
    return;
  }

  let productHTML = '';

  products.forEach(product => {
    const old_price_pargrahp = product.old_price ? ` <p class="old_price">$${product.old_price}</p>` : "";
    const percent_disc_div = product.old_price ? `  <span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : "";

    productHTML += `
      <div class="product swiper-slide">
        ${percent_disc_div}
        <div class="img_product">
          <img src="${product.img}" alt="">
          <img class="img_hover" src="${product.img_hover}" alt="">
        </div>
        <h3 class="name_product">
          <a href="items.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <div class="price">
          <p><span>$${product.price}</span></p>
          ${old_price_pargrahp}
        </div>
      </div>
    `;
  });

  all_products_div.innerHTML = productHTML;
}

// دالة التصفية حسب القسم
function filterProducts(category) {
  const filteredProducts = all_products_json.filter(product => product.category === category);
  displayProducts(filteredProducts);
}
