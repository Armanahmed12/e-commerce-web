// here, we are setting a spesific product id to localStorage
const setShoppingProduct = (id) => {

    let shoppingCart = [];

    // check whether this product exists or doesn't in the localStorange
    let doesShoppingCartExist = localStorage.getItem('shoppingCart');
    doesShoppingCartExist = JSON.parse(doesShoppingCartExist);
    if (doesShoppingCartExist) {

        shoppingCart = doesShoppingCartExist;
        // shoppingCart length
        const shoppingCartLength = shoppingCart.length;
        for (let i = 0; i < shoppingCartLength; i++) {

             if(id in shoppingCart[i]) {

                shoppingCart[i][id] = shoppingCart[i][id] + 1;
                 localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
                   return;
            }
            if((i + 1) == shoppingCart.length){
                
                    shoppingCart.push({[id] : 1});
           
            }
        }

}else {

        shoppingCart.push({ [id]: 1 });
    }

    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
}

// here, we are deleting a spesific localStorage Item.
const deleteShoppingCart = () =>{

        localStorage.removeItem('shoppingCart');
}

// finding out all the products which can pass a spesific condition
const getAllSelectedProducts = (allProducts) =>{
 
    let allSelectedProductsId = localStorage.getItem('shoppingCart');
    allSelectedProductsId = JSON.parse(allSelectedProductsId);
    let selectedProducts = [];

    for(let i = 0; i < allSelectedProductsId.length; i++){

      const selectedProductId = Object.keys(allSelectedProductsId[i])[0];
        let matchedProduct = allProducts.find(eachProduct => eachProduct.id == selectedProductId);
        matchedProduct.quantity = allSelectedProductsId[i][matchedProduct.id];
        selectedProducts.push(matchedProduct);

    }
      return selectedProducts;
};

export { setShoppingProduct, getAllSelectedProducts ,deleteShoppingCart};