async function getBookList() {
  const API_URL =
    "https://www.googleapis.com/books/v1/users/109246547700680053772/bookshelves/1001/volumes";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();
    const bookList = data.items;
    return bookList;
  } catch (error) {
    console.log(error.message);
  }
}

getBookList().then((bookList) => {
  function showExcellentBookList() {
    let storybooksContainer = document.getElementById("storybooksContainer");

    for (let eachBook of bookList) {
      let bookCard = document.createElement("div");
      bookCard.classList.add("book");

      let bookLink = document.createElement("a");
      bookLink.href = `book.html?id=${eachBook.id}`;

      let bookImg = document.createElement("img");
      bookImg.src = eachBook.volumeInfo.imageLinks.thumbnail;

      bookCard.appendChild(bookLink);
      bookLink.appendChild(bookImg);

      storybooksContainer.appendChild(bookCard);
    }
  }

  showExcellentBookList();
});
