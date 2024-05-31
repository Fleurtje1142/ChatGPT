const API_KEY = "YOUR_API_KEY"; // Replace 'YOUR_API_KEY' with your actual Google API key

// Cart functionality
const cart = [];

document
  .getElementById("searchButton")
  .addEventListener("click", performSearch);
document
  .getElementById("searchInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

document.getElementById("clearCartButton").addEventListener("click", clearCart);

function performSearch() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  document.querySelector(".loading-spinner").style.display = "block";
  document.getElementById("results").innerHTML = "";

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.items) {
        const books = data.items.map((item) => {
          const volumeInfo = item.volumeInfo;
          return {
            title: volumeInfo.title || "No Title",
            description: volumeInfo.description || "No Description",
            price:
              volumeInfo.saleInfo && volumeInfo.saleInfo.retailPrice
                ? `$${volumeInfo.saleInfo.retailPrice.amount}`
                : "Price not available",
            link: volumeInfo.infoLink,
            image: volumeInfo.imageLinks
              ? volumeInfo.imageLinks.thumbnail
              : "https://via.placeholder.com/150", // Use a placeholder image if thumbnail is not available
          };
        });
        displayResults(books);
      } else {
        document.getElementById("results").innerHTML =
          "<p>No results found</p>";
      }
      document.querySelector(".loading-spinner").style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.querySelector(".loading-spinner").style.display = "none";
    });
}

function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  results.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book-item";
    bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}" style="width: 100px; height: auto; float: left; margin-right: 10px;">
            <div style="overflow: hidden;">
                <h3>${book.title}</h3>
                <p>${book.description}</p>
                <p><strong>Price: ${book.price}</strong></p>
                <button class="addToCartButton" data-title="${book.title}" data-price="${book.price}">Add to Cart</button>
                <a href="${book.link}" target="_blank">Buy this book</a>
            </div>
            <div style="clear: both;"></div>
        `;
    resultsContainer.appendChild(bookItem);
  });

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll(".addToCartButton").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

function addToCart(event) {
  const title = event.target.dataset.title;
  const price = event.target.dataset.price;
  cart.push({ title, price });
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsElement = document.getElementById("cartItems");
  cartItemsElement.innerHTML = "";
  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.title} - ${item.price}`;
    cartItemsElement.appendChild(listItem);
  });
}

function clearCart() {
  cart.length = 0;
  updateCartDisplay();
}
