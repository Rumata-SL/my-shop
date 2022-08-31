import React from 'react';
import {Header} from "../component/header/Header";
import {Outlet} from "react-router-dom";


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

