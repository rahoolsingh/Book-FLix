var queryString = window.location.search;
queryString = queryString.substring(1);
var queryArray = queryString.split("?");


const fetchBookPreview = (bookId) => {
    const bookPreviewUrl = `https://books.google.com/books?id=${bookId}&newbks=0&lpg=PP1&pg=PP1&output=embed`;
    const bookPreviewIframe = document.createElement("iframe");
    bookPreviewIframe.src = bookPreviewUrl;
    bookPreviewIframe.classList.add("book-read-iframe");

    const bookPreviewContainer = document.querySelector(".main");
    bookPreviewContainer.innerHTML = ""; // clear any previous preview
    bookPreviewContainer.appendChild(bookPreviewIframe);
  };

fetchBookPreview(queryArray[0]);

{/* <iframe frameborder="0" scrolling="no" style="border:0px" src="https://books.google.co.in/books?id=V4-Su0whKa0C&newbks=0&lpg=PP1&pg=PP1&output=embed" width=500 height=500></iframe> */}