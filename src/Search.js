import React, { Component } from "react";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import './App.css'
import * as BooksAPI from './BooksAPI'
import Book from "./Book";


class Search extends Component {
    state = {
        query: '',
        books: []
    }

    setBooksState(books) {
        Array.isArray(books) ? this.setState(() => ({ books })) : this.setBooksState([]);
    }

    handleChange = (query) => {
        this.setState(() => ({ query }))

        query ? BooksAPI.search(query)
            .then((books) => (
                this.setBooksState(books)
            ))
            : this.setBooksState([])
    }

    mergeWithUserBooks = () => {
        return this.state.books.map((book) => {
            let userBook = this.props.userBooks.find(x => x.id === book.id);
            if (userBook) {
                book.shelf = userBook.shelf
            }

            return book;
        }
        );
    }

    render() {
        const query = this.state.query;
        const books = this.mergeWithUserBooks();
        console.log(books)
        return (
            <div className="search-books">git
                <div className="search-books-bar">
                    <Link to='/' >
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.handleChange(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.length > 0 ?
                                books.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        onChangeBookShelf={this.props.onChangeBookShelf} />)
                                ) : ''
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    userBooks: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
}

export default Search;