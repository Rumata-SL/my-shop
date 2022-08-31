import React, {FC} from "react";

type CategoriesPropsType = {
    value: number
    onClickCategory: (index: number) => void
}
const category: Array<string> = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

export const Categories: FC<CategoriesPropsType> = (props) => {
    const {value, onClickCategory} = props

    const itemCategory = category.map((el, index) => {
        return <li key={index} onClick={() => {
            onClickCategory(index)
        }} className={value === index ? "active" : ""}>{el}</li>
    })

    return (
        <div className="categories">
            <ul>
                {itemCategory}
            </ul>
        </div>
    )
}
