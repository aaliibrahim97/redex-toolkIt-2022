import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logOut, resetStore } from "../store/authSlice";

const Header = () => {
  const { t, i18n } = useTranslation();

  const { isError } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  // const authStatus = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>
      {isError && (
        <div class="absolute z-40 left-5 top-5 w-25" role="alert">
          <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            {t("danger")}
          </div>
          <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p> {isError} </p>
          </div>
        </div>
      )}
      <nav className="navbar navbar-dark bg-dark">
        
        {i18n.language === "en" && (
          <button
            type="submit"
            className="my-2 mx-2 py-2 px-2.5 border-transparent text-sm font-medium rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            onClick={() => {
              i18n.changeLanguage("in");
            }}
          >
            <img src="india.png" alt="United States" width={25} />
          </button>
        )}

        {i18n.language === "in" && (
          <button
            type="submit"
            className="my-2 mx-2 py-2 px-2.5 border-transparent text-sm font-medium rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => {
              i18n.changeLanguage("en");
            }}
          >
            <img src="united-states.png" alt="United States" width={25} />
          </button>
        )}

        <span className="navbar-brand mb-0 h1">{t("my_books")}</span>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold my-2 mx-2 py-2 px-2 rounded-full"
          type="submit"
          onClick={() => {
            dispatch(resetStore());
            dispatch(logOut());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      
        </nav>
    </Fragment>
  );
};

export default Header;
