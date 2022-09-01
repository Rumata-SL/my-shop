import {CartItemType} from "../redux/slice/cartSlice";

export const calcTotalPrice = (items:Array<CartItemType>)=>{
    return items.reduce((acc, obj) => {
        return (obj.price * obj.count) + acc
    }, 0)

}