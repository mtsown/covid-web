import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [
    {
      id: 'admin',
      password: 'admin'
    }
  ],
  reducers: {
    addUser(state, action) {
      const newUser = {
        id: action.payload.username,
        password: action.payload.password
      }
      state.push(newUser);
    }
  }
});

const { actions, reducer } = usersSlice;
export const { addUser } = actions;
export default reducer;
