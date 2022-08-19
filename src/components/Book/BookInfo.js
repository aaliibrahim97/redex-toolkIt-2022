import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const BookInfo = ({ auth, bookInfo }) => {
  // console.log(bookInfo);
  const { t, i18n } = useTranslation();

  const downloadFile = (enCodedFile,enCodedFileTitle)=>{
  
    function base64ToArrayBuffer(base64) {
      var binaryString = window.atob(base64);
      // console.log("binaryString ", binaryString);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes;
    }

    function saveByteArray(reportName, byte) {
      var blob = new Blob([byte], { type: "application/pdf" });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      var fileName = reportName;
      link.download = fileName;
      link.click();
    }

    var sampleArr = base64ToArrayBuffer(enCodedFile);
    saveByteArray(enCodedFileTitle, sampleArr);
  
  }

  return (
    <Fragment>
      <h2 class="font-bold text-xl font-sans my-2">{t("book_details")}</h2>

      {auth && Object.keys(bookInfo).length > 0 ? (
        <ul class="py-4 px-4 my-3 rounded-3xl border-b bg-gray-100 font-sans">
          <li class="border-b py-2 border-gray-200 text-lg">
            <b>{t("title")}:</b> {bookInfo.title}
          </li>
          <li class="border-b py-2 border-gray-200 text-lg">
            <b>{t("description")}:</b> {bookInfo.description}
          </li>
          <li class="border-b py-2 border-gray-200 text-lg">
            <b>{t("inserted_by")}:</b> {bookInfo.userName}
          </li>
          <li class="py-2 border-gray-200">
            <b>{t("price")}:</b> {bookInfo.price}
          </li>
          {bookInfo.file != null && (

            <li class="border-t border-gray-200 text-right">
            <button
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mx-1 relative top-3"
              onClick={() => {downloadFile(bookInfo.file["result"],bookInfo.title)}}
            >
              {t('download')}
            </button>
          </li>

          )}
          
        </ul>
      ) : (
        <div class=" alert alert-secondary rounded-full" role="alert">
          {t("no_post")}
        </div>
      )}
    </Fragment>
  );
};

export default BookInfo;
