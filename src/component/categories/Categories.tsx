import React, {FC} from "react";

type CategoriesPropsType ={
    value:number
    onClickCategory: (index:number)=>void
}

export const Categories:FC<CategoriesPropsType> = (props) => {
    const {value, onClickCategory}= props

    const category = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    // const [activeIndex, setActiveIndex] = useState(0)

    const itemCategory = category.map((el, index )=>{
        return <li key={index} onClick={()=>{onClickCategory(index)}} className={value === index ? "active" : ""}>{el}</li>
    })

    return (
        <div className="categories">
            <ul>
                {itemCategory}
            </ul>
        </div>
    )
}
