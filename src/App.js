import React from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";
import BookShelfView from "./bookShelfView.js";
import BookShelvesView from "./bookShelvesView.js";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "", books: [], ok: true };
  }

  handleChange(event) {
    const searchText = event.target.value;
    if (searchText.length === 0) {
      this.setState({ searchText: "", books: [] });
      return;
    }
    this.setState({ searchText });
    BooksAPI.search(searchText).then(
      books => {
        if (books.error !== undefined) {
          console.log(books.error);
          this.setState({ books: [], ok: false });
          return;
        }
        this.setState({ books, ok: true });
      },
      reason => {
        console.log(`error ${reason}`);
        this.setState({ books: [], ok: false });
      }
    );
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.handleChange(event)}
            />
          </div>
        </div>
        {this.state.books && (
          <BookShelfView
            shelf="search-books-results"
            changeBookShelf={this.props.changeBookShelf}
            books={this.state.books}
            tracer="from_app"
          />
        )}
        {this.state.books.length === 0 && <div>No books found</div>}
      </div>
    );
  }
}

class BooksApp extends React.Component {
  state = {
    books: []
  };

  refreshBookState() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  componentDidMount() {
    this.refreshBookState();
  }

  changeBookShelf(bookId, shelf) {
    BooksAPI.update(bookId, shelf).then(() => this.refreshBookState());
  }

  render() {
    const allShelves = ["currentlyReading", "read", "wantToRead"];

    const { books } = this.state;
    const changeBookShelf = (bookId, shelf) =>
      this.changeBookShelf(bookId, shelf);
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => <SearchPage changeBookShelf={changeBookShelf} />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <BookShelvesView
                books={books}
                shelves={allShelves}
                changeBookShelf={changeBookShelf}
              />
              )
              <div className="open-search">
                <ul>
                  <li>
                    <Link className="open-search" to="/search">
                      Search
                    </Link>
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
