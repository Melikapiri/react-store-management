import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Xmark from "../../Icons/Xmark";

const AlertModal = ({text}) => {
    const [showModal, setShowModal] = useState(true)

    return ReactDOM.createPortal(
        <div tabIndex={-1}
             className={`${!showModal && `hidden`} fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-y-auto overflow-x-hidden`}>
            <div className="relative p-3 w-full max-w-sm max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                    <div className="p-4 md:p-5 text-center">
                        <div className="flex items-center justify-center text-primaryColor mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-8 10-10">
                                <path fillRule="evenodd"
                                      d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>

                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {text}
                        </h3>
                        <button
                            onClick={() => setShowModal(value => !value)}
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-4 py-2 text-center"
                        >

                            بستن
                        </button>

                    </div>
                </div>
            </div>
        </div>

        ,
        document.getElementById("modal-root")
    );
};

export default AlertModal;
