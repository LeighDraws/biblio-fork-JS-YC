async function getBookList() {

    const API_URL = "https://www.googleapis.com/books/v1/users/116746287807382825912/bookshelves/1001/volumes"
    
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error (`Response status: ${res.status}`);
        }
        const data = await res.json();
        const bookList = data.items;
        return bookList;
    } catch (error) {
        console.log(error.message);
    }
}

getBookList().then(bookList => {
    
});




async function getAllBooks (query) {
    const API_URL_SEARCH = 'https://www.googleapis.com/books/v1/volumes?q=';

    try {
        const response = await fetch(API_URL_SEARCH+query+'&maxResults=40');
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`);
        }
        const data = await response.json();
        const bookFound = data.items;
        console.log(bookFound);
        return bookFound;
        
    } catch (error) {
        console.log(error.message);
    }
    }


    const nameInput = document.querySelector('#param');
    const form = document.querySelector('#searchForm');
            
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if(nameInput){
           const searchName = nameInput.value;
           getAllBooks(searchName).then(bookFound => {
            const resultDiv = document.getElementById('searchResult');
            resultDiv.innerHTML= '';
            bookFound.forEach(result => {
                if (result.volumeInfo.imageLinks){
                    resultDiv.innerHTML += '<div class="book">' +
                    '<a href="#">'+'<img src='+result.volumeInfo.imageLinks.thumbnail+' alt=""/>'+'</a>'+
                    '</div>'
                }
                console.log(result.volumeInfo.imageLinks)
                
            });
            document.getElementById("search").style.display = "none"; 
        });;
        }
        
    })

