var queryString = window.location.search;
queryString = queryString.substring(1);
var Array = queryString.split("?");
var queryArray = Array[0].split("=");

const fetchBookPreview = (bookId) => {
    const bookPreviewUrl = `https://books.google.com/books?id=${bookId}&newbks=0&lpg=PP1&pg=PP1&output=embed`;
    const bookPreviewIframe = document.createElement("iframe");
    bookPreviewIframe.src = bookPreviewUrl;
    bookPreviewIframe.classList.add("book-read-iframe");

    const bookPreviewContainer = document.querySelector(".main");
    bookPreviewContainer.innerHTML = ""; // clear any previous preview
    bookPreviewContainer.appendChild(bookPreviewIframe);
  };

  const fetchBooks = (query, box) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
      .then(response => response.json())
      .then(data => {
        const books = data.items;
        const bookContainer = document.querySelector(box);
        console.log(data);
        
        books.forEach(book => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            
            const bookImageDiv = document.createElement("div");
            bookImageDiv.classList.add("book-image");

            const bookImageLink = document.createElement("a");

            const bookImage = document.createElement("img");
            bookImageLink.appendChild(bookImage);
            bookImageDiv.appendChild(bookImageLink);
            bookDiv.appendChild(bookImageDiv);
            
            const bookInnerDiv = document.createElement("div");
            const bookTitle = document.createElement("h3");
            bookTitle.id = "book-title-low";
            const authorName = document.createElement("h5");
            authorName.id = "author";
            const bookInner = document.createElement("p");
            

            try {
                try {
                    bookImage.src = book.volumeInfo.imageLinks.thumbnail;
                } catch (error) {
                    bookImage.src = 'css\\images\\book-cover.png';
                }
                bookImageLink.href = '/read?'+book.id;
                bookImage.alt = book.volumeInfo.title;
                bookTitle.textContent = book.volumeInfo.title;
                authorName.textContent = book.volumeInfo.authors[0];
            } catch (error) {
                bookImageLink.href = '?nan';
                bookImage.alt = 'default';
                bookTitle.textContent = 'Untitled eBook';
                authorName.textContent = 'Not Available';
            }
            bookInnerDiv.appendChild(bookTitle);
            bookInnerDiv.appendChild(authorName);
            bookInnerDiv.appendChild(bookInner);
            bookDiv.appendChild(bookInnerDiv);
            
            bookContainer.appendChild(bookDiv);
        });
      })
      .catch(error => {
        console.log(error)
        const bookContainer = document.querySelector(box);
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("error");
        bookDiv.textContent= "Error: Something went wrong";
        bookContainer.appendChild(bookDiv);
    });
  };
if(queryArray[0] == 'bookflixsearch')
{
    fetchBooks(queryArray[1], '.box');
    document.querySelector('.searchquery').textContent = "'"+queryArray[1]+"'";
}
else{
    fetchBookPreview(queryArray[0]);
}


