import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router";
import { logIn } from "../store/authSlice";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t, i18n } = useTranslation();

  const { isError } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  // const authStatus = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();

  // const location = useLocation();

  const login = (e) => {
    e.preventDefault();

    dispatch(logIn());

    navigate("/");

    // if (location.state?.from) {
    //   navigate(location.state.from);
    // }
  };

  return (
    <Fragment>
      {isError && (
        <div class="alert alert-danger" role="alert">
          {isError}
        </div>
      )}
      {
        // <nav className="navbar navbar-dark bg-dark">
        //   <span className="navbar-brand mb-0 h1">My Books</span>
        //   <button
        //     className="btn btn-outline-primary"
        //     type="submit"
        //     onClick={() => login()}
        //   >
        //     {authStatus ? "Log Out" : "Log In"}
        //   </button>
        // </nav>
      }
      <div>
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
      </div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">
              {t("Sign_in")}
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={login}>
            {
              //  <div className="rounded-md shadow-sm -space-y-px">
              //           <div>
              //             <label htmlFor="email-address" className="sr-only">
              //               Email address
              //             </label>
              //             <input
              //               id="email-address"
              //               name="email"
              //               type="email"
              //               autoComplete="email"
              //               required
              //               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              //               placeholder="Email address"
              //             />
              //           </div>
              //           <div>
              //             <label htmlFor="password" className="sr-only">
              //               Password
              //             </label>
              //             <input
              //               id="password"
              //               name="password"
              //               type="password"
              //               autoComplete="current-password"
              //               required
              //               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              //               placeholder="Password"
              //             />
              //           </div>
              //         </div>
            }

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {t("Sign_in_btn")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
