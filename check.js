document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('cart-summary-footer');
    const itemCountDisplay = document.getElementById('item-count');
    const budgetRemainingDisplay = document.getElementById('budget-remaining');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const goToCartButton = document.getElementById('go-to-cart');
    const resetBtn = document.querySelector('.reset-btn');
    const setBudgetBtn = document.querySelector('.set-budget-btn');
    const budgetInput = document.getElementById('budget');
    let itemCount = parseInt(localStorage.getItem('itemCount')) || 0;
    let totalCost = parseFloat(localStorage.getItem('totalCost')) || 0;
    let budgetRemaining = parseFloat(localStorage.getItem('budget')) || 0;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    itemCountDisplay.textContent = itemCount;
    budgetRemainingDisplay.textContent = `₹${budgetRemaining.toFixed(2)}`;
    if (cartItems.length > 0) {
        footer.style.display = 'block';
    }
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));

            budgetRemaining = parseFloat(localStorage.getItem('budget')) || 0;

            if (budgetRemaining >= itemPrice) {
                itemCount++;
                totalCost += itemPrice;
                budgetRemaining -= itemPrice;

                const existingItem = cartItems.find(item => item.name === itemName);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
                }

                
                itemCountDisplay.textContent = itemCount;
                budgetRemainingDisplay.textContent = `₹${budgetRemaining.toFixed(2)}`;

                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                localStorage.setItem('itemCount', itemCount);
                localStorage.setItem('totalCost', totalCost.toFixed(2));
                localStorage.setItem('budget', budgetRemaining.toFixed(2));
                footer.style.display = 'block';
            } else {
                alert('Insufficient budget!');
            }
        });
    });

    goToCartButton.addEventListener('click', () => {
        window.location.replace('list.html');
    });

    setBudgetBtn.addEventListener('click', () => {
        const newBudget = parseFloat(budgetInput.value);
        if (!isNaN(newBudget) && newBudget > 0) {
            
            budgetRemaining = newBudget;
            localStorage.setItem('budget', budgetRemaining.toFixed(2));

           
            budgetRemainingDisplay.textContent = `₹${budgetRemaining.toFixed(2)}`;
        } else {
            alert('Please enter a valid budget amount.');
        }
    });
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

        alert('Cart and budget have been reset!');
    });
});
