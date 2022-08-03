import React, { Fragment } from "react";
import "./book.css";

const BooksList = ({ loadingStatus, data, auth, dispatch, deleteBook,readBook,getBookId }) => {
  console.log(loadingStatus, data);

  // data && => if (data)
  const bookList =
    data.length > 0
      ? data.map((i) => (
          <li
            key={i.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>{i.title}</div>
            <div className="btn-group" role="group">
              
            {
              // GET INFO BOOK THROUGH CREATEASYNCTHUNK
              // <button
              //   type="button"
              //   className="btn btn-primary"
              //   disabled={!auth}
              //   onClick={() =>
              //     dispatch(readBook(i))
              //     .unwrap()
              //     .then((originalPromiseResult) => {
              //       // handle result here
              //       console.log(originalPromiseResult)
              //     })
              //     .catch((rejectedValueOrSerializedError) => {
              //       // handle error here
              //       console.log(rejectedValueOrSerializedError)
              //     })
              //   }
              // >
              //   Read
              // </button>
            }
            
              <button
                type="button"
                className="btn btn-primary"
                disabled={!auth}
                onClick={() => getBookId(i.id)}
              >
                Read
              </button>

              <button
                type="button"
                className="btn btn-danger"
                disabled={!auth}
                onClick={() =>
                  dispatch(deleteBook(i))
                  .unwrap()
                  .then((originalPromiseResult) => {
                    // handle result here
                    console.log(originalPromiseResult)
                  })
                  .catch((rejectedValueOrSerializedError) => {
                    // handle error here
                    console.log(rejectedValueOrSerializedError)
                  })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))
      : "There's no books to be showen";

  return (
    <Fragment>
      <h2>Books List</h2>
      {loadingStatus ? (
        <div>
          <p className="loading">Loading...</p>
        </div>
      ) : (
        <div>
          <ul className="list-group">{bookList}</ul>
        </div>
      )}
    </Fragment>
  );
};

export default BooksList;
