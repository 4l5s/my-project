const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch('js/items.json')
  .then(response => response.json())
  .then(data => {
    window.all_products_json = data;
    const product = data.find(item => item.id == productId);

    if (product) {
      document.getElementById('productName').textContent = product.name;
      document.getElementById('productPrice').textContent = `$${product.price}`;
      
      if (product.old_price) {
        document.getElementById('oldPrice').textContent = `$${product.old_price}`;
        document.getElementById('oldPrice').style.display = 'block';
      } else {
        document.getElementById('oldPrice').style.display = 'none';
      }

      document.getElementById('availability').textContent = product.availability;
      document.getElementById('sku').textContent = product.sku;
      document.getElementById('description').textContent = product.description;
      document.getElementById('stockLeft').textContent = `Hurry Up! Only ${product.stock_left} products left in stock.`;

      document.getElementById('bigImg').src = product.images[0];

      const smImgsContainer = document.getElementById('smImgsContainer');
      smImgsContainer.innerHTML = '';
      product.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Product Image';
        img.onclick = () => ChangeItemImage(imgSrc);
        smImgsContainer.appendChild(img);
      });

    } else {
      console.error('Product not found');
    }
  });

function ChangeItemImage(src) {
  document.getElementById('bigImg').src = src;
}
