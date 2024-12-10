document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalCostDisplay = document.getElementById('total-cost');
  const resetBtn = document.querySelector('.reset-btn');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let totalCost = 0;

  const updateCart = () => {
      cartItemsContainer.innerHTML = '';
      totalCost = 0;

      cartItems.forEach((item, index) => {
          totalCost += item.price * item.quantity;

          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';

          cartItem.innerHTML = `
              <span>${item.name}</span>
              <span>₹${item.price} x ${item.quantity}</span>
              <div class="quantity-controls">
                  <button data-index="${index}" class="increase">+</button>
                  <button data-index="${index}" class="decrease">-</button>
                  <button data-index="${index}" class="delete">🗑️</button>
              </div>
          `;

          cartItemsContainer.appendChild(cartItem);
      });

      totalCostDisplay.textContent = totalCost.toFixed(2);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  cartItemsContainer.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      if (e.target.classList.contains('increase')) {
          cartItems[index].quantity++;
      } else if (e.target.classList.contains('decrease')) {
          if (cartItems[index].quantity > 1) {
              cartItems[index].quantity--;
          }
      } else if (e.target.classList.contains('delete')) {
          cartItems.splice(index, 1);
      }
      updateCart();
  });

  updateCart();
  resetBtn.addEventListener('click', () => {
    
    localStorage.removeItem('cartItems');
    localStorage.removeItem('itemCount');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('budget');
    itemCount = 0;
    totalCost = 0;
    budgetRemaining = 0; 
    itemCountDisplay.textContent = itemCount;
    budgetRemainingDisplay.textContent = `₹${budgetRemaining.toFixed(2)}`;

    footer.style.display = 'none'
});
});

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalCostDisplay = document.getElementById('total-cost');
    const resetBtn = document.querySelector('.reset-btn');
    const finishBtn = document.getElementById('Finish');  
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalCost = 0;
  
    const updateCart = () => {
      cartItemsContainer.innerHTML = '';
      totalCost = 0;
  
      cartItems.forEach((item, index) => {
        totalCost += item.price * item.quantity;
  
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
  
        cartItem.innerHTML = `
          <span>${item.name}</span>
          <span>₹${item.price} x ${item.quantity}</span>
          <div class="quantity-controls">
            <button data-index="${index}" class="increase">+</button>
            <button data-index="${index}" class="decrease">-</button>
            <button data-index="${index}" class="delete">🗑️</button>
          </div>
        `;
  
        cartItemsContainer.appendChild(cartItem);
      });
  
      totalCostDisplay.textContent = totalCost.toFixed(2);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };
  
    cartItemsContainer.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      if (e.target.classList.contains('increase')) {
        cartItems[index].quantity++;
      } else if (e.target.classList.contains('decrease')) {
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity--;
        }
      } else if (e.target.classList.contains('delete')) {
        cartItems.splice(index, 1);
      }
      updateCart();
    });
  
    
    finishBtn.addEventListener('click', () => {
 
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
      if (storedCartItems.length > 0) {
        
        alert('Your cart has been saved locally!');
        
      } else {
        alert('Your cart is empty!');
      }
    });
  
    
    updateCart();
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('cartItems');
      localStorage.removeItem('itemCount');
      localStorage.removeItem('totalCost');
      localStorage.removeItem('budget');
  
      itemCount = 0;
      totalCost = 0;
      budgetRemaining = 0; 
      itemCountDisplay.textContent = itemCount;
      budgetRemainingDisplay.textContent = `₹${budgetRemaining.toFixed(2)}`;
  

      footer.style.display = 'none';
      
    });
  });
  document.getElementById('Finish').addEventListener('click', function() {
    window.location.href = 'landing.html';
});

  