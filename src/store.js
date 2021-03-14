import { configureStore } from '@reduxjs/toolkit';
import appRecuder from './redux/appSlice';
import covidReducer from './redux/covidSlice';
import usersReducer from './redux/usersSlice';
import { loadUsersList, saveUsersList } from './utils/localStorage';

const rootReducer = {
  app: appRecuder,
  covid: covidReducer,
  users: usersReducer
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    users: loadUsersList()
  }
});

store.subscribe(() => {
  saveUsersList({
    users: store.getState().users,
  });
});

export default store;