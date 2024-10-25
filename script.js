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

  function showMusicBooks() {
    let musicBookContainer = document.getElementById("music-books");

    for (let eachBook of bookList) {
      let bookCard = document.createElement("div");
      bookCard.classList.add("card");

      let bookImg = document.createElement("img");
      bookImg.src = eachBook.volumeInfo.imageLinks.thumbnail;

      let container = document.createElement("div");
      container.classList.add("container");
      
      let bookLink = document.createElement("a");
      bookLink.href = `book.html?id=${eachBook.id}`;
      
      let title = document.createElement("h3");
      title.textContent = eachBook.volumeInfo.title

      let author = document.createElement("p");
      author.classList.add("auteur");
      author.textContent = eachBook.volumeInfo.authors[0]

      let category = document.createElement("p");
      category.classList.add("time")
      category.textContent = eachBook.volumeInfo.categories;

      let mark = document.createElement("div");
      mark.classList.add("mark");

      let markImg = document.createElement("img");
      markImg.src = "src/img/mark.svg"

      mark.appendChild(markImg)

      let dots = document.createElement("div");
      dots.classList.add("dots");

      let dotsImg = document.createElement("img");
      dotsImg.src = "src/img/dots.svg"

      dots.appendChild(dotsImg)

      bookCard.appendChild(bookImg);
      bookCard.appendChild(container);
      container.appendChild(bookLink);
      container.appendChild(title)
      container.appendChild(author)
      container.appendChild(category)
      container.appendChild(mark)
      container.appendChild(dots)

      musicBookContainer.appendChild(bookCard);
    }
  }

  showMusicBooks()
});

async function getAllBooks(query) {
  const API_URL_SEARCH = "https://openlibrary.org/search.json?q=";

  try {
    const response = await fetch(
      API_URL_SEARCH + query +'&limit=40'
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    const bookFound = data.docs;
    console.log(bookFound)
    return bookFound;
  } catch (error) {
    console.log(error.message);
  }
}

const nameInput = document.querySelector("#param");
const form = document.querySelector("#searchForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (nameInput) {
    const searchName = nameInput.value;
    getAllBooks(searchName).then((bookFound) => {
      const resultDiv = document.getElementById("searchResult");
      resultDiv.innerHTML = "<h2>Results</h2>";
      bookFound.forEach((result) => {
        if (result.cover_i) {
          let cover = `https://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`
          resultDiv.innerHTML +=
            '<div class="book">' +
            '<a href="#">' +
            '<img src='+cover+' alt="book-cover" />' + 
            "</a>" +
            "</div>";
        }

      });
      nameInput.value = "";
      document.getElementById("search").style.display = "none";
    });
  }
});


function displayBooks(books) {
  const container = document.getElementById("data-container");
  const template = document.getElementById("book-template").content;

  books.forEach((book) => {
      const bookClone = template.cloneNode(true);

      const coverId = book.cover_i;
      bookClone.querySelector(".book-image").src = coverId
          ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
          : "https://via.placeholder.com/128x180?text=Pas+d'image";
      bookClone.querySelector(".book-title").textContent =
          book.title || "Titre non disponible";
      bookClone.querySelector(".book-description").textContent =
          book.first_publish_year
              ? `Première publication : ${book.first_publish_year}`
              : "Date de publication non disponible";
      bookClone.querySelector(".book-author").textContent = book.author_name
          ? `Auteur(s): ${book.author_name.join(", ")}`
          : "Auteur inconnu";

      container.appendChild(bookClone);
  });
}