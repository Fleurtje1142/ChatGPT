const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/search", async (req, res) => {
  const title = req.query.title;
  if (!title) {
    return res.json({ error: "No title provided" });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${title}`
    );
    const data = await response.json();

    const books = data.items.map((item) => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors.join(", "),
      link: item.volumeInfo.infoLink,
    }));

    res.json({ books });
  } catch (error) {
    res.json({ error: "Error fetching book data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
