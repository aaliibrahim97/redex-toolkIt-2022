import React, { Fragment, useEffect, useState } from 'react';
import BookInfo from './BookInfo';
import BooksList from './BooksList';

import './book.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks,deleteBook,readBook } from '../../store/bookSlice'

const PostContainer = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getBooks())
  },[dispatch])

  const { isLoading,books } = useSelector((state)=>{
    // console.log(state)
    return state.books
  })

  const authStatus = useSelector((state)=> state.auth.isLoggedIn)

  const [selected,setSelectedBook] = useState({})

  const getBookId =(id)=>{
    //use find with the id because the id is unique and not repeated // find return the first result that matched // unlike the filter return all the results that matches the condition through a for loop so it returns an array of object
    const selectedBook = books.find(book => book.id === id)
    setSelectedBook((prev)=>{return{...prev, ...selectedBook}})
  }

  return (
    <Fragment>
      <hr className='my-5' />
      <div className='row'>
        <div className='col'>
          <BooksList 
            loadingStatus={isLoading} 
            data={books} 
            auth={authStatus} 
            dispatch={dispatch} 
            deleteBook={deleteBook} 
            readBook={readBook}
            getBookId={getBookId}/>
        </div>
        <div className='col side-line'>
          <BookInfo             
           auth={authStatus} 
           bookInfo={selected}/>
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
