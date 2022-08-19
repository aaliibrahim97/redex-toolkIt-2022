import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBooks } from "../store/bookSlice";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FileUploader } from "react-drag-drop-files";

const Addform = () => {
  const { t, i18n } = useTranslation();

  const fileTypes = ["PDF"];

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

  const [file, setFile] = useState(null);
  const [showFile, setShowFile] = useState();
  const [showLabel, setLabel] = useState("Upload or drop a file right here");
  const [showTypeErr, setshowTypeErr] = useState(false);

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        // console.log("Called", reader);
        baseURL = reader.result.split(",")[1];
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
  const handleFileChangeX = (x) => {
    // let file = e.target.files[0];
    if (x.type !== "application/pdf") {
      setshowTypeErr(true);
    } else {
      setShowFile(x);
      setLabel("Uploaded Successfully!")
      getBase64(x)
        .then((result) => {
          // console.log("File Is", file);
          setFile({
            result,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const handleFileChange = (e) => {
  //   let file = e.target.files[0];

  //   getBase64(file)
  //     .then((result) => {
  //       // console.log("File Is", file);
  //       setFile({
  //         result,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleForm = handleSubmit((data) => {
    // console.log('handleForm',file)
    // const formData = new FormData();
    // formData.append('file', file);

    const formInfo = {
      title: data.title,
      price: data.price,
      description: data.description,
      file: file,
    };

    console.log(formInfo);
    dispatch(postBooks(formInfo))
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
        setShowFile(null);
        setLoaded(true);
        setLabel("Upload or drop a file right here")
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
            <p>{t("successfull_add")}</p>
          </div>
        </div>
      )}

      {showTypeErr === true && (
        <div class="absolute z-40 left-5 top-5 w-25" role="alert">
          <div class="border border-t-0 border-red-400 rounded-lg bg-red-500 px-4 py-3 text-white">
            <p>{t("file_err")}</p>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-6 offset-3 mt-3">
          <h2 className="font-bold text-xl font-sans my-4">
            {t("insert_book")}
          </h2>
          <form onSubmit={handleForm}>

            <div className="form-group">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                {t("title")}
              </label>
              <input
                {...register("title", {
                  required: `${t("err_1")}`,
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
                {t("price")}
              </label>
              <input
                {...register("price", { required: true, valueAsNumber: true })}
                type="number"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-full"
                id="price"
              />

              {errors.price && <p class="text-red-600">${t("err_1")}</p>}
            </div>

            <div className="form-group">
              <label
                htmlFor="Description"
                className="block text-sm font-medium text-gray-700"
              >
                {t("description")}
              </label>
              <textarea
                {...register("description", { required: true })}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-3xl"
                id="Description"
                rows="3"
              ></textarea>
              {errors.description && <p class="text-red-600">${t("err_3")}</p>}
            </div>

            {
              //  <div class="flex justify-center items-center w-full">
              //   <label
              //     for="dropzone-file"
              //     class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              //   >
              //     <div class="flex flex-col justify-center items-center pt-5 pb-6">
              //       <svg
              //         aria-hidden="true"
              //         class="mb-3 w-10 h-10 text-gray-400"
              //         fill="none"
              //         stroke="currentColor"
              //         viewBox="0 0 24 24"
              //         xmlns="http://www.w3.org/2000/svg"
              //       >
              //         <path
              //           stroke-linecap="round"
              //           stroke-linejoin="round"
              //           stroke-width="2"
              //           d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              //         ></path>
              //       </svg>
              //       <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              //         <span class="font-semibold">Click to upload</span> or drag
              //         and drop
              //       </p>
              //       <p class="text-xs text-gray-500 dark:text-gray-400">
              //         SVG, PNG, JPG or GIF (MAX. 800x400px)
              //       </p>
              //     </div>
              //     <input
              //       id="dropzone-file"
              //       type="file"
              //       class="hidden"
              //       onChange={handleFileChange}
              //     />
              //   </label>
              // </div>
            }

            <div class="flex justify-center items-center w-full pb-2">
            <label
            className="block text-sm font-medium text-gray-700 px-3"
            >
              {t('upload_file')} : 
            </label>
            <FileUploader
                multiple={false}
                handleChange={handleFileChangeX}
                name="file"
                types={fileTypes}
                classes="rounded-full"
                styles={{ borderRadius: "50px" }}
                label={showLabel}
              />

              {showFile ? (
                <p class="px-2">
                  <span class="text-green-600">
                    {showFile.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline spin-slow"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline text-red-600 hover:text-red-700 cursor-pointer	"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      onClick={() => {
                        setShowFile(null);
                        setLabel("Upload or drop a file right here")
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </p>
              ) : (
                <p class="px-2 text-yellow-600">No files uploaded yet</p>
              )}
            </div>

            <button
              type="submit"
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full ${
                !isValid ? "opacity-50" : "hover:bg-blue-700"
              }`}
              disabled={!isValid}
            >
              {t("submit")}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Addform;
