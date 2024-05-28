async function searchBook() {
  const bookInput = document.getElementById("bookInput").value;
  const resultsDiv = document.getElementById("results");
  const loadingSpinner = document.getElementById("loading");

  // Clear previous results and show the loading spinner
  resultsDiv.innerHTML = "";
  loadingSpinner.style.display = "block";

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookInput}`
    );
    const results = await response.json();

    loadingSpinner.style.display = "none";

    if (!results.items) {
      resultsDiv.innerHTML = `<p>No results found.</p>`;
      return;
    }

    results.items.forEach((item) => {
      const book = item.volumeInfo;
      const bookElement = document.createElement("div");
      bookElement.classList.add("book-item");
      bookElement.innerHTML = `
              <h3>${book.title}</h3>
              <p>Author: ${
                book.authors ? book.authors.join(", ") : "Unknown"
              }</p>
              <a href="${book.infoLink}" target="_blank">More info</a>
          `;
      resultsDiv.appendChild(bookElement);
    });
  } catch (error) {
    loadingSpinner.style.display = "none";
    resultsDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
  }
}
// Existing JavaScript code...

// Function to handle searching
async function searchBook() {
  const bookInput = document.getElementById("bookInput").value;
  // Rest of the code remains the same...
}

// Add event listener to input field
document
  .getElementById("bookInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      searchBook();
    }
  });
