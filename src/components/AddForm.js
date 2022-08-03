import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBooks } from '../store/bookSlice';

const Addform = () => {

  // const [title, setTitle] = useState("");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState("");

  const title = useRef(null)
  const price = useRef(null)
  const description = useRef(null)

  const dispatch = useDispatch()

  const OnSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      title:title.current.value,
      price:price.current.value,
      description:description.current.value
    }

    console.log(data)
    dispatch(postBooks(data))
    .unwrap()
    .then((originalPromiseResult) => {
      // handle result here
      console.log(originalPromiseResult)
      title.current.value = null
      price.current.value = null
      description.current.value = null
      
      // setTitle('')
      // setPrice('')
      // setDescription('')
      
      alert('Inserted Successfully')
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
      console.log(rejectedValueOrSerializedError)
      alert('Inserting Failed', rejectedValueOrSerializedError)
    })

  };

  const authStatus = useSelector((state)=> state.auth.isLoggedIn)

  return (
    <div className='row'>
      <div className='col-6 offset-3 mt-3'>
        <h2>Insert Book</h2>
        <form onSubmit={OnSubmitHandler}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input 
            type='text' 
            className='form-control' 
            id='title'
            ref={title} 
            required />
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input 
            type='number' 
            className='form-control' 
            id='price'
            ref={price}
            required />
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <textarea
              className='form-control'
              id='Description'
              rows='3'
              ref={description}
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary' disabled={!authStatus}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;
