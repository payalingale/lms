import { ActionTypes } from "../Constants";

const initialState = {
  categories: [],
  subCategories: [],
  carts: [],
  wishList: [],
};

export const RootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.UPDATE_CART:
      let updatedCart = [...state.carts];
      if (payload.isDelete) {
        updatedCart = updatedCart.filter((ele) => ele != payload.data);
      } else {
        updatedCart.push(payload.data);
      }
      localStorage.setItem("carts", updatedCart);
      return {
        ...state,
        carts: updatedCart,
      };
    case ActionTypes.UPDATE_WISHLIST_CART:
      let updatedWishListCart = [...state.wishList];
      if (payload.isDelete) {
        updatedWishListCart = updatedWishListCart.filter(
          (ele) => ele != payload.data
        );
      } else {
        updatedWishListCart.push(payload.data);
      }
      localStorage.setItem("wishlist", updatedWishListCart);
      return {
        ...state,
        wishList: updatedWishListCart,
      };
    case ActionTypes.SET_WISHLIST:
      return {
        ...state,
        wishList: payload.data.split(",").map((ele) => parseInt(ele)),
      };
    case ActionTypes.SET_CART:
      return {
        ...state,
        carts: payload.data.split(",").map((ele) => parseInt(ele)),
      };
    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: payload.data,
      };
    case ActionTypes.SET_SUB_CATEGORIES:
      return {
        ...state,
        subCategories: payload.data,
      };
    case ActionTypes.RESET_STORE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
