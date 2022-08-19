import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import "./book.css";

const BooksList = ({
  loadingStatus,
  data,
  auth,
  dispatch,
  deleteBook,
  readBook,
  getBookId,
}) => {

  const { t, i18n } = useTranslation();

  // console.log(loadingStatus, data);

  // data && => if (data)
  const bookList =
    data.length > 0
      ? data.map((i) => (
          <li
            key={i.id}
            class="py-4 px-4 w-100 rounded-full border-b bg-gray-100 hover:bg-gray-200 border-gray-200 dark:border-gray-600 rounded-full my-2 border border-gray-200"
          >
            <p class="w-50 d-inline">{i.title}</p>
            <div class="float-right relative bottom-2">
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
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-1"
                disabled={!auth}
                onClick={() => getBookId(i.id)}
              >
                {t("read")}
              </button>

              <button
                type="button"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mx-1"
                disabled={!auth}
                onClick={() =>
                  dispatch(deleteBook(i))
                    .unwrap()
                    .then((originalPromiseResult) => {
                      // handle result here
                      console.log(originalPromiseResult);
                    })
                    .catch((rejectedValueOrSerializedError) => {
                      // handle error here
                      console.log(rejectedValueOrSerializedError);
                    })
                }
              >
              {t("delete")}
              </button>
            </div>
          </li>
        ))
      : "There's no books to be showen";

  return (
    <Fragment>
      <h2 class="font-bold text-xl font-sans my-2">{t("book_list")}</h2>
      {loadingStatus ? (
        <div>
          <p className="loading">{t("loading")}</p>
        </div>
      ) : (
        <div>
          <ul class="w-100 text-sm font-medium text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {bookList}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default BooksList;
