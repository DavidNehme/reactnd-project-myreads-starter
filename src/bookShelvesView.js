import React from "react";
import BookShelfView from "./bookShelfView.js";

function BookShelvesView(props) {
  const { books, shelves, changeBookShelf } = props;
  const individualShelves = shelves.map(shelf => {
    const booksOnShelf = books.filter(book => book.shelf === shelf);
    return (
      <BookShelfView
        key={`bookShelf.${shelf}`}
        shelf={shelf}
        books={booksOnShelf}
        changeBookShelf={changeBookShelf}
        tracer="bookShelvesView"
      />
    );
  });

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">{individualShelves}</div>
    </div>
  );
}

export default BookShelvesView;
