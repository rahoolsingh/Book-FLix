var queryString = window.location.search;
var queryArray = queryString.split("?");

const fetchBookPreview = (bookId) => {
  const bookPreviewUrl = `https://books.google.com/books?id=${bookId}&newbks=0&lpg=PP1&pg=PP1&output=embed`;
  const bookPreviewIframe = document.createElement("iframe");
  bookPreviewIframe.style.backgroundColor = "transparent";
  bookPreviewIframe.allowTransparency="true";
  bookPreviewIframe.src = bookPreviewUrl;
  bookPreviewIframe.classList.add("book-read-iframe");

  const bookPreviewContainer = document.querySelector(".main");
  bookPreviewContainer.innerHTML = ""; // clear any previous preview
  bookPreviewContainer.appendChild(bookPreviewIframe);
};

fetch(`https://www.googleapis.com/books/v1/volumes/${queryArray[0]}`)
.then((response) => response.json())
.then((data) => {
    const title = data.volumeInfo.title;
    document.title = "Bookflix | " + title;
})
.catch((error) => console.error(error));
fetchBookPreview(queryArray[0]);

