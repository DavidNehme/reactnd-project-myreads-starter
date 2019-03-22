import React from "react";
import idToName from "./helpers.js";

const allShelves = ["currentlyReading", "read", "wantToRead"];

function BookBucketSelector(props) {
  const { currentShelf, bookId, changeBookShelf, allShelves } = props;
  const shelfOptions = allShelves.map(id => {
    const name = idToName(id);
    return (
      <option key={`select.${bookId}.${id}`} value={id}>
        {name}
      </option>
    );
  });
  const defaultValue = currentShelf === undefined ? "move" : currentShelf;
  return (
    <select
      defaultValue={defaultValue}
      onChange={event => changeBookShelf(bookId, event.target.value)}
    >
      <option disabled value="move">
        Move to...
      </option>
      {shelfOptions}
    </select>
  );
}

function BookView(props) {
  const { changeBookShelf } = props;
  const { shelf, title, authors, imageLinks } = props.book;
  const imageURL =
    imageLinks === undefined ? "" : `url("${imageLinks.thumbnail}")`;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: imageURL
          }}
        />
        <div className="book-shelf-changer">
          <BookBucketSelector
            currentShelf={shelf}
            bookId={props.book.id}
            changeBookShelf={changeBookShelf}
            allShelves={allShelves}
          />
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

export default BookView;
