
// Get saved items from browser

let items = JSON.parse(localStorage.getItem("items")) || [

    {
        name: "Black Wallet",
        category: "Accessories",
        type: "Lost",
        location: "Library",
        email: "student@example.com",
        description: "Black leather wallet"
    },

    {
        name: "Water Bottle",
        category: "Other",
        type: "Found",
        location: "Canteen",
        email: "student@example.com",
        description: "Blue water bottle"
    }

];


// Display items

function displayItems() {

    let list = document.getElementById("itemList");

    let search = document.getElementById("search")
        .value.toLowerCase();

    let filter = document.getElementById("filter").value;

    list.innerHTML = "";

    let filteredItems = items.filter(function(item) {

        let matchesSearch =
            item.name.toLowerCase().includes(search) ||
            item.category.toLowerCase().includes(search) ||
            item.location.toLowerCase().includes(search);

        let matchesFilter =
            filter === "All" || item.type === filter;

        return matchesSearch && matchesFilter;

    });

    if (filteredItems.length === 0) {
        list.innerHTML = "<p>No items found.</p>";
        return;
    }

    filteredItems.forEach(function(item) {

        let originalIndex = items.indexOf(item);

        list.innerHTML += `
            <div class="item">

                <h3>${item.name}</h3>

                <p>Type:
                    <strong class="${item.type.toLowerCase()}">
                        ${item.type}
                    </strong>
                </p>

                <p>Category: ${item.category}</p>
                <p>Location: ${item.location}</p>
                <p>Description: ${item.description}</p>
                <p>Contact: ${item.email}</p>

                <button onclick="deleteItem(${originalIndex})"
                class="delete-btn">
                    Delete Report
                </button>

            </div>
        `;

    });

}


// Search and filter events

document.getElementById("search")
    .addEventListener("input", displayItems);

document.getElementById("filter")
    .addEventListener("change", displayItems);


// Submit report

document.getElementById("reportForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        let newItem = {

            name: document.getElementById("itemName").value,
            category: document.getElementById("category").value,
            type: document.getElementById("type").value,
            location: document.getElementById("location").value,
            email: document.getElementById("email").value,
            description: document.getElementById("description").value

        };

        items.push(newItem);

        localStorage.setItem("items", JSON.stringify(items));

        alert("Your report has been submitted!");

        document.getElementById("reportForm").reset();

        displayItems();

    });


// Delete report

function deleteItem(index) {

    items.splice(index, 1);

    localStorage.setItem("items", JSON.stringify(items));

    displayItems();

}


// Display items when website opens

displayItems();
