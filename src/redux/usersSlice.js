import { createSlice } from "@reduxjs/toolkit";

// ⬇️ Load data from localStorage
const getLocalUsers = () => {
  const stored = localStorage.getItem('users');
  return stored ? JSON.parse(stored) : [];
};

const initialState = {
  users: getLocalUsers(), // ⬅️ initialize from localStorage
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      localStorage.setItem('users', JSON.stringify(state.users)); // save to localStorage
    },
    updateUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedData };
        localStorage.setItem('users', JSON.stringify(state.users)); // update localStorage
      }
    },
  },
});

export const { setUsers, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
