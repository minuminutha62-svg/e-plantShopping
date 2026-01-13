import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {

    addItem: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(i => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name);
    },

    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find(i => i.name === name);
      if (item) {
        item.quantity = amount;
      }
    }

  }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
