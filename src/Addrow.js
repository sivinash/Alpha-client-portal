import { useState, useEffect } from "react";
import {FaRupeeSign} from  "react-icons/fa";
export default function Addrow({ element, index, setOrderList, orderList,ordermode }) {
    const [quantity, setQuantity] = useState(parseInt(element.quantity, 10));
    const [oneTotal, setOneTotal] = useState(calculateTotal(quantity, element.price));

    // Function to calculate total based on quantity and price
    function calculateTotal(quantity, price) {
        return parseInt(quantity, 10) * parseInt(price, 10);
    }

    // Update total whenever quantity or price changes
    useEffect(() => {
        setOneTotal(calculateTotal(quantity, element.price));
    }, [quantity, element.price]);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        setQuantity(newQuantity);
        const updatedOrderList = [...orderList];
        updatedOrderList[index].quantity = newQuantity;
        setOrderList(updatedOrderList);
    };

    return (
        <tr>
            <td>{element.name}</td>
            <td>
                {ordermode ?(element.quantity):(
                    <input
                        type="number"
                        min={1}
                        max={10}
                        step={1}
                        value={quantity}
                        onChange={handleQuantityChange}
                        style={{fontSize:"24px",alignItems: "center", width: "50px", height: "30px", textAlign: "center",background:"transparent", color:"white", border:"1px solid white",borderColor:"transparent"}}
                    />
                )}
            </td>
            <td><FaRupeeSign/>{oneTotal}</td>
        </tr>
    );
}
