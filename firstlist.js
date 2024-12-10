document.addEventListener('DOMContentLoaded', () => {
    const cartItemsDisplay = document.getElementById('cart-items-display');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    if (cartItems.length === 0) {
      cartItemsDisplay.innerHTML = '<p>Your cart is empty.</p>';
    } else {

      cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item-display');
        cartItemDiv.innerHTML = `
          <p><strong>${item.name}</strong></p>
          <p>Price: ₹${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Total: ₹${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsDisplay.appendChild(cartItemDiv);
      });
    }
  });

document.addEventListener('DOMContentLoaded', () => {
  const listTitle = document.getElementById('list-title');
  const shoppingListBody = document.getElementById('shopping-list-body');
  const totalCostDiv = document.getElementById('total-cost');


  const listName = localStorage.getItem('listName') || 'My Shopping List';
  listTitle.textContent = listName;
  let groceryList = JSON.parse(localStorage.getItem('cartItems')) || [];
  let totalCost = parseFloat(localStorage.getItem('totalCost')) || 0;
  function renderTable() {
      shoppingListBody.innerHTML = ''; 
      if (groceryList.length === 0) {
          shoppingListBody.innerHTML = `<tr><td colspan="5">No items in your list.</td></tr>`;
          totalCostDiv.textContent = '';
      } else {
          groceryList.forEach((item, index) => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${item.name}</td>
                  <td>₹${item.price}</td>
                  <td>${item.quantity}</td>
                  <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                  <td class="delete-column">
                      <button class="delete-btn" data-index="${index}">Delete</button>
                  </td>
              `;
              shoppingListBody.appendChild(row);
          });
          totalCostDiv.textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;
      }
  }
  renderTable();

  shoppingListBody.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
          const index = event.target.getAttribute('data-index');
          const itemToRemove = groceryList[index];
          totalCost -= itemToRemove.price * itemToRemove.quantity;
          groceryList.splice(index, 1);

          localStorage.setItem('cartItems', JSON.stringify(groceryList));
          localStorage.setItem('totalCost', totalCost);

          renderTable();
      }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const storeSelector = document.getElementById('store-selector');
  const storeNavigationSection = document.getElementById('store-navigation');
  const canvas = document.getElementById('store-map');
  const ctx = canvas.getContext('2d');

  const storeLayouts = {
      store1: [
          { name: 'Dairy', x: 50, y: 50, width: 100, height: 200 },
          { name: 'Fruits', x: 200, y: 50, width: 100, height: 200 },
          { name: 'Beverages', x:350, y: 50, width: 100, height: 200 },
          { name: 'Snacks', x: 500, y: 50, width: 100, height: 200 },
          { name: 'Checkout', x: 700, y: 200, width: 100, height: 100 },
          { name: 'Entrance', x: 50, y: 300, width: 100, height: 50 },
          { name: 'Exit', x: 500, y: 300, width: 100, height: 50 },
      ],
      store2: [
          { name: 'Vegetables', x: 100, y: 100, width: 100, height: 60 },
          { name: 'Bakery', x: 250, y: 100, width: 100, height: 60 },
          { name: 'Frozen', x: 400, y: 100, width: 100, height: 60 },
          { name: 'Drinks', x: 550, y: 100, width: 100, height: 60 },
          { name: 'Checkout', x: 700, y: 300, width: 200, height: 50 },
      ],
  };

  /**
   * Renders the store map based on selected store.
   * @param {string} store - The selected store's key.
   */
  function renderStoreMap(store) {
      const layout = storeLayouts[store];

      if (!layout) return;

     
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      layout.forEach(zone => {
          
          ctx.fillStyle = '#87CEEB'; 
          ctx.fillRect(zone.x, zone.y, zone.width, zone.height);
          ctx.fillStyle = '#000'; 
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(zone.name, zone.x + zone.width / 2, zone.y + zone.height / 2 + 5);
      });

     
      ctx.strokeStyle = '#FF6347'; 
      ctx.lineWidth = 2;
      ctx.beginPath();

      layout.forEach((zone, index) => {
          if (index === 0) ctx.moveTo(zone.x + zone.width / 2, zone.y + zone.height / 2);
          else ctx.lineTo(zone.x + zone.width / 2, zone.y + zone.height / 2);
      });

      ctx.stroke();
  }


  storeSelector.addEventListener('change', (e) => {
      const selectedStore = e.target.value;

      if (selectedStore) {
          storeNavigationSection.style.display = 'block'; 
          renderStoreMap(selectedStore); 
      } else {
          storeNavigationSection.style.display = 'none'; 
      }
  });
});
