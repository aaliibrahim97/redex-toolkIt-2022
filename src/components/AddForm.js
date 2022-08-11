import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBooks } from "../store/bookSlice";

const Addform = () => {
  // const [title, setTitle] = useState("");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState("");

  const title = useRef(null);
  const price = useRef(null);
  const description = useRef(null);

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false)

  const OnSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      price: price.current.value,
      description: description.current.value,
    };

    console.log(data);
    dispatch(postBooks(data))
      .unwrap()
      .then((originalPromiseResult) => {
        // handle result here
        console.log(originalPromiseResult);
        title.current.value = null;
        price.current.value = null;
        description.current.value = null;

        // setTitle('')
        // setPrice('')
        // setDescription('')
        setLoaded(true) 
        setTimeout(() => {
          setLoaded(false)  
        }, 3000);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.log(rejectedValueOrSerializedError);
        alert("Inserting Failed", rejectedValueOrSerializedError);
      });
  };

  const authStatus = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>
    {
      loaded === true && (
        <div class="absolute z-40 left-5 top-5 w-25" role="alert">
        <div class="border border-t-0 border-red-400 rounded-lg bg-green-500 px-4 py-3 text-white">
          <p>Book Inserted Successfully!</p>
        </div>
      </div>
      )
    }
        
      <div className="row">
        <div className="col-6 offset-3 mt-3">
          <h2 className="font-bold text-xl font-sans my-4">Insert Book</h2>
          <form onSubmit={OnSubmitHandler}>
            <div className="form-group">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-full"
                id="title"
                ref={title}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-full"
                id="price"
                ref={price}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-3xl"
                id="Description"
                rows="3"
                ref={description}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              disabled={!authStatus}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Addform;
