const initialState = {
  users: [],
};
export const UPDATE_USERS= 'update users';

export default function updateUsers(state = initialState, action){
  switch (action.type) {
    case UPDATE_USERS:
      return {
        ...state,
        users: action.users,
      }
    default:
      return state;
  }
}
