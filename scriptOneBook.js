// récupérer params url
const query = window.location.search;
const urlParams = new URLSearchParams(query);
const paramsId = urlParams.get("id");
console.log(paramsId);

async function getOneBook(id) {
  const API_URL = `https://www.googleapis.com/books/v1/volumes?q=`;

  try {
    console.log(API_URL+id)
    const res = await fetch(API_URL + id);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();
    const oneBook = data.items;
    return oneBook;
  } catch (error) {
    console.log(error.message);
  }
}

getOneBook(paramsId).then((oneBook) => {
  let book = undefined;
  oneBook.forEach(onlyOnebook => {
    if(onlyOnebook.id == paramsId){
      book = onlyOnebook
    }
  });

  let cover = document.getElementById("cover");

  let resume = document.getElementById("resume");
  let summary = document.createElement("p")
  summary.textContent = book.volumeInfo.description;

  resume.appendChild(summary);

  let coverImg = document.createElement("img");
  coverImg.src = book.volumeInfo.imageLinks.thumbnail;

  cover.appendChild(coverImg)

  let blurredCover = document.getElementById("coverblur");
  let blurredImg = document.createElement("img");
  blurredImg.src = book.volumeInfo.imageLinks.thumbnail;

  blurredCover.appendChild(blurredImg)

  let titleContainer = document.getElementById("title");
  let title = document.createElement("h4")
  title.textContent = book.volumeInfo.title;
  titleContainer.appendChild(title);

  let bookInfo = document.getElementById("book-info")

  let author = document.createElement("p")
  author.textContent = book.volumeInfo.authors[0];
  author.classList.add("author")

  let year = document.createElement("p");
  let yearDate = book.volumeInfo.publishedDate.split('-')
  year.textContent = yearDate[0];
  year.classList.add("year")

  let publisher = document.createElement("p")
  publisher.textContent = book.volumeInfo.publisher;
  publisher.classList.add("edition")

  bookInfo.appendChild(author)
  bookInfo.appendChild(year)
  bookInfo.appendChild(publisher)

});
