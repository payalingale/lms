import { ActionTypes } from "../Constants";


const initialState = {
    carts: [],
    wishList:[]
}



export const RootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.UPDATE_CART:
            const updatedCart = [...state.carts];
            if (payload.isDelete) {
                updatedCart = updatedCart.filter(ele=>state.carts.id != payload.id)
            
            } else {
                updatedCart.push(payload.data)
            }
            return {
                ...state,carts:updatedCart
            }
            case ActionTypes.UPDATE_WISHLIST_CART:
                const updatedWishListCart = [...state.wishList]
                if(payload.isDelete){
                    updatedWishListCart = updatedWishListCart.filter (ele=>state.wishList.id != payload.id)
                }
                else {
                    updatedWishListCart.push(payload.data)
                }
                return {
                    ...state,wishList:updatedWishListCart
                }
        default:
            return state;
    }
}


