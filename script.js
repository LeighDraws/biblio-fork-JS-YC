async function getBookList() {
  const API_URL =
    "https://openlibrary.org/subjects/magic.json";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();
    const bookList = data.works;
    return bookList;
  } catch (error) {
    console.log(error.message);
  }
}

getBookList().then((bookList) => {

  console.log(bookList)
  function showExcellentBookList() {
    let storybooksContainer = document.getElementById("storybooksContainer");

    for (let eachBook of bookList) {
      let bookCard = document.createElement("div");
      bookCard.classList.add("book");

      let bookLink = document.createElement("a");
      bookLink.href = `book.html?id=${eachBook.key}`;

      let bookImg = document.createElement("img");
      eachBook.cover_id
      ? bookImg.src = `https://covers.openlibrary.org/b/id/${eachBook.cover_id}-M.jpg`
      : bookImg.src = "https://via.placeholder.com/128x180?text=Pas+d%27image"


      bookCard.appendChild(bookLink);
      bookLink.appendChild(bookImg);

      storybooksContainer.appendChild(bookCard);
    }
  }

  showExcellentBookList();
});

async function getBookCategory() {
  const API_URL =
    "https://openlibrary.org/subjects/fiction.json";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();
    const bookList = data.works;
    return bookList;
  } catch (error) {
    console.log(error.message);
  }
}

getBookCategory().then((bookList) => {

  function showMusicBooks() {
    let musicBookContainer = document.getElementById("music-books");
  
    for (let eachBook of bookList) {
      let bookCard = document.createElement("div");
      bookCard.classList.add("card");
  
      let bookImg = document.createElement("img");
      eachBook.cover_id
      ? bookImg.src = `https://covers.openlibrary.org/b/id/${eachBook.cover_id}-M.jpg`
      : bookImg.src = "https://via.placeholder.com/128x180?text=Pas+d%27image"
  
      let container = document.createElement("div");
      container.classList.add("container");
      
      let bookLink = document.createElement("a");
      bookLink.href = `book.html?id=${eachBook.key}`;
      
      let title = document.createElement("h3");
      title.textContent = eachBook.title
  
      let author = document.createElement("p");
      const firstAuthor = eachBook.authors[0]
      author.classList.add("auteur");
      author.textContent = firstAuthor.name;
  
      let category = document.createElement("p");
      category.classList.add("time")
      category.textContent = eachBook.subject[2];
  
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
      bookLink.appendChild(title)
      bookLink.appendChild(author)
      bookLink.appendChild(category)
      bookLink.appendChild(mark)
      bookLink.appendChild(dots)
  
      musicBookContainer.appendChild(bookCard);
    }
  }
  
  showMusicBooks()

})


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
            `<a href=book.html?id=${result.key}>`+
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


