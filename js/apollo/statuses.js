const initialState = {
  statuses: []
};
export const UPDATE_STATUSES= 'update status es';

export default function updateStatuses(state = initialState, action){
  switch (action.type) {
    case UPDATE_STATUSES:
      return {
        ...state,
        statuses: action.statuses,
      }
    default:
      return state;
  }
}
