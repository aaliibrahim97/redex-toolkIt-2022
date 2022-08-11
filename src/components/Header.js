import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut, resetStore } from "../store/authSlice";

const Header = () => {
  const { isError } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>
      {isError && (
        <div class="absolute z-40 left-5 top-5 w-25" role="alert">
          <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Danger
          </div>
          <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p> {isError} </p>
          </div>
        </div>
      )}
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">My Books</span>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
          type="submit"
          onClick={() => {
            dispatch(resetStore());
            dispatch(logOut());
          }}
        >
          {authStatus ? "Log Out" : "Log In"}
        </button>
      </nav>
    </Fragment>
  );
};

export default Header;
