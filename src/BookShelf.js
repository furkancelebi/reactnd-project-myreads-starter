import React, { Component } from "react";
import PropTypes from 'prop-types';
import './App.css'
import Book from "./Book";

class BookShelf extends Component {
    render() {
        const bookList = this.props.bookList || [];
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfHeader}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            bookList.map((book) => (
                                <Book 
                                key={book.id}
                                book ={book}
                                onChangeBookShelf={this.props.onChangeBookShelf}/>)
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

BookShelf.propTypes = {
    shelfHeader: PropTypes.string.isRequired,
    bookList: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
}

export default BookShelf;