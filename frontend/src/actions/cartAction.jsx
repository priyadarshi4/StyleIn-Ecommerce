import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,
} from "../constants/cartConstant";
import axios from "axios";

/*
====================================================
ADD TO CART (FIRST TIME ONLY)
====================================================
*/
export const addItemToCart =
  (id, quantity, size) =>
  async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://style-in-backend.onrender.com/api/v1/product/${id}`
      );

      const product =
        response.data?.product ||
        response.data?.Product ||
        response.data?.data?.product;

      if (!product) {
        console.error("❌ Product not found in API response:", response.data);
        return;
      }

      let stock = 0;

      if (typeof product.Stock === "number") {
        stock = product.Stock;
      } else if (typeof product.stock === "number") {
        stock = product.stock;
      }

      if (size && Array.isArray(product.sizes)) {
        const sizeObj = product.sizes.find((s) => s.size === size);
        stock = sizeObj ? Number(sizeObj.stock) : 0;
      }

      dispatch({
        type: ADD_TO_CART,
        payload: {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url || "",
          stock,
          quantity,
          size,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.error("❌ Add to cart failed:", error);
    }
  };


/*
====================================================
UPDATE QUANTITY (+ / −)
====================================================
*/
export const updateCartQuantity =
  (productId, size, quantity) =>
  (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        productId,
        size,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

/*
====================================================
REMOVE ITEM (PER SIZE)
====================================================
*/
export const removeItemFromCart =
  (productId, size) =>
  (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: { productId, size },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

/*
====================================================
SAVE SHIPPING INFO
====================================================
*/
export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

/*
====================================================
CLEAR CART
====================================================
*/
export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingInfo");
};
