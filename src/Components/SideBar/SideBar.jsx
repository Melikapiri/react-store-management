import React, {useContext, useState} from "react";
import HomeIcon from "../../Icons/HomeIcon";
import BagIcon from "../../Icons/BagIcon";
import UsersIcon from "../../Icons/UsersIcon";
import CommentIcon from "../../Icons/CommentIcon";
import ProductIcon from "../../Icons/ProductIcon";
import Xmark from "../../Icons/Xmark";
import {AppData} from "../../Context/withAppData";
import SearchIcon from "../../Icons/SearchIcon";
import SearchBox from "../SerachBox/SearchBox";
import Datas from "../../Datas";
import {Link, NavLink} from "react-router-dom";

const SideBar = () => {
    const [isOpenMenu, setIsOpenMenu] = useContext(AppData)
    const [menuItem, setMenuItem] = useState(Datas)

    return (
        <div className="border lg:sticky lg:top-0 lg:z-50">
            {/* Overlay for mobile */}
            {isOpenMenu && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setIsOpenMenu(false)}
                />
            )}            <div
                className={`flex flex-col fixed lg:static top-0 ${isOpenMenu ? ` right-0` : `-right-64`}  lg:right-0 z-40 w-64 h-screen transition-all `}>

                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div
                        className=" flex items-center justify-between p-4 rounded-md bg-secondPrimaryColor font-Modam-SemiBold text-center mb-3">خوش
                        آمدید!

                        <span className="lg:hidden" onClick={() => setIsOpenMenu(prevValue => !prevValue)}>
                            <Xmark className="w-6 h-6"/>
                        </span>
                    </div>
                    <ul className="space-y-2 font-medium text-primaryColor font-Modam-SemiBold ">

                        {
                            menuItem.map(item => (
                                <NavLink
                                    key={item.id}
                                    onClick={() => setIsOpenMenu(value => !value)}
                                    to={item.path}
                                    className={({isActive}) => `flex gap-2.5 items-center p-2 rounded-lg group  dark:text-white text-primaryColor ${isActive ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    {item.icon}
                                    <span className="me-3">{item.title}</span>
                                </NavLink>
                            ))
                        }

                    </ul>


                </div>

            </div>
        </div>
    );
};

export default SideBar;