fetch('js/items.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    
    const swiper_items_sale = document.getElementById("swiper_items_sale");
    const other_product_swiper = document.getElementById("other_product_swiper");
    const other_product_swiper2 = document.getElementById("other_product_swiper2");

    if (!swiper_items_sale) {
      console.error('Element with ID "swiper_items_sale" not found');
      return;
    }
    if (!other_product_swiper) {
      console.error('Element with ID "other_product_swiper" not found');
      return;
    }
    if (!other_product_swiper2) {
      console.error('Element with ID "other_product_swiper2" not found');
      return;
    }

    window.all_products_json = data;

    function displaySaleProducts(products) {
      let slides = [];
  
      const filteredProducts = products.filter(product => product.id >= 0 && product.id <= 6);
  
      filteredProducts.forEach(product => {
          if (product.old_price) {
              const percent_disc = Math.floor((product.old_price - product.price) / product.old_price * 100);
              slides.push(`
                  <div class="product swiper-slide">
                      <div class="icons">
                          <span><i onclick="addToCart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
                          <span><i class="fa-solid fa-heart"></i></span>
                          <span><i class="fa-solid fa-share"></i></span>
                      </div>
                      <span class="sale_present">%${percent_disc}</span>
                      <div class="img_product">
                          <img src="${product.img}" alt="">
                          <img class="img_hover" src="${product.img_hover}" alt="">
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
                          <p class="old_price">$${product.old_price}</p>
                      </div>
                  </div>
              `);
          }
      });
  
      if (slides.length < 3) {
          slides = slides.concat(slides);
      }
  
      swiper_items_sale.innerHTML = slides.join('');
  }

    function displayotherProducts1(products) {
      let slides = [];
      products.forEach(product => {
        if (product.id >= 7 && product.id <= 15) {
          slides.push(`
            <div class="product swiper-slide">
              <div class="icons">
                <span><i onclick="addToCart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
                <span><i class="fa-solid fa-heart"></i></span>
                <span><i class="fa-solid fa-share"></i></span>
              </div>
              <div class="img_product">
                <img src="${product.img}" alt="">
                <img class="img_hover" src="${product.img_hover}" alt="">
              </div>
              <h3 class="name_product"><a href="items.html?id=${product.id}">${product.name}</a></h3>
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
                <p><span>${product.price}</span></p>
              </div>
            </div>
          `);
        }
      });

      // Duplicate slides if not enough for loop mode
      if (slides.length < 3) {
        slides = slides.concat(slides);
      }

      other_product_swiper.innerHTML = slides.join('');
    }

    function displayotherProducts2(products) {
      let slides = [];
      products.forEach(product => {
        if (product.id >= 16 && product.id <= 23) {
          slides.push(`
            <div class="product swiper-slide">
              <div class="icons">
                <span><i onclick="addToCart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
                <span><i class="fa-solid fa-heart"></i></span>
                <span><i class="fa-solid fa-share"></i></span>
              </div>
              <div class="img_product">
                <img src="${product.img}" alt="">
                <img class="img_hover" src="${product.img_hover}" alt="">
              </div>
              <h3 class="name_product"><a href="items.html?id=${product.id}">${product.name}</a></h3>
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
                <p><span>${product.price}</span></p>
              </div>
            </div>
          `);
        }
      });

      // Duplicate slides if not enough for loop mode
      if (slides.length < 3) {
        slides = slides.concat(slides);
      }

      other_product_swiper2.innerHTML = slides.join('');
    }

    displaySaleProducts(data);
    displayotherProducts1(data);
    displayotherProducts2(data);

  })
  .catch(error => {
    console.error('Error loading products:', error);
  });