// Placeholder restaurant data
const restaurantsData = {
    "1": {
        "name": "Pizza Palace",
        "location": "123 Main St",
        "menu": [
            {"id": "101", "name": "Margherita Pizza", "price": 12.99},
            {"id": "102", "name": "Pepperoni Pizza", "price": 14.99},
            {"id": "103", "name": "Garlic Knots", "price": 5.99},
        ],
    },
    "2": {
        "name": "Burger Barn",
        "location": "456 Oak Ave",
        "menu": [
            {"id": "201", "name": "Classic Burger", "price": 9.99},
            {"id": "202", "name": "Cheese Burger", "price": 10.99},
            {"id": "203", "name": "Fries", "price": 3.99},
        ],
    },
    "3": {
        "name": "Sushi Spot",
        "location": "789 Pine Lane",
        "menu": [
            {"id": "301", "name": "California Roll", "price": 8.99},
            {"id": "302", "name": "Spicy Tuna Roll", "price": 10.99},
            {"id": "303", "name": "Edamame", "price": 4.99}
        ]
    }
};

function searchRestaurants(search_term) {
    const matchingRestaurants = [];
    for (const restaurantId in restaurantsData) {
        const restaurant = restaurantsData[restaurantId];
        if (restaurant.name.toLowerCase().includes(search_term.toLowerCase()) || restaurant.location.toLowerCase().includes(search_term.toLowerCase())) {
            matchingRestaurants.push({
                id: restaurantId,
                name: restaurant.name,
                location: restaurant.location,
            });
        }
    }
    return matchingRestaurants;
}

function getMenu(restaurantId) {
    return restaurantsData[restaurantId]?.menu || [];
}

function displayRestaurants(restaurants) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (restaurants.length === 0) {
        resultsContainer.innerHTML = "<p>No restaurants found.</p>";
        return;
    }

    const ul = document.createElement("ul");
    restaurants.forEach(restaurant => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#"; // Placeholder link
        a.textContent = `${restaurant.name} - ${restaurant.location}`;
        a.addEventListener("click", (event) => {
            event.preventDefault();
            displayMenu(restaurant.id);
        });
        li.appendChild(a);
        ul.appendChild(li);
    });
    resultsContainer.appendChild(ul);
}

function displayMenu(restaurantId) {
    const menu = getMenu(restaurantId);
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = ""; // Clear previous menu

    if (menu.length === 0) {
        menuContainer.innerHTML = "<p>Menu not available.</p>";
        return;
    }

    const ul = document.createElement("ul");
    menu.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name}: $${item.price}`;
        ul.appendChild(li);
    });
    menuContainer.appendChild(ul);
}

document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById("search-term").value;
    const restaurants = searchRestaurants(searchTerm);
    displayRestaurants(restaurants);
});
