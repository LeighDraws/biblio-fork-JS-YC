console.log("coucou")


async function getBookList() {

    const API_URL = "https://www.googleapis.com/books/v1/users/109246547700680053772/bookshelves/1001/volumes"
    
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error (`Response status: ${res.status}`);
        }

        const data = await res.json();
        const bookList = data.items;
    } catch (error) {
        console.log(error.message);
    }
}

getBookList();


