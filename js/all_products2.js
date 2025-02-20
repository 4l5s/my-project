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

    const filteredProducts = data.filter(product => product.id >= 12 && product.id <= 23);
    displayProducts(filteredProducts);
  })
  .catch(error => {
    console.error('Error loading products:', error);
  });
