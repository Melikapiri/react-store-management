import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import Xmark from "../../Icons/Xmark";
import ProductTable from "../ProductTable/ProductTable";
import DeleteModal from "../DeleteModal/DeleteModal";

const DetailProductModal = ({children,cancelBtn, title}) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                cancelBtn()
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return window.removeEventListener("keydown", handleKeyDown);

    }, [cancelBtn])

    return ReactDOM.createPortal(
        <div
            tabIndex={-1}
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 overflow-y-auto overflow-x-hidden">
            <div className="relative p-4 w-full max-w-[46rem] max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                    <div className="p-2">
                        <button
                            onClick={() => cancelBtn()}

                            type="button"
                            className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >

                            <Xmark/>
                        </button>
                        {children}

                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default DetailProductModal;
