import React, {useContext, useState} from "react";
import {AppData} from "../../Context/withAppData";
import SearchIcon from "../../Icons/SearchIcon";

const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useContext(AppData)

    return (
        <div className=" flex flex-row-reverse items-center justify-between py-4 px-4 w-full bg-primaryColor">

            <button
                onClick={() => setIsOpenMenu(prevValue => !prevValue)}
                className="inline-flex items-center p-1 sm:p-2   border text-lg text-secondPrimaryColor rounded-lg lg:hidden hover:bg-gray-100 hover:text-primaryColor ">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-4 h-4 sm:w-6 sm:h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>


            <div className="flex gap-2  items-center ml-auto ">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden">
                    <img className="w-full h-full" src="/img/user.jpg" alt=""/>

                </div>
                <div className="text-lightGray2">
                    <h3 className="font-Modam-bold md:mb-1 text-sm sm:text-base">ملیکا پیری</h3>
                    <p className="font-Modam-SemiBold text-xs sm:text-sm ">React Dev</p>
                </div>
            </div>
        </div>
    );
};

export default Header;