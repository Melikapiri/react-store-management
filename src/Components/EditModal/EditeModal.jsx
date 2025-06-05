import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import Pencil from "../../Icons/Pencil";
import Xmark from "../../Icons/Xmark";


const EditeModal = ({children, closeEditeModal, saveEditeModal,id}) => {
    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-y-auto overflow-x-hidden">
            <div className="relative p-4 w-full max-w-md max-h-full">

                <div className="relative bg-white rounded-lg shadow-sm ">
                    <button onClick={()=>closeEditeModal()} type="button" className="mt-3 mr-2.5  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6  inline-flex justify-center items-center">
                        <Xmark/>
                    </button>
                    <h3 className="mb-3 text-center font-Modam-SemiBold text-xl">اطلاعات جدید را وارد کنید</h3>
                    <div className="px-4   text-center">
                        {children}

                        <button type="button"
                                onClick={() => saveEditeModal(id)}
                                className="text-white my-3 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            ثبت اطلاعات
                        </button>
                    </div>

                </div>

            </div>
        </div> , document.getElementById("modal-root")
    );
};

export default EditeModal;
