import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";

// BooksAPI.getAll().then((books) => console.log(books));

let allShelves = ["currentlyReading", "read", "wantToRead"];

function idToName(id) {
  return id
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^[a-z]/, c => c.toUpperCase());
}

console.log(idToName("davidNehme"));

function BookBucketSelector(props) {
  const { currentShelf, bookId, changeBookShelf } = props;
  const shelfOptions = allShelves.map(id => {
    const name = idToName(id);
    return (
      <option key={`select.${bookId}.${id}`} value={id}>
        {name}
      </option>
    );
  });

  return (
    <select
      defaultValue={currentShelf}
      onChange={event => changeBookShelf(bookId, event.target.value)}
    >
      <option value="move" disabled>
        Move to...
      </option>
      {shelfOptions}
    </select>
  );
}

function BookView(props) {
  const { changeBookShelf } = props;
  const { shelf, title, authors, imageLinks } = props.book;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageLinks.thumbnail}")`
          }}
        />
        <div className="book-shelf-changer">
          <BookBucketSelector
            currentShelf={shelf}
            bookId={props.book.id}
            changeBookShelf={changeBookShelf}
          />
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
}

class BookShelfView extends React.Component {
  render() {
    const { shelf, books, changeBookShelf } = this.props;
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
}

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

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.setState({ searchText: "", books: [] });
  }

  handleChange(event) {
    const searchText = event.target.value;
    this.setState({ searchText });
    //BooksAPI.search(searchText).then(books => this.setState({ books }));
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" />
          </div>
        </div>
        {/* <BookShelfView shelf="search-books-results" books={this.state.books} /> */}
      </div>
    );
  }
}

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  };

  refreshBookState() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState({ books });
    });
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.refreshBookState();
  }

  changeBookShelf(bookId, shelf) {
    console.log(`changing book ${bookId} to shelf ${shelf}`);
    BooksAPI.update(bookId, shelf).then(() => this.refreshBookState());
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/search" render={() => <SearchPage />} />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <BookShelvesView
                books={books}
                shelves={allShelves}
                changeBookShelf={(bookId, shelf) =>
                  this.changeBookShelf(bookId, shelf)
                }
              />
              <div className="open-search">
                <ul>
                  <li>
                    <Link to="/search">Search</Link>
                  </li>
                  <li>
                    <Link to="/add">Add a book</Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
