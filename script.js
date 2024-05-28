async function searchBook() {
  const bookInput = document.getElementById("bookInput").value;
  const resultsDiv = document.getElementById("results");
  const loadingSpinner = document.getElementById("loading");

  resultsDiv.innerHTML = "";
  loadingSpinner.style.display = "block";

  const response = await fetch(`/search?title=${bookInput}`);
  const results = await response.json();

  loadingSpinner.style.display = "none";

  if (results.error) {
    resultsDiv.innerHTML = `<p>${results.error}</p>`;
    return;
  }

  results.books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book-item");
    bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <a href="${book.link}" target="_blank">Buy this book</a>
        `;
    resultsDiv.appendChild(bookElement);
  });
}
