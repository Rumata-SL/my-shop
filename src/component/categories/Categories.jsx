import React, {useState} from "react";


export const Categories = () => {
    const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    const [activeIndex, setActiveIndex] = useState(0)

    const itemCategory = category.map((el, index )=>{
        return <li key={index} onClick={()=>{setActiveIndex(index)}} className={activeIndex === index ? "active" : ""}>{el}</li>
    })

    return (
        <div className="categories">
            <ul>
                {itemCategory}
            </ul>
        </div>
    )
}
