const initialState = {
  companies: [],
};
export const UPDATE_COMPANIES= 'update companies';

export default function updateCompanies(state = initialState, action){
  switch (action.type) {
    case UPDATE_COMPANIES:
      return {
        ...state,
        companies: action.companies,
      }
    default:
      return state;
  }
}
