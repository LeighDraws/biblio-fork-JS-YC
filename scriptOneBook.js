// récupérer params url
const query = window.location.search;
const urlParams = new URLSearchParams(query);
const paramsId = urlParams.get("id");

async function getOneBook(id) {
  const API_URL = `https://openlibrary.org${id}.json`;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();
    const oneBook = data;
    return oneBook;
  } catch (error) {
    console.log(error.message);
  }
}

async function getOneAuthor(id) {
  const API_URL_author = `https://openlibrary.org${id}.json`
  try {
    const res = await fetch(API_URL_author);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();
    const oneAuthor = data;
    console.log(oneAuthor)
    return oneAuthor;
  } catch (error) {
    console.log(error.message);
  }
}

getOneBook(paramsId).then((oneBook) => {
  const book = oneBook
  let cover = document.getElementById("cover");

  let resume = document.getElementById("resume");
  let summary = document.createElement("p");
  if(book.description.value){
    summary.textContent = book.description.value;
    resume.appendChild(summary);
  }
  

  let coverImg = document.createElement("img");
  coverImg.src = `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`

  cover.appendChild(coverImg);

  let blurredCover = document.getElementById("coverblur");
  let blurredImg = document.createElement("img");
  blurredImg.src = `https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`;

  blurredCover.appendChild(blurredImg);

  let titleContainer = document.getElementById("title");
  let title = document.createElement("h4");
  title.textContent = book.title;
  titleContainer.appendChild(title);

  let bookInfo = document.getElementById("book-info");

/*   getOneAuthor(book.authors[0].author.key).then((oneAuthor) => {
  let author = document.createElement("p");
  author.textContent = oneAuthor.personnal_name;
  author.classList.add("author");  
  console.log(oneAuthor.personnal_name)
  bookInfo.appendChild(author);
}) */

  let year = document.createElement("p");
  let date = book.created.value.split("-");
  let yearDate = date[0];
  year.textContent = yearDate;
  year.classList.add("year");

  let publisher = document.createElement("p");
  publisher.textContent = book.subjects[0];
  publisher.classList.add("edition");

  bookInfo.appendChild(year);
  bookInfo.appendChild(publisher);
});
