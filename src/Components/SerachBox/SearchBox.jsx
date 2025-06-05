import React from "react";
import SearchIcon from "../../Icons/SearchIcon";

const SearchBox = ({className}) => {
    return (
        <div
            className={`${className} flex items-center justify-between py-1 pl-1 pr-2 bg-gray-50 border border-primaryColor  rounded-full`}>
            <input className="bg-transparent border-none outline-0 w-full h-full" type="text" placeholder="جستجو کنید ..."/>
            <SearchIcon className="w-10 h-10 text-primaryColor"/>
        </div>
    );
};

export default SearchBox;