import React, { Component } from "react";
import PropTypes from 'prop-types';
import './App.css'

class Book extends Component {
    state ={
        shelf: this.props.book.shelf
    }
    onChangeBookShelf = (book, shelf) => {
        this.setState(()=>({shelf}));
        this.props.onChangeBookShelf(book, shelf);
    }

    render() {
        const book = this.props.book;
        const onChangeBookShelf = this.onChangeBookShelf;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book?.imageLinks?.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={this.state.shelf||'none'} onChange={(event) => onChangeBookShelf(book, event.target.value)} >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object,
    onChangeBookShelf: PropTypes.func.isRequired
}

export default Book;