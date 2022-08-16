import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBooks } from "../store/bookSlice";
import { useForm } from "react-hook-form";

const Addform = () => {
  // const [title, setTitle] = useState("");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState("");

  // const title = useRef(null);
  // const price = useRef(null);
  // const description = useRef(null);

  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);

  // WATCHING THE VALUES FROM THE INPUTS
  // const { watch } = useForm()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      price: null,
    },
  });

  const handleForm = handleSubmit((data) => {
    const formData = {
      title: data.title,
      price: data.price,
      description: data.description,
    };
    console.log(formData);
    dispatch(postBooks(formData))
      .unwrap()
      .then((originalPromiseResult) => {
        // handle result here
        console.log(originalPromiseResult);
        // data,title = null;
        // price.current.value = null;
        // description.current.value = null;
        // setTitle('')
        // setPrice('')
        // setDescription('')
        reset();
        setLoaded(true);
        setTimeout(() => {
          setLoaded(false);
        }, 3000);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.log(rejectedValueOrSerializedError);
        alert("Inserting Failed", rejectedValueOrSerializedError);
      });
  });

  // const OnSubmitHandler = ((e,dataa) => {
  //   e.preventDefault();

  //   // const info = handleSubmit((data)=>{
  //   //   console.log(data)
  //   //   name = data.name
  //   // })

  //   const data = {
  //     title: title.current.value,
  //     price: price.current.value,
  //     description: description.current.value,
  //   };
  //   // console.log(data);
  //   dispatch(postBooks(data))
  //     .unwrap()
  //     .then((originalPromiseResult) => {
  //       // handle result here
  //       console.log(originalPromiseResult);
  //       title.current.value = null;
  //       price.current.value = null;
  //       description.current.value = null;
  //       // setTitle('')
  //       // setPrice('')
  //       // setDescription('')
  //       setLoaded(true)
  //       setTimeout(() => {
  //         setLoaded(false)
  //       }, 3000);
  //     })
  //     .catch((rejectedValueOrSerializedError) => {
  //       // handle error here
  //       console.log(rejectedValueOrSerializedError);
  //       alert("Inserting Failed", rejectedValueOrSerializedError);
  //     });
  // });

  return (
    <Fragment>
      {loaded === true && (
        <div class="absolute z-40 left-5 top-5 w-25" role="alert">
          <div class="border border-t-0 border-red-400 rounded-lg bg-green-500 px-4 py-3 text-white">
            <p>Book Inserted Successfully!</p>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-6 offset-3 mt-3">
          <h2 className="font-bold text-xl font-sans my-4">Insert Book</h2>
          <form onSubmit={handleForm}>
            <div className="form-group">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                {...register("title", {
                  required: "Please enter the title of the book.",
                })}
                type="text"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-full"
                id="title"
              />

              {errors.title && (
                <p class="text-red-600">{errors.title.message}</p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                {...register("price", { required: true, valueAsNumber: true })}
                type="number"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-full"
                id="price"
              />

              {errors.price && (
                <p class="text-red-600">Please enter the price of the book.</p>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-3xl"
                id="Description"
                rows="3"
              ></textarea>
              {errors.description && (
                <p class="text-red-600">
                  Please enter the description of the book.
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full ${
                !isValid ? "opacity-50" : "hover:bg-blue-700"
              }`}
              disabled={!isValid}
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
