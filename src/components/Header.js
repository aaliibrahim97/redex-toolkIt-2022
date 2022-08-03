import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInOut } from "../store/authSlice"

const Header = () => {
  
  const { isError } = useSelector((state) =>  state.books );

  const dispatch = useDispatch();
  
  const authStatus = useSelector((state)=> state.auth.isLoggedIn)

  return (
    <Fragment>
    {isError && (
      <div class="alert alert-danger" role="alert">
      { isError }
    </div>
    )}
      
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">My Books</span>
        <button className="btn btn-outline-primary" type="submit" onClick={()=> dispatch(logInOut())}>
          {authStatus ? "Log Out" : "Log In"}
        </button>
      </nav>
    </Fragment>
  );
};

export default Header;
