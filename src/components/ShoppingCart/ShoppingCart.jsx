import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { RiDeleteBin6Fill } from "react-icons/ri";

const ShoppingCart = (props) => {
    console.log(props.selectedCartProducts);
    const selectedProducts = props.selectedCartProducts;
    let selectedProductItems = 0;
    let totalPrice = 0;
    let totalShippingCharge = 0;
    let tax = 0;
    let grandTotal = 0;
    for(let i = 0; i < selectedProducts.length;i++){
            
            console.log(selectedProducts[i])
            selectedProductItems = selectedProductItems + selectedProducts[i]["quantity"];
            totalPrice = totalPrice + (selectedProducts[i]["price"] * selectedProducts[i]["quantity"]);
            totalShippingCharge = totalShippingCharge + (selectedProducts[i]["shipping"] * selectedProducts[i]["quantity"]);
            tax = tax + ( totalPrice / 100) * 10;
            grandTotal = grandTotal + totalPrice + totalShippingCharge + tax;
            console.log(grandTotal);
    }
    console.log(selectedProductItems);
    return (
        <div className='leading-8'>
              <h2 className='text-center my-1 font-bold text-xl text-[#edff00]'>Order Summary</h2>
                <p>Selected Items : <span>{selectedProductItems}</span></p>
                <p>Total Price : <span>${Number.isInteger(totalPrice) ? totalPrice : totalPrice.toFixed(2)}</span></p>
                <p>Total Shipping Charge : <span>${ Number.isInteger(totalShippingCharge) ? totalShippingCharge : totalShippingCharge.toFixed(2)}</span></p>
                <p>Tax : <span>${ Number.isInteger(tax) ? tax : tax.toFixed(2)}</span></p>
                <p>Grand Total : <span>${ Number.isInteger(grandTotal) ? grandTotal : grandTotal.toFixed(2)}</span></p>
                <button onClick={()=>localStorage.removeItem('shoppingCart')} className='bg-red-500 w-full  rounded-md text-xl py-2 text-center mt-8 mb-3  flex justify-center items-center gap-3'>clear Cart <RiDeleteBin6Fill /></button>
                <button className='bg-orange-500 w-full rounded-md text-xl py-2 flex justify-center items-center gap-3'>Review Order<FaArrowRight/> </button>
        </div>
    );
};

export default ShoppingCart;