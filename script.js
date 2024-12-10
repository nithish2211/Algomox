document.addEventListener('DOMContentLoaded', function () {
    
    const createButton = document.getElementById('create-button');
    if (createButton) {
        createButton.addEventListener('click', function () {
            
            window.location.href = 'index.html';
        });
    }

    const viewAllButton = document.getElementById('view-all');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function () {
           
            window.location.href = 'categ.html';
        });
    }
    const login = document.getElementById('login');
    if (login) {
        login.addEventListener('click', function () {
            
            window.location.href = 'landing.html';
        });
    }

    const signupLink = document.getElementById("signup-link");
    if (signupLink) {
        signupLink.addEventListener("click", function (event) {
            event.preventDefault(); 
            window.location.href = "signin.html"; 
        });
    }

    const signUpPageButton = document.getElementById("signup-button"); 
    if (signUpPageButton) {
        signUpPageButton.addEventListener("click", function (event) {
            event.preventDefault(); 
            window.location.href = "login.html"; 
        });
    }

    const loginLink = document.querySelector(".signup-text a"); 
    if (loginLink) {
        loginLink.addEventListener("click", function (event) {
            event.preventDefault(); 
            window.location.href = "login.html"; 
        });
    }
    const signinLink = document.querySelector(".signin-text a"); 
    if (signinLink) {
        signinLink.addEventListener("click", function (event) {
            event.preventDefault(); 
            window.location.href = "signin.html"; 
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    const setBudgetBtn = document.querySelector('.set-budget-btn');
    const budgetInput = document.getElementById('budget'); 
    const budgetDisplay = document.getElementById('budget-display');

    const footer = document.getElementById('cart-summary-footer');
    const itemCountDisplay = document.getElementById('item-count');
    const budgetRemainingDisplay = document.getElementById('budget-remaining');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let itemCount = 0;
    let totalCost = 0;
    let budgetRemaining = parseFloat(localStorage.getItem('budget-display')) || 0;

    updateBudgetDisplay(budgetRemaining);
    setBudgetBtn.addEventListener('click', () => {
        const budgetValue = parseFloat(budgetInput.value) || 0;
        if (budgetValue > 0) {
           
            localStorage.setItem('budget-display', budgetValue.toFixed(2));
            budgetRemaining = budgetValue;
            itemCount = 0;
            totalCost = 0;

          
            updateBudgetDisplay(budgetRemaining);
            resetFooter();
        } else {
            alert('Please enter a valid budget.');
        }
    });


    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const itemCost = parseFloat(button.getAttribute('data-price'));
            if (!itemCost || isNaN(itemCost)) {
                alert('Invalid item price!');
                return;
            }

            if (budgetRemaining >= itemCost) {
               
                itemCount++;
                totalCost += itemCost;
                budgetRemaining -= itemCost;

          
                itemCountDisplay.textContent = itemCount;
                budgetRemainingDisplay.textContent = budgetRemaining.toFixed(2);
                localStorage.setItem('budget-display', budgetRemaining.toFixed(2));
                footer.style.display = 'block';
            } else {
                alert('Insufficient budget!');
            }
        });
    });


    function updateBudgetDisplay(budget) {
        budgetDisplay.textContent = `₹${budget}`;
        if (budgetRemainingDisplay) {
            budgetRemainingDisplay.textContent = budget.toFixed(2);
        }
    }

  
    function resetFooter() {
        if (itemCountDisplay) {
            itemCountDisplay.textContent = itemCount;
        }
        if (footer) {
            footer.style.display = 'none';
        }
    }
});


  

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const suggestionsBox = document.getElementById('suggestions');

   
    const items = [
        "Apple", "Banana", "Cherry", "Date", "Eggplant", "Fig",
        "Grape", "Honeydew", "Iceberg Lettuce", "Jackfruit", "Kiwi",
        "Lemon", "Mango", "Nectarine", "Orange", "Papaya", "Quince",
        "Raspberry", "Strawberry", "Tomato", "Ugli Fruit", "Vanilla",
        "Watermelon", "Xigua", "Yam", "Zucchini"
    ];

  
    function debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    }

   
    const handleSearch = () => {
        const query = searchBar.value.toLowerCase().trim();
        suggestionsBox.innerHTML = ''; 
                if (query === '') return; 

        
        const filteredItems = items.filter(item => item.toLowerCase().includes(query));

        if (filteredItems.length === 0) {
           
            const noResults = document.createElement('div');
            noResults.textContent = 'No results found';
            noResults.className = 'no-results';
            suggestionsBox.appendChild(noResults);
        } else {
           
            filteredItems.forEach(item => {
                const suggestion = document.createElement('div');
                suggestion.textContent = item;
                suggestion.tabIndex = 0; 
                suggestion.setAttribute('role', 'option');
                suggestion.addEventListener('click', () => {
                    searchBar.value = item; 
                    suggestionsBox.innerHTML = ''; 
                });
                suggestion.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        searchBar.value = item; 
                        suggestionsBox.innerHTML = ''; 
                    }
                });
                suggestionsBox.appendChild(suggestion);
            });
        }
    };


   
    searchBar.addEventListener('input', debounce(handleSearch, 300));
});
document.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('cart-summary-footer');
    const itemCountDisplay = document.getElementById('item-count');
    const budgetRemainingDisplay = document.getElementById('budget-display');
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
        window.location.href = 'list.html';
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
