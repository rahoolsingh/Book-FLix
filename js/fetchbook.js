const fetchBooks = (query, box) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then(response => response.json())
      .then(data => {
        const books = data.items.slice(0, 6); // get only the first 6 items
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
                bookImageLink.href = '#';
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
  
  fetchBooks('Indian Comic', '.box1');
  fetchBooks('Business', '.box2');
  fetchBooks('Physics', '.box3');
  fetchBooks('Chemistry', '.box4');
  fetchBooks('Biology', '.box5');
  fetchBooks('Technology', '.box6');
  fetchBooks('news', '.box7');
  