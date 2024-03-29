import React from "react";
import {Outlet} from "react-router-dom";
import {Header} from "../component/header/Header";


export const MainLayout = () => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
};

