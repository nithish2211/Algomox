const searchBar = document.getElementById('search-bar');
const suggestionsBox = document.getElementById('suggestions');


const items = [
    "Apple", "Apricot", "Avocado", "Banana", "Blackberry", "Blueberry", 
    "Cantaloupe", "Cherry", "Coconut", "Cranberry", "Date", "Dragon Fruit", 
    "Durian", "Elderberry", "Fig", "Grape", "Grapefruit", "Guava", 
    "Honeydew", "Indian Fig Fruit", "Jackfruit", "Jujube", "Kiwi", 
    "Kumquat", "Lemon", "Lime", "Lychee", "Mango", "Mulberry", 
    "Nectarine", "Orange", "Papaya", "Passion Fruit", "Peach", 
    "Pear", "Pineapple", "Plum", "Pomegranate", "Raspberry", 
    "Red Currant", "Strawberry", "Tamarind", "Tangerine", "Tomato", 
    "Ugli Fruit", "Watermelon", "Xigua", "Yuzu",

    // Vegetables
    "Artichoke", "Arugula", "Asparagus", "Beet", "Bell Pepper", 
    "Bok Choy", "Broccoli", "Brussels Sprouts", "Cabbage", "Carrot", 
    "Cauliflower", "Celery", "Chard", "Collard Greens", "Corn", 
    "Cucumber", "Daikon Radish", "Eggplant", "Fennel", "Garlic", 
    "Ginger", "Green Beans", "Iceberg Lettuce", "Jalapeno", 
    "Kale", "Kohlrabi", "Leek", "Mushroom", "Okra", "Onion", 
    "Parsnip", "Pea", "Potato", "Pumpkin", "Radish", "Rutabaga", 
    "Spinach", "Squash", "Sweet Potato", "Turnip", "Yam", 
    "Zucchini",

    // Grains and Legumes
    "Barley", "Black Beans", "Chickpeas", "Kidney Beans", "Lentils", 
    "Quinoa", "Rice", "Soybeans", "Split Peas", "Wheat",

    // Dairy
    "Butter", "Cheese", "Cream", "Milk", "Yogurt",

    // Nuts and Seeds
    "Almonds", "Cashews", "Chia Seeds", "Flaxseeds", "Hazelnuts", 
    "Peanuts", "Pecans", "Pine Nuts", "Pumpkin Seeds", "Sesame Seeds", 
    "Sunflower Seeds", "Walnuts",

    // Herbs and Spices
    "Basil", "Cilantro", "Cinnamon", "Cloves", "Dill", "Mint", 
    "Oregano", "Parsley", "Rosemary", "Saffron", "Thyme", "Turmeric",

    // Beverages
    "Apple Juice", "Black Tea", "Coconut Water", "Coffee", "Green Tea", 
    "Lemonade", "Orange Juice", "Smoothie", "Soda", "Water",

    // Miscellaneous
    "Bagel", "Bread", "Chocolate", "Croissant", "Egg", "Honey", 
    "Jam", "Maple Syrup", "Pasta", "Popcorn", "Salt", "Sugar", 
    "Tofu", "Vinegar", "Waffles", "Yeast"
];


searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase().trim();
    suggestionsBox.innerHTML = ''; 

    if (query === '') {
        return; 
    }


    const filteredItems = items.filter(item => item.toLowerCase().includes(query));

    if (filteredItems.length === 0) {
        
        suggestionsBox.innerHTML = '<div class="no-results">No results found</div>';
    } else {
        
        filteredItems.forEach(item => {
            const suggestion = document.createElement('div');
            suggestion.textContent = item;
            suggestion.addEventListener('click', () => {
                searchBar.value = item; 
                suggestionsBox.innerHTML = ''; 
            });
            suggestionsBox.appendChild(suggestion);
        });
    }
});
