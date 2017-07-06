const initialState = {
  drawerProjects: [],
};
export const UPDATE_PROJECTS= 'update projects';

export default function updateDrawer(state = initialState, action){
  switch (action.type) {
    case UPDATE_PROJECTS:
      return {
        ...state,
        drawerProjects: action.drawerProjects,
      }
    default:
      return state;
  }
}
