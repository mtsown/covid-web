export const loadUsersList = () => {
  try {
    if (localStorage.getItem('usersList') === null) {
      return undefined;
    }
    return JSON.parse(localStorage.getItem('usersList'));
  } catch (error) {
    return undefined;
  }
};

export const saveUsersList = (state) => {
  try {
    localStorage.setItem('usersList', JSON.stringify(state.users));
  } catch { }
};