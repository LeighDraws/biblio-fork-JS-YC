// récupérer params url
const query = window.location.search;
const urlParams = new URLSearchParams(query);
const paramsId = urlParams.get("id");
console.log(paramsId);

async function getOneBook(id) {
  const API_URL = `https://www.googleapis.com/books/v1/volumes?q=`;

  try {
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
  console.log("id " + oneBook.id);
  console.log("title " + oneBook.volumeInfo.title);
});
