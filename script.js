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


async function getAllBooks (query) {
    const API_URL_SEARCH = 'https://www.googleapis.com/books/v1/volumes?q=';

    try {
        const response = await fetch(API_URL_SEARCH+query+'&maxResults=40&orderBy=relevance');
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        const bookFound = data.items;
        return bookFound;
        
    } catch (error) {
        console.log(error.message);
    }
    }


    const nameInput = document.querySelector('#param');
    const form = document.querySelector('#searchForm');
            
    form.addEventListener('submit', (event) => {
        event.preventDefault();
         if(window.location.href !== "http://localhost:5500/feed.html"){
            window.location.href = "http://localhost:5500/feed.html"  
            }
        if(nameInput){
           const searchName = nameInput.value;
           getAllBooks(searchName).then(bookFound => {
           
            const resultDiv = document.getElementById('searchResult');
            resultDiv.innerHTML= '<h2>Results</h2>';
            bookFound.forEach(result => {
                if (result.volumeInfo.imageLinks){
                    resultDiv.innerHTML += '<div class="book">' +
                    '<a href="#">'+'<img src='+result.volumeInfo.imageLinks.thumbnail+' alt=""/>'+'</a>'+
                    '</div>'
                }
                console.log(result.volumeInfo.imageLinks)
                
            });
            nameInput.value = '';
            document.getElementById("search").style.display = "none"; 
        });;
        }
        
    })

