import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constants/cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {

    /* ============================================
       ADD / UPDATE CART ITEM (SIZE AWARE)
       ============================================ */
    case ADD_TO_CART: {
      const item = action.payload;

      const isExist = state.cartItems.find(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.size === item.size
      );

      let updatedCartItems;

      if (isExist) {
        updatedCartItems = state.cartItems.map((cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.size === item.size
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        );
      } else {
        updatedCartItems = [...state.cartItems, item];
      }

      // ✅ SAVE TO LOCAL STORAGE
      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedCartItems)
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    /* ============================================
       REMOVE CART ITEM (PER SIZE)
       ============================================ */
    case REMOVE_CART_ITEM: {
      const updatedCartItems = state.cartItems.filter(
        (cartItem) =>
          !(
            cartItem.productId === action.payload.productId &&
            cartItem.size === action.payload.size
          )
      );

      // ✅ UPDATE LOCAL STORAGE
      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedCartItems)
      );

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    /* ============================================
       SAVE SHIPPING INFO
       ============================================ */
    case SAVE_SHIPPING_INFO:
      localStorage.setItem(
        "shippingInfo",
        JSON.stringify(action.payload)
      );

      return {
        ...state,
        shippingInfo: action.payload,
      };

    /* ============================================
       CLEAR CART
       ============================================ */
    case CLEAR_CART:
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingInfo");

      return {
        ...state,
        cartItems: [],
        shippingInfo: {},
      };

    default:
      return state;
  }
};
