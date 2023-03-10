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
    .then((response) => response.json())
    .then((data) => {
      const books = data.items;
      const bookContainer = document.querySelector(box);
      console.log(data);

      books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        const bookDiva = document.createElement("a");
        bookDiva.classList.add("bookLink");
        
        const hr = document.createElement('hr');
        
        const bookImageDiv = document.createElement("div");
        bookImageDiv.classList.add("book-image");

        const bookImageLink = document.createElement("a");

        const bookImage = document.createElement("img");
        const bookInnerDiv = document.createElement("div");
        const bookTitle = document.createElement("h3");
        bookTitle.id = "book-title-low";
        const authorName = document.createElement("h5");
        authorName.id = "author";
        const available = document.createElement("h5");
        available.className = "available";
        const bookInner = document.createElement("p");
        

        try {
            try {
                bookImage.src = book.volumeInfo.imageLinks.thumbnail;
            } catch (error) {
                bookImage.src = 'css\\images\\book-cover.png';
            }
            bookDiva.href = '/read?'+book.id;
            bookImage.alt = book.volumeInfo.title;
            if (book.volumeInfo.title.length > 27) {
                bookTitle.textContent = (book.volumeInfo.title.substring(0, 26) + "...");
            }else{
                bookTitle.textContent = book.volumeInfo.title
            }
            authorName.textContent = book.volumeInfo.authors[0];
            var availablity = book.accessInfo.accessViewStatus;
        } catch (error) {
            bookImageLink.href = '?nan';
            bookImage.alt = 'default';
            bookTitle.textContent = 'Untitled eBook';
            authorName.textContent = 'NaN';
        }
        if(availablity == 'SAMPLE'){
            available.className = 'available-sample'
            available.textContent = 'SAMPLE AVAILABLE';

        }
        else if(availablity == 'FULL_PUBLIC_DOMAIN'){
            available.className = 'available-full'
            available.textContent = 'FULL BOOK';

        }
        else{
            available.className = 'available-not'
            available.textContent = 'NOT AVAILABLE';

        }
        // bookTitle.attributes = 'hidden';
        // bookImageLink.appendChild(bookImage);
        bookImageDiv.appendChild(bookImage);
        bookDiva.appendChild(bookImageDiv);
        bookDiva.appendChild(available);
        bookDiv.appendChild(bookDiva);
        bookInnerDiv.appendChild(hr);
        bookInnerDiv.appendChild(bookTitle);
        bookInnerDiv.appendChild(authorName);
        bookInnerDiv.appendChild(bookInner);
        bookDiva.appendChild(bookInnerDiv);
        bookDiv.appendChild(bookDiva);
        
        bookContainer.appendChild(bookDiv);
      });
    })
    .catch((error) => {
      console.log(error);
      const bookContainer = document.querySelector(box);
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("error");
      bookDiv.textContent = "Error: Something went wrong";
      bookContainer.appendChild(bookDiv);
    });
};
if (queryArray[0] == "bookflixsearch") {
  queryArray[1] = queryArray[1].split('+')
  var searchquery = '';
  for (i in queryArray[1]){
      if(i != 0)
        searchquery += ' ';
      searchquery += (queryArray[1][i]);
  }
  fetchBooks(searchquery, ".box");
  document.querySelector(".searchquery").textContent =
    "'" + searchquery + "'";
  document.title = "Bookflix | " + searchquery;
} else {
  fetch(`https://www.googleapis.com/books/v1/volumes/${queryArray[0]}`)
    .then((response) => response.json())
    .then((data) => {
      const title = data.volumeInfo.title;
      document.title = "Bookflix | " + title;
    })
    .catch((error) => console.error(error));
  fetchBookPreview(queryArray[0]);
}
