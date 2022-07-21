import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  text: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setTodos, setText } = todoSlice.actions;

export default todoSlice.reducer;
