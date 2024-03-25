import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { getAllSelectedProducts, setShoppingProduct } from '../../utilities/shop';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [selectedCartProducts, setSelectedCartProducts] = useState([]);

    // The products that will be rendered with the button("seeMore").
    let [showAllProducts, setShowAllProducts] = useState(false);
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    // initial six products that will be rendered first time   
    const sixProducts = products.slice(0, 6);

//  initail cart Data for redering
    useEffect((() => {

        if (products.length > 1) {
            const initialCartProducts = getAllSelectedProducts(products)
            setSelectedCartProducts(initialCartProducts)
        }

    }), [products]);

    // a function which will be exicuted with Product's(component) button for adding an modifying the selected products.

    const getTheClickedProduct = (id) => {

        setShoppingProduct(id);
        const selectedCartProducts = getAllSelectedProducts(products);
        setSelectedCartProducts(selectedCartProducts);
        alert("This product has been added.")

    }

    // this function will delete all the cart Component data and make an empty cart.
    const removeTheCartData = () => {

        setSelectedCartProducts([]);
        localStorage.removeItem('shoppingCart');

    }
    return (
        <div className='grid grid-cols-4 md:p-5 p-2'>
            <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 col-span-4 md:col-span-3 order-2 md:order-1">

                {
                    sixProducts.map(product => <Product getTheProduct={getTheClickedProduct} key={product.id} product={product} />)
                }
                {
                    showAllProducts && products.slice(6, [products.length]).map(product => <Product getTheProduct={getTheClickedProduct} key={product.id} product={product} />)
                }
                <button onClick={(event) => {
                    setShowAllProducts(!showAllProducts);
                    event.target.style.display = 'none';
                }} className='bg-[#1c2b35] hover:bg-[#024774] font-bold text-white text-center mx-auto md:w-1/5 w-2/5 md:col-span-3 inline-block py-2 px-5 rounded-md my-4'>See More</button>
            </div>
            <div className='cart-container md:col-span-1 col-span-4  md:ml-4 rounded-xl bg-[#1c2b35] text-white p-3 font-semibold  h-[420px] order-1 md:order-2 mb-4 md:my-0 '>
                
                     <ShoppingCart removeTheCartData={removeTheCartData} selectedCartProducts={selectedCartProducts} />
                
            </div>
        </div>
    );
};

export default Shop;