import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export const FullPizza = () => {
    const [pizza, setPizza] = useState()
    const navigate = useNavigate()

    const {id} = useParams()
    let pizzaId = Number(id)
    console.log(typeof pizzaId)

    useEffect(()=>{
        async function fetchPizza(){
            try {
            const {data} = await axios.get(`https://62d57f1515ad24cbf2c86df6.mockapi.io/items/${pizzaId}`)
                setPizza(data)
            }catch (e) {
                alert('Пицца не найдена!');
                navigate("/");
            }
        }
        fetchPizza();

    },[])

    if(!pizza){
        return <div style={{textAlign:"center"}}>пицца не загрузилась</div>
    }
    return (
        <div style={{textAlign:"center"}}>
            <img src={pizza.imageUrl} alt="image"/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} р.</h4>

        </div>
    );
};
