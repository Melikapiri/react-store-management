import './App.css';
import SideBar from "./Components/SideBar/SideBar";
import Header from "./Components/Header/Header";
import {AppData} from "./Context/withAppData";
import {useState} from "react";
import {useRoutes} from "react-router-dom";
import RoutesElem from "./routes";

function App() {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const route = useRoutes(RoutesElem)
    return (

        <AppData.Provider value={[isOpenMenu, setIsOpenMenu]}>
            <div className="flex items-start w-full " style={{direction: 'rtl'}}>

                <SideBar/>
                <div className="w-full overflow-x-hidden ">
                    <Header/>
                    <div className="p-2 overflow-hidden  sm:p-5">

                        {route}
                    </div>

                </div>

            </div>


            <div
                onClick={() => setIsOpenMenu(value => !value)}
                className={` ${isOpenMenu ? '' : 'invisible opacity-0'} cover fixed z-10 inset-0 bg-black/20 lg:hidden`}
            ></div>

        </AppData.Provider>
    );
}

export default App;
