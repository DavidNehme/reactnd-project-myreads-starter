import React from "react";
import BookView from "./bookView.js";
import idToName from "./helpers.js";

function BookShelfView(props) {
  const { shelf, books, changeBookShelf } = props;
  const shelfName = idToName(shelf);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={`b.${book.id}`}>
              <BookView book={book} changeBookShelf={changeBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelfView;
