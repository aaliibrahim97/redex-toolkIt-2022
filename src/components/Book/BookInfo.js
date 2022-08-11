import React, { Fragment } from "react";

const BookInfo = ({ auth,bookInfo }) => {
  // console.log(bookInfo);
  return (
    <Fragment>
      <h2 class="font-bold text-xl font-sans my-2">Book Details</h2>

      { auth && Object.keys(bookInfo).length > 0 ? (
        <ul class="py-4 px-4 my-3 rounded-3xl border-b bg-gray-100 font-sans">
          <li class="border-b py-2 border-gray-200 text-lg"> <b>Title:</b> {bookInfo.title}</li>
          <li class="border-b py-2 border-gray-200 text-lg"> <b>Description:</b> {bookInfo.description}</li>
          <li class="border-b py-2 border-gray-200 text-lg"> <b>Inserted By:</b> {bookInfo.userName}</li>
          <li class="py-2 border-gray-200"> <b>Price:</b> {bookInfo.price}</li>
        </ul>
      ) : (
        <div class=" alert alert-secondary rounded-full" role="alert">
          There is no post selected yet. Please select!
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
