const initialState = {
  id: null,
  company:null,
};
export const ADD_USER= 'addLoggedInUser';

export default function logInUser(state = initialState, action){
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        id: action.id,
        company: action.company,
      }
    default:
      return state;
  }
}
