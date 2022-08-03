import React, { Fragment } from "react";

const BookInfo = ({ auth,bookInfo }) => {
  console.log(bookInfo);
  return (
    <Fragment>
      <h2>Book Details</h2>

      { auth && Object.keys(bookInfo).length > 0 ? (
        <div>
          <p className="fw-bold">Title:{bookInfo.title}</p>
          <p className="fw-light">Description:{bookInfo.description}</p>
          <p className="fw-light">Inserted By:{bookInfo.userName}</p>
          <p className="fst-italic">Price:{bookInfo.price}</p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no post selected yet. Please select!
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
