import CartActionTypes from "./action-types"

const initialState = {
    products: [],
    productsTotalPrice: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CartActionTypes.ADD_PRODUCT:

            //verifica se o produto ja esta no carrinho
            const productIsAlreadyinCart = state.products.some(
                (product) => product.id === action.payload.id
            );
            //Se ele estiver, aumente a quantidade em 1
            if (productIsAlreadyinCart) {
                return {
                    ...state,
                    products: state.products.map((product) =>
                        product.id === action.payload.id
                            ? { ...product, quantity: product.quantity + 1 } : product
                    )
                }
            }
            //Se ele nao estiver, entao adicione
            return {
                ...state,
                products: [...state.products, { ...action.payload, quantity: 1 }]
            };

        case CartActionTypes.REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload)
            };

        case CartActionTypes.INCREASE_PRODUCT_QUANTITY:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                )
            };

        case CartActionTypes.DECREASE_PRODUCT_QUANTITY:
            return{
             ...state,
                products: state.products.map((product) =>
                    product.id === action.payload
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                ).filter(product => product.quantity > 0)
            };

        default:
            return state;
    }
};

export default cartReducer