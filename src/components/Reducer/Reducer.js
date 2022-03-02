export const initialState = {
  basket: [],
  user: null,
};

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);

export const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item].filter((item) => item.id !== action.item.id),
      };
    case "REMOVE_ALL_FROM_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item].filter((item) => item.title !== action.item.title),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
