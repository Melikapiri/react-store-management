import React from "react";

const PageTitle = ({title}) => {
    return (
        <div className="flex items-center justify-center ">
            <h3 className="inline-flex font-Modam-bold text-xl pb-2 border-b border-b-primaryColor "> {title} </h3>
        </div>
    );
};

export default PageTitle;