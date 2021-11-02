import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  getAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  componentDidMount() {
    this.getAllBooks();
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf )
      .then(() => {
        this.getAllBooks();
      })
  }

  render() {
    const books = this.state.books;
    const shelfs = [...new Set(books.map((book) => (book.shelf)))]
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <Search userBooks={this.state.books} onChangeBookShelf={this.changeBookShelf} />
        )} />
        
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfs.map((shelf) => (
                  <BookShelf
                    key={shelf}
                    shelfHeader={shelf} 
                    bookList={books.filter((book) => (book.shelf === shelf))} 
                    onChangeBookShelf={this.changeBookShelf}/>
                ))}
              </div>
            </div>

            <Link to="/search" className="open-search">
              <button >Add a book</button>
            </Link>
          </div>
        )
        } />
      </div >
    )
  }
}

export default BooksApp
