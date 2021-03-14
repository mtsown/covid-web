import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLoading: false
  },
  reducers: {
    toggleGlobalLoading(state) {
      state.isLoading = !state.isLoading;
    }
  }
});

const { actions, reducer } = appSlice;
export const { toggleGlobalLoading } = actions;
export default reducer;
