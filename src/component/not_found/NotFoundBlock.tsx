import React from 'react';
import style from "./NotFoundBlock.module.scss"

export const NotFoundBlock = () => {
    return (
        <div className={style.container}>
            <h1>
                <span>😕</span>
                <br/>
                Ничего не найдено
                <br/>
            </h1>
            <p>К сожалению данная страница не найдена</p>
        </div>
    );
};
